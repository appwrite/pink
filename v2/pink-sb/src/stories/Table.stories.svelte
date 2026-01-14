<script context="module" lang="ts">
    import { Layout, Table } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Table'
    };
</script>

<script lang="ts">
    import Avatar from '$lib/avatar/Avatar.svelte';
    import {
        Button,
        Badge,
        Dialog,
        Alert,
        Tag,
        Icon,
        Status,
        Typography,
        ActionMenu,
        type TableColumn
    } from '$lib/index.js';
    import { Story } from '@storybook/addon-svelte-csf';
    import {
        IconDuplicate,
        IconPencil,
        IconTrash,
        IconArrowRight,
        IconChevronDoubleRight
    } from '@appwrite.io/pink-icons-svelte';
    import Stack from '$lib/layout/Stack.svelte';

    const columns: Array<TableColumn> = [
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

    const modalColumns: Array<TableColumn> = [
        {
            id: 'first',
            width: 150
        },
        {
            id: 'second',
            width: 150
        },
        {
            id: 'third',
            width: {
                min: 200
            }
        }
    ];

    const virtualColumns: Array<TableColumn> = Array(10000)
        .keys()
        .toArray()
        .map((index) => ({
            id: index.toString(),
            width: index.toString().length * 6
        }));

    let showDialog = false;
    let showCopySubmenu = false;
    let showPermissionsSubmenu = false;
</script>

<style>
    .menu-row {
        position: relative;
    }

    .menu.subMenu {
        position: absolute;
        top: 0;
        left: 100%;
        margin-left: 4px;
        z-index: 10000;
    }
</style>

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
        <Table.Row.Base {root} id="etsum" select="disabled">
            <Table.Cell column="first" {root}>Disabled</Table.Cell>
            <Table.Cell column="second" {root}></Table.Cell>
            <Table.Cell column="third" {root}></Table.Cell>
        </Table.Row.Base>
        <Table.Row.Base {root} id="dora" select="hidden">
            <Table.Cell column="first" {root}>Hidden</Table.Cell>
            <Table.Cell column="second" {root}></Table.Cell>
            <Table.Cell column="third" {root}></Table.Cell>
        </Table.Row.Base>
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

<Story name="Virtual with checkboxes">
    <Table.VirtualRoot allowSelection columns={virtualColumns} let:root let:virtualizer>
        <svelte:fragment slot="header" let:root let:virtualizer>
            {#each virtualizer.getVirtualItems() as item (item.index)}
                {@const column = virtualColumns[item.index]}
                <Table.VirtualCell virtualItem={item} column={column.id} {root}>
                    {column.id}
                </Table.VirtualCell>
            {/each}
        </svelte:fragment>
        {#each Array(12).keys() as row (row)}
            <Table.Row.Link href="#" {root} id={row.toString()}>
                {#each virtualizer.getVirtualItems() as item (item.index)}
                    {@const column = virtualColumns[item.index]}
                    <Table.VirtualCell column={column.id} virtualItem={item} {root}>
                        {column.id}
                    </Table.VirtualCell>
                {/each}
            </Table.Row.Link>
        {/each}
    </Table.VirtualRoot>
</Story>

<Story name="In a Dialog">
    <Button.Button
        variant="secondary"
        size="xs"
        on:click={() => {
            showDialog = true;
        }}>Show</Button.Button
    >

    <Dialog title="Table inside dialog" bind:open={showDialog}>
        <Stack direction="column" gap="l">
            <Table.Root columns={modalColumns} let:root>
                <svelte:fragment slot="header" let:root>
                    <Table.Header.Cell column="first" {root}>Lorem</Table.Header.Cell>
                    <Table.Header.Cell column="second" {root}>Ipsum</Table.Header.Cell>
                    <Table.Header.Cell column="third" {root}>Dolor</Table.Header.Cell>
                </svelte:fragment>
                <Table.Row.Base {root}>
                    <Table.Cell column="first" {root}>Lorem</Table.Cell>
                    <Table.Cell column="second" {root}>Ipsum</Table.Cell>
                    <Table.Cell column="third" {root}>Dolor Dolor Dolor Dolor</Table.Cell>
                </Table.Row.Base>
                <Table.Row.Base {root}>
                    <Table.Cell column="first" {root}>Lorem</Table.Cell>
                    <Table.Cell column="second" {root}>Ipsum</Table.Cell>
                    <Table.Cell column="third" {root}>Dolor Dolor Dolor Dolor</Table.Cell>
                </Table.Row.Base>
                <Table.Row.Base {root}>
                    <Table.Cell column="first" {root}>Lorem</Table.Cell>
                    <Table.Cell column="second" {root}>Ipsum</Table.Cell>
                    <Table.Cell column="third" {root}>Dolor Dolor Dolor Dolor</Table.Cell>
                </Table.Row.Base>
            </Table.Root>

            <Alert.Inline
                >This data is read-only! To make changes to this data, contact the back office.</Alert.Inline
            >
        </Stack>
    </Dialog>
</Story>

<Story name="Context menu">
    <Table.Root {columns} let:root enableContextMenu>
        <svelte:fragment slot="header" let:root>
            <Table.Header.Cell column="first" {root}>User ID</Table.Header.Cell>
            <Table.Header.Cell column="second" {root}>Name</Table.Header.Cell>
            <Table.Header.Cell column="third" {root}>Status</Table.Header.Cell>
        </svelte:fragment>

        {#each ['row-1', 'row-2', 'row-3'] as rowId}
            <Table.Row.Base {root} id={rowId}>
                <Table.Cell column="first" {root} id={rowId}>
                    {rowId}
                </Table.Cell>
                <Table.Cell column="second" {root} id={rowId}>
                    Jane Doe
                </Table.Cell>
                <Table.Cell column="third" {root} id={rowId}>
                    <Status status="pending" label="Pending" />
                </Table.Cell>
            </Table.Row.Base>
        {/each}

        <svelte:fragment slot="contextmenu" let:rowId>
            <ActionMenu.Root>
                <ActionMenu.Item.Button
                    leadingIcon={IconPencil}
                    on:click={() => {
                        // eslint-disable-next-line no-console
                        console.log('Update row', rowId);
                    }}
                >
                    Update row
                </ActionMenu.Item.Button>
                <ActionMenu.Item.Button
                    leadingIcon={IconDuplicate}
                    on:click={() => {
                        // eslint-disable-next-line no-console
                        console.log('Duplicate row', rowId);
                    }}
                >
                    Duplicate row
                </ActionMenu.Item.Button>

                <div class="menu-row" role="presentation">
                    <ActionMenu.Item.Button
                        leadingIcon={IconArrowRight}
                        trailingIcon={IconChevronDoubleRight}
                        on:mouseenter={() => (showPermissionsSubmenu = true)}
                        on:mouseleave={() => (showPermissionsSubmenu = false)}
                    >
                        Manage permissions
                    </ActionMenu.Item.Button>

                    {#if showPermissionsSubmenu}
                        <div class="menu subMenu" role="presentation">
                            <ActionMenu.Root width="200px" noPadding>
                                <ActionMenu.Item.Button
                                    on:click={() => {
                                        // eslint-disable-next-line no-console
                                        console.log('Set Owner', rowId);
                                        showPermissionsSubmenu = false;
                                    }}
                                >
                                    Owner
                                </ActionMenu.Item.Button>
                                <ActionMenu.Item.Button
                                    on:click={() => {
                                        // eslint-disable-next-line no-console
                                        console.log('Set Editor', rowId);
                                        showPermissionsSubmenu = false;
                                    }}
                                >
                                    Editor
                                </ActionMenu.Item.Button>
                                <ActionMenu.Item.Button
                                    on:click={() => {
                                        // eslint-disable-next-line no-console
                                        console.log('Set Viewer', rowId);
                                        showPermissionsSubmenu = false;
                                    }}
                                >
                                    Viewer
                                </ActionMenu.Item.Button>
                            </ActionMenu.Root>
                        </div>
                    {/if}
                </div>

                <div class="menu-row" role="presentation">
                    <ActionMenu.Item.Button
                        leadingIcon={IconDuplicate}
                        trailingIcon={IconChevronDoubleRight}
                        on:mouseenter={() => (showCopySubmenu = true)}
                        on:mouseleave={() => (showCopySubmenu = false)}
                    >
                        Copy
                    </ActionMenu.Item.Button>

                    {#if showCopySubmenu}
                        <div class="menu subMenu" role="presentation">
                            <ActionMenu.Root width="160px" noPadding>
                                <ActionMenu.Item.Button
                                    on:click={() => {
                                        // eslint-disable-next-line no-console
                                        console.log('Copy JSON', rowId);
                                        showCopySubmenu = false;
                                    }}
                                >
                                    JSON
                                </ActionMenu.Item.Button>
                                <ActionMenu.Item.Button
                                    on:click={() => {
                                        // eslint-disable-next-line no-console
                                        console.log('Copy Code snippet', rowId);
                                        showCopySubmenu = false;
                                    }}
                                >
                                    Code snippet
                                </ActionMenu.Item.Button>
                            </ActionMenu.Root>
                        </div>
                    {/if}
                </div>

                <ActionMenu.Item.Button
                    status="danger"
                    leadingIcon={IconTrash}
                    on:click={() => {
                        // eslint-disable-next-line no-console
                        console.log('Delete row', rowId);
                    }}
                >
                    Delete row
                </ActionMenu.Item.Button>
            </ActionMenu.Root>
        </svelte:fragment>
    </Table.Root>
</Story>


