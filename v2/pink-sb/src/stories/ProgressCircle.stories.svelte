<script context="module" lang="ts">
    import { ProgressCircle } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story, Template } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ProgressCircle',
        component: ProgressCircle,
        args: {
            progress: 30,
            size: 'm'
        },
        argTypes: {
            progress: {
                control: 'number',
                description: 'Progress percentage'
            },
            size: {
                options: ['s', 'm', 'l'],
                control: { type: 'select' }
            }
        }
    };
</script>

<div class="wrapper">
    <Template let:args>
        <ProgressCircle {...args} />
    </Template>
</div>
<Story name="Size S" args={{ size: 's' }} />
<Story name="Size M" args={{ size: 'm' }} />
<Story name="Size L" args={{ size: 'l' }} />

<style>
    .wrapper {
        margin: 100px auto;
        width: 400px;
    }
</style>
