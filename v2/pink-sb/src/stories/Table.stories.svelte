<script context="module" lang="ts">
    import { Layout, Table } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Table'
    };
</script>

<script lang="ts">
    import Avatar from '$lib/avatar/Avatar.svelte';
    import { Button, Badge, Tag, Icon, Status, Typography } from '$lib/index.js';
    import { Story } from '@storybook/addon-svelte-csf';
    import { IconDuplicate } from '@appwrite.io/pink-icons-svelte';
    import type { Column } from '$lib/table/index.ts';

    const columns: Array<Column> = [
        {
            id: 'first',
            enabled: true
        },
        {
            id: 'second',
            enabled: true
        },
        {
            id: 'third',
            enabled: true
        }
    ];
</script>

<Story name="Default">
    <Table.Root {columns} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell id="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell id="second" {root}>Ipsum</Table.Header.Cell>
            <Table.Header.Cell id="third" {root}>Dolor</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Base>
    </Table.Root>
</Story>

<Story name="Column sizing">
    <Table.Root
        columns={[
            {
                id: 'first',
                width: {
                    min: 200,
                    max: 400
                },
                enabled: true
            },
            {
                id: 'second',
                width: {
                    min: 200
                },
                enabled: true
            },
            { id: 'third', width: 40, enabled: true }
        ]}
        let:root
    >
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell id="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell id="second" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell id="third" {root} />
        </svelte:fragment>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>First</Table.Cell>
            <Table.Cell id="second" {root}>Second</Table.Cell>
            <Table.Cell id="third" {root}>...</Table.Cell>
        </Table.Row.Base>
    </Table.Root>
</Story>

<Story name="Variants">
    <Table.Root columns={[{ id: 'first', enabled: true }]} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell id="first" {root}>Lorem</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>
                <Layout.Stack direction="row" alignItems="center" gap="s">
                    <Avatar src="https://picsum.photos/id/237/200/200" size="xs" />
                    Torsten Dittmann
                </Layout.Stack>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>
                <Layout.Stack direction="row" alignItems="center" gap="s">
                    <Avatar src="https://picsum.photos/id/237/200/200" size="xs" />
                    <Layout.Stack gap="none">
                        <Typography.Caption variant="400">Text</Typography.Caption>
                        <Typography.Caption variant="400" color="--fgcolor-neutral-tertiary">
                            Secondary Text
                        </Typography.Caption>
                    </Layout.Stack>
                </Layout.Stack>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>
                <Button.Button variant="secondary" size="xs">Button</Button.Button>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>
                <Badge size="xs" variant="secondary" content="Badge" />
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>
                <Tag size="xs" variant="default">Content</Tag>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>
                <Tag size="xs" variant="code">
                    <Icon slot="start" size="s" icon={IconDuplicate} />
                    Content
                </Tag>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell id="first" {root}>
                <Status status="complete" label="Complete" />
            </Table.Cell>
        </Table.Row.Base>
    </Table.Root>
</Story>

<Story name="Links">
    <Table.Root {columns} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell id="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell id="second" {root}>Ipsum</Table.Header.Cell>
            <Table.Header.Cell id="third" {root}>Dolor</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Link {root} href="#">
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Link>
        <Table.Row.Link {root} href="#">
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Link>
        <Table.Row.Link {root} href="#">
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Link>
    </Table.Root>
</Story>

<Story name="Buttons">
    <Table.Root {columns} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell id="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell id="second" {root}>Ipsum</Table.Header.Cell>
            <Table.Header.Cell id="third" {root}>Dolor</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Button {root} on:click={() => alert('clicked')}>
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Button>
        <Table.Row.Button {root} on:click={() => alert('clicked')}>
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Button>
        <Table.Row.Button {root} on:click={() => alert('clicked')}>
            <Table.Cell id="first" {root}>Lorem</Table.Cell>
            <Table.Cell id="second" {root}>Ipsum</Table.Cell>
            <Table.Cell id="third" {root}>Dolor</Table.Cell>
        </Table.Row.Button>
    </Table.Root>
</Story>

<Story name="Checkboxes">
    <Table.Root {columns} let:root allowSelection>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell id="second" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell id="third" {root}>Ipsum</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Base {root} id="lorem">
            <Table.Cell id="second" {root}>Base</Table.Cell>
            <Table.Cell id="third" {root}>Ipsum</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Button on:click={() => alert('clicked')} {root} id="ipsum">
            <Table.Cell id="second" {root}>Button</Table.Cell>
            <Table.Cell id="third" {root}>Ipsum</Table.Cell>
        </Table.Row.Button>
        <Table.Row.Link {root} id="dolor" href="#">
            <Table.Cell id="second" {root}>Link</Table.Cell>
            <Table.Cell id="third" {root}>Ipsum</Table.Cell>
        </Table.Row.Link>
    </Table.Root>
</Story>
