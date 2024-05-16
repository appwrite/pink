<script>
    import { createEventDispatcher } from "svelte";

    /**
     * The type of button.
     * @type {'primary' | 'secondary' | 'text'}
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

    const dispatch = createEventDispatcher();
</script>

<button
    {type}
    {disabled}
    aria-label={ariaLabel || undefined}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:text={variant === 'text'}
    on:click
>
    <span>
        <slot name="start" />
    </span>
    {#if content}
        <span class="text">{content}</span>
    {/if}
    {#if badge}
        <span class="badge">{badge}</span>
    {/if}
    <span>
        <slot name="end" />
    </span>
</button>

<style lang="scss">
    @use '../scss/mixins/transitions';

    button {
        @include transitions.common;

        --p-button-background-color: var(--button-background-color);
        --p-button-border: var(--button-border, none);
        --p-button-border-radius: var(--button-border-radius, var(--border-radius-s));
        --p-button-box-shadow: var(--button-box-shadow, none);
        --p-button-color: var(--button-color, var(--color-fg-on-accent));
        --p-button-font-family: var(--button-font-family, var(--font-family-sans));
        --p-button-font-size: var(--button-font-size, var(--font-size-s));
        --p-button-gap: var(--button-gap, var(--space-2));
        --p-button-padding-block: var(--button-padding-block, var(--space-2));
        --p-button-padding-inline: var(--button-padding-inline, var(--space-3));

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

        &.primary {
            background-color: var(--color-bg-accent);

            &:hover {
                background-color: var(--color-bg-accent-secondary);
            }
            &:active {
                background-color: var(--color-bg-accent-tertiary);
            }
            &:focus-visible {
                outline: var(--border-width-xl) solid var(--color-border-focus);
            }
            &:disabled {
                background-color: var(--color-bg-accent);
                opacity: 0.4;
            }

            .badge {
                background-color: var(--color-bg-accent-tertiary);
            }
        }

        &.secondary {
            color: var(--color-fg-neutral-secondary);
            background-color: var(--color-bg-neutral-primary);
            border: var(--border-width-s) solid var(--color-border-neutral-weak);

            &:hover {
                background-color: var(--color-bg-neutral-secondary);
            }
            &:active {
                background-color: var(--color-bg-neutral-tertiary);
            }
            &:focus {
                outline: var(--border-width-xl) solid var(--color-border-focus);
            }
            &:disabled {
                background-color: var(--color-bg-neutral-primary);
                opacity: 0.4;
            }

            .badge {
                background-color: var(--color-bg-neutral-tertiary);
            }
        }

        &.text {
            color: var(--color-fg-neutral-secondary);
            background-color: var(--color-bg-neutral-primary);

            &:hover {
                background-color: var(--color-bg-neutral-secondary);
            }
            &:active {
                background-color: var(--color-bg-neutral-tertiary);
            }
            &:focus {
                outline: var(--border-width-xl) solid var(--color-border-focus);
            }
            &:disabled {
                background-color: var(--color-bg-neutral-primary);
                opacity: 0.4;
            }

            .badge {
                background-color: var(--color-bg-neutral-tertiary);
            }
        }

        .badge {
            display: flex;
            padding: 0px 6px;
            justify-content: center;
            align-items: center;
            border-radius: var(--border-radius-xxs);
        }
    }
</style>
