<script lang="ts">
    import { IconCheck, IconMinusSm } from '@appwrite.io/pink-icons-svelte';
    import { createEventDispatcher } from 'svelte';
    import Base from './Base.svelte';
    import Icon from '$lib/Icon.svelte';

    export let disabled: boolean = false;
    export let id: string | undefined = undefined;
    export let size: 's' | 'm' = 'm';
    export let label: string | undefined = undefined;
    export let description: string | undefined = undefined;
    export let checked: boolean | 'indeterminate' = false;
    export let required: boolean = false;

    const dispatch = createEventDispatcher();

    function toggle() {
        if (!disabled) {
            dispatch('change', !checked);
            checked = !checked;
        }
    }
</script>

<Base {label} {id} {description}>
    <button
        {id}
        {disabled}
        type="button"
        on:click|preventDefault|stopPropagation
        on:click|preventDefault|stopPropagation={toggle}
        class:active={checked === 'indeterminate' || checked}
        class:s={size === 's'}
    >
        {#if checked === 'indeterminate'}
            <Icon icon={IconMinusSm} {size} --icon-color="white" />
        {:else if checked}
            <Icon icon={IconCheck} {size} --icon-color="white" />
        {/if}
    </button>
    <input type="hidden" name={id} value={checked} {disabled} {required} />
    <slot name="description" slot="description" />
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
        width: calc(var(--p-checkbox-size));
        min-width: calc(var(--p-checkbox-size));
        height: calc(var(--p-checkbox-size));
        color: var(--fgcolor-on-invert);
        cursor: pointer;
        flex-shrink: 0;

        outline-offset: var(--border-width-l);

        border: $border-width solid;
        border-color: var(--border-neutral);
        border-radius: var(--border-radius-xs);

        &.s {
            --p-checkbox-size: var(--icon-size-s);
            margin: var(--space-1) var(--space-0);
            border-radius: var(--border-radius-xxs);
        }

        &:hover:not(.active):not([aria-disabled='true']) {
            background-color: var(--overlay-button-neutral-hover);
        }

        &.active {
            border-color: var(--bgcolor-neutral-invert);
            background-color: var(--bgcolor-neutral-invert);
        }

        &:disabled {
            opacity: 0.4;
        }

        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
            border-color: var(--border-focus);
        }
    }
</style>
