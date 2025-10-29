<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { createEventDispatcher, getContext } from 'svelte';

    type $$Props = HTMLButtonAttributes & {
        variant?: 'default' | 'code';
        selected?: boolean;
        disabled?: boolean;
        dismiss?: boolean;
    };

    export let variant: $$Props['variant'] = 'default';
    export let selected: $$Props['selected'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let dismiss: $$Props['dismiss'] = false;

    const dispatch = createEventDispatcher();
    const dismissFn = getContext<() => void>('compound-tag-dismiss');
</script>

<button
    class="child"
    class:code={variant === 'code'}
    class:selected
    class:disabled
    on:click|capture={() => {
        if (dismiss) {
            dismissFn?.();
            dispatch('dismiss');
        }
    }}
    type="button"
    {disabled}
    {...$$restProps}
>
    <slot />
</button>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    .child {
        @include transitions.common;

        --p-compound-tag-child-font-family:
            var(--badge-font-family, var(--font-family-sansserif)), var(--sans-fallbacks);
        --p-compound-tag-child-font-size: var(--badge-font-size, var(--font-size-s));
        --p-compound-tag-child-padding-block: var(--badge-padding-block, var(--space-3));
        --p-compound-tag-child-padding-inline: var(--badge-padding-inline, var(--space-5));
        --p-compound-tag-child-gap: var(--badge-gap, var(--space-3));
        --p-compound-tag-child-color: var(--tag-color, var(--fgcolor-neutral-secondary));
        --p-compound-tag-child-background-color: var(
            --tag-background-color,
            var(--bgcolor-neutral-default)
        );
        --p-compound-tag-child-border-color: var(--border-neutral);
        --p-compound-tag-child-divider-color: var(--border-neutral);

        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding-block: var(--p-compound-tag-child-padding-block);
        padding-inline: var(--p-compound-tag-child-padding-inline);
        gap: var(--p-compound-tag-child-gap);
        min-height: 100%;

        color: var(--p-compound-tag-child-color);
        background-color: transparent;
        border: none;
        border-right: var(--border-width-s) solid var(--p-compound-tag-child-divider-color);

        font-family: var(--p-compound-tag-child-font-family);
        font-size: var(--p-compound-tag-child-font-size);
        font-style: normal;
        font-weight: 500;
        line-height: 140%;

        cursor: pointer;

        /* Ensure all content is properly aligned */
        > * {
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
        }

        &:last-child {
            border-right: none;
        }

        &:hover {
            background-color: var(--bgcolor-neutral-secondary);
        }

        &:active {
            background-color: var(--bgcolor-neutral-secondary);
        }

        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
            outline-offset: -2px;
        }

        &:disabled {
            background-color: var(--bgcolor-neutral-primary);
            opacity: 0.4;
            cursor: not-allowed;
        }

        &.code {
            --p-compound-tag-child-font-family: var(--font-family-code), var(--mono-fallbacks);
        }

        &.selected {
            --p-compound-tag-child-background-color: var(--bgcolor-neutral-secondary);
            border: var(--border-width-s) solid var(--border-neutral-stronger);
        }
    }

    /* Size variants */
    :global(.compound-tag.xs) .child {
        --p-compound-tag-child-font-size: var(--font-size-xs);
        --p-compound-tag-child-padding-block: var(--space-1);
        --p-compound-tag-child-padding-inline: var(--space-3);
    }

    :global(.compound-tag.s) .child {
        --p-compound-tag-child-padding-block: var(--space-1);
        --p-compound-tag-child-padding-inline: var(--space-3);
    }
</style>
