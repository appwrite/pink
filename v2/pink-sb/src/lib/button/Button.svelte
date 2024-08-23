<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { ButtonProps } from './index.js';

    type $$Props = HTMLButtonAttributes & Partial<ButtonProps>;
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
</button>

<style lang="scss">
    @use './button';

    button {
        @include button.base;
    }
</style>
