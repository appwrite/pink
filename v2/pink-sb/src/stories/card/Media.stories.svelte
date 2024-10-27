<script context="module" lang="ts">
    import { Card } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Card/Media',
        component: Card.Media,
        args: {
            title: 'Title',
            src: 'https://unsplash.it/250',
            alt: 'Placeholder image',
            description: 'New This is a very long description that should be truncated',
            width: '150'
        }
    };
</script>

<script>
    import { IconDotsHorizontal } from '@appwrite.io/pink-icons-svelte';
    import { Story } from '@storybook/addon-svelte-csf';
    import Button from '$lib/button/Button.svelte';
    import Icon from '$lib/Icon.svelte';
</script>

<Story name="Default" let:args>
    <Card.Button style="max-width: 18rem" padding="xs">
        <Card.Media {...args}></Card.Media>
    </Card.Button>
</Story>
<Story name="Menu" let:args>
    <Card.Button style="max-width: 18rem" padding="xs">
        <Card.Media {...args}>
            <Button variant="text" icon size="s">
                <Icon icon={IconDotsHorizontal} size="s" />
            </Button>
        </Card.Media>
    </Card.Button>
</Story>
<Story name="Badge" let:args>
    <Card.Button style="max-width: 18rem" padding="xs">
        <Card.Media
            {...args}
            badge={{
                content: 'New',
                show: true
            }}
        >
            <Button variant="text" icon size="s">
                <Icon icon={IconDotsHorizontal} size="s" />
            </Button>
        </Card.Media>
    </Card.Button>
</Story>
