<script>
    /**
     * @type {'default'|'muted'|'quiet'|'quiet-muted'}
     */
    export let type = 'default';
    /**
     * @type {'small'|'medium'|'large'}
     */
    export let size = 'medium';
    /**
     * @type {string}
     */
    export let href;
    /**
     * @type {string|undefined}
     */
    export let target = undefined;
    /**
     * @type {string|undefined}
     */
    export let rel = undefined;
    /**
     * @type {string|undefined}
     */
    export let download = undefined;
    /**
     * @type {boolean}
     */
    export let disabled = false;
</script>

<a
    {href}
    {download}
    {target}
    {rel}
    aria-disabled={disabled}
    class:disabled
    class:small={size === 'small'}
    class:large={size === 'large'}
    class:default={type === 'default'}
    class:muted={type === 'muted'}
    class:quiet={type === 'quiet'}
    class:quiet-muted={type === 'quiet-muted'}
>
    <slot />
</a>

<style lang="scss">
    @use '../scss/mixins/transitions';

    a {
        @include transitions.common;

        font-size: var(--font-size-s);
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
        letter-spacing: -0.063px;
        text-decoration: underline;
        text-underline-offset: var(--space-1);
        outline-offset: var(--border-width-l);
        border-radius: var(--border-radius-xs);

        &.disabled {
            opacity: 0.4;
        }

        &.default {
            color: var(--neutral-900);
            text-decoration-color: color-mix(in srgb, var(--neutral-900), transparent 60%);

            &:hover,
            &:active {
                color: var(--neutral-900);
                text-decoration-color: var(--neutral-900);
            }
            &.disabled {
                pointer-events: none;
                color: var(--color-fgcolor-accent-neutral);
                text-decoration-color: var(--color-fgcolor-accent-neutral);
            }
            &:focus-visible {
                outline: var(--border-width-l) solid var(--color-border-focus);
            }
        }

        &.muted {
            color: var(--color-fgcolor-neutral-secondary);
            text-decoration-color: color-mix(in srgb, var(--neutral-900), transparent 60%);

            &:hover,
            &:active {
                color: var(--neutral-900);
                text-decoration-color: var(--neutral-900);
            }
            &.disabled {
                pointer-events: none;
                color: var(--color-fgcolor-accent-neutral);
                text-decoration-color: var(--color-fgcolor-accent-neutral);
            }
            &:focus-visible {
                outline: var(--border-width-l) solid var(--color-border-focus);
            }
        }
        &.quiet {
            color: var(--color-fgcolor-neutral-secondary);
            text-decoration: none;

            &:hover,
            &:active {
                color: var(--neutral-900);
                text-decoration: underline;
                text-decoration-color: var(--neutral-900);
            }
            &.disabled {
                pointer-events: none;
                color: var(--color-fgcolor-accent-neutral);
            }
            &:focus-visible {
                outline: var(--border-width-l) solid var(--color-border-focus);
            }
        }
        &.quiet-muted {
            color: var(--color-fgcolor-neutral-secondary);
            text-decoration: none;

            &:hover,
            &:active {
                text-decoration: underline;
                text-decoration-color: color-mix(in srgb, var(--neutral-900), transparent 60%);
            }
            &.disabled {
                pointer-events: none;
                color: var(--color-fgcolor-accent-neutral);
            }
            &:focus-visible {
                outline: var(--border-width-l) solid var(--color-border-focus);
            }
        }

        &.small {
            font-size: var(--font-size-xs);
        }
        &.large {
            font-size: var(--font-size-m);
        }
    }
</style>
