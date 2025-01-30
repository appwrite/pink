<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';

    type $$Props = HTMLButtonAttributes &
        Partial<{
            active: boolean;
        }>;

    export let active: $$Props['active'] = false;
    export let disabled: $$Props['disabled'] = false;
</script>

<button
    role="tab"
    tabindex={active ? 0 : -1}
    type="button"
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    on:keydown
    {...$$restProps}
    {disabled}
    class:active
>
    <slot />
</button>

<style lang="scss">
    @use 'tabs';
    :global(.tabs-primary) {
        @include tabs.variant-primary;
    }
    :global(.tabs-secondary) {
        @include tabs.variant-secondary;
    }
    button {
        @include tabs.base;
    }
</style>
