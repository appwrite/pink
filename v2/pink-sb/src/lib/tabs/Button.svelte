<script lang="ts">
    import './_tabs.scss';
    import type { HTMLButtonAttributes } from 'svelte/elements';

    type $$Props = HTMLButtonAttributes &
        Partial<{
            active: boolean;
        }>;

    export let active: $$Props['active'] = false;
    export let disabled: $$Props['disabled'] = false;
</script>

<button on:click on:dblclick on:mousedown on:mouseup {...$$restProps} {disabled} class:active>
    <slot />
</button>

<style lang="scss">
    @use 'tabs';
    button {
        @include tabs.base;
    }
</style>
