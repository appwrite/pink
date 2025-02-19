<script lang="ts">
    import Link from './Link.svelte';
    import Button from './Button.svelte';
    import type { Variant } from './types.js';
    import type { SvelteComponent } from 'svelte';

    type ComponentType = new (...args: any[]) => SvelteComponent;

    export let variant: Variant = 'primary';
    export let stretch: boolean = false;

    export let maxHeight = 33;
    $: clientHeight = 0;
    $: overflowItems = [] as Array<ComponentType>;

    let tablist: HTMLDivElement;

    const autocollapse = () => {
        if (clientHeight >= maxHeight) {
            console.log('all good');
        }

        while (clientHeight > maxHeight) {
            const lastItem = tablist.lastChild as HTMLDivElement;

            overflowItems.push(lastItem as unknown as ComponentType);

            clientHeight -= lastItem!.clientHeight;
        }

        if (tablist) {
            clientHeight = tablist.clientHeight;
        }
    };
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
        {#each overflowItems as Item}
            <svelte:component this={Item} />
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
