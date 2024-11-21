<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { ButtonProps } from './index.js';

    type $$Props = HTMLAnchorAttributes & Partial<ButtonProps & { disabled: boolean }>;
    /**
     * The size of button.
     */
    export let size: $$Props['size'] = 'm';
    /**
     * The variant of button.
     */
    export let variant: $$Props['variant'] = 'primary';
    /**
     * The badge to display on the button.
     */
    export let badge: $$Props['badge'] = '';
    /**
     * Whether the button is disabled.
     */
    export let disabled: $$Props['disabled'] = false;
    /**
     * Whether the button is an icon button.
     */
    export let icon: $$Props['icon'] = false;

    function getBadgeVariant(variant: $$Props['variant']): 'accent' | 'secondary' {
        return variant === 'primary' ? 'accent' : 'secondary';
    }
</script>

<a
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    class:icon
    class:s={size === 's'}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:text={variant === 'text'}
    class:compact={variant === 'compact'}
    class:ghost={variant === 'ghost'}
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
        <Badge content={badge} variant={getBadgeVariant(variant)} size="s" />
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
