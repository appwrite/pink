<script lang="ts">
    import { IconDocument, IconExclamationCircle, IconX } from '@appwrite.io/pink-icons';
    import { humanFileSize } from '../../helpers/size.ts';
    import Stack from '$lib/layout/Stack.svelte';
    import Text from '$lib/typography/Text.svelte';
    import { createEventDispatcher } from 'svelte';

    export let files: {
        name: string;
        extension: string;
        size: number;
        error?: string;
        removable?: boolean;
    }[] = [];

    const dispatch = createEventDispatcher();
</script>

<Stack gap="l">
    {#each files as file}
        {@const fileSize = humanFileSize(file.size)}
        <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap="s">
                <span
                    style:--icon-fill={file?.error
                        ? 'var(--color-fgcolor-error)'
                        : 'var(--color-fgcolor-neutral-tertiary)'}
                >
                    {#if file?.error}
                        <IconExclamationCircle />
                    {:else}
                        <IconDocument />
                    {/if}
                </span>
                <Stack gap="none">
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
                        <Text color="--color-fgcolor-error">
                            {file.error}
                        </Text>
                    {/if}
                </Stack>
            </Stack>
            {#if file?.removable}
                <button
                    type="button"
                    on:click|preventDefault={() => {
                        dispatch('remove', file);
                    }}
                    style:--icon-fill="var(--color-fgcolor-neutral-tertiary)"
                >
                    <IconX />
                </button>
            {/if}
        </Stack>
    {/each}
</Stack>

<style lang="scss">
    :global(path) {
        fill: var(--icon-fill);
    }
</style>
