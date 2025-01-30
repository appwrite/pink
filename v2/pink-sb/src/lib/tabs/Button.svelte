<script lang="ts">
    import { getContext } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { Variant } from './types.js';

    type $$Props = HTMLButtonAttributes &
        Partial<{
            active: boolean;
        }>;

    export let active: $$Props['active'] = false;
    export let disabled: $$Props['disabled'] = false;

    const variant: Variant = getContext('tabs-variant');
    const stretch: boolean = getContext('tabs-stretch');
</script>

<button
    role="tab"
    tabindex={active ? 0 : -1}
    type="button"
    class:tab-primary={variant === 'primary'}
    class:tab-secondary={variant === 'secondary'}
    class:tab-stretch={stretch}
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
