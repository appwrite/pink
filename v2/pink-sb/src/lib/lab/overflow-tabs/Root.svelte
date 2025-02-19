<script lang="ts">
    import Link from './Link.svelte';
    import Button from './Button.svelte';
    import type { Variant } from './types.js';

    export let variant: Variant = 'primary';
    export let stretch: boolean = false;

    export let maxHeight = 33;
    $: clientHeight = 0;
    $: overflowItems = [] as Array<string>;

    let tablist: HTMLDivElement;

    const autocollapse = () => {
        if (clientHeight >= maxHeight) {
            console.log('all good');
        }

        while (clientHeight > maxHeight) {
            console.log('BIGGER');
            const lastItem = tablist.lastElementChild;

            overflowItems.push('lastItem');

            clientHeight -= lastItem!.clientHeight;
        }

        if (tablist) {
            clientHeight = tablist.clientHeight;
        }
    };

    $: console.log(clientHeight, maxHeight, overflowItems);
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
</div>
{#if overflowItems.length}
    <div>
        MORE ITEMS
        {#each overflowItems as item}
            {item}
        {/each}
    </div>
{/if}

<style lang="scss">
    div {
        border-radius: var(--border-radius-s);

        &::-webkit-scrollbar {
            display: none;
        }

        &.tabs {
            &-primary {
                background: var(--color-bgcolor-neutral-secondary);
            }
            &-secondary {
                background: transparent;
            }
            &-stretch {
                width: 100%;
                justify-content: space-between;
            }
        }
    }
</style>
