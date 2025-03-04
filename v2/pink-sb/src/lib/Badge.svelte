<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = HTMLAttributes<HTMLSpanElement> & {
        content: string;
    } & Partial<{
            size: 'xs' | 's' | 'm';
            variant: 'primary' | 'secondary' | 'accent';
            type: 'success' | 'warning' | 'error' | undefined;
        }>;

    /**
     * The size of the button.
     */
    export let size: $$Props['size'] = 'm';
    /**
     * The variant of badge.
     */
    export let variant: $$Props['variant'] = 'primary';
    /**
     * The type of badge.
     */
    export let type: $$Props['type'] = undefined;
    /**
     * The content of the badge.
     */
    export let content: $$Props['content'];
</script>

<span
    class="badge"
    class:xs={size === 'xs'}
    class:s={size === 's'}
    class:accent={variant === 'accent'}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:success-primary={variant === 'primary' && type === 'success'}
    class:success-secondary={variant === 'secondary' && type === 'success'}
    class:warning-primary={variant === 'primary' && type === 'warning'}
    class:warning-secondary={variant === 'secondary' && type === 'warning'}
    class:error-primary={variant === 'primary' && type === 'error'}
    class:error-secondary={variant === 'secondary' && type === 'error'}
    {...$$restProps}
>
    {#if $$slots.start}
        <span class="start">
            <slot name="start" />
        </span>
    {/if}
    {content}
    {#if $$slots.end}
        <span class="end">
            <slot name="end" />
        </span>
    {/if}
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
        font-weight: 400;
        line-height: 140%;
        min-width: calc(var(--p-badge-font-size) * 1.4 + (var(--p-badge-padding-block) * 2));
        gap: var(--space-2);

        .start,
        .end {
            display: inline-flex;
            align-items: center;
            &:empty {
                display: none;
            }
        }
        .start {
            margin-left: -2px;
        }
        .end {
            margin-right: -2px;
        }

        &.xs {
            --p-badge-font-size: var(--font-size-xs);
            --p-badge-padding-block: var(--space-1);
            --p-badge-padding-inline: var(--space-2);
        }

        &.s {
            --p-badge-padding-block: var(--space-0);
            --p-badge-padding-inline: var(--space-2);
        }

        &.accent {
            --p-badge-color: var(--fgcolor-on-accent);
            --p-badge-background-color: var(--overlay-on-accent);
        }
        &.primary {
            --p-badge-color: var(--fgcolor-on-invert);
            --p-badge-background-color: var(--bgcolor-neutral-invert);
        }
        &.secondary {
            --p-badge-color: var(--fgcolor-neutral-secondary);
            --p-badge-background-color: var(--overlay-on-neutral);
        }
        &.success-primary {
            --p-badge-color: var(--fgcolor-on-success);
            --p-badge-background-color: var(--bgcolor-success-strong);
        }
        &.success-secondary {
            --p-badge-color: var(--fgcolor-on-success-weak);
            --p-badge-background-color: var(--bgcolor-success-weak);
        }
        &.warning-primary {
            --p-badge-color: var(--fgcolor-on-warning);
            --p-badge-background-color: var(--bgcolor-warning);
        }
        &.warning-secondary {
            --p-badge-color: var(--fgcolor-on-warning-weak);
            --p-badge-background-color: var(--bgcolor-warning-weak);
        }
        &.error-primary {
            --p-badge-color: var(--fgcolor-on-error);
            --p-badge-background-color: var(--bgcolor-error-strong);
        }
        &.error-secondary {
            --p-badge-color: var(--fgcolor-on-error-weak);
            --p-badge-background-color: var(--bgcolor-error-weak);
        }
    }
</style>
