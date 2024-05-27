<script>
    import Badge from './Badge.svelte';

    /**
     * The size of the button.
     * @type {'small' | 'medium'}
     */
    export let size = 'medium';
    /**
     * The variant of button.
     * @type {'primary' | 'secondary' | 'text' | 'compact'}
     */
    export let variant = 'primary';
    /**
     * Whether the button is disabled.
     * @type {boolean}
     */
    export let disabled = false;
    /**
     * The content of the button.
     * @type {string}
     */
    export let content = '';
    /**
     * The aria-label attribute of the button.
     * @type {string}
     */
    export let ariaLabel = '';
    /**
     * The type of button.
     * @type {'button' | 'submit' | 'reset'}
     */
    export let type = 'button';
    /**
     * The badge to display on the button.
     * @type {string}
     */
    export let badge = '';

    /** @type {'accent'|'secondary'} */
    $: badgeVariant = variant === 'primary' ? 'accent' : 'secondary';
</script>

<button
    {type}
    {disabled}
    aria-label={ariaLabel || undefined}
    class:small={size === 'small'}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:text={variant === 'text'}
    class:compact={variant === 'compact'}
    on:click
>
    {#if $$slots.start}
        <span>
            <slot name="start" />
        </span>
    {/if}
    {#if content}
        <span class="text">{content}</span>
    {/if}
    {#if badge}
        <Badge content={badge} variant={badgeVariant} size="small" />
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

        &.text,
        &.compact {
            color: var(--color-fgcolor-neutral-secondary);
            background-color: var(--color-bgcolor-neutral-primary);

            &.compact {
                --p-button-padding-inline: var(--space-0);
            }

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
    }
</style>
