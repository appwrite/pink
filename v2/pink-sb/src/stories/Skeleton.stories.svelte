<script context="module" lang="ts">
    import { Skeleton } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Skeleton',
        component: Skeleton,
        args: {
            variant: 'circle',
            width: 44,
            height: 12
        },
        argTypes: {
            variant: {
                options: ['circle', 'square', 'line'],
                control: { type: 'select' }
            }
        }
    };
</script>

<div class="wrapper">
    <Story name="Default" let:args>
        <Skeleton {...args} />
    </Story>
</div>

<style>
    .wrapper {
        margin: 100px auto;
        width: 400px;
    }
</style>
