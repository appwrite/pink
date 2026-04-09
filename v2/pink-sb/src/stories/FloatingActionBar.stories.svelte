<script context="module" lang="ts">
    import { FloatingActionBar, Table } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/FloatingActionBar',
        component: FloatingActionBar
    };
</script>

<script lang="ts">
    import { Badge, type TableColumn } from '$lib/index.js';
    import { Button } from '$lib/button/index.js';
    import { Story } from '@storybook/addon-svelte-csf';

    let count = 50;
    let selectedRows: string[] = [];

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
</script>

<div class="wrapper">
    <Story name="Default">
        <Table.Root {columns} let:root allowSelection bind:selectedRows>
            <svelte:fragment slot="header" let:root>
                <Table.Header.Cell column="first" {root}>Lorem</Table.Header.Cell>
                <Table.Header.Cell column="second" {root}>Ipsum</Table.Header.Cell>
                <Table.Header.Cell column="third" {root}>Dolor</Table.Header.Cell>
            </svelte:fragment>

            {#each Array.from({ length: count }).keys() as i}
                <Table.Row.Base {root} id={`lorem-${i}`}>
                    <Table.Cell column="first" {root}>Row {i + 1} - Lorem</Table.Cell>
                    <Table.Cell column="second" {root}>Row {i + 1} - Ipsum</Table.Cell>
                    <Table.Cell column="third" {root}>Row {i + 1} - Dolor</Table.Cell>
                </Table.Row.Base>
            {/each}
        </Table.Root>

        {#if selectedRows.length > 0}
            <FloatingActionBar>
                <svelte:fragment slot="start">
                    <Badge content={selectedRows.length.toString()} />
                    <span>
                        {selectedRows.length > 1 ? 'documents' : 'document'}
                        selected
                    </span>
                </svelte:fragment>
                <svelte:fragment slot="end">
                    <Button size="s" variant="text" on:click={() => (selectedRows = [])}
                        >Cancel</Button
                    >
                    <Button
                        size="s"
                        variant="danger"
                        on:click={() => {
                            count = 0;
                            selectedRows = [];
                        }}>Delete</Button
                    >
                </svelte:fragment>
            </FloatingActionBar>
        {/if}
    </Story>
</div>

<style>
    .wrapper {
        height: 100px;
        position: relative;
    }
</style>
