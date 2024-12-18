<script context="module" lang="ts">
    import { Alert } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Alert/Banner',
        component: Alert.Banner,
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
    import Button from '$lib/button/Button.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Alert.Banner {...args}>
        <p>This is just some text.</p>
        <svelte:fragment slot="actions">
            <Button variant="secondary">Button</Button>
        </svelte:fragment>
    </Alert.Banner>
</Template>

<Story name="Info" args={{ status: 'info' }}></Story>
<Story name="Success" args={{ status: 'success' }} />
<Story name="Warning" args={{ status: 'warning' }} />
<Story name="Error" args={{ status: 'error' }} />
