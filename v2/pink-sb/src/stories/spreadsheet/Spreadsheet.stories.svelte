<script context="module" lang="ts">
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Spreadsheet',
        parameters: { layout: 'fullscreen' }
    };
</script>

<script lang="ts">
    import { Story } from '@storybook/addon-svelte-csf';
    import {
        Spreadsheet,
        Button,
        Input,
        Layout,
        Modal,
        Popover,
        ActionMenu,
        Typography,
        Divider,
        Tooltip,
        Tag,
        Selector
    } from '$lib/index.js';
    import Stack from '$lib/layout/Stack.svelte';
    import Icon from '$lib/Icon.svelte';
    import {
        IconText,
        IconPlus,
        IconDotsHorizontal,
        IconPencil,
        IconArrowLeft,
        IconArrowRight,
        IconDuplicate,
        IconTrash,
        IconSortAscending,
        IconSortDescending
    } from '@appwrite.io/pink-icons-svelte';

    import {
        baseColumnsInternal,
        baseDataInternal,
        FAKE_ROW,
        getCellValue,
        setCellValue,
        type StoryColumn,
        generateRandomColumns,
        generateRandomRows,
        getRandomCellValue,
        type RandomRowData
    } from './helper.js';
    import Textarea from '$lib/input/Textarea.svelte';

    let showAddRowModal = false;
    let showAddColumnModal = false;
    let selectedRows: string[] = [];
    let columnName: string | null = null;
    let cellToEdit: string | null = null;

    let loading = false;

    let dynamicData = baseDataInternal;
    let dynamicColumns: StoryColumn[] = [...baseColumnsInternal];

    // Large dataset for performance testing
    let largeColumns: StoryColumn[] = generateRandomColumns(15);
    let largeData: RandomRowData[] = generateRandomRows(1000, largeColumns);

    function addNewColumn() {
        if (!columnName) return;
        const id =
            columnName.toLowerCase().replace(/\s+/g, '_') +
            '_' +
            Math.random().toString(36).slice(2, 5);
        const newColumn: StoryColumn = {
            id,
            width: { min: 150 },
            draggable: true,
            meta: { label: columnName, icon: IconText }
        };
        dynamicColumns = [
            ...dynamicColumns.slice(0, -1),
            newColumn,
            dynamicColumns[dynamicColumns.length - 1]
        ];
        columnName = null;
        showAddColumnModal = false;
    }
</script>

