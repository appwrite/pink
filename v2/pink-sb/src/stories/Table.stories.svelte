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
            id: 'first'
        },
        {
            id: 'second'
        },
        {
            id: 'third'
        }
    ];

    const virtualColumns: Array<Column> = Array(10000)
        .keys()
        .toArray()
        .map((index) => ({
            id: index.toString(),
            width: index.toString().length * 6
        }));
</script>

<Story name="Default">
    <Table.Root {columns} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell column="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell column="second" {root}>Ipsum</Table.Header.Cell>
            <Table.Header.Cell column="third" {root}>Dolor</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Base>
    </Table.Root>
</Story>

<Story name="Auto Columns">
    <Table.Root columns={3} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell {root}>Ipsum</Table.Header.Cell>
            <Table.Header.Cell {root}>Dolor</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Base {root}>
            <Table.Cell {root}>Lorem</Table.Cell>
            <Table.Cell {root}>Ipsum</Table.Cell>
            <Table.Cell {root}>Dolor</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell {root}>Lorem</Table.Cell>
            <Table.Cell {root}>Ipsum</Table.Cell>
            <Table.Cell {root}>Dolor</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell {root}>Lorem</Table.Cell>
            <Table.Cell {root}>Ipsum</Table.Cell>
            <Table.Cell {root}>Dolor</Table.Cell>
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
                }
            },
            {
                id: 'second',
                width: {
                    min: 200
                }
            },
            { id: 'third', width: 40 }
        ]}
        let:root
    >
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell column="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell column="second" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell column="third" {root} />
        </svelte:fragment>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>First</Table.Cell>
            <Table.Cell column="second" {root}>Second</Table.Cell>
            <Table.Cell column="third" {root}>...</Table.Cell>
        </Table.Row.Base>
    </Table.Root>
</Story>

<Story name="Variants">
    <Table.Root columns={[{ id: 'first' }]} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell column="first" {root}>Lorem</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>
                <Layout.Stack direction="row" alignItems="center" gap="s">
                    <Avatar src="https://picsum.photos/id/237/200/200" size="xs" />
                    Torsten Dittmann
                </Layout.Stack>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>
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
            <Table.Cell column="first" {root}>
                <Button.Button variant="secondary" size="xs">Button</Button.Button>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>
                <Badge size="xs" variant="secondary" content="Badge" />
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>
                <Tag size="xs" variant="default">Content</Tag>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>
                <Tag size="xs" variant="code">
                    <Icon slot="start" size="s" icon={IconDuplicate} />
                    Content
                </Tag>
            </Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root}>
            <Table.Cell column="first" {root}>
                <Status status="complete" label="Complete" />
            </Table.Cell>
        </Table.Row.Base>
    </Table.Root>
</Story>

<Story name="Links">
    <Table.Root {columns} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell column="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell column="second" {root}>Ipsum</Table.Header.Cell>
            <Table.Header.Cell column="third" {root}>Dolor</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Link {root} href="#">
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Link>
        <Table.Row.Link {root} href="#">
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Link>
        <Table.Row.Link {root} href="#">
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Link>
    </Table.Root>
</Story>

<Story name="Buttons">
    <Table.Root {columns} let:root>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell column="first" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell column="second" {root}>Ipsum</Table.Header.Cell>
            <Table.Header.Cell column="third" {root}>Dolor</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Button {root} on:click={() => alert('clicked')}>
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Button>
        <Table.Row.Button {root} on:click={() => alert('clicked')}>
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Button>
        <Table.Row.Button {root} on:click={() => alert('clicked')}>
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Ipsum</Table.Cell>
            <Table.Cell column="third" {root}>Dolor</Table.Cell>
        </Table.Row.Button>
    </Table.Root>
</Story>

<Story name="Checkboxes">
    <Table.Root {columns} let:root allowSelection>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell column="first" {root}>First</Table.Header.Cell>
            <Table.Header.Cell column="second" {root}>Lorem</Table.Header.Cell>
            <Table.Header.Cell column="third" {root}>Ipsum</Table.Header.Cell>
        </svelte:fragment>
        <Table.Row.Base {root} id="lorem">
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Base</Table.Cell>
            <Table.Cell column="third" {root}>Ipsum</Table.Cell>
        </Table.Row.Base>
        <Table.Row.Button on:click={() => alert('clicked')} {root} id="ipsum">
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Button</Table.Cell>
            <Table.Cell column="third" {root}>Ipsum</Table.Cell>
        </Table.Row.Button>
        <Table.Row.Link {root} id="dolor" href="#">
            <Table.Cell column="first" {root}>Lorem</Table.Cell>
            <Table.Cell column="second" {root}>Link</Table.Cell>
            <Table.Cell column="third" {root}>Ipsum</Table.Cell>
        </Table.Row.Link>
    </Table.Root>
</Story>

<Story name="Virtual">
    <Table.VirtualRoot columns={virtualColumns} let:root let:virtualizer>
        <svelte:fragment slot="header" let:root let:virtualizer>
            {#each virtualizer.getVirtualItems() as item (item.index)}
                {@const column = virtualColumns[item.index]}
                <Table.VirtualCell virtualItem={item} column={column.id} {root}>
                    {column.id}
                </Table.VirtualCell>
            {/each}
        </svelte:fragment>
        {#each Array(12).keys() as row (row)}
            <Table.Row.Base {root}>
                {#each virtualizer.getVirtualItems() as item (item.index)}
                    {@const column = virtualColumns[item.index]}
                    <Table.VirtualCell column={column.id} virtualItem={item} {root}>
                        {column.id}
                    </Table.VirtualCell>
                {/each}
            </Table.Row.Base>
        {/each}
    </Table.VirtualRoot>
</Story>
