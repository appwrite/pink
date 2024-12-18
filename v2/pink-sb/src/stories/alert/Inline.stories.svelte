<script context="module" lang="ts">
    import Button from '$lib/button/Button.svelte';
    import { Alert } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Alert/Inline',
        component: Alert.Inline,
        args: {
            title: 'This is a title',
            dismissible: true
        },
        argTypes: {
            status: {
                options: ['success', 'info', 'warning', 'error'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Alert.Inline {...args}>
        <p>This is just some text.</p>
        <svelte:fragment slot="actions">
            <Button variant="text">Button</Button>
        </svelte:fragment>
    </Alert.Inline>
</Template>

<Story name="Info" args={{ status: 'info' }} />
<Story name="Success" args={{ status: 'success' }} />
<Story name="Warning" args={{ status: 'warning' }} />
<Story name="Error" args={{ status: 'error' }} />