<Story name="Default">
    <Spreadsheet.Root let:root allowSelection bind:selectedRows bind:columns={dynamicColumns}>
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {col.id}
                        </Layout.Stack>
                    {:else if col.isAction}
                        <Button.Button
                            icon
                            variant="extra-compact"
                            on:click={() => (showAddColumnModal = true)}
                        >
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button.Button>
                    {:else}
                        {col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each dynamicData as row}
            <Spreadsheet.Row.Base {root} id={row.id}>
                {#each dynamicColumns as col}
                    <Spreadsheet.Cell
                        {root}
                        column={col.id}
                        value={getCellValue(row, col.id)}
                        isEditable={col.meta?.isPrimary !== true}
                    >
                        {#if col.isAction}
                            <Button.Button icon variant="extra-compact">
                                <Icon icon={IconDotsHorizontal} />
                            </Button.Button>
                        {:else}
                            <Typography.Text>{getCellValue(row, col.id)}</Typography.Text>
                        {/if}
                    </Spreadsheet.Cell>
                {/each}
            </Spreadsheet.Row.Base>
        {/each}

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                {selectedRows.length ? `${selectedRows.length} records selected` : `10 records`}
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<Story name="Column Actions">
    <Spreadsheet.Root let:root allowSelection bind:selectedRows bind:columns={dynamicColumns}>
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {col.id}
                        </Layout.Stack>
                    {:else if col.isAction}
                        <Button.Button
                            icon
                            variant="extra-compact"
                            on:click={() => (showAddColumnModal = true)}
                        >
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button.Button>
                    {:else}
                        {col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>
        {#each dynamicData as row}
            <Spreadsheet.Row.Base {root} id={row.id}>
                {#each dynamicColumns as col (row.id + col.id)}
                    <Popover let:toggle padding="none" placement="bottom">
                        <Spreadsheet.Cell
                            {root}
                            column={col.id}
                            value={getCellValue(row, col.id)}
                            isEditable={col.meta?.isPrimary !== true}
                            on:change={(event) => {
                                setCellValue(event.detail.value, row, col.id);
                            }}
                            on:contextmenu={(event) => {
                                toggle(event.detail.event);
                                cellToEdit = event.detail.id;
                            }}
                        >
                            {#if col.isAction}
                                <Button.Button icon variant="extra-compact">
                                    <Icon icon={IconDotsHorizontal} />
                                </Button.Button>
                            {:else}
                                <Typography.Text>{getCellValue(row, col.id)}</Typography.Text>
                            {/if}
                        </Spreadsheet.Cell>
                        <svelte:fragment slot="tooltip" let:showing let:hide>
                            {#if showing}
                                <ActionMenu.Root width="150px" noPadding>
                                    <ActionMenu.Item.Button
                                        leadingIcon={IconPencil}
                                        on:click={() => {
                                            hide();
                                            root.setEditing(cellToEdit);
                                        }}
                                        >Update
                                    </ActionMenu.Item.Button>
                                    <ActionMenu.Item.Button
                                        leadingIcon={IconArrowLeft}
                                        on:click={hide}
                                        >Insert column left
                                    </ActionMenu.Item.Button>
                                    <ActionMenu.Item.Button
                                        leadingIcon={IconArrowRight}
                                        on:click={hide}
                                        >Insert column right
                                    </ActionMenu.Item.Button>
                                    <ActionMenu.Item.Button
                                        leadingIcon={IconDuplicate}
                                        on:click={hide}
                                        >Duplicate
                                    </ActionMenu.Item.Button>
                                    <Divider />
                                    <ActionMenu.Item.Button leadingIcon={IconPencil} on:click={hide}
                                        >Create index
                                    </ActionMenu.Item.Button>
                                    <ActionMenu.Item.Button
                                        leadingIcon={IconSortAscending}
                                        on:click={hide}
                                        >Sort ascending
                                    </ActionMenu.Item.Button>
                                    <ActionMenu.Item.Button
                                        leadingIcon={IconSortDescending}
                                        on:click={hide}
                                        >Sort descending
                                    </ActionMenu.Item.Button>
                                    <Divider />
                                    <ActionMenu.Item.Button
                                        status="danger"
                                        leadingIcon={IconTrash}
                                        on:click={hide}
                                        >Delete
                                    </ActionMenu.Item.Button>
                                </ActionMenu.Root>
                            {/if}
                        </svelte:fragment>
                    </Popover>
                {/each}
            </Spreadsheet.Row.Base>
        {/each}
        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                {selectedRows.length
                    ? `${selectedRows.length} records selected`
                    : `${dynamicData.length} records`}
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<Story name="Add Column or Row">
    <Spreadsheet.Root
        let:root
        allowSelection
        bind:selectedRows
        bind:columns={dynamicColumns}
        bottomActionClick={() => (showAddRowModal = true)}
    >
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {col.id}
                        </Layout.Stack>
                    {:else if col.isAction}
                        <Button.Button
                            icon
                            variant="extra-compact"
                            on:click={() => (showAddColumnModal = true)}
                        >
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button.Button>
                    {:else}
                        {col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each dynamicData as row}
            <Spreadsheet.Row.Base {root} id={row.id}>
                {#each dynamicColumns as col}
                    <Spreadsheet.Cell
                        {root}
                        column={col.id}
                        value={getCellValue(row, col.id)}
                        isEditable={col.meta?.isPrimary !== true}
                    >
                        {#if col.isAction}
                            <Button.Button icon variant="extra-compact">
                                <Icon icon={IconDotsHorizontal} />
                            </Button.Button>
                        {:else}
                            <Typography.Text>{getCellValue(row, col.id)}</Typography.Text>
                        {/if}
                    </Spreadsheet.Cell>
                {/each}
            </Spreadsheet.Row.Base>
        {/each}

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                {selectedRows.length
                    ? `${selectedRows.length} records selected`
                    : `${dynamicData.length} records`}
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>

    <Modal size="s" title="Add a new column" bind:open={showAddColumnModal}>
        <Stack>
            Give the column a name and add it to the existing columns
            <Input.Text placeholder="New column name here" bind:value={columnName} />
        </Stack>
        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button.Button
                    size="s"
                    variant="text"
                    on:click={() => (showAddColumnModal = false)}
                >
                    Cancel
                </Button.Button>
                <Button.Button on:click={addNewColumn} size="s">Save</Button.Button>
            </Stack>
        </svelte:fragment>
    </Modal>

    <Modal size="s" title="Add a new row" bind:open={showAddRowModal}>
        <Typography.Text>
            Press Add below to quickly add a dummy row to your spreadsheet. The data will be
            pre-filled with sample values.
        </Typography.Text>

        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end" style="margin-top: 12px">
                <Button.Button
                    size="s"
                    variant="text"
                    type="button"
                    on:click={() => (showAddRowModal = false)}>Cancel</Button.Button
                >
                <Button.Button
                    size="s"
                    on:click={() => {
                        const newFakeRow = {
                            ...FAKE_ROW,
                            id: Math.random().toString(36).substring(2, 9)
                        };
                        dynamicData = [...dynamicData, newFakeRow];
                        showAddRowModal = false;
                    }}>Add</Button.Button
                >
            </Stack>
        </svelte:fragment>
    </Modal>
</Story>

<Story name="Empty Cells">
    <Spreadsheet.Root
        let:root
        emptyCells={12}
        allowSelection
        bind:selectedRows
        bind:columns={dynamicColumns}
    >
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {#if col.id === 'id'}
                                Document ID
                            {:else}
                                {col.id}
                            {/if}
                        </Layout.Stack>
                    {:else if col.isAction}
                        <Button.Button
                            icon
                            variant="extra-compact"
                            on:click={() => (showAddColumnModal = true)}
                        >
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button.Button>
                    {:else}
                        {col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each baseDataInternal.slice(0, 8) as row}
            <Spreadsheet.Row.Base {root} id={row.id}>
                {#each dynamicColumns as col}
                    <Spreadsheet.Cell
                        {root}
                        column={col.id}
                        isEditable={col.meta?.isPrimary !== true}
                        value={col.id === 'id' ? undefined : getCellValue(row, col.id)}
                    >
                        {#if col.isAction}
                            <Button.Button icon variant="extra-compact">
                                <Icon icon={IconDotsHorizontal} />
                            </Button.Button>
                        {:else if col.id === 'id'}
                            <Tooltip portal>
                                <Tag size="xs" variant="code">
                                    {getCellValue(row, col.id)}
                                </Tag>
                                <p class="tooltip" slot="tooltip" let:showing>
                                    {#if showing}
                                        {getCellValue(row, col.id)}
                                    {/if}
                                </p>
                            </Tooltip>
                        {:else}
                            <Typography.Text>{getCellValue(row, col.id)}</Typography.Text>
                        {/if}

                        <svelte:fragment slot="cell-editor">
                            {#if col.id === 'gender'}
                                <Input.Select
                                    value={getCellValue(row, col.id)}
                                    options={[
                                        {
                                            label: 'Male',
                                            value: 'male'
                                        },
                                        {
                                            label: 'Female',
                                            value: 'female'
                                        }
                                    ]}
                                />
                            {:else if col.id === 'dateOfBirth'}
                                <Input.DateTime />
                            {:else}
                                <Textarea value={getCellValue(row, col.id)} rows={3} />
                            {/if}
                        </svelte:fragment>
                    </Spreadsheet.Cell>
                {/each}
            </Spreadsheet.Row.Base>
        {/each}

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                3 records with empty cells filling remaining space
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<Story name="Loading sheet">
    <Spreadsheet.Root
        let:root
        {loading}
        emptyCells={60}
        allowSelection
        bind:selectedRows
        bind:columns={dynamicColumns}
        on:columnsSwap={(order) => {
            console.log(order.detail);
        }}
    >
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {#if col.id === 'id'}
                                Document ID
                            {:else}
                                {col.id}
                            {/if}
                        </Layout.Stack>
                    {:else if col.isAction}
                        <Button.Button
                            icon
                            variant="extra-compact"
                            on:click={() => (showAddColumnModal = true)}
                        >
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button.Button>
                    {:else}
                        {col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each baseDataInternal.slice(0, 2) as row}
            <Spreadsheet.Row.Base {root} id={row.id} select="disabled">
                {#each dynamicColumns as col}
                    <Spreadsheet.Cell
                        {root}
                        column={col.id}
                        isEditable={col.meta?.isPrimary !== true}
                        value={col.id === 'id' ? undefined : getCellValue(row, col.id)}
                        on:change={(event) => {
                            setCellValue(event.detail.value, row, col.id);
                        }}
                    >
                        {#if col.isAction}
                            <Button.Button icon variant="extra-compact">
                                <Icon icon={IconDotsHorizontal} />
                            </Button.Button>
                        {:else if col.id === 'id'}
                            <Tooltip portal>
                                <Tag size="xs" variant="code">
                                    {getCellValue(row, col.id)}
                                </Tag>
                                <p class="tooltip" slot="tooltip" let:showing>
                                    {#if showing}
                                        {getCellValue(row, col.id)}
                                    {/if}
                                </p>
                            </Tooltip>
                        {:else}
                            <Typography.Text>{getCellValue(row, col.id)}</Typography.Text>
                        {/if}
                    </Spreadsheet.Cell>
                {/each}
            </Spreadsheet.Row.Base>
        {/each}

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                <Selector.Switch
                    id="sheet-loading"
                    label="Toggle loading mode"
                    bind:checked={loading}
                />
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<Story name="Keyboard navigation">
    <Spreadsheet.Root
        let:root
        {loading}
        rowCount={8}
        allowSelection
        keyboardNavigation
        useVirtualizer
        emptyCells={10}
        bind:selectedRows
        bind:columns={dynamicColumns}
    >
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {#if col.id === 'id'}
                                Document ID
                            {:else}
                                {col.id}
                            {/if}
                        </Layout.Stack>
                    {:else if col.isAction}
                        <Button.Button
                            icon
                            variant="extra-compact"
                            on:click={() => (showAddColumnModal = true)}
                        >
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button.Button>
                    {:else}
                        {col.id}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        <svelte:fragment slot="rows" let:item let:index let:root>
            {@const row = baseDataInternal[index]}
            <Spreadsheet.Row.Base {root} {index} id={row.id} virtualItem={item}>
                {#each dynamicColumns as col}
                    <Spreadsheet.Cell
                        {root}
                        column={col.id}
                        isEditable={col.meta?.isPrimary !== true}
                        value={col.id === 'id' ? undefined : getCellValue(row, col.id)}
                    >
                        {#if col.isAction}
                            <Button.Button icon variant="extra-compact">
                                <Icon icon={IconDotsHorizontal} />
                            </Button.Button>
                        {:else if col.id === 'id'}
                            <Tooltip portal>
                                <Tag size="xs" variant="code">
                                    {getCellValue(row, col.id)}
                                </Tag>
                                <p class="tooltip" slot="tooltip" let:showing>
                                    {#if showing}
                                        {getCellValue(row, col.id)}
                                    {/if}
                                </p>
                            </Tooltip>
                        {:else}
                            <Typography.Text>{getCellValue(row, col.id)}</Typography.Text>
                        {/if}
                    </Spreadsheet.Cell>
                {/each}
            </Spreadsheet.Row.Base>
        </svelte:fragment>

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                <Selector.Switch
                    id="sheet-loading"
                    label="Toggle loading mode"
                    bind:checked={loading}
                />
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<Story name="Large Dataset">
    <Spreadsheet.Root
        allowSelection
        useVirtualizer
        emptyCells={10}
        keyboardNavigation
        bind:selectedRows
        bind:columns={largeColumns}
        rowCount={largeData.length}
    >
        <svelte:fragment slot="header" let:root>
            {#each largeColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {col.meta?.label}
                        </Layout.Stack>
                    {:else if col.isAction}
                        <Button.Button
                            icon
                            variant="extra-compact"
                            color="--fgcolor-neutral-tertiary"
                            size="xs"
                        >
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button.Button>
                    {:else}
                        {col.meta?.label}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        <svelte:fragment slot="rows" let:root let:item let:index>
            {@const row = largeData[index]}
            <Spreadsheet.Row.Base {root} virtualItem={item} {index} id={`row-${index}`}>
                {#each largeColumns as col}
                    <Spreadsheet.Cell
                        {root}
                        column={col.id}
                        value={getRandomCellValue(row, col.id)}
                        isEditable={col.meta?.isPrimary !== true}
                    >
                        {#if col.isAction}
                            <Button.Button icon variant="extra-compact">
                                <Icon icon={IconDotsHorizontal} />
                            </Button.Button>
                        {:else}
                            <Typography.Text>
                                {getRandomCellValue(row, col.id)}
                            </Typography.Text>
                        {/if}
                    </Spreadsheet.Cell>
                {/each}
            </Spreadsheet.Row.Base>
        </svelte:fragment>

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                {selectedRows.length
                    ? `${selectedRows.length} records selected`
                    : `${largeData.length} records`}
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<style>
    :global([role='tooltip']) {
        transition: none !important;
    }
</style>
