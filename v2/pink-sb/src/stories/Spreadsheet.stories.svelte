<script context="module" lang="ts">
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Spreadsheet',
        parameters: { layout: 'fullscreen' }
    };
</script>

<script lang="ts">
    import Tag from '$lib/Tag.svelte';
    import Icon from '$lib/Icon.svelte';
    import { Story } from '@storybook/addon-svelte-csf';
    import type { Column } from '$lib/spreadsheet/index.ts';
    import { Button, Layout, Spreadsheet } from '$lib/index.js';
    import {
        IconCalendar,
        IconFingerPrint,
        IconPlus,
        IconText
    } from '@appwrite.io/pink-icons-svelte';
    import type { ComponentType } from 'svelte';

    type StoryColumn = Column & {
        meta?: {
            label?: string;
            icon?: ComponentType;
            isPrimary?: boolean;
            isAction?: boolean;
        };
    };

    const baseColumns: StoryColumn[] = [
        {
            id: 'id',
            meta: {
                label: 'ID',
                icon: IconFingerPrint,
                isPrimary: true
            }
        },
        {
            id: 'second',
            meta: {
                label: 'Ipsum',
                icon: IconText
            }
        },
        {
            id: 'third',
            meta: {
                label: 'Dolor',
                icon: IconCalendar
            }
        },
        {
            id: 'fourth',
            width: { min: 500 },
            resizable: false,
            meta: {
                label: 'Add',
                isAction: true
            }
        }
    ];

    let dynamicColumns: StoryColumn[] = [...baseColumns];
    let colCount = 1;

    function addNewColumn() {
        const newId = `col-${colCount++}`;
        const newCol: StoryColumn = {
            id: newId,
            meta: {
                label: `Column ${colCount - 1}`
            }
        };

        const insertIndex = dynamicColumns.findIndex((col) => col.id === 'fourth');
        dynamicColumns = [
            ...dynamicColumns.slice(0, insertIndex),
            newCol,
            ...dynamicColumns.slice(insertIndex)
        ];
    }
</script>

<Story name="Default">
    <Spreadsheet.Root columns={dynamicColumns} let:root allowSelection>
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell column={col.id} icon={col.meta?.icon} {root}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {col.meta.label}
                            <Tag selected size="s">Primary key</Tag>
                        </Layout.Stack>
                    {:else if col.meta?.isAction}
                        <Button.Button icon variant="extra-compact">
                            <Icon icon={IconPlus} color="--fgcolor-neutral-weak" />
                        </Button.Button>
                    {:else}
                        {col.meta?.label ?? col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each Array(3) as _, i}
            <Spreadsheet.Row.Base {root} id={`row-${i}`}>
                {#each dynamicColumns as col}
                    <Spreadsheet.Cell column={col.id} {root} value={`Row ${i + 1}`} />
                {/each}
            </Spreadsheet.Row.Base>
        {/each}
    </Spreadsheet.Root>
</Story>

<Story name="AddColumn">
    <Spreadsheet.Root columns={dynamicColumns} let:root allowSelection>
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell column={col.id} icon={col.meta?.icon} {root}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {col.meta.label}
                            <Tag selected size="s">Primary key</Tag>
                        </Layout.Stack>
                    {:else if col.meta?.isAction}
                        <Button.Button icon variant="extra-compact" on:click={addNewColumn}>
                            <Icon icon={IconPlus} color="--fgcolor-neutral-weak" />
                        </Button.Button>
                    {:else}
                        {col.meta?.label ?? col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each Array(3) as _, i}
            <Spreadsheet.Row.Base {root} id={`row-${i}`}>
                {#each dynamicColumns as col}
                    <Spreadsheet.Cell column={col.id} {root} value={`Row ${i + 1}`} />
                {/each}
            </Spreadsheet.Row.Base>
        {/each}
    </Spreadsheet.Root>
</Story>
