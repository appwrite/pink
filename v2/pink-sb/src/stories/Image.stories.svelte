<script context="module" lang="ts">
    import { Image } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Image',
        component: Image,
        args: {
            src: 'https://unsplash.it/150',
            alt: 'Placeholder',
            width: 150,
            height: 150
        },
        argTypes: {
            src: {
                control: 'text',
                description: 'Image source URL'
            },
            alt: {
                control: 'text',
                description: 'Image alt text'
            },
            width: {
                control: 'number',
                description: 'Image width'
            },
            height: {
                control: 'number',
                description: 'Image height'
            },
            fit: {
                options: ['cover', 'contain', 'fill', 'none'],
                control: {
                    type: 'select'
                },
                description: 'Image fit'
            },
            radius: {
                control: {
                    type: 'select'
                },
                options: ['s', 'm', 'l'],
                description: 'Image radius'
            },
            aspectRatio: {
                control: 'text',
                description: 'Image aspect ratio'
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Image {...args} />
</Template>

<Story name="Default" />
<Story name="Dashed" args={{ dashed: true }} />
