<script context="module" lang="ts">
    import Icon from '$lib/Icon.svelte';
    import { Card, Layout } from '$lib/index.js';
    import Button from '$lib/button/Button.svelte';
    import { IconDotsHorizontal } from '@appwrite.io/pink-icons-svelte';

    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Grid',
        component: Layout.Grid,
        args: {
            gap: 'm'
        },
        argTypes: {
            direction: {
                options: ['column', 'row'],
                control: { type: 'select' }
            },
            gap: {
                options: ['none', 'xs', 's', 'm', 'l', 'xl'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default" args={{ direction: 'row' }} let:args>
    <Layout.Grid
        {...args}
        columnsXXS={1}
        columnsXS={2}
        columnsS={3}
        columns={4}
        columnsL={6}
        columnsXL={8}
    >
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
        <Card.Button padding="xxs">
            <Card.Media
                title="Title"
                src="https://picsum.photos/id/237/250"
                alt="Placeholder image"
                description="New This is a very long description that should be truncated"
                avatar
            >
                <Button variant="text" icon size="s">
                    <Icon icon={IconDotsHorizontal} size="s" />
                </Button>
            </Card.Media>
        </Card.Button>
    </Layout.Grid>
</Story>
