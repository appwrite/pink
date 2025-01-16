<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    type $$Props = HTMLAnchorAttributes & {
        href: string;
    } & Partial<{
            disabled: boolean;
            active: boolean;
            variant: 'primary' | 'secondary';
        }>;

    export let href: $$Props['href'];
    export let disabled: $$Props['disabled'] = false;
    export let active: $$Props['active'] = false;
    export let variant: $$Props['variant'] = 'primary';
</script>

<a
    role="tab"
    {href}
    on:keydown
    {...$$restProps}
    class:active
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
>
    <slot />
</a>

<style lang="scss">
    @use 'tabs';
    a {
        @include tabs.base;
        @include tabs.variant;
    }
</style>
