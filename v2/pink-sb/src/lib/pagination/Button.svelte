<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    type $$Props = HTMLButtonAttributes &
        Partial<{ disabled: boolean; selected: boolean; isPage: boolean }>;

    export let disabled: $$Props['disabled'] = false;
    export let selected: $$Props['selected'] = false;
    export let tabindex: $$Props['tabindex'] = undefined;
    export let isPage: $$Props['isPage'] = false;
</script>

<button
    type="button"
    on:click
    {...$$restProps}
    tabindex={disabled ? -1 : tabindex}
    aria-disabled={disabled ? 'true' : undefined}
    class:selected
    class:is-page={isPage}
>
    {#if $$slots.start}
        <span class="start">
            <slot name="start" />
        </span>
    {/if}
    <span>
        <slot />
    </span>
    {#if $$slots.end}
        <span class="end">
            <slot name="end" />
        </span>
    {/if}
</button>

<style lang="scss">
    @use '../../scss/mixins/transitions';

    button {
        @include transitions.common;

        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        flex-shrink: 0;
        border: var(--border-width-s) solid transparent;
        border-radius: var(--border-radius-s);
        padding-inline: var(--space-4);
        padding-block: var(--space-3);
        gap: var(--space-2);

        font-family: var(--font-family-sansserif);
        font-size: var(--font-size-s);
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 19.6px */
        letter-spacing: -0.063px;

        &.is-page {
            width: 32px;
            height: 32px;
            padding: none;
        }

        &:hover {
            background-color: var(--bgcolor-neutral-secondary);
            border: var(--border-width-s) solid var(--bgcolor-neutral-secondary);
        }
        &:active,
        &.selected {
            background-color: var(--bgcolor-neutral-tertiary);
            border: var(--border-width-s) solid var(--bgcolor-neutral-tertiary);
        }
        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
        }

        &[aria-disabled='true'] {
            opacity: 0.4;
            pointer-events: none;
        }

        &:focus-visible {
            outline: var(--border-width-l) solid var(--border-focus);
        }

        .start,
        .end {
            display: inline-flex;
            align-items: center;
            &:empty {
                display: none;
            }
        }
        .start {
            margin-left: -4px;
        }
        .end {
            margin-right: -4px;
        }
    }
</style>
