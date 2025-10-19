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
    import { Button, Icon } from '$lib/index.ts';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { IconInfo, IconSvelte } from '@appwrite.io/pink-icons-svelte';
</script>

<Template let:args>
    <Alert.Banner {...args}>
        <p>This is just some text.</p>
        <svelte:fragment slot="actions">
            <Button.Button variant="secondary">Button</Button.Button>
        </svelte:fragment>
    </Alert.Banner>
</Template>

<Story name="Info" args={{ status: 'info' }}></Story>
<Story name="Success" args={{ status: 'success' }} />
<Story name="Warning" args={{ status: 'warning' }} />
<Story name="Error" args={{ status: 'error' }} />
<Story name="Custom Icon">
    <Alert.Banner title="This is a title" dismissible>
        <p>This is just some text.</p>

        <svelte:fragment slot="icon">
            <Icon icon={IconSvelte} />
        </svelte:fragment>

        <svelte:fragment slot="actions">
            <Button.Button variant="secondary">Button</Button.Button>
        </svelte:fragment>
    </Alert.Banner>
</Story>
