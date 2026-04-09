<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    type $$Props = HTMLButtonAttributes &
        Partial<{
            selected: boolean;
            size: 'xs' | 's' | 'm';
            variant: 'default' | 'code';
        }>;

    export let size: $$Props['size'] = 'm';
    export let selected: $$Props['selected'] = false;
    export let variant: $$Props['variant'] = 'default';
</script>

<button
    class:s={size === 's'}
    class:xs={size === 'xs'}
    class:code={variant === 'code'}
    on:click
    class:selected
    type="button"
    {...$$restProps}
>
    {#if $$slots.start}
        <span class="start">
            <slot name="start" />
        </span>
    {/if}
    {#if $$slots.default}
        <slot />
    {/if}
    {#if $$slots.end}
        <span class="end">
            <slot name="end" />
        </span>
    {/if}
</button>

<style lang="scss">
    @use '../scss/mixins/transitions';

    button {
        @include transitions.common;

        --p-tag-font-family:
            var(--badge-font-family, var(--font-family-sansserif)), var(--sans-fallbacks);
        --p-tag-font-size: var(--badge-font-size, var(--font-size-s));
        --p-tag-padding-block: var(--badge-padding-block, var(--space-3));
        --p-tag-padding-inline: var(--badge-padding-inline, var(--space-5));
        --p-tag-gap: var(--badge-gap, var(--space-3));
        --p-tag-color: var(--tag-color, var(--fgcolor-neutral-secondary));
        --p-tag-background-color: var(--tag-background-color, var(--bgcolor-neutral-default));

        display: inline-flex;
        padding-block: var(--p-tag-padding-block);
        padding-inline: var(--p-tag-padding-inline);
        justify-content: center;
        align-items: center;
        gap: var(--p-tag-gap);

        color: var(--p-tag-color);
        background-color: var(--p-tag-background-color);
        border: var(--border-width-s) solid var(--border-neutral);
        border-radius: var(--border-radius-XS, 6px);

        font-family: var(--p-tag-font-family);
        font-size: var(--p-tag-font-size);
        font-style: normal;
        font-weight: 500;
        line-height: 140%;

        cursor: pointer;

        .start,
        .end {
            display: inline-flex;
            align-items: center;
        }
        .start {
            margin-left: -2px;
        }
        .end {
            margin-right: -2px;
        }
        &.code {
            --p-tag-font-family: var(--font-family-code), var(--mono-fallbacks);
        }
        &.xs {
            --p-tag-font-size: var(--font-size-xs);
            --p-tag-padding-block: var(--space-1);
            --p-tag-padding-inline: var(--space-3);
        }
        &.s {
            --p-tag-padding-block: var(--space-1);
            --p-tag-padding-inline: var(--space-3);
        }
        &:hover {
            --p-tag-background-color: var(--bgcolor-neutral-secondary);
        }
        &:active {
            --p-tag-background-color: var(--bgcolor-neutral-secondary);
        }
        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
        }
        &:disabled {
            background-color: var(--bgcolor-neutral-primary);
            opacity: 0.4;
        }
        &.selected {
            --p-tag-background-color: var(--bgcolor-neutral-secondary);
            border: var(--border-width-s) solid var(--border-neutral-stronger);
        }
    }
</style>
