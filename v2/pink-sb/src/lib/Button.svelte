<script lang="ts">
    import Badge from './Badge.svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    type $$Props = HTMLButtonAttributes &
        Partial<{
            size: 'small' | 'medium';
            variant: 'primary' | 'secondary' | 'text' | 'compact';
            badge: string;
        }>;
    /**
     * The size of button.
     */
    export let size: $$Props['size'] = 'medium';
    /**
     * The variant of button.
     */
    export let variant: $$Props['variant'] = 'primary';
    /**
     * The badge to display on the button.
     */
    export let badge: $$Props['badge'] = '';

    function getBadgeVariant(variant: $$Props['variant']): 'accent' | 'secondary' {
        return variant === 'primary' ? 'accent' : 'secondary';
    }
</script>

<button
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    class:small={size === 'small'}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:text={variant === 'text'}
    class:compact={variant === 'compact'}
    {...$$restProps}
>
    {#if $$slots.start}
        <span>
            <slot name="start" />
        </span>
    {/if}
    {#if $$slots.default}
        <span><slot /></span>
    {/if}
    {#if badge}
        <Badge content={badge} variant={getBadgeVariant(variant)} size="small" />
    {/if}
    {#if $$slots.end}
        <span>
            <slot name="end" />
        </span>
    {/if}
</button>

<style lang="scss">
    @use '../scss/mixins/transitions';

    button {
        @include transitions.common;

        --p-button-background-color: var(--button-background-color);
        --p-button-border: var(--button-border, none);
        --p-button-border-radius: var(--button-border-radius, var(--border-radius-s));
        --p-button-box-shadow: var(--button-box-shadow, none);
        --p-button-color: var(--button-color, var(--color-fgcolor-on-accent));
        --p-button-font-family: var(--button-font-family, var(--font-family-sansserif));
        --p-button-font-size: var(--button-font-size, var(--font-size-s));
        --p-button-gap: var(--button-gap, var(--space-3));
        --p-button-padding-block: var(--button-padding-block, var(--space-5));
        --p-button-padding-inline: var(--button-padding-inline, var(--space-6));

        display: inline-flex;
        gap: var(--p-button-gap);
        flex-shrink: 0;
        padding-inline: var(--p-button-padding-inline);
        padding-block: var(--p-button-padding-block);
        justify-content: center;
        align-items: center;

        background-color: var(--p-button-background-color);
        border: var(--p-button-border);
        border-radius: var(--p-button-border-radius);
        color: var(--p-button-color);

        outline-offset: var(--border-width-s);

        font-family: var(--p-button-font-family);
        font-size: var(--p-button-font-size);
        font-style: normal;
        font-weight: 500;
        line-height: 140%;

        &.small {
            --p-button-padding-block: var(--space-3);
            --p-button-padding-inline: var(--space-5);
        }

        &.primary {
            background-color: var(--color-bgcolor-accent);

            &:hover {
                background-color: var(--color-bgcolor-accent-secondary);
            }
            &:active {
                background-color: var(--color-bgcolor-accent-tertiary);
            }
            &:focus-visible {
                outline: var(--border-width-xl) solid var(--color-border-focus);
            }
            &:disabled {
                background-color: var(--color-bgcolor-accent);
                opacity: 0.4;
            }
        }

        &.secondary {
            color: var(--color-fgcolor-neutral-secondary);
            background-color: var(--color-bgcolor-neutral-primary);
            border: var(--border-width-s) solid var(--color-border-neutral);

            &:hover {
                background-color: var(--color-bgcolor-neutral-secondary);
            }
            &:active {
                background-color: var(--color-bgcolor-neutral-tertiary);
            }
            &:focus-visible {
                outline: var(--border-width-xl) solid var(--color-border-focus);
            }
            &:disabled {
                background-color: var(--color-bgcolor-neutral-primary);
                opacity: 0.4;
            }
        }

        &.text {
            color: var(--color-fgcolor-neutral-secondary);
            background-color: var(--color-bgcolor-neutral-primary);

            &:hover {
                background-color: var(--color-bgcolor-neutral-secondary);
            }
            &:active {
                background-color: var(--color-bgcolor-neutral-tertiary);
            }
            &:focus-visible {
                outline: var(--border-width-xl) solid var(--color-border-focus);
            }
            &:disabled {
                background-color: var(--color-bgcolor-neutral-primary);
                opacity: 0.4;
            }
        }

        &.compact {
            --p-button-padding-inline: var(--space-0);
            color: var(--color-fgcolor-neutral-secondary);
            background-color: var(--color-bgcolor-neutral-primary);

            &:hover,
            &:active {
                color: var(--color-fgcolor-neutral-primary);
            }
            &:focus-visible {
                outline: var(--border-width-xl) solid var(--color-border-focus);
            }
            &:disabled {
                opacity: 0.4;
            }
        }
    }
</style>
