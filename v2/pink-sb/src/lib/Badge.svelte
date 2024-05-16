<script>
    /**
     * The size of the button.
     * @type {'small' | 'medium'}
     */
    export let size = 'medium';
    /**
     * The variant of badge.
     * @type {'primary'|'secondary'|'accent'}
     */
    export let variant = 'primary';
    /**
     * The type of badge.
     * @type {'success'|'warning'|'error'|undefined}
     */
    export let type = undefined;
    /**
     * The content of the badge.
     * @type {string}
     */
    export let content = '';
    /**
     * The aria-label attribute of the badge.
     * @type {string}
     */
    export let ariaLabel = '';
</script>

<span
    class="badge"
    class:small={size === 'small'}
    class:accent={variant === 'accent'}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:success-primary={variant === 'primary' && type === 'success'}
    class:success-secondary={variant === 'secondary' && type === 'success'}
    class:warning-primary={variant === 'primary' && type === 'warning'}
    class:warning-secondary={variant === 'secondary' && type === 'warning'}
    class:error-primary={variant === 'primary' && type === 'error'}
    class:error-secondary={variant === 'secondary' && type === 'error'}
    aria-label={ariaLabel}
>
    {content}
</span>

<style lang="scss">
    @use '../scss/mixins/transitions';

    .badge {
        @include transitions.common;

        --p-badge-font-family: var(--badge-font-family, var(--font-family-sansserif));
        --p-badge-font-size: var(--badge-font-size, var(--font-size-s));
        --p-badge-padding-block: var(--badge-padding-block, var(--space-1));
        --p-badge-padding-inline: var(--badge-padding-inline, var(--space-3));

        display: inline-flex;
        padding-block: var(--p-badge-padding-block);
        padding-inline: var(--p-badge-padding-inline);
        justify-content: center;
        align-items: center;
        border-radius: var(--border-radius-xs);

        color: var(--p-badge-color);
        background-color: var(--p-badge-background-color);

        font-family: var(--p-badge-font-family);
        font-size: var(--p-badge-font-size);
        font-style: normal;
        font-weight: 500;
        line-height: 140%;

        &.small {
            --p-badge-padding-block: var(--space-0);
            --p-badge-padding-inline: var(--space-2);
        }

        &.accent {
            --p-badge-color: var(--color-fgcolor-on-accent);
            --p-badge-background-color: var(--color-overlay-on-accent);
        }
        &.primary {
            --p-badge-color: var(--color-fgcolor-on-invert);
            --p-badge-background-color: var(--color-bgcolor-neutral-invert);
        }
        &.secondary {
            --p-badge-color: var(--color-fgcolor-neutral-secondary);
            --p-badge-background-color: var(--color-overlay-on-neutral);
        }
        &.success-primary {
            --p-badge-color: var(--color-fgcolor-on-success);
            --p-badge-background-color: var(--color-bgcolor-success-strong);
        }
        &.success-secondary {
            --p-badge-color: var(--color-fgcolor-on-success-weak);
            --p-badge-background-color: var(--color-bgcolor-success-weak);
        }
        &.warning-primary {
            --p-badge-color: var(--color-fgcolor-on-warning);
            --p-badge-background-color: var(--color-bgcolor-warning);
        }
        &.warning-secondary {
            --p-badge-color: var(--color-fgcolor-on-warning-weak);
            --p-badge-background-color: var(--color-bgcolor-warning-weak);
        }
        &.error-primary {
            --p-badge-color: var(--color-fgcolor-on-error);
            --p-badge-background-color: var(--color-bgcolor-error-strong);
        }
        &.error-secondary {
            --p-badge-color: var(--color-fgcolor-on-error-weak);
            --p-badge-background-color: var(--color-bgcolor-error-weak);
        }
    }
</style>
