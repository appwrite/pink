<script context="module" lang="ts">
    import { Upload } from '$lib/index.ts';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Upload/List',
        component: Upload.List
    };

    let files = [
        {
            name: 'file1.jpg',
            extension: 'jpg',
            size: 1024,
            removable: true
        },
        {
            name: 'file2.jpg',
            extension: 'jpg',
            size: 1024,
            removable: true,
            error: 'File exceeds size limit'
        }
    ];
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Upload.List bind:files {...args} />
</Template>

<Story
    name="Default"
    args={{
        files
    }}
/>
