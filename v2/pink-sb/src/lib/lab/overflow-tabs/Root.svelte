<script lang="ts">
    import type { RootContext } from './types.js';
    import { onMount, SvelteComponent } from 'svelte';

    export let variant: RootContext['variant'] = 'primary';
    export let stretch: RootContext['stretch'] = false;

    let navWidth: number;
    let tabWidths: number[] = [];
    let tabNodes: HTMLElement[] = [];

    const updateTabWidth = (width: number, node: HTMLElement) => {
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

    $: console.log({ displayedTabs }, { dropdownTabs });
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
                Array.from(tab.attributes).map((attr) => [attr.name, attr.value])
            )}
        >
            {tab.textContent}
        </svelte:element>
    {/each}

    <slot root={{ variant, stretch, updateTabWidth }} />
</div>

{#if dropdownTabs.length}
    <div class="dropdown">
        <button type="button" class="dropdown-trigger"> More </button>
        <div class="dropdown-content">
            {#each dropdownTabs as tab}
                {@html tab.outerHTML}
            {/each}
        </div>
    </div>
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

    .dropdown {
        position: relative;
        display: inline-block;

        &-trigger {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border: none;
            cursor: pointer;
            font-size: inherit;

            &.dropdown-primary {
                background: var(--color-bgcolor-neutral-secondary);
                color: var(--color-text-primary);
            }

            &.dropdown-secondary {
                background: transparent;
                color: var(--color-text-secondary);
            }
        }

        &-content {
            display: none;
            position: absolute;
            right: 0;
            top: 100%;
            background: var(--color-bgcolor-neutral-primary);
            min-width: 200px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-radius: var(--border-radius-s);
            z-index: 10;
            padding: 0.5rem;

            :global(button) {
                width: 100%;
                text-align: left;
                border-radius: var(--border-radius-s);
            }
        }

        &:hover .dropdown-content,
        &:focus-within .dropdown-content {
            display: block;
        }
    }
</style>
