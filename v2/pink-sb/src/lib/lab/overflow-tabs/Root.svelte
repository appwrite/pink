<script lang="ts">
    import { Input } from '$lib/index.js';
    import type { RootContext } from './types.js';
    import { onDestroy, onMount, tick } from 'svelte';
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
        if (!tabsList || tabNodes.length === 0 || tabWidths.length !== tabNodes.length) return;

        await tick();

        // First, make all tabs visible to measure their true widths
        tabNodes.forEach((node) => {
            node.dataset.hidden = 'false';
        });

        const navWidth = tabsList.offsetWidth;
        const DROPDOWN_WIDTH = showOverflowIndicator ? 120 : 0;

        // Initial calculation without dropdown to see if we need overflow
        let runningWidth = 0;
        for (let i = 0; i < tabWidths.length; i++) {
            runningWidth += tabWidths[i];
        }

        // Determine if we have overflow
        hasOverflow = runningWidth > navWidth;

        // Calculate available width based on whether we need the dropdown
        const availableWidth = navWidth - (hasOverflow ? DROPDOWN_WIDTH : 0);

        // Reset running width for actual calculation
        runningWidth = 0;
        visibleBreakIndex = tabNodes.length;

        // Calculate which tabs should be visible
        for (let i = 0; i < tabWidths.length; i++) {
            runningWidth += tabWidths[i];
            if (runningWidth > availableWidth) {
                visibleBreakIndex = i;
                break;
            }
        }

        if (hasOverflow) {
            // Get the overflowed items
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
                    node.dataset.hidden = 'true';
                } else {
                    node.dataset.hidden = 'false';
                }
            });
        } else {
            tabNodes.forEach((node) => {
                node.dataset.hidden = 'false';
            });
            overflowedItems.set([]);
        }
    };

    let resizeObserver: ResizeObserver;

    onMount(async () => {
        calculateOverflow();

        resizeObserver = new ResizeObserver((entries) => {
            if (!entries.length) {
                return;
            }
            calculateOverflow();
        });

        if (tabsList) {
            resizeObserver.observe(tabsList);
        }
    });

    onDestroy(() => {
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
    });

    $: if (tabWidths.length > 0 && tabNodes.length > 0) {
        calculateOverflow();
    }
</script>

<svelte:window on:resize={calculateOverflow} />

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

    {#if hasOverflow}
        <div style:width="120px">
            <Input.Select
                placeholder="More"
                options={$overflowedItems.map((item) => {
                    return {
                        label: item.text,
                        value: item.text.toLocaleLowerCase()
                    };
                })}
            />
        </div>
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
