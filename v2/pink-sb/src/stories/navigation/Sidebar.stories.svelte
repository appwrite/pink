<script context="module" lang="ts">
    import { Sidebar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story, Template } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Navigation/Sidebar',
        component: Sidebar,
        args: {
            state: 'open',
            project: { $id: 'abc123' }
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
    <Sidebar.Appwrite {...args} />
</Template>
<Story name="Appwrite - with project" />
<Story name="Appwrite - no project" args={{ project: undefined }} />
