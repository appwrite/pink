<script lang="ts">
    import { createCheckbox } from '@melt-ui/svelte';
    import { IconCheck, IconMinusSm } from '@appwrite.io/pink-icons-svelte';
    import { createEventDispatcher } from 'svelte';
    import Base from './Base.svelte';
    import Icon from '$lib/Icon.svelte';

    export let disabled: boolean = false;
    export let id: string | undefined = undefined;
    export let size: 's' | 'm' = 'm';
    export let label: string | undefined = undefined;
    export let checked: boolean | 'indeterminate' = false;

    const dispatch = createEventDispatcher();

    const {
        elements: { root, input },
        states: { checked: localChecked },
        helpers: { isChecked, isIndeterminate }
    } = createCheckbox({
        defaultChecked: checked
    });

    $: localChecked.set(checked);
    localChecked.subscribe((n) => {
        checked = n;
        dispatch('change', checked);
    });
</script>

<Base {label} {id}>
    <button
        {id}
        {...$root}
        {disabled}
        use:root
        class:active={$isIndeterminate || $isChecked}
        class:s={size === 's'}
    >
        {#if $isIndeterminate}
            <Icon icon={IconMinusSm} size="s" --icon-color="white" />
        {:else if $isChecked}
            <Icon icon={IconCheck} size="s" --icon-color="white" />
        {/if}
    </button>
    <input {...$input} use:input />
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    button {
        @include transitions.common;

        --p-checkbox-size: var(--icon-size-m);

        $border-width: 1px;
        $border-width-double: $border-width * 2;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: calc(var(--p-checkbox-size) + $border-width-double);
        height: calc(var(--p-checkbox-size) + $border-width-double);
        color: var(--color-fgcolor-on-invert);

        outline-offset: var(--border-width-l);

        border: $border-width solid;
        border-color: var(--color-border-neutral);
        border-radius: var(--border-radius-xxs);

        &.s {
            --p-checkbox-size: var(--icon-size-s);
        }

        &:hover:not(.active):not([aria-disabled='true']) {
            background-color: var(--color-overlay-button-neutral-hover);
        }

        &.active {
            border-color: var(--color-bgcolor-neutral-invert);
            background-color: var(--color-bgcolor-neutral-invert);
        }

        &:disabled {
            opacity: 0.4;
        }

        &:focus-visible {
            outline: var(--border-width-xl) solid var(--color-border-focus);
            border-color: var(--color-border-focus);
        }
    }
</style>
