<script lang="ts">
    import Spinner from '$lib/Spinner.svelte';
    import { DirectoryItem } from '$lib/index.js';
    import type { Directory } from '$lib/DirectoryPicker/index.js';

    export let directory: Directory | null = null;
    export let isLoading = true;
</script>

<div class="container" class:isLoading>
    {#if isLoading}<div class="loading-container">
            <Spinner /><span>Loading directory data...</span>
        </div>{:else if directory !== null}<DirectoryItem {directory} />{/if}
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
