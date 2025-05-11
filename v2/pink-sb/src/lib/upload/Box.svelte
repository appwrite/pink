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
                <section>
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
                                <Button variant="text" icon size="s">
                                    <Icon icon={IconCheck} color="--fgcolor-success" size="s" />
                                </Button>
                            {:else}
                                {#if file?.error}
                                    <Stack inline justifyContent="center">
                                        <Badge
                                            variant="secondary"
                                            type="error"
                                            content="Failed"
                                            size="s"
                                        />
                                    </Stack>
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
</style>
