<script context="module" lang="ts">
    import { Table } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Table'
    };
</script>

<script>
    import { Selector } from '$lib/index.js';
    import { Story } from '@storybook/addon-svelte-csf';
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

<Story name="Checkboxes">
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Cell width="20px">
                <Selector.Checkbox size="small" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </svelte:fragment>
        <Table.Row>
            <Table.Cell>
                <Selector.Checkbox size="small" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Selector.Checkbox size="small" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Selector.Checkbox size="small" />
            </Table.Cell>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
    </Table.Root>
</Story>
