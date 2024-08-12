<script context="module" lang="ts">
    import { Table } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Table'
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Primary">
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
        <Table.Row>
            <Table.Cell>Lorem</Table.Cell>
            <Table.Cell>Ipsum</Table.Cell>
            <Table.Cell>Dolor</Table.Cell>
        </Table.Row>
    </Table.Root>
</Story>
