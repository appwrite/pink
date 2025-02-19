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
            <slot name="media" />
            <svelte:fragment slot="actions">
                <Button size="s" variant="text">Documentation</Button>
                <Button size="s" variant="secondary">Create XYZ</Button>
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

<Story
    name="Media"
    args={{
        type: 'primary',
        title: 'No results found',
        description: 'Your search did not match any results.'
    }}
>
    <Card.Base padding="none">
        <Empty src="https://unsplash.it/1079/235" title="Empty with a placeholder image">
            <span slot="description">Your search did not match any results.</span>
            <svelte:fragment slot="actions">
                <Button size="s" variant="text">Documentation</Button>
                <Button size="s" variant="secondary">Create XYZ</Button>
            </svelte:fragment>
        </Empty>
    </Card.Base>
</Story>
