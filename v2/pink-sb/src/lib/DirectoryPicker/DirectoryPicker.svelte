<script lang="ts">
    import { createTreeView } from '@melt-ui/svelte';
    import { onMount, setContext } from 'svelte';
    import type { Directory } from './index.js';
    import DirectoryItem from './DirectoryItem.svelte';
    import Spinner from '$lib/Spinner.svelte';
    import { writable, type Writable } from 'svelte/store';

    export let expanded: Writable<string[]> | undefined = writable(['lib-0', 'tree-0']);
    export let selected: string | undefined;
    export let openTo: string | undefined;
    
    

    const ctx = createTreeView({
        expanded
    });
    setContext('tree', ctx);

    const {
        elements: { tree }
    } = ctx;

    export let directories: Directory[];
    export let isLoading = true;
    export let onSelect: ((detail: any) => void) | undefined = undefined;
    export let onChange: ((detail: { fullPath: string }) => void) | undefined = undefined;
    let rootContainer: HTMLDivElement;
    let containerWidth: number | undefined;
    let internalSelected: string | undefined;

    // Initialize internal selected state from selected prop
    $: internalSelected = selected;

    onMount(() => {
        updateWidth();
        
        // Auto-expand to openTo path if provided
        if (openTo) {
            const pathSegments = openTo.split('/').filter(Boolean);
            const pathsToExpand: string[] = [];
            let currentPath = '';
            
            for (const segment of pathSegments) {
                currentPath += '/' + segment;
                pathsToExpand.push(currentPath);
            }
            
            // Update expanded state to include the path
            if (pathsToExpand.length > 0) {
                expanded?.update(current => {
                    const newExpanded = [...current];
                    pathsToExpand.forEach(path => {
                        if (!newExpanded.includes(path)) {
                            newExpanded.push(path);
                        }
                    });
                    return newExpanded;
                });
            }
        }
    });

    function updateWidth() {
        containerWidth = rootContainer ? rootContainer.getBoundingClientRect().width : undefined;
    }

    function handleSelect(detail: any) {
        internalSelected = detail.fullPath;
        selected = internalSelected; // Update bind:selected
        if (onChange) {
            onChange({ fullPath: detail.fullPath });
        }
        if (onSelect) {
            onSelect(detail);
        }
    }

    $: containerWidth = rootContainer ? rootContainer.getBoundingClientRect().width : undefined;
</script>

<svelte:window on:resize={updateWidth} />

<div class="directory-container" class:isLoading {...$tree} bind:this={rootContainer}>
    {#if isLoading}
        <div class="loading-container">
            <Spinner /><span>Loading directory data...</span>
        </div>
    {:else}
        <DirectoryItem {directories} {containerWidth} selectedPath={internalSelected} onSelect={handleSelect} />
    {/if}
</div>

<style>
    .directory-container {
        width: 560px;
        max-width: 100%;
        height: 316px;
        overflow-y: auto;
        flex-shrink: 0;
        display: flex;
        padding: var(--space-2, 4px);

        border-radius: var(--border-radius-m, 12px);
        border: var(--border-width-s, 1px) solid var(--border-neutral, #ededf0);
        background: var(--bgcolor-neutral-primary, #fff);

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .isLoading {
        justify-content: center;
        align-items: center;
    }

    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--gap-m);
    }
</style>
