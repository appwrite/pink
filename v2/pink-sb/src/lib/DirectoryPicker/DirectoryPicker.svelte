<script lang="ts">
    import Spinner from '$lib/Spinner.svelte';
    import { DirectoryItem } from '$lib/index.js';

    export type Directory = {
        id: string;
        name: string;
        fullPath: string;
        fileCount: number;
        thumbnailUrl: string;
        subDirectories: Directory[];
    };

    export let directory: Directory | null = null;
    export let isLoading = true;
</script>

<div class="container" class:isLoading>
    {#if isLoading}<div class="loading-container">
            <Spinner /><span>Loading directory data...</span>
        </div>{:else}<DirectoryItem {directory} />{/if}
</div>

<style>
    .container {
        min-width: 560px;
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
