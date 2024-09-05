<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    type $$Props = HTMLButtonAttributes &
        Partial<{
            selected: boolean;
        }>;

    export let selected: $$Props['selected'] = false;
</script>

<button on:click class:selected {...$$restProps}><slot /></button>

<style lang="scss">
    @use '../scss/mixins/transitions';

    button {
        @include transitions.common;

        --p-tag-font-family: var(--badge-font-family, var(--font-family-sansserif));
        --p-tag-font-size: var(--badge-font-size, var(--font-size-s));
        --p-tag-padding-block: var(--badge-padding-block, var(--space-2));
        --p-tag-padding-inline: var(--badge-padding-inline, var(--space-4));
        --p-tag-gap: var(--badge-gap, var(--space-3));
        --p-tag-color: var(--tag-color, var(--color-fgcolor-neutral-secondary));
        --p-tag-background-color: var(--tag-background-color, var(--color-bgcolor-neutral-default));

        display: inline-flex;
        padding-block: var(--p-tag-padding-block);
        padding-inline: var(--p-tag-padding-inline);
        justify-content: center;
        align-items: center;
        gap: var(--p-tag-gap);

        color: var(--p-tag-color);
        background-color: var(--p-tag-background-color);
        border: var(--border-width-s) solid var(--color-border-neutral);
        border-radius: var(--border-radius-XS, 6px);

        font-family: var(--p-tag-font-family);
        font-size: var(--p-tag-font-size);
        font-style: normal;
        font-weight: 500;
        line-height: 140%;

        &:hover {
            background-color: var(--color-bgcolor-neutral-default);
        }
        &:active {
            background-color: var(--color-bgcolor-neutral-default);
        }
        &:focus-visible {
            outline: var(--border-width-xl) solid var(--color-border-focus);
        }
        &:disabled {
            background-color: var(--color-bgcolor-neutral-primary);
            opacity: 0.4;
        }
        &.selected {
            background-color: var(--color-bgcolor-neutral-tertiary);
        }
    }
</style>
