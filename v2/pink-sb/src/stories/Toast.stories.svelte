<script context="module" lang="ts">
    import { Toast } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Toast',
        component: Toast,
        args: {
            title: 'This is a Toast title.'
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Toast {...args} />
</Template>

<Story name="Info" />
<Story name="Success" args={{ status: 'success' }} />
<Story name="Warning" args={{ status: 'warning' }} />
<Story name="Error" args={{ status: 'error' }} />
<Story
    name="Expanded"
    args={{
        expanded: true,
        description: 'This is a Toast notification description.',
        actions: [
            {
                label: 'Action'
            },
            {
                label: 'Action'
            }
        ]
    }}
/>
