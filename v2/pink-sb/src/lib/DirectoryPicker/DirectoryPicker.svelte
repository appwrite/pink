<script lang="ts">
    import { createTreeView } from '@melt-ui/svelte';
    import { setContext } from 'svelte';

    import type { Directory } from './index.js';
    import DirectoryItem from './DirectoryItem.svelte';
    import Spinner from '$lib/Spinner.svelte';

    const ctx = createTreeView({
        defaultExpanded: ['lib-0', 'tree-0']
    });
    setContext('tree', ctx);

    const {
        elements: { tree }
    } = ctx;

    export let directories: Directory[];
    export let isLoading = true;
    let rootContainer: HTMLDivElement;
    let containerWidth: number | undefined;
    monitorResize();

    function monitorResize() {
        window.addEventListener('resize', updateWidth);

        return {
            destroy() {
                window.removeEventListener('resize', updateWidth);
            }
        };
    }

    function updateWidth() {
        containerWidth = rootContainer ? rootContainer.getBoundingClientRect().width : undefined;
    }

    $: containerWidth = rootContainer ? rootContainer.getBoundingClientRect().width : undefined;
</script>

<div class="container" class:isLoading {...$tree} bind:this={rootContainer}>
    {#if isLoading}<div class="loading-container">
            <Spinner /><span>Loading directory data...</span>
        </div>{:else}<DirectoryItem {directories} {containerWidth} />{/if}
</div>

<style>
    .container {
        width: 560px;
        max-width: 100%;
        height: 316px;
        overflow-y: scroll;
        flex-shrink: 0;
        display: flex;
        padding: var(--space-2, 4px);

        border-radius: var(--border-radius-m, 12px);
        border: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);
        background: var(--color-bgcolor-neutral-primary, #fff);
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
