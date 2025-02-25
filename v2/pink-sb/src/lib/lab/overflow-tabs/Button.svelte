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

    let buttonNode: HTMLButtonElement;

    onMount(() => {
        if (buttonNode) {
            root.updateTabWidths(buttonNode.getBoundingClientRect().width);
            return root.registerTabNode(buttonNode);
        }
    });
</script>

<button
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
    {disabled}
    bind:this={buttonNode}
    {...$$restProps}
>
    <slot />
</button>

<style lang="scss">
    @use 'tabs';

    button {
        @include tabs.base;
    }
</style>
