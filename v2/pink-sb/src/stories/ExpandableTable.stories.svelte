<script context="module" lang="ts">
    import ExpandableTable from '$lib/ExpandableTable.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ExpandableTable',
        component: ExpandableTable,
        args: {
            showHeader: true
        }
    };
</script>

<script lang="ts">
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import type { ExpandableTableColumn, ExpandableTableRow } from '$lib/ExpandableTable.svelte';

    const columns: ExpandableTableColumn[] = [
        { id: 'service', title: 'Service', width: '2fr', align: 'left' },
        { id: 'usage', title: 'Usage', width: '2fr', align: 'left' },
        { id: 'price', title: 'Price', width: '1fr', align: 'right' }
    ];

    const billingData: ExpandableTableRow[] = [
        {
            id: 'base-plan',
            cells: {
                service: 'Base plan',
                price: '$15.00'
            },
            expandable: false
        },
        {
            id: 'todo-list',
            cells: {
                service: 'Todo list',
                usage: '',
                price: '$0.00'
            },
            expandable: true,
            open: false,
            children: []
        },
        {
            id: 'saas-dashboard-1',
            cells: {
                service: 'SaaS dashboard',
                usage: '',
                price: '$15.00'
            },
            expandable: true,
            open: false,
            children: [
                {
                    id: 'bandwidth-1',
                    cells: {
                        service: 'Bandwidth',
                        usage: '40,102 / 175,000',
                        price: '$10'
                    }
                },
                {
                    id: 'users-1',
                    cells: {
                        service: 'Users',
                        usage: '100,109 / 200,000',
                        price: '$0'
                    }
                },
                {
                    id: 'db-reads-1',
                    cells: {
                        service: 'Databases reads',
                        usage: '195,933 / 175,000',
                        price: '$10'
                    }
                },
                {
                    id: 'db-writes-1',
                    cells: {
                        service: 'Databases writes',
                        usage: '195,933 / 175,000',
                        price: '$10'
                    }
                },
                {
                    id: 'executions-1',
                    cells: {
                        service: 'Executions',
                        usage: '2,007,939 / 3,500,000',
                        price: '$0'
                    }
                },
                {
                    id: 'storage-1',
                    cells: {
                        service: 'Storage',
                        usage: '125 GB / 150 GB',
                        price: '$0'
                    }
                },
                {
                    id: 'gb-hours-1',
                    cells: {
                        service: 'GB-hours',
                        usage: '902 GB / 1,000 GB',
                        price: '$0'
                    }
                },
                {
                    id: 'phone-otp-1',
                    cells: {
                        service: 'Phone OTP',
                        usage: '40,102 SMS messages',
                        price: '$8.40'
                    }
                }
            ]
        },
        {
            id: 'saas-dashboard-2',
            cells: {
                service: 'SaaS dashboard',
                usage: '',
                price: '$15.00'
            },
            expandable: true,
            open: false,
            children: [
                {
                    id: 'bandwidth-2',
                    cells: {
                        service: 'Bandwidth',
                        usage: '40,102 / 175,000',
                        price: '$10'
                    }
                },
                {
                    id: 'users-2',
                    cells: {
                        service: 'Users',
                        usage: '100,109 / 200,000',
                        price: '$0'
                    }
                }
            ]
        },
        {
            id: 'usage-details',
            cells: {
                service: 'Usage details',
                usage: '',
                price: ''
            },
            expandable: true,
            open: false,
            children: [
                {
                    id: 'another-saas',
                    cells: {
                        service: 'SaaS dashboard',
                        usage: '',
                        price: '$15.00'
                    }
                }
            ]
        },
        // total shown as a final non-expandable row inside the table
        {
            id: 'total-row',
            cells: {
                service: 'Total',
                usage: '',
                price: '$40.00'
            },
            expandable: false
        }
    ];

    let data = billingData;

    function handleToggle(event: CustomEvent<{ rowId: string; open: boolean }>) {
        console.log('Row toggled:', event.detail);
    }
</script>

<Template let:args>
    <ExpandableTable {...args} />
</Template>

<Story name="Billing Example" let:args>
    <ExpandableTable {...args} {columns} showHeader={false} rows={data} on:toggle={handleToggle} />
</Story>

<Story name="Simple Example" let:args>
    <ExpandableTable
        {...args}
        columns={[
            { id: 'name', title: 'Name', align: 'left' },
            { id: 'value', title: 'Value', align: 'right' }
        ]}
        rows={[
            {
                id: 'parent1',
                cells: { name: 'Parent Item 1', value: '100' },
                expandable: true,
                open: false,
                children: [
                    { id: 'child1', cells: { name: 'Child Item 1', value: '50' } },
                    { id: 'child2', cells: { name: 'Child Item 2', value: '50' } }
                ]
            },
            {
                id: 'parent2',
                cells: { name: 'Parent Item 2', value: '200' },
                expandable: false
            }
        ]}
        on:toggle={handleToggle}
    />
</Story>

<Story name="With Badges" let:args>
    <ExpandableTable
        {...args}
        columns={[
            { id: 'service', title: 'Service', align: 'left' },
            { id: 'status', title: 'Status', align: 'center' },
            { id: 'amount', title: 'Amount', align: 'right' }
        ]}
        rows={[
            {
                id: 'service1',
                cells: { service: 'Premium Service', status: 'Active', amount: '$29.99' },
                expandable: true,
                open: false,
                badge: { content: 'NEW', type: 'success' },
                children: [
                    {
                        id: 'feature1',
                        cells: { service: 'Feature A', status: 'Included', amount: '$0.00' }
                    },
                    {
                        id: 'feature2',
                        cells: { service: 'Feature B', status: 'Included', amount: '$0.00' }
                    }
                ]
            },
            {
                id: 'service2',
                cells: { service: 'Basic Service', status: 'Active', amount: '$9.99' },
                expandable: false,
                badge: { content: 'LEGACY', type: 'warning' }
            }
        ]}
        on:toggle={handleToggle}
    />
</Story>
