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

<script lang="ts">
    import { Layout, Typography } from '$lib/index.ts';
    import { Story, Template } from '@storybook/addon-svelte-csf';

    const alerts = [
        {
            status: 'info',
            title: 'To complete, add this OAuth2 redirect URI to your Appwrite app config.',
            content: undefined
        },
        {
            status: 'success',
            title: 'OAuth2 redirect URI added successfully. Your Appwrite app is now ready!',
            content: 'You can now authenticate users via Appwrite without any additional setup.'
        },
        {
            status: 'warning',
            title: 'The OAuth2 redirect URI is missing. You may encounter login issues.',
            content:
                'To avoid authentication problems, ensure the URI is correctly added to your Appwrite app.'
        },
        {
            status: 'error',
            title: 'Failed to add OAuth2 redirect URI. Please try again or check your configuration.',
            content: undefined
        }
    ] as const;
</script>

<Template let:args>
    <Alert.Inline {...args}>
        <p>This is just some text.</p>
        <svelte:fragment slot="actions">
            <Button variant="compact" size="s">Button</Button>
        </svelte:fragment>
    </Alert.Inline>
</Template>

<Story name="Info" args={{ status: 'info' }} />
<Story name="Success" args={{ status: 'success' }} />
<Story name="Warning" args={{ status: 'warning' }} />
<Story name="Error" args={{ status: 'error' }} />
<Story name="Only title">
    <div style:max-width="600px" style:margin-inline="auto" style:padding-block-start="4rem">
        <Layout.Stack gap="l">
            {#each alerts as alert}
                <Layout.Stack gap="xxxs">
                    <Typography.Text variant="m-500">{alert.status.toUpperCase()}</Typography.Text>

                    {#if alert.content}
                        <!-- with slot content -->
                        <Alert.Inline title={alert.title} status={alert.status} dismissible>
                            {alert.content}
                        </Alert.Inline>
                    {:else}
                        <!-- without slot content -->
                        <Alert.Inline title={alert.title} status={alert.status} dismissible />
                    {/if}
                </Layout.Stack>
            {/each}
        </Layout.Stack>
    </div>
</Story>
