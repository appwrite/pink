<script lang="ts">
    import { createCheckbox } from '@melt-ui/svelte';
    import { IconCheck, IconMinusSm } from 'pink-icons';
    import { createEventDispatcher } from 'svelte';

    export let checked: boolean | 'indeterminate' = false;
    export let disabled: boolean = false;
    export let size: 'small' | 'medium' = 'medium';

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

<button
    {...$root}
    {disabled}
    use:root
    class:active={$isIndeterminate || $isChecked}
    class:small={size === 'small'}
>
    {#if $isIndeterminate}
        <IconMinusSm />
    {:else if $isChecked}
        <IconCheck />
    {/if}
    <input {...$input} use:input />
</button>

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

        outline-offset: var(--border-width-l);

        border: $border-width solid;
        border-color: var(--color-border-neutral);
        border-radius: var(--border-radius-xxs);

        &.small {
            --p-checkbox-size: var(--icon-size-s);
        }

        &:hover:not(.active):not([aria-disabled='true']) {
            background-color: var(--color-overlay-button-secondary-hover);
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
        :global(svg) {
            position: absolute;
        }
        :global(path) {
            fill: var(--color-fgcolor-on-invert);
        }
    }
</style>
