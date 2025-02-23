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

    $: selectedIds = [];
    let tableItems = [
        { id: 1, name: 'Arman Nik', role: 'Product Engineer', location: 'Italy' },
        { id: 2, name: 'Darshan Pandya', role: 'Product Engineer', location: 'India' },
        { id: 3, name: 'Ernst Mulders', role: 'Product Engineer', location: 'Netherlands' },
        { id: 4, name: 'Torsten Dittmann', role: 'Product Architect', location: 'Germany' }
    ];
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
    <Layout.Stack direction="column" gap="l">
        {@const selectableIds = tableItems.map((item) => item.id.toString())}
        <Table.Root selection {selectableIds} bind:selectedIds>
            <svelte:fragment slot="header">
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>Role</Table.Cell>
                <Table.Cell>Location</Table.Cell>
            </svelte:fragment>

            {#each tableItems as tableItem}
                <!-- passing `id` is impt. here -->
                <Table.Row id={tableItem.id.toString()}>
                    <Table.Cell>{tableItem.name}</Table.Cell>
                    <Table.Cell>{tableItem.role}</Table.Cell>
                    <Table.Cell>{tableItem.location}</Table.Cell>
                </Table.Row>
            {/each}
        </Table.Root>

        <Typography.Caption variant="400">Selected IDs: {selectedIds.join(', ')}</Typography.Caption
        >

        <Typography.Caption variant="400"
            >Selected Persons: {selectedIds
                .map(
                    (selectedId) =>
                        tableItems.find((tableItem) => tableItem.id.toString() === selectedId)?.name
                )
                .join(', ')}</Typography.Caption
        >
    </Layout.Stack>
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
