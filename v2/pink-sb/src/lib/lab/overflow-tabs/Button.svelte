<script lang="ts">
    import { onMount } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { RootContext } from './types.js';

    type $$Props = HTMLButtonAttributes & {
        root: RootContext;
    } & Partial<{
            active: boolean;
        }>;

    export let root: $$Props['root'];
    export let active: $$Props['active'] = false;
    export let disabled: $$Props['disabled'] = false;

    let width = 0;
    let buttonNode: HTMLButtonElement;

    onMount(() => {
        if (buttonNode) {
            root.updateTabWidth(width, buttonNode, buttonNode.innerText);
        }
    });
</script>

<button
    bind:this={buttonNode}
    bind:clientWidth={width}
    role="tab"
    type="button"
    class:tab-primary={root.variant === 'primary'}
    class:tab-secondary={root.variant === 'secondary'}
    class:tab-stretch={root.stretch}
    class:active
    on:click
    on:dblclick
    on:mousedown
    on:mouseup
    on:keydown
    {...$$restProps}
    {disabled}
>
    <slot />
</button>

<style lang="scss">
    @use 'tabs';

    button {
        @include tabs.base;
    }
</style>
