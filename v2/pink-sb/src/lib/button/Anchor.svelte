<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import type { HTMLLinkAttributes } from 'svelte/elements';
    import type { ButtonProps } from './index.ts';

    type $$Props = HTMLLinkAttributes & Partial<ButtonProps & { disabled: boolean }>;
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
    export let disabled: $$Props['disabled'] = false;

    function getBadgeVariant(variant: $$Props['variant']): 'accent' | 'secondary' {
        return variant === 'primary' ? 'accent' : 'secondary';
    }
</script>

<a
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    class:small={size === 'small'}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:text={variant === 'text'}
    class:compact={variant === 'compact'}
    href={$$restProps.href}
    {...$$restProps}
>
    {#if $$slots.start}
        <slot name="start" />
    {/if}
    {#if $$slots.default}
        <slot />
    {/if}
    {#if badge}
        <Badge content={badge} variant={getBadgeVariant(variant)} size="small" />
    {/if}
    {#if $$slots.end}
        <slot name="end" />
    {/if}
</a>

<style lang="scss">
    @use './button';

    a {
        @include button.base;
    }
</style>
