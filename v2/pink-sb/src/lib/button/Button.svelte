<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { ButtonProps } from './index.js';

    type $$Props = HTMLButtonAttributes & Partial<ButtonProps>;
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
     * Whether the button is an icon button.
     */
    export let icon: $$Props['icon'] = false;

    function getBadgeVariant(variant: $$Props['variant']): 'accent' | 'secondary' {
        return variant === 'primary' ? 'accent' : 'secondary';
    }
</script>

<button
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    class:icon
    class:xs={size === 'xs'}
    class:s={size === 's'}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:text={variant === 'text'}
    class:compact={variant === 'compact'}
    class:ghost={variant === 'ghost'}
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
</button>

<style lang="scss">
    @use './button';

    button {
        @include button.base;
    }
</style>
