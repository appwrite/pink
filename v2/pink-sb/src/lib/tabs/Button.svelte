<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    type $$Props = HTMLButtonAttributes &
        Partial<{
            active: boolean;
            variant: 'primary' | 'secondary';
        }>;

    export let active: $$Props['active'] = false;
    export let disabled: $$Props['disabled'] = false;
    export let variant: $$Props['variant'] = 'primary';
</script>

<button
    role="tab"
    tabindex={active ? 0 : -1}
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    on:keydown
    {...$$restProps}
    {disabled}
    class:active
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
>
    <slot />
</button>

<style lang="scss">
    @use 'tabs';

    button {
        @include tabs.base;
        @include tabs.variant;
    }
</style>
