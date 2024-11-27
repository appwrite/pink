<script lang="ts">
    import { melt, type TreeView } from '@melt-ui/svelte';
    import { createEventDispatcher, getContext, type DispatchOptions } from 'svelte';
    import type { Directory } from '$lib/DirectoryPicker/index.js';
    import { IconChevronRight } from '@appwrite.io/pink-icons-svelte';
    import Radio from '$lib/selector/Radio.svelte';
    import Spinner from '$lib/Spinner.svelte';
    import Icon from '$lib/Icon.svelte';

    export let directories: Directory[];
    export let level = 0;
    export let containerWidth: number | undefined;
    let radioInputs: HTMLInputElement[] = [];
    let value: string;

    let thumbnailStates = directories.map(() => ({
        loading: true,
        error: false
    }));

    function handleThumbnailLoad(index: number) {
        thumbnailStates[index].loading = false;
        thumbnailStates[index].error = false;
    }

    function handleThumbnailError(index: number) {
        thumbnailStates[index].loading = false;
        thumbnailStates[index].error = true;
    }

    const {
        elements: { item, group },
        helpers: { isExpanded }
    } = getContext<TreeView>('tree');

    const paddingLeftStyle = `padding-left: ${32 * level + 8}px`;
    const dispatch = createEventDispatcher();
</script>

{#each directories as { title, fileCount, fullPath, thumbnailUrl, thumbnailIcon, thumbnailHtml, children }, i}
    {@const hasChildren = !!children?.length}

    <div class="directory-item-container">
        <button
            class="folder"
            style={paddingLeftStyle}
            on:click={() => {
                radioInputs[i].checked = true;
                dispatch('select', { title, fullPath, hasChildren });
            }}
            use:melt={$item({
                id: fullPath,
                hasChildren
            })}
        >
            <div class="info">
                <Radio
                    group="directory"
                    name="directory"
                    size="s"
                    bind:value
                    bind:radioInput={radioInputs[i]}
                />
                <div
                    class="chevron-container"
                    class:folder-open={$isExpanded(fullPath)}
                    class:disabled={!hasChildren}
                >
                    <IconChevronRight />
                </div>
                <div class="meta">
                    <span
                        class="title"
                        style={containerWidth
                            ? `max-width: ${containerWidth - 100 - level * 40}px`
                            : ''}>{title}</span
                    >
                    {#if fileCount !== undefined}
                        <span class="fileCount">({fileCount} files)</span>
                    {/if}
                </div>
            </div>
            <div class="thumbnail-container">
                {#if thumbnailStates[i].loading && !thumbnailIcon}
                    <Spinner />
                {/if}

                {#if thumbnailStates[i].error}
                    <div class="thumbnail-fallback" />
                {:else if thumbnailUrl}
                    <img
                        src={thumbnailUrl}
                        alt="Directory thumbnail"
                        class="thumbnail"
                        class:hidden={thumbnailStates[i].loading}
                        on:load={() => handleThumbnailLoad(i)}
                        on:error={() => handleThumbnailError(i)}
                    />
                {:else if thumbnailIcon}
                    <div class="thumbnail">
                        <Icon icon={thumbnailIcon} size="l" />
                    </div>
                {:else if thumbnailHtml}
                    <div class="thumbnail">
                        {@html thumbnailHtml}
                    </div>
                {/if}
            </div>
        </button>

        {#if children}
            <div use:melt={$group({ id: fullPath })}>
                <svelte:self directories={children} level={level + 1} {containerWidth} on:select />
            </div>
        {/if}
    </div>
{/each}

<style>
    .directory-item-container {
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
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        &:hover,
        &:focus {
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
        flex-shrink: 0;
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

    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 0;
    }

    .fileCount {
        color: var(--color-fgColor-neutral-tertiary, #97979b);
        display: none;

        @media (min-width: 1024px) {
            display: block;
        }
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
