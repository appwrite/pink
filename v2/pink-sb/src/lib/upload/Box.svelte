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

    let isOpen = true;

    export let files: {
        name: string;
        extension: string;
        size: number;
        error?: string;
        status?: 'failed' | 'pending' | 'success';
    }[] = [];

    const dispatch = createEventDispatcher();
</script>

<div class="upload-box">
    <header>
        <Stack gap="s" direction="row" alignItems="center">
            <Text>File Uploads</Text>
            <Badge variant="secondary" content={(files?.length ?? 0).toString()} />
        </Stack>
        <Stack gap="s" direction="row" justifyContent="flex-end">
            <Button
                variant="text"
                icon
                size="small"
                on:click={() => {
                    isOpen = !isOpen;
                }}
            >
                <Icon
                    size="small"
                    icon={isOpen ? IconChevronUp : IconChevronDown}
                    color="--color-fgcolor-neutral-tertiary"
                />
            </Button>
            <Button variant="text" icon size="small" on:click={() => {}}>
                <Icon icon={IconX} color="--color-fgcolor-neutral-tertiary" size="small" />
            </Button>
        </Stack>
    </header>
    {#if isOpen}
        {#each files as file}
            {@const fileSize = humanFileSize(file.size)}
            <div>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" gap="s">
                        <Icon
                            icon={IconDocument}
                            color={file?.error
                                ? '--color-fgcolor-error'
                                : '--color-fgcolor-neutral-tertiary'}
                        />
                        <Stack direction="row" justifyContent="space-between">
                            <Stack direction="row" gap="xs">
                                <Text>
                                    {file.name}
                                </Text>
                                <Text color="--color-fgcolor-neutral-tertiary">
                                    ({fileSize.value}
                                    {fileSize.unit})
                                </Text>
                            </Stack>

                            {#if file?.error}
                                <Badge variant="secondary" type="error" content="Failed" />
                            {:else if file?.status === 'pending'}
                                <Badge variant="secondary" type="warning" content="Pending" />
                            {/if}
                        </Stack>
                    </Stack>
                    {#if file?.status === 'success'}
                        <Button variant="text" icon size="small">
                            <Icon icon={IconCheck} color="--color-fgcolor-success" size="small" />
                        </Button>
                    {:else}
                        <Button
                            variant="text"
                            icon
                            size="small"
                            on:click={() => {
                                dispatch('remove', file);
                            }}
                        >
                            <Icon
                                icon={IconX}
                                color="--color-fgcolor-neutral-tertiary"
                                size="small"
                            />
                        </Button>
                    {/if}
                </Stack>
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
    .upload-box {
        display: flex;
        flex-direction: column;
        max-width: 20.5rem;
        overflow: hidden;
        border-radius: var(--border-radius-S, 8px);
        border: 1px solid var(--color-border-neutral);
        /* box-shadow/neutral/S */
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);
        header {
            width: 100%;
            padding: 0.25rem 0.75rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        div {
            padding: 0.5rem 0.75rem;
            background: var(--color-bgcolor-neutral-default);
            border-top: var(--border-width-s) solid var(--color-border-neutral);
        }
    }
</style>
