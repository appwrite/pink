<script lang="ts">
    import { DirectoryItem } from '$lib/index.js';
    import { IconChevronRight } from '@appwrite.io/pink-icons-svelte';
    import Radio from '$lib/selector/Radio.svelte';
    import Spinner from '$lib/Spinner.svelte';
    import type { Directory } from '$lib/DirectoryPicker/index.js';

    export let directory: Directory;
    export let depth: number = 0;
    export let isExpanded = false;

    const paddingLeftStyle = `padding-left: ${32 * depth + 8}px`;
    let radioInput: HTMLInputElement;

    let thumbnailLoading = true;
    let thumbnailError = false;

    function handleThumbnailLoad() {
        thumbnailLoading = false;
        thumbnailError = false;
    }
    function handleThumbnailError() {
        thumbnailLoading = false;
        thumbnailError = true;
    }
</script>

<div class="container">
    <button
        class="folder"
        style={paddingLeftStyle}
        on:click={() => {
            radioInput.checked = true;
            if (directory.subDirectories.length > 0) {
                isExpanded = !isExpanded;
            }
        }}
    >
        <div class="info">
            <Radio group="directory" name="directory" bind:radioInput size="small" />
            <div
                class="chevron-container"
                class:folder-open={isExpanded}
                class:disabled={directory.subDirectories.length === 0}
            >
                <IconChevronRight />
            </div>
            <div class="meta">
                <span>{directory.name}</span>
                <span class="fileCount">({directory.fileCount} files)</span>
            </div>
        </div>
        <div class="thumbnail-container">
            {#if thumbnailLoading}
                <Spinner />
            {/if}

            {#if thumbnailError}
                <div class="thumbnail-fallback" />
            {:else}
                <img
                    src={directory.thumbnailUrl}
                    alt="Directory thumbnail"
                    class="thumbnail"
                    class:hidden={thumbnailLoading}
                    on:load={handleThumbnailLoad}
                    on:error={handleThumbnailError}
                />
            {/if}
        </div>
    </button>
    {#if isExpanded}
        {#each directory.subDirectories as subDirectory}
            <DirectoryItem directory={subDirectory} depth={depth + 1} />
        {/each}
    {/if}
</div>

<style>
    .container {
        width: 100%;
    }
    .folder {
        display: flex;
        width: 100%;
        flex-direction: row;
        padding: var(--space-3, 6px) var(--space-4, 8px);
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        &:hover {
            border-radius: var(--border-radius-S, 8px);
            background: var(--color-bgcolor-neutral-secondary, #f4f4f7);
        }
    }
    .info {
        display: flex;
    }
    .chevron-container {
        width: 20px;
        height: 20px;
        transition: transform ease-in-out 0.1s;
        margin-left: 8px;
        margin-right: 4px;
    }
    .folder-open {
        transform: rotate(90deg);
    }
    .disabled {
        color: var(--color-fgcolor-neutral-tertiary);
    }

    .meta {
        display: flex;
        gap: var(--space-2, 4px);
    }

    .fileCount {
        color: var(--color-fgColor-neutral-tertiary, #97979b);
    }

    .hidden {
        display: none;
    }

    .thumbnail-container {
        display: flex;
        justify-items: center;
        align-items: center;
        width: var(--icon-size-l, 24px);
        height: var(--icon-size-l, 24px);
    }

    .thumbnail {
        width: var(--icon-size-l, 24px);
        height: var(--icon-size-l, 24px);
        flex-shrink: 0;
        border-radius: var(--border-radius-circle, 99999px);
    }

    .thumbnail-fallback {
        width: var(--icon-size-l, 24px);
        height: var(--icon-size-l, 24px);
        flex-shrink: 0;
        border-radius: var(--border-radius-circle, 99999px);
        border: var(--border-width-s, 1px) dashed var(--color-border-neutral-strong, #d8d8db);
        background: var(--color-bgcolor-neutral-primary, #fff);
    }
</style>
