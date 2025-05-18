<script context="module" lang="ts">
    import { Sidebar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story, Template } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Navigation/Sidebar',
        component: Sidebar,
        args: {
            state: 'open'
        },
        argTypes: {
            state: {
                control: { type: 'select' },
                options: ['open', 'closed', 'icons']
            }
        }
    };
</script>

<Template let:args>
    <Sidebar.Base {...args} />
</Template>
<Story name="Pink" />
