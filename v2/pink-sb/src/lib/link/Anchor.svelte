<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { LinkProps } from './index.js';

    type $$Props = HTMLAnchorAttributes & Partial<LinkProps & { disabled: boolean }>;

    export let href: $$Props['href'] = undefined;
    export let variant: $$Props['variant'] = 'default';
    export let size: $$Props['size'] = 'm';
    export let disabled: $$Props['disabled'] = false;
</script>

<a
    {href}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : 1}
    class:disabled
    class:s={size === 's'}
    class:large={size === 'large'}
    class:default={variant === 'default'}
    class:muted={variant === 'muted'}
    class:quiet={variant === 'quiet'}
    class:quiet-muted={variant === 'quiet-muted'}
    {...$$restProps}
>
    {#if $$slots.start}
        <span>
            <slot name="start" />
        </span>
    {/if}
    <slot />
    {#if $$slots.end}
        <span>
            <slot name="end" />
        </span>
    {/if}
</a>

<style lang="scss">
    @use './link';

    a {
        @include link.base;
    }
</style>
