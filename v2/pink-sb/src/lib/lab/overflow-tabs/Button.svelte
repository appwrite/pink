<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { Variant } from './types.js';

    type $$Props = HTMLButtonAttributes & {
        root: { variant: Variant; stretch: boolean };
    } & Partial<{
            active: boolean;
        }>;

    export let root: $$Props['root'];
    export let active: $$Props['active'] = false;
    export let disabled: $$Props['disabled'] = false;
</script>

<button
    role="tab"
    type="button"
    class:tab-primary={root.variant === 'primary'}
    class:tab-secondary={root.variant === 'secondary'}
    class:tab-stretch={root.stretch}
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
