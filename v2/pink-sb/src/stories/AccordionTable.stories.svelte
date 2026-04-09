<script context="module" lang="ts">
    import { AccordionTable, Typography, Badge } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/AccordionTable'
    };
</script>

<script lang="ts">
    import Layout from '$lib/layout/index.js';
    import { Story } from '@storybook/addon-svelte-csf';

    type Column = {
        id: string;
        align?: 'left' | 'center' | 'right';
        width?:
            | {
                  min: number;
                  max: number;
              }
            | {
                  min: number;
              }
            | number;
    };
    type Row = {
        id: string;
        cells: Record<string, string>;
        expandable?: boolean;
        children?: Array<{ id: string; cells: Record<string, string> }>;
        badge?: { content: string; type?: 'success' | 'warning' | 'error' };
    };

    const billingColumns: Column[] = [
        { id: 'service', align: 'left', width: 460 },
        { id: 'usage', align: 'left', width: 288 },
        { id: 'price', align: 'right' }
    ];

    const billingData: Row[] = [
        {
            id: 'base-plan',
            cells: {
                service: 'Base plan',
                price: '$15.00'
            },
            expandable: false
        },

        {
            id: 'saas-dashboard-1',
            cells: {
                service: 'SaaS dashboard',
                usage: '',
                price: '$15.00'
            },
            expandable: true,
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

    const simpleColumns: Column[] = [
        { id: 'name', align: 'left' },
        { id: 'value', align: 'right' }
    ];

    const simpleData: Row[] = [
        {
            id: 'parent1',
            cells: { name: 'Parent Item 1', value: '100' },
            expandable: true,
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
    ];

    const badgeColumns: Column[] = [
        { id: 'service', align: 'left' },
        { id: 'status', align: 'center' },
        { id: 'amount', align: 'right' }
    ];

    const badgeRows: Row[] = [
        {
            id: 'service1',
            cells: { service: 'Premium Service', status: 'Active', amount: '$29.99' },
            expandable: true,
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
    ];

    const calculateProgress = (row: Row): string => {
        if (!row.expandable || !row.children) {
            return '';
        }

        let totalUsed = 0;
        let totalAvailable = 0;

        for (const child of row.children) {
            const usage = child.cells.usage;
            if (usage && usage.includes('/')) {
                const parts = usage.split('/').map((p) => parseInt(p.trim().replace(/,/g, ''), 10));
                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    totalUsed += parts[0];
                    totalAvailable += parts[1];
                }
            }
        }

        if (totalAvailable === 0) {
            return '';
        }

        const percentage = Math.round((totalUsed / totalAvailable) * 100);
        return `${percentage}%`;
    };
</script>

<Story name="Billing Example">
    <AccordionTable.Root columns={billingColumns} let:root>
        {#each billingData as row, rowIndex (row.id)}
            <AccordionTable.Row {root} id={row.id} expandable={row.expandable ?? false}>
                <AccordionTable.Cell {root} column="service">
                    <Typography.Text
                        variant={rowIndex === billingData.length - 1 ? 'm-500' : 'm-400'}
                        color={rowIndex === billingData.length - 1
                            ? '--fgcolor-neutral-primary'
                            : '--fgcolor-neutral-secondary'}
                    >
                        {row.cells.service ?? ''}
                    </Typography.Text>
                    {#if row.badge}
                        <Badge
                            size="xs"
                            variant="secondary"
                            type={row.badge.type}
                            content={row.badge.content}
                        />
                    {/if}
                </AccordionTable.Cell>

                <!-- usage -->
                <AccordionTable.Cell {root} column="usage">
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {row.cells.usage ?? ''}
                    </Typography.Text>
                </AccordionTable.Cell>

                <!-- price -->
                <AccordionTable.Cell {root} column="price">
                    <Typography.Text
                        variant={rowIndex === billingData.length - 1 ? 'm-500' : 'm-400'}
                        color={rowIndex === billingData.length - 1
                            ? '--fgcolor-neutral-primary'
                            : '--fgcolor-neutral-secondary'}
                    >
                        {row.cells.price ?? ''}
                    </Typography.Text>
                </AccordionTable.Cell>

                <svelte:fragment slot="summary" let:root>
                    {#if row.children && row.children.length}
                        {#each row.children as child (child.id)}
                            <AccordionTable.Summary.Row {root}>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="service"
                                    alignment="middle-start"
                                >
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.service ?? ''}
                                    </Typography.Text>
                                </AccordionTable.Summary.Cell>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="usage"
                                    alignment="middle-start"
                                >
                                    <Layout.Stack direction="row" justifyContent="space-between">
                                        <Typography.Text
                                            variant="m-400"
                                            color="--fgcolor-neutral-secondary"
                                        >
                                            {calculateProgress(row)}
                                        </Typography.Text>
                                        <Typography.Text
                                            variant="m-400"
                                            color="--fgcolor-neutral-secondary"
                                        >
                                            {child.cells.usage ?? ''}
                                        </Typography.Text>
                                    </Layout.Stack>
                                </AccordionTable.Summary.Cell>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="price"
                                    alignment="middle-end"
                                >
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.price ?? ''}
                                    </Typography.Text>
                                </AccordionTable.Summary.Cell>
                            </AccordionTable.Summary.Row>
                        {/each}
                    {/if}
                </svelte:fragment>
            </AccordionTable.Row>
        {/each}
    </AccordionTable.Root>
</Story>

<Story name="Simple Example">
    <AccordionTable.Root columns={simpleColumns} let:root>
        {#each simpleData as rows (rows.id)}
            <AccordionTable.Row {root} id={rows.id} expandable={rows.expandable ?? false}>
                <AccordionTable.Cell {root} column="name">
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.name}
                    </Typography.Text>
                </AccordionTable.Cell>
                <AccordionTable.Cell {root} column="value">
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.value}
                    </Typography.Text>
                </AccordionTable.Cell>

                <svelte:fragment slot="summary" let:root>
                    {#if rows.children}
                        {#each rows.children as child}
                            <AccordionTable.Summary.Row {root}>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="name"
                                    alignment="middle-start"
                                >
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.name}
                                    </Typography.Text>
                                </AccordionTable.Summary.Cell>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="value"
                                    alignment="middle-end"
                                >
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.value}
                                    </Typography.Text>
                                </AccordionTable.Summary.Cell>
                            </AccordionTable.Summary.Row>
                        {/each}
                    {/if}
                </svelte:fragment>
            </AccordionTable.Row>
        {/each}
    </AccordionTable.Root>
</Story>

<Story name="With Badges">
    <AccordionTable.Root columns={badgeColumns} let:root>
        {#each badgeRows as rows (rows.id)}
            <AccordionTable.Row {root} id={rows.id} expandable={rows.expandable ?? false}>
                <AccordionTable.Cell {root} column="service">
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
                </AccordionTable.Cell>
                <AccordionTable.Cell {root} column="status">
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.status}
                    </Typography.Text>
                </AccordionTable.Cell>
                <AccordionTable.Cell {root} column="amount">
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                        {rows.cells.amount}
                    </Typography.Text>
                </AccordionTable.Cell>

                <svelte:fragment slot="summary" let:root>
                    {#if rows.children}
                        {#each rows.children as child}
                            <AccordionTable.Summary.Row {root}>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="service"
                                    alignment="middle-start"
                                >
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.service}
                                    </Typography.Text>
                                </AccordionTable.Summary.Cell>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="status"
                                    alignment="middle-middle"
                                >
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.status}
                                    </Typography.Text>
                                </AccordionTable.Summary.Cell>
                                <AccordionTable.Summary.Cell
                                    {root}
                                    column="amount"
                                    alignment="middle-end"
                                >
                                    <Typography.Text
                                        variant="m-400"
                                        color="--fgcolor-neutral-secondary"
                                    >
                                        {child.cells.amount}
                                    </Typography.Text>
                                </AccordionTable.Summary.Cell>
                            </AccordionTable.Summary.Row>
                        {/each}
                    {/if}
                </svelte:fragment>
            </AccordionTable.Row>
        {/each}
    </AccordionTable.Root>
</Story>
