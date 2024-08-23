<script context="module" lang="ts">
    import { Upload } from '$lib/index.ts';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Upload/FilesList',
        component: Upload.FilesList
    };

    let files = [
        {
            name: 'file1.jpg',
            extension: 'jpg',
            size: 1024,
            error: ''
        },
        {
            name: 'file2.jpg',
            extension: 'jpg',
            size: 1024,
            error: ''
        }
    ];
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Upload.FilesList bind:files>asdipjaspkjd</Upload.FilesList>
</Template>

<Story
    name="Default"
    args={{
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
<Story
    name="Disabled"
    args={{
        disabled: true,
        files
    }}
/>
