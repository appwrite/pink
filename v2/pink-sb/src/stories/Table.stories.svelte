<script context="module" lang="ts">
    import { Layout, Table } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Table'
    };
</script>

<script>
    import Avatar from '$lib/avatar/Avatar.svelte';
    import { Selector, Button, Badge, Tag, Icon, Status, Typography } from '$lib/index.js';
    import { Story } from '@storybook/addon-svelte-csf';
    import { IconDuplicate } from '@appwrite.io/pink-icons-svelte';
</script>

<Story name="Default">
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </svelte:fragment>
        <Table.Row>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
    </Table.Root>
</Story>

<Story name="Variants">
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Cell>Lorem</Table.Cell>
        </svelte:fragment>
        <Table.Row>
            <Table.Cell>
                <Layout.Stack direction="row" alignItems="center" gap="s">
                    <Avatar src="https://picsum.photos/id/237/200/200" size="xs" />
                    Torsten Dittmann
                </Layout.Stack>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Layout.Stack direction="row" alignItems="center" gap="s">
                    <Avatar src="https://picsum.photos/id/237/200/200" size="xs" />
                    <Layout.Stack gap="none">
                        <Typography.Caption variant="400">Text</Typography.Caption>
                        <Typography.Caption variant="400" color="--color-fgcolor-neutral-tertiary">
                            Secondary Text
                        </Typography.Caption>
                    </Layout.Stack>
                </Layout.Stack>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Button.Button variant="secondary" size="xs">Button</Button.Button>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Badge size="xs" variant="secondary" content="Badge" />
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Tag size="xs" variant="default">Content</Tag>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Tag size="xs" variant="code">
                    <Icon slot="start" size="s" icon={IconDuplicate} />
                    Content
                </Tag>
            </Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Status status="complete" label="Complete" />
            </Table.Cell>
        </Table.Row>
    </Table.Root>
</Story>

<Story name="Links">
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Header.Cell>Lorem</Table.Header.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </svelte:fragment>
        <Table.Link href="#">
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Link>
        <Table.Link href="#">
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Link>
        <Table.Link href="#">
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Link>
    </Table.Root>
</Story>

<Story name="Buttons">
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Header.Cell>Lorem</Table.Header.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </svelte:fragment>
        <Table.Button on:click={() => alert('clicked')}>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Button>
        <Table.Button on:click={() => alert('clicked')}>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Button>
        <Table.Button on:click={() => alert('clicked')}>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Button>
    </Table.Root>
</Story>

<Story name="Checkboxes">
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Cell width="20px">
                <Selector.Checkbox size="s" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </svelte:fragment>
        <Table.Row>
            <Table.Cell>
                <Selector.Checkbox size="s" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Selector.Checkbox size="s" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Selector.Checkbox size="s" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
    </Table.Root>
</Story>

<Story name="Overflow">
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </svelte:fragment>
        <Table.Row>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
    </Table.Root>
</Story>
