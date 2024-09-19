<script context="module" lang="ts">
    import Empty from '$lib/Empty.svelte';
    import { Card } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Empty',
        component: Empty
    };
</script>

<script>
    import { Button } from '$lib/button/index.js';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Card.Base padding="none">
        <Empty {...args}>
            <svelte:fragment slot="actions">
                <Button size="small" variant="text">Documentation</Button>
                <Button size="small" variant="secondary">Create XYZ</Button>
            </svelte:fragment>
        </Empty>
    </Card.Base>
</Template>

<Story
    name="Primary"
    args={{
        type: 'primary',
        title: 'Create your first XYZ',
        description: 'Need a hand? Learn more in our documentation.'
    }}
/>

<Story
    name="Secondary"
    args={{
        type: 'secondary',
        title: 'Sorry, we couldn’t find ‘[xyz]’',
        description: 'There are no things that match your search.'
    }}
/>
