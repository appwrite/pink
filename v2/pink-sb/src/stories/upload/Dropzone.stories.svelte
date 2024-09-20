<script context="module" lang="ts">
    import { Upload } from '$lib/index.ts';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Upload/Dropzone',
        component: Upload.Dropzone
    };

    let files: FileList;
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import Text from '$lib/typography/Text.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import Caption from '$lib/typography/Caption.svelte';
    import { IconInfo } from '@appwrite.io/pink-icons-svelte';
    import Tooltip from '$lib/Tooltip.svelte';
    import Icon from '$lib/Icon.svelte';
</script>

<Template let:args>
    <Upload.Dropzone bind:files {...args}>
        <Stack alignItems="center" gap="s">
            <Stack alignItems="center" justifyContent="center" direction="row" gap="s">
                <Text variant="l-500">Drag and drop files here or click to upload</Text>
                {#if !args.disabled}
                    <Tooltip>
                        <Icon icon={IconInfo} />
                        <svelte:fragment slot="tooltip">
                            Only PNG, JPEG, PDF files allowed
                        </svelte:fragment>
                    </Tooltip>
                {/if}
            </Stack>
            <Caption variant="400">Max file size: 10MB</Caption>
        </Stack>
    </Upload.Dropzone>
</Template>

<Story
    name="Default"
    args={{
        files
    }}
/>
<Story
    name="Disabled"
    args={{
        disabled: true,
        files
    }}
/>

<Story
    name="Multiple"
    args={{
        multiple: true,
        files
    }}
/>
