<script context="module" lang="ts">
    import { Expandable as ExpandableTable, Typography, Badge } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ExpandableTable'
    };
</script>

<script lang="ts">
    import { Story } from '@storybook/addon-svelte-csf';

    export interface ExpandableTableColumn {
        id: string;
        title: string;
        width?: string;
        align?: 'left' | 'center' | 'right';
    }

    export interface ExpandableTableRow {
        id: string;
        cells: Record<string, string>;
        expandable?: boolean;
        open?: boolean;
        children?: ExpandableTableRow[];
        badge?: {
            content: string;
            type?: 'success' | 'warning' | 'error';
        };
    }

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
</script>

<Story name="Billing Example">
    <ExpandableTable.Root {columns} showHeader={false} let:root>
        {#each data as row, rowIndex (row.id)}
            <ExpandableTable.Row {root} id={row.id} expandable={row.expandable ?? false}>
                {#each columns as col, colIndex}
                    <ExpandableTable.Cell
                        {root}
                        column={col.id}
                        expandable={row.expandable ?? false}
                        isOpen={root.isOpen(row.id)}
                        toggle={() => root.toggle(row.id)}
                    >
                        <Typography.Text
                            variant={rowIndex === data.length - 1 ? 'm-500' : 'm-400'}
                            color={rowIndex === data.length - 1
                                ? '--fgcolor-neutral-primary'
                                : '--fgcolor-neutral-secondary'}
                        >
                            {row.cells?.[col.id] ?? ''}
                        </Typography.Text>
                        {#if row.badge && colIndex === 0}
                            <Badge
                                size="xs"
                                variant="secondary"
                                type={row.badge.type}
                                content={row.badge.content}
                            />
                        {/if}
                    </ExpandableTable.Cell>
                {/each}

                <svelte:fragment slot="summary">
                    {#if row.children}
                        {#each row.children as child (child.id)}
                            <div
                                class="child-row"
                                style="grid-template-columns: {root.childGridTemplate};"
                            >
                                {#each columns as col}
                                    <div
                                        class="child-cell"
                                        style="justify-content: {root.alignment(col.align)};"
                                    >
                                        <Typography.Text
                                            variant="m-400"
                                            color="--fgcolor-neutral-secondary"
                                        >
                                            {child.cells?.[col.id] ?? ''}
                                        </Typography.Text>
                                    </div>
                                {/each}
                            </div>
                        {/each}
                    {/if}
                </svelte:fragment>
            </ExpandableTable.Row>
        {/each}
    </ExpandableTable.Root>
</Story>

<Story name="Simple Example">
    <ExpandableTable.Root
        columns={[
            { id: 'name', title: 'Name', align: 'left' },
            { id: 'value', title: 'Value', align: 'right' }
        ]}
        let:root
    >
        {#each [{ id: 'parent1', cells: { name: 'Parent Item 1', value: '100' }, expandable: true, children: [{ id: 'child1', cells: { name: 'Child Item 1', value: '50' } }, { id: 'child2', cells: { name: 'Child Item 2', value: '50' } }] }, { id: 'parent2', cells: { name: 'Parent Item 2', value: '200' }, expandable: false }] as rows, i (rows.id)}
            <ExpandableTable.Row {root} id={rows.id} expandable={rows.expandable ?? false}>
                <ExpandableTable.Cell
                    {root}
                    column="name"
                    expandable={rows.expandable ?? false}
                    isOpen={root.isOpen(rows.id)}
                    toggle={() => root.toggle(rows.id)}
                >
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.name}
                    </Typography.Text>
                </ExpandableTable.Cell>
                <ExpandableTable.Cell
                    {root}
                    column="value"
                    expandable={rows.expandable ?? false}
                    isOpen={root.isOpen(rows.id)}
                    toggle={() => root.toggle(rows.id)}
                >
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.value}
                    </Typography.Text>
                </ExpandableTable.Cell>

                <svelte:fragment slot="summary">
                    {#if rows.children}
                        {#each rows.children as child}
                            <div
                                class="child-row"
                                style="grid-template-columns: {root.childGridTemplate};"
                            >
                                <div class="child-cell">
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.name}
                                    </Typography.Text>
                                </div>
                                <div class="child-cell" style="justify-content: flex-end;">
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.value}
                                    </Typography.Text>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </svelte:fragment>
            </ExpandableTable.Row>
        {/each}
    </ExpandableTable.Root>
</Story>

<Story name="With Badges">
    <ExpandableTable.Root
        columns={[
            { id: 'service', title: 'Service', align: 'left' },
            { id: 'status', title: 'Status', align: 'center' },
            { id: 'amount', title: 'Amount', align: 'right' }
        ]}
        let:root
    >
        {#each [{ id: 'service1', cells: { service: 'Premium Service', status: 'Active', amount: '$29.99' }, expandable: true, badge: { content: 'NEW', type: 'success' }, children: [{ id: 'feature1', cells: { service: 'Feature A', status: 'Included', amount: '$0.00' } }, { id: 'feature2', cells: { service: 'Feature B', status: 'Included', amount: '$0.00' } }] }, { id: 'service2', cells: { service: 'Basic Service', status: 'Active', amount: '$9.99' }, expandable: false, badge: { content: 'LEGACY', type: 'warning' } }] as rows (rows.id)}
            <ExpandableTable.Row {root} id={rows.id} expandable={rows.expandable ?? false}>
                <ExpandableTable.Cell
                    {root}
                    column="service"
                    expandable={rows.expandable ?? false}
                    isOpen={root.isOpen(rows.id)}
                    toggle={() => root.toggle(rows.id)}
                >
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.service}
                    </Typography.Text>
                    {#if rows.badge}
                        <Badge
                            size="xs"
                            variant="secondary"
                            type={rows.badge.type}
                            content={rows.badge.content}
                        />
                    {/if}
                </ExpandableTable.Cell>
                <ExpandableTable.Cell
                    {root}
                    column="status"
                    expandable={rows.expandable ?? false}
                    isOpen={root.isOpen(rows.id)}
                    toggle={() => root.toggle(rows.id)}
                >
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.status}
                    </Typography.Text>
                </ExpandableTable.Cell>
                <ExpandableTable.Cell
                    {root}
                    column="amount"
                    expandable={rows.expandable ?? false}
                    isOpen={root.isOpen(rows.id)}
                    toggle={() => root.toggle(rows.id)}
                >
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.amount}
                    </Typography.Text>
                </ExpandableTable.Cell>

                <svelte:fragment slot="summary">
                    {#if rows.children}
                        {#each rows.children as child}
                            <div
                                class="child-row"
                                style="grid-template-columns: {root.childGridTemplate};"
                            >
                                <div class="child-cell">
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.service}
                                    </Typography.Text>
                                </div>
                                <div class="child-cell" style="justify-content: center;">
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.status}
                                    </Typography.Text>
                                </div>
                                <div class="child-cell" style="justify-content: flex-end;">
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.amount}
                                    </Typography.Text>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </svelte:fragment>
            </ExpandableTable.Row>
        {/each}
    </ExpandableTable.Root>
</Story>
