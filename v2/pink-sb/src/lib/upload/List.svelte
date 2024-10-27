<script lang="ts">
    import { IconDocument, IconExclamationCircle, IconX } from '@appwrite.io/pink-icons-svelte';
    import { humanFileSize } from '$lib/helpers/size.js';
    import Stack from '$lib/layout/Stack.svelte';
    import Text from '$lib/typography/Text.svelte';
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/Icon.svelte';

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
                {#if file?.error}
                    <Icon icon={IconExclamationCircle} color="--color-fgcolor-error" />
                {:else}
                    <Icon icon={IconDocument} color="--color-fgcolor-neutral-tertiary" />
                {/if}
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
                >
                    <Icon icon={IconX} color="--color-fgcolor-neutral-tertiary" />
                </button>
            {/if}
        </Stack>
    {/each}
</Stack>
