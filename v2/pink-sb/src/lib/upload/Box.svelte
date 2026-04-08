<script lang="ts">
    import {
        IconCheck,
        IconChevronDown,
        IconChevronUp,
        IconDocument,
        IconX
    } from '@appwrite.io/pink-icons-svelte';
    import { humanFileSize } from '$lib/helpers/size.js';
    import Stack from '$lib/layout/Stack.svelte';
    import Text from '$lib/typography/Text.svelte';
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/Icon.svelte';
    import Badge from '$lib/Badge.svelte';
    import Button from '$lib/button/Button.svelte';
    import { slide } from 'svelte/transition';

    let isOpen = true;

    export let files: (Partial<File> & {
        name: string;
        size?: number;
        extension?: string;
        error?: string;
        progress?: number;
        status?: 'failed' | 'pending' | 'success';
    })[] = [];

    const dispatch = createEventDispatcher();

    // TODO: add extension text
</script>

<div class="upload-box">
    <header>
        <Stack gap="s" direction="row" alignItems="center">
            <Text>File Uploads</Text>
            <Badge variant="secondary" content={(files?.length ?? 0).toString()} size="s" />
        </Stack>
        <Stack gap="xxs" direction="row" justifyContent="flex-end">
            <Button
                variant="text"
                icon
                size="s"
                on:click={() => {
                    isOpen = !isOpen;
                }}
            >
                <Icon
                    size="s"
                    icon={isOpen ? IconChevronUp : IconChevronDown}
                    color="--fgcolor-neutral-tertiary"
                />
            </Button>
            <Button
                variant="text"
                icon
                size="s"
                on:click={() => {
                    dispatch('close');
                }}
            >
                <Icon icon={IconX} color="--fgcolor-neutral-tertiary" size="s" />
            </Button>
        </Stack>
    </header>
    {#if isOpen}
        <div transition:slide={{ axis: 'y', duration: 200 }}>
            {#each files as file}
                {@const fileSize = file?.size ? humanFileSize(file.size) : false}
                {@const hasProgress = typeof file?.progress === 'number' && file.progress > 0}
                {@const clampedProgress = hasProgress
                    ? Math.round(Math.min(Math.max(file.progress ?? 0, 0), 100))
                    : 0}
                {@const isError = !!file?.error || file?.status === 'failed'}
                <section>
                    <Stack direction="column" gap="xs">
                        <Stack
                            direction="row"
                            gap="s"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack direction="row" gap="s" style="overflow: hidden;">
                                <Icon
                                    icon={IconDocument}
                                    color={file?.error
                                        ? '--fgcolor-error'
                                        : '--fgcolor-neutral-tertiary'}
                                />
                                <Stack direction="row" gap="xxs" inline style="min-width: 0;">
                                    <Text truncate>
                                        {file.name}
                                    </Text>
                                    {#if fileSize}
                                        <Text color="--fgcolor-neutral-tertiary">
                                            <span style="white-space: nowrap">
                                                ({fileSize.value}
                                                {fileSize.unit})
                                            </span>
                                        </Text>
                                    {/if}
                                </Stack>
                            </Stack>
                            <Stack direction="row" gap="xxs" inline>
                                {#if file?.status === 'success'}
                                    <Icon icon={IconCheck} color="--fgcolor-success" size="s" />
                                {:else}
                                    {#if isError}
                                        <Stack inline justifyContent="center">
                                            <Badge
                                                variant="secondary"
                                                type="error"
                                                content="Failed"
                                                size="s"
                                            />
                                        </Stack>
                                    {:else if hasProgress}
                                        <Text color="--fgcolor-neutral-tertiary">
                                            {clampedProgress}%
                                        </Text>
                                    {:else if file?.status === 'pending'}
                                        <Stack inline justifyContent="center">
                                            <Badge
                                                variant="secondary"
                                                type="warning"
                                                content="Pending"
                                                size="s"
                                            />
                                        </Stack>
                                    {/if}
                                    <Button
                                        variant="text"
                                        icon
                                        size="s"
                                        on:click={() => {
                                            dispatch('remove', file);
                                        }}
                                    >
                                        <Icon
                                            icon={IconX}
                                            color="--fgcolor-neutral-tertiary"
                                            size="s"
                                        />
                                    </Button>
                                {/if}
                            </Stack>
                        </Stack>
                        {#if hasProgress && file?.status !== 'success'}
                            <div
                                class="upload-progress-bar"
                                class:is-error={isError}
                                role="progressbar"
                                aria-valuenow={clampedProgress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label="{file.name} upload progress"
                            >
                                <div
                                    class="upload-progress-bar-fill"
                                    style="width: {clampedProgress}%"
                                />
                            </div>
                        {/if}
                    </Stack>
                </section>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .upload-box {
        display: flex;
        flex-direction: column;
        width: 304px;
        overflow: hidden;
        border-radius: var(--border-radius-S, 8px);
        border: 1px solid var(--border-neutral);
        /* box-shadow/neutral/S */
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);
        header {
            width: 100%;
            padding: var(--base-8) var(--base-12);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background: var(--bgcolor-neutral-primary);
        }

        section {
            padding: var(--base-6) var(--base-12);
            background: var(--bgcolor-neutral-default);
            border-top: var(--border-width-s) solid var(--border-neutral);
            flex-shrink: 1;
        }
    }

    .upload-progress-bar {
        height: 4px;
        width: 100%;
        border-radius: var(--border-radius-XS, 4px);
        background: var(--bgcolor-neutral-secondary, hsl(0 0% 90%));
        overflow: hidden;

        &-fill {
            height: 100%;
            border-radius: inherit;
            background: var(--bgcolor-accent);
            transition: width 0.3s ease;
        }

        &.is-error &-fill {
            background: var(--bgcolor-error, hsl(0 70% 55%));
        }
    }
</style>
