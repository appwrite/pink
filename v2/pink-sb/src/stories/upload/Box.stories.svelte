<script context="module" lang="ts">
    import { Upload } from '$lib/index.ts';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Upload/Box',
        component: Upload.Box
    };

    let files = [
        {
            name: 'file1.jpg',
            extension: 'jpg',
            size: 41024,
            status: 'success'
        },
        {
            name: 'file2.jpg',
            extension: 'jpg',
            size: 1465465024,
            error: 'File exceeds size limit',
            status: 'failed'
        },
        {
            name: 'fileWithAVeryLongName.jpg',
            extension: 'jpg',
            size: 102,
            status: 'pending'
        }
    ];
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Upload.Box bind:files {...args} />
</Template>

<Story
    name="Default"
    args={{
        files
    }}
/>
