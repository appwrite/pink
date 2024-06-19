<script context="module" lang="ts">
    import Status from '$lib/Status.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Status',
        component: Status,
        args: {
            label: 'Label'
        },
        argTypes: {
            status: {
                options: ['waiting', 'ready', 'processing', 'pending', 'failed', 'complete'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Status {...args} />
</Template>

<Story name="Waiting" args={{ status: 'waiting' }} />
<Story name="Ready" args={{ status: 'ready' }} />
<Story name="Processing" args={{ status: 'processing' }} />
<Story name="Pending" args={{ status: 'pending' }} />
<Story name="Failed" args={{ status: 'failed' }} />
<Story name="Complete" args={{ status: 'complete' }} />
