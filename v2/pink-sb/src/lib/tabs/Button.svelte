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
    button {
        @include tabs.base;
    }
</style>
