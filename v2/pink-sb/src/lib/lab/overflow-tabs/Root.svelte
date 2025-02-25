<script lang="ts">
    import { Input } from '$lib/index.ts';
    import type { RootContext } from './types.js';
    import { onMount, tick } from 'svelte';
    import { writable } from 'svelte/store';

    export let variant: RootContext['variant'] = 'primary';
    export let stretch: RootContext['stretch'] = false;
    export let showOverflowIndicator = true;

    let tabsList: HTMLElement;
    let tabWidths: number[] = [];

    const tabNodesStore = writable<HTMLElement[]>([]);
    let tabNodes: HTMLElement[] = [];

    tabNodesStore.subscribe((value) => {
        tabNodes = value;
    });

    const overflowedItems = writable<{ text: string; disabled: boolean; active: boolean }[]>([]);
    let visibleBreakIndex = tabNodes.length;
    let hasOverflow = false;

    const registerTabNode = (node: HTMLElement) => {
        tabNodesStore.update((nodes) => [...nodes, node]);
        return {
            destroy: () => {
                tabNodesStore.update((nodes) => nodes.filter((n) => n !== node));
            }
        };
    };

    const updateTabWidths = (tabWidth: number) => {
        tabWidths = [...tabWidths, tabWidth];
    };

    const calculateOverflow = async () => {
        if (!tabsList || tabNodes.length === 0) return;

        await tick(); // Wait for DOM updates

        const navWidth = tabsList.getBoundingClientRect().width;
        const DROPDOWN_WIDTH = showOverflowIndicator ? 120 : 0;
        const availableWidth = navWidth - DROPDOWN_WIDTH;

        let runningWidth = 0;
        visibleBreakIndex = tabNodes.length;

        for (let i = 0; i < tabWidths.length; i++) {
            runningWidth += tabWidths[i];
            if (runningWidth > availableWidth) {
                visibleBreakIndex = i;
                break;
            }
        }

        hasOverflow = runningWidth > availableWidth;

        if (hasOverflow) {
            const overflowed = tabNodes.slice(visibleBreakIndex).map((node) => {
                return {
                    text: node.innerText,
                    disabled: node.hasAttribute('disabled'),
                    active: node.classList.contains('active')
                };
            });

            overflowedItems.set(overflowed);

            tabNodes.forEach((node, index) => {
                if (index >= visibleBreakIndex) {
                    node.style.display = 'none';
                } else {
                    node.style.display = '';
                }
            });
        } else {
            tabNodes.forEach((node) => {
                node.style.display = '';
            });
            overflowedItems.set([]);
        }
    };

    const handleResize = () => {
        calculateOverflow();
    };

    onMount(() => {
        calculateOverflow();
    });

    $: if (tabWidths.length > 0 && tabNodes.length > 0) {
        calculateOverflow();
    }
</script>

<svelte:window on:resize={handleResize} />

<div
    role="tablist"
    bind:this={tabsList}
    class:tabs-primary={variant === 'primary'}
    class:tabs-secondary={variant === 'secondary'}
    class:tabs-stretch={stretch}
>
    <slot
        root={{
            variant,
            stretch,
            updateTabWidths: updateTabWidths,
            registerTabNode,
            hasOverflow,
            overflowedItems: $overflowedItems
        }}
    />

    {#if hasOverflow && showOverflowIndicator}
        <Input.Select
            options={$overflowedItems.map((item) => {
                return {
                    label: item.text,
                    value: item.text.toLocaleLowerCase()
                };
            })}
        />
    {/if}
</div>

<style lang="scss">
    div[role='tablist'] {
        display: inline-flex;
        align-items: flex-start;
        border-radius: var(--border-radius-s);
        flex-wrap: nowrap;
        width: 100%;
        max-width: fit-content;
        overflow-x: auto;

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
                max-width: none;
            }
        }
    }
</style>
