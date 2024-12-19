<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { LinkProps } from './index.js';

    type $$Props = HTMLButtonAttributes & Partial<LinkProps>;

    export let type: $$Props['type'] = 'button';
    export let variant: $$Props['variant'] = 'default';
    export let size: $$Props['size'] = 'm';
    export let disabled: $$Props['disabled'] = false;
</script>

{#key type}
    <button
        {...{ type }}
        {disabled}
        on:click
        on:dblclick
        on:mousedown
        on:mouseup
        class:s={size === 's'}
        class:l={size === 'l'}
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
    </button>
{/key}

<style lang="scss">
    @use './link';

    button {
        @include link.base;
    }
</style>
