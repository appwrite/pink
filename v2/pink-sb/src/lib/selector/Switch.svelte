<script>
    import { createSwitch } from '@melt-ui/svelte';

    export let checked = false;
    export let disabled = false;

    const {
        elements: { root, input },
        states: { checked: localChecked }
    } = createSwitch({
        onCheckedChange({ next }) {
            checked = next;

            return next;
        }
    });

    $: localChecked.set(checked);
</script>

<button {...$root} use:root {disabled}>
    <span class="thumb" />
    <input {...$input} use:input />
</button>

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
            background-color: white;
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
