<script lang="ts">
    import { Input } from '$lib/index.ts';
    import type { RootContext } from './types.js';
    import { onMount, SvelteComponent } from 'svelte';

    export let variant: RootContext['variant'] = 'primary';
    export let stretch: RootContext['stretch'] = false;

    let navWidth: number;
    let tabWidths: number[] = [];
    let tabNodes: HTMLElement[] = [];

    let tabs: string[] = [];

    const updateTabWidth = (width: number, node: HTMLElement, text: string) => {
        tabWidths = [...tabWidths, width];
        tabNodes = [...tabNodes, node];
    };

    $: tabWidthTotal = tabWidths.reduce((acc, cur) => acc + cur, 0);

    let displayedTabs: HTMLElement[] = [];
    let dropdownTabs: HTMLElement[] = [];

    const handleResize = () => {
        if (!navWidth) return;

        const DROPDOWN_WIDTH = 80;
        const availableWidth = navWidth - (tabWidthTotal > navWidth ? DROPDOWN_WIDTH : 0);

        let runningWidth = 0;
        let breakIndex = tabNodes.length;

        for (let i = 0; i < tabWidths.length; i++) {
            runningWidth += tabWidths[i];
            if (runningWidth > availableWidth) {
                breakIndex = i;
                break;
            }
        }

        if (runningWidth > availableWidth) {
            displayedTabs = tabNodes.slice(0, breakIndex);
            dropdownTabs = tabNodes.slice(breakIndex);
        } else {
            displayedTabs = tabNodes;
            dropdownTabs = [];
        }
    };

    $: if (navWidth) {
        handleResize();
    }

    onMount(() => {
        handleResize();
    });

    $: console.log({ displayedTabs }, { dropdownTabs }, { tabs });
</script>

<svelte:window on:resize={handleResize} />

<div
    role="tablist"
    bind:clientWidth={navWidth}
    class:tabs-primary={variant === 'primary'}
    class:tabs-secondary={variant === 'secondary'}
    class:tabs-stretch={stretch}
>
    {#each displayedTabs as tab}
        <svelte:element
            this={tab.nodeName.toLowerCase()}
            {...Object.fromEntries(
                Array.from(tab.attributes).map((attr) => {
                    return [attr.name, attr.value];
                })
            )}
        >
            {tab.textContent}
        </svelte:element>
    {/each}

    <slot root={{ variant, stretch, updateTabWidth }} />
</div>

{#if dropdownTabs.length}
    <Input.Select
        options={dropdownTabs.map((tab) => {
            return {
                value: tab.textContent,
                label: String(tab.textContent)
            };
        })}
    />
{/if}

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
