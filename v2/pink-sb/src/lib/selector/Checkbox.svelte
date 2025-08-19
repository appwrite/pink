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

    let element: HTMLButtonElement;

    const dispatch = createEventDispatcher();

    function toggle(event?: MouseEvent) {
        if (event) dispatch('click', event);
        if (!disabled) {
            dispatch('change', !checked);
            checked = !checked;
        }
    }

    export function blur() {
        element.blur();
    }
</script>

<Base {label} {id} {description}>
    <button
        bind:this={element}
        {disabled}
        type="button"
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
    <input
        tabindex="-1"
        type="checkbox"
        checked={checked === true}
        indeterminate={checked === 'indeterminate'}
        {id}
        {disabled}
        {required}
        on:invalid
        on:change={() => toggle()}
        on:focus={() => element.focus()}
    />
    <slot name="description" slot="description" />
</Base>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    [type='checkbox'] {
        position: absolute;
        pointer-events: none;
        opacity: 0;
        width: calc(var(--icon-size-m));
        height: calc(var(--icon-size-m));
    }

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
        border-radius: var(--border-radius-xs);
        border-color: var(--border-neutral-strong);

        &.s {
            --p-checkbox-size: var(--icon-size-s);
            margin: var(--space-1) var(--space-0);
            border-radius: var(--border-radius-xxs);
        }

        &:hover:not(.active):not([disabled]) {
            background-color: var(--overlay-button-neutral-hover);
        }

        &.active {
            border-color: var(--bgcolor-neutral-invert);
            background-color: var(--bgcolor-neutral-invert);
        }

        &:disabled {
            opacity: 0.4;
            cursor: default;
            background-color: var(--bgcolor-neutral-tertiary);

            &.active {
                background-color: var(--bgcolor-neutral-invert);
                border-color: var(--bgcolor-neutral-invert);
            }

            &:hover:not(.active) {
                background-color: var(--bgcolor-neutral-tertiary);
            }
        }

        &:focus,
        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
            border-color: var(--border-focus);
        }
    }
</style>
