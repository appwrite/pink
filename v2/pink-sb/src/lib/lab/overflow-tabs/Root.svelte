<script lang="ts">
    import Link from './Link.svelte';
    import Button from './Button.svelte';
    import type { Variant } from './types.js';

    export let variant: Variant = 'primary';
    export let stretch: boolean = false;

    export let maxHeight = 33;
    $: clientHeight = 0;

    let tablist: HTMLDivElement;
    let overflowItems: Array<typeof Link | typeof Button> = [];

    const autocollapse = () => {
        if (clientHeight >= maxHeight) return;

        while (clientHeight > maxHeight) {
            const lastItem = tablist.lastElementChild;
            overflowItems.unshift(lastItem as unknown as typeof Link | typeof Button);
            tablist.removeChild(lastItem!);
            clientHeight -= lastItem!.clientHeight;
        }

        if (tablist) {
            clientHeight = tablist.clientHeight;
        }
    };

    $: console.log(clientHeight, maxHeight);
</script>

<svelte:window on:resize={autocollapse} />

<div
    bind:this={tablist}
    bind:clientHeight
    role="tablist"
    class:tabs-primary={variant === 'primary'}
    class:tabs-secondary={variant === 'secondary'}
    class:tabs-stretch={stretch}
>
    <slot root={{ variant, stretch }} />

    {#if overflowItems.length}
        <div class="dropdown">
            MORE ITEMS
            {#each overflowItems as item}
                {item}
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    div {
        // display: flex;
        // align-items: flex-start;
        // border-radius: var(--border-radius-s);

        // &::-webkit-scrollbar {
        //     display: none;
        // }

        // &.tabs {
        //     &-primary {
        //         background: var(--color-bgcolor-neutral-secondary);
        //     }
        //     &-secondary {
        //         background: transparent;
        //     }
        //     &-stretch {
        //         width: 100%;
        //         justify-content: space-between;
        //     }
        // }
    }
</style>
