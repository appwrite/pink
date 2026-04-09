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
    import Stack from '$lib/layout/Stack.svelte';
    import Button from '$lib/button/Button.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';

    import IconAI from './(icons)/ai.svelte';

    let show = false;
</script>

<Template let:args>
    {#if args.dismissible}
        <Stack alignItems="flex-start">
            <Button on:click={() => (show = true)}>Show toast</Button>
            {#if show}
                <Toast {...args} on:dismiss={() => (show = false)} />
            {/if}
        </Stack>
    {:else}
        <Toast {...args} />
    {/if}
</Template>

<Story name="Info" />
<Story name="Success" args={{ status: 'success' }} />
<Story name="Warning" args={{ status: 'warning' }} />
<Story name="Dismissible" args={{ dismissible: true, description: 'Click the icon to dismiss.' }} />
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
<Story name="Custom icon" args={{ icon: IconAI }} />

<Story
    name="HTML content"
    args={{
        title: '<span style="color: #fd366e;">Fancy Toast</span>',
        description:
            'Description with <span style="font-style: italic;">italic</span> and <span style="background: var(--bgcolor-neutral-secondary); padding: 2px 4px; border-radius: var(--border-radius-xs); font-family: var(--font-mono); font-size: 0.9em;">code</span> elements',
        isHtml: true,
        expanded: true,
        actions: [
            {
                label: '<span style="text-decoration: underline; font-style: italic">Bold Action</span>',
                isHtml: true,
                onClick: () => console.log('Bold action clicked')
            },
            {
                label: 'Regular Action',
                onClick: () => console.log('Regular action clicked')
            }
        ]
    }}
/>
