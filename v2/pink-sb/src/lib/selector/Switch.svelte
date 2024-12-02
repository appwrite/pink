<script lang="ts">
    import { createSwitch } from '@melt-ui/svelte';
    import { createEventDispatcher } from 'svelte';
    import Base from './Base.svelte';

    export let checked: boolean = false;
    export let disabled: boolean = false;
    export let id: string | undefined = undefined;
    export let name: string | undefined = undefined;
    export let label: string | undefined = undefined;
    export let required: boolean = false;

    const dispatch = createEventDispatcher();

    const {
        elements: { root, input },
        states: { checked: localChecked }
    } = createSwitch({
        name,
        onCheckedChange({ next }) {
            checked = next;
            dispatch('change', checked);
            return next;
        }
    });

    $: localChecked.set(checked);
</script>

<Base {label} {id}>
    <button {...$root} use:root {disabled}>
        <span class="thumb" />
        <input {...$input} use:input on:invalid on:change {id} {required} />
    </button>
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    button {
        @include transitions.common;

        height: 20px;
        width: 32px;
        border-radius: 10px;
        background-color: var(--color-bgcolor-neutral-invert-weak);
        outline-offset: var(--border-width-l);

        &[data-state='checked'] {
            background-color: var(--color-bgcolor-neutral-invert);
        }

        &:disabled {
            opacity: 0.4;
        }

        &:focus-visible {
            outline: var(--border-width-l) solid var(--color-border-focus);
        }

        .thumb {
            @include transitions.common;

            display: block;
            background: var(--color-fgcolor-on-invert);

            border-radius: 999%;
            width: 16px;
            height: 16px;
            transform: translateX(2px);
        }

        &[data-state='checked'] .thumb {
            transform: translateX(calc(32px - 16px - 2px));
        }
    }
</style>
