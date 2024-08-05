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

<Story name="Primary" args={{ variant: 'primary' }}>
    <Table.Root>
        <svelte:fragment slot="header">
            <Table.Header>Lorem</Table.Header>
            <Table.Header>Ipsum</Table.Header>
            <Table.Header>Dolor</Table.Header>
        </svelte:fragment>
    </Table.Root>
</Story>
