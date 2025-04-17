<script lang="ts">
    import { melt, type TreeView } from '@melt-ui/svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import type { Directory } from '$lib/DirectoryPicker/index.js';
    import { IconChevronRight } from '@appwrite.io/pink-icons-svelte';
    import Radio from '$lib/selector/Radio.svelte';
    import Spinner from '$lib/Spinner.svelte';
    import Icon from '$lib/Icon.svelte';
    import { Layout, Typography } from '$lib/index.js';

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

    $: console.log(directories);
</script>

{#each directories as { title, fileCount, fullPath, thumbnailUrl, thumbnailIcon, thumbnailHtml, children, showThumbnail = true, loading = false }, i}
    {@const hasChildren = !!children?.length}

    <div class="directory-item-container">
        <button
            class="folder"
            type="button"
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
            <Layout.Stack direction="row" justifyContent="space-between">
                <Layout.Stack
                    direction="row"
                    justifyContent="flex-start"
                    gap="xxs"
                    alignItems="center"
                >
                    <div>
                        <Layout.Stack direction="row" gap="xxs" alignItems="center">
                            <Radio
                                group="directory"
                                name="directory"
                                size="s"
                                bind:value
                                bind:radioInput={radioInputs[i]}
                            />
                            <div
                                class:folder-open={$isExpanded(fullPath)}
                                class:disabled={!hasChildren}
                                class="chevron-container"
                            >
                                <Icon
                                    icon={IconChevronRight}
                                    size="s"
                                    color="--fgcolor-neutral-tertiary"
                                />
                            </div>
                        </Layout.Stack>
                    </div>
                    <span
                        class="title"
                        style={containerWidth
                            ? `max-width: ${containerWidth - 100 - level * 40}px`
                            : ''}>{title}</span
                    >
                    {#if fileCount !== undefined}
                        <div class="fileCount">
                            <Typography.Text variant="m-400" color="--fgcolor-neutral-tertiary"
                                >({fileCount} files)</Typography.Text
                            >
                        </div>
                    {/if}
                </Layout.Stack>
                {#if showThumbnail}
                    {#if loading || (thumbnailStates[i].loading && !thumbnailIcon && !thumbnailHtml)}
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
                            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                            {@html thumbnailHtml}
                        </div>
                    {/if}
                {/if}
            </Layout.Stack>
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
            border-radius: var(--border-radius-s, 8px);
            background: var(--bgcolor-neutral-secondary, #f4f4f7);
        }
    }
    .chevron-container {
        width: var(--space-7);
        height: var(--space-7);
        transition: transform ease-in-out 0.1s;
    }
    .folder-open {
        transform: rotate(90deg);
    }
    .disabled {
        color: var(--fgcolor-neutral-tertiary);
    }

    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 0;
    }

    .fileCount {
        display: none;

        @media (min-width: 1024px) {
            display: block;
        }
    }

    .hidden {
        display: none;
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
        border: var(--border-width-s, 1px) dashed var(--border-neutral-strong, #d8d8db);
        background: var(--bgcolor-neutral-primary, #fff);
    }
</style>
