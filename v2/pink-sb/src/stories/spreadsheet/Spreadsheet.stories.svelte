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
    import Select from '$lib/input/Select.svelte';
    import Textarea from '$lib/input/Textarea.svelte';
    import { createSparsePagedDataStore } from '$lib/spreadsheet/index.js';
    import Text from '$lib/input/Text.svelte';
    import { IconArrowExpand } from '@appwrite.io/pink-icons-svelte';
    import Keyboard, { SpecialCharacter } from '$lib/Keyboard.svelte';

    let showAddRowModal = false;
    let showAddColumnModal = false;
    let selectedRows: string[] = [];
    let columnName: string | null = null;
    let cellToEdit: string | null = null;
    let loading = false;
    let dynamicData = baseDataInternal;
    let dynamicColumns: StoryColumn[] = [...baseColumnsInternal];
    let currentPage = 0;
    let loadingMore = false;
    let infiniteData: RandomRowData[] = [];
    let jumpToPageReactive = 0;
    let largeColumns: StoryColumn[] = generateRandomColumns(5);

    // Constants
    const itemsPerPage = 50;
    const largeDataItemCount = 5000;
    const largeData: RandomRowData[] = generateRandomRows(largeDataItemCount, largeColumns);
    const pagedData = createSparsePagedDataStore<RandomRowData>(itemsPerPage);
    const pagedColumns: StoryColumn[] = [
        {
            id: 'row_number',
            width: 175,
            resizable: false,
            meta: { label: '#', isPrimary: true }
        },
        ...generateRandomColumns(6)
    ];

    // Functions
    function initInfiniteData() {
        infiniteData = generateRandomRows(itemsPerPage, largeColumns);
        currentPage = 1;
    }

    function loadMoreData(): Promise<boolean> {
        if (loadingMore || currentPage >= 3) return Promise.resolve(false);

        loadingMore = true;

        return new Promise((resolve) => {
            setTimeout(() => {
                const newRows = generateRandomRows(itemsPerPage, largeColumns);

                for (const row of newRows) {
                    infiniteData.push(row);
                }
                infiniteData = infiniteData;
                currentPage++;
                loadingMore = false;

                resolve(currentPage < 3);
            }, 1000);
        });
    }

    function initPagedData() {
        pagedData.clear();
        const firstPageData = generateRandomRows(itemsPerPage, pagedColumns);
        pagedData.setPage(1, firstPageData);
    }

    async function handleLoadNextPage(nextPageNum: number): Promise<boolean> {
        if ($pagedData.hasPage(nextPageNum)) return false;

        loadingMore = true;
        await new Promise((resolve) => setTimeout(resolve, 250));

        const newRows = generateRandomRows(itemsPerPage, pagedColumns);

        pagedData.setPage(nextPageNum, newRows);
        loadingMore = false;
        return true;
    }

    async function handleLoadPreviousPage(prevPageNum: number): Promise<boolean> {
        if (prevPageNum < 1 || $pagedData.hasPage(prevPageNum)) return false;

        loadingMore = true;
        await new Promise((resolve) => setTimeout(resolve, 250));

        const newRows = generateRandomRows(itemsPerPage, pagedColumns);

        pagedData.setPage(prevPageNum, newRows);
        loadingMore = false;
        return true;
    }

    async function handleGoToPage(targetPageNum: number): Promise<void> {
        if (targetPageNum < 1) return;

        pagedData.setMaxPage(targetPageNum);

        if (!$pagedData.hasPage(targetPageNum)) {
            loadingMore = true;
            await new Promise((resolve) => setTimeout(resolve, 250));

            const newRows = generateRandomRows(itemsPerPage, pagedColumns);

            pagedData.setPage(targetPageNum, newRows);
            loadingMore = false;
        }
    }

    function jumpToSpecificPage(pageNum: number) {
        jumpToPageReactive = pageNum;
    }

    // Initialize data
    initInfiniteData();
    initPagedData();

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

    let showExpandModal = false;
    let showExpandIconForId: number | null = null;
    let expandedRowData: { rowId: string; rowIndex: number } | null = null;
</script>

<Story name="Default">
    <Spreadsheet.Root let:root allowSelection bind:selectedRows bind:columns={dynamicColumns}>
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell
                    {root}
                    column={col.id}
                    icon={col.meta?.icon}
                    isEditable={!col.meta?.isPrimary}
                    openEditOnTap
                >
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

                    <svelte:fragment slot="cell-editor">
                        <Text value="dank">
                            <svelte:fragment slot="end">
                                {#if col.meta?.icon}
                                    <Icon
                                        size="s"
                                        icon={col.meta?.icon}
                                        color="--fgcolor-neutral-weak"
                                    />
                                {/if}
                            </svelte:fragment>
                        </Text>
                    </svelte:fragment>
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each dynamicData as row, index}
            <Spreadsheet.Row.Base {root} id={row.id} hoverEffect isSelected={index === 2}>
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
        bottomActionTooltip={{
            text: 'Add a row',
            placement: 'top-end'
        }}
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
                        <svelte:fragment let:value>
                            {#if col.isAction}
                                <Button.Button icon variant="extra-compact">
                                    <Icon icon={IconDotsHorizontal} />
                                </Button.Button>
                            {:else if col.id === 'col_0'}
                                <Tooltip portal delay={250}>
                                    <Tag size="xs" variant="code">
                                        {value}
                                    </Tag>
                                    <p class="tooltip" slot="tooltip" let:showing>
                                        {#if showing}
                                            {value}
                                        {/if}
                                    </p>
                                </Tooltip>
                            {:else}
                                <Typography.Text>
                                    {value}
                                </Typography.Text>
                            {/if}
                        </svelte:fragment>

                        <svelte:fragment slot="cell-editor">
                            <Textarea value={getRandomCellValue(row, col.id)} />
                        </svelte:fragment>
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

<Story name="Infinite Scrolling">
    <Spreadsheet.Root
        {loadingMore}
        allowSelection
        keyboardNavigation
        useVirtualizer={true}
        itemsPerPage={50}
        loadNextPage={() => {
            if (currentPage >= 3) return Promise.resolve(false);
            return loadMoreData();
        }}
        columns={largeColumns}
        rowCount={infiniteData.length}
    >
        <svelte:fragment slot="header" let:root>
            {#each largeColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {#if col.meta.icon}
                                <Icon icon={col.meta.icon} color="--fgcolor-neutral-tertiary" />
                            {/if}
                            {col.meta.label}
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
                        {col.meta?.label}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        <svelte:fragment slot="rows" let:root let:item let:index>
            {@const row = infiniteData[index]}
            <Spreadsheet.Row.Base {root} virtualItem={item} {index} id={`row-${index}`}>
                {#each largeColumns as col}
                    <Spreadsheet.Cell
                        {root}
                        column={col.id}
                        value={row[col.id]}
                        id={`${row[col.id]}-${index}`}
                    >
                        <svelte:fragment let:value>
                            {#if col.isAction}
                                <Button.Button icon variant="extra-compact">
                                    <Icon icon={IconDotsHorizontal} />
                                </Button.Button>
                            {:else if col.meta?.isPrimary}
                                <Tag size="xs" variant="code">
                                    #{index + 1}
                                </Tag>
                            {:else}
                                <Typography.Text>
                                    {value}
                                </Typography.Text>
                            {/if}
                        </svelte:fragment>

                        <svelte:fragment slot="cell-editor">
                            <Textarea value={getRandomCellValue(row, col.id)} />
                        </svelte:fragment>
                    </Spreadsheet.Cell>
                {/each}
            </Spreadsheet.Row.Base>
        </svelte:fragment>

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                Showing {infiniteData.length} rows (Page {currentPage} of 3)
                {#if loadingMore}
                    • Loading {itemsPerPage} more items...
                {/if}
                {#if currentPage >= 3}
                    • All data loaded ({infiniteData.length} total)
                {:else}
                    • Scroll to bottom to load more
                {/if}
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<Story name="Page Navigation">
    <Spreadsheet.Root
        {loadingMore}
        allowSelection
        keyboardNavigation
        useVirtualizer
        {itemsPerPage}
        loadNextPage={handleLoadNextPage}
        loadPreviousPage={handleLoadPreviousPage}
        goToPage={handleGoToPage}
        jumpToPageNumber={jumpToPageReactive}
        bind:currentPage
        columns={pagedColumns}
        rowCount={$pagedData.virtualLength}
    >
        <svelte:fragment slot="header" let:root>
            {#each pagedColumns as col}
                <Spreadsheet.Header.Cell {root} column={col.id} icon={col.meta?.icon}>
                    {#if col.meta?.isPrimary}
                        <Layout.Stack direction="row" inline alignItems="center">
                            {#if col.meta.icon}
                                <Icon icon={col.meta.icon} color="--fgcolor-neutral-tertiary" />
                            {/if}
                            {col.meta.label}
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
                        {col.meta?.label}
                    {/if}
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        <svelte:fragment slot="rows" let:root let:item let:index>
            {@const row = $pagedData.getItemAtVirtualIndex(index)}
            {#if row === null}
                <!-- Loading skeleton for unloaded page data, should not be here? -->
                <Spreadsheet.Row.Base {root} virtualItem={item} {index} id={`loading-${index}`}>
                    {#each pagedColumns as col}
                        <Spreadsheet.Cell
                            column={col.id}
                            isEditable={false}
                            root={{ ...root, loading: true }}
                            id={`loading-${index}-${col.id}`}
                        />
                    {/each}
                </Spreadsheet.Row.Base>
            {:else}
                <Spreadsheet.Row.Base
                    {root}
                    {index}
                    virtualItem={item}
                    id={`row-${index}`}
                    showSelectOnHover
                    valueWithoutHover={index + 1}
                >
                    {#each pagedColumns as col}
                        <!-- need to be able to do bind:value here -->
                        <Spreadsheet.Cell
                            {root}
                            column={col.id}
                            id={`${row[col.id]}-${index}`}
                            value={row[col.id]}
                        >
                            <svelte:fragment let:value>
                                {#if col.isAction}
                                    <Button.Button icon variant="extra-compact">
                                        <Icon icon={IconDotsHorizontal} />
                                    </Button.Button>
                                {:else}
                                    <Typography.Text>
                                        {value}
                                    </Typography.Text>
                                {/if}
                            </svelte:fragment>
                        </Spreadsheet.Cell>
                    {/each}
                </Spreadsheet.Row.Base>
            {/if}
        </svelte:fragment>

        <svelte:fragment slot="footer">
            <Stack direction="row" wrap="nowrap" justifyContent="space-between" alignItems="center">
                <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                    Total: {$pagedData.length} slots | Loaded: {$pagedData.loadedItemCount} items | Pages:
                    {$pagedData.loadedPages.join(', ')}
                    {#if loadingMore}
                        • Loading...
                    {/if}
                </Typography.Text>

                <Stack direction="row" gap="l" inline wrap="nowrap" style="width: 100px">
                    <Select
                        value={currentPage}
                        placeholder="Select page"
                        options={Array.from(
                            { length: largeDataItemCount / itemsPerPage },
                            (_, i) => ({
                                label: `Page ${i + 1}`,
                                value: i + 1
                            })
                        )}
                        on:change={(e) => {
                            jumpToSpecificPage(Number(e.detail));
                        }}
                    />
                </Stack>
            </Stack>
        </svelte:fragment>
    </Spreadsheet.Root>
</Story>

<Story name="KBD">
    <Spreadsheet.Root
        let:root
        allowSelection
        keyboardNavigation
        expandKbdShortcut="Cmd+Enter"
        bind:selectedRows
        bind:columns={dynamicColumns}
        on:expandKbdShortcut={({ detail }) => {
            expandedRowData = detail;
            showExpandModal = true;
        }}
    >
        <svelte:fragment slot="header" let:root>
            {#each dynamicColumns as col}
                <Spreadsheet.Header.Cell
                    {root}
                    column={col.id}
                    icon={col.meta?.icon}
                    isEditable={!col.meta?.isPrimary}
                    openEditOnTap
                >
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

                    <svelte:fragment slot="cell-editor">
                        <Text value="dank">
                            <svelte:fragment slot="end">
                                {#if col.meta?.icon}
                                    <Icon
                                        size="s"
                                        icon={col.meta?.icon}
                                        color="--fgcolor-neutral-weak"
                                    />
                                {/if}
                            </svelte:fragment>
                        </Text>
                    </svelte:fragment>
                </Spreadsheet.Header.Cell>
            {/each}
        </svelte:fragment>

        {#each dynamicData as row, index}
            <Spreadsheet.Row.Base {root} id={row.id} hoverEffect {index}>
                {#each dynamicColumns as col}
                    {#if col.id === 'id'}
                        <button
                            on:mouseenter={() => {
                                showExpandIconForId = index;
                            }}
                            on:mouseleave={() => {
                                showExpandIconForId = null;
                            }}
                        >
                            <Spreadsheet.Cell
                                {root}
                                column={col.id}
                                value={getCellValue(row, col.id)}
                                isEditable={col.meta?.isPrimary !== true}
                            >
                                <Layout.Stack
                                    gap="none"
                                    direction="row"
                                    alignItems="center"
                                    alignContent="center"
                                    justifyContent="space-between"
                                >
                                    <Typography.Text
                                        >{getCellValue(row, col.id)}</Typography.Text
                                    >

                                    <Popover let:toggle portal padding="none">
                                        {@const opacityValue = showExpandIconForId === index ? '1' : '0'}
                                        <button
                                            on:mouseenter={toggle}
                                            on:mouseleave={toggle}
                                            style:opacity={opacityValue}
                                            style:transition="opacity 225ms ease-in-out"
                                        >
                                            <Button.Button
                                                size="xs"
                                                icon
                                                variant="secondary"
                                                on:click={() => {
                                                    toggle();
                                                    expandedRowData = {
                                                        rowId: row.id,
                                                        rowIndex: index
                                                    };
                                                    showExpandModal = true;
                                                }}
                                            >
                                                <Icon icon={IconArrowExpand} size="s" />
                                            </Button.Button>
                                        </button>

                                        <svelte:fragment slot="tooltip">
                                            <Layout.Stack
                                                inline
                                                gap="xxs"
                                                direction="row"
                                                alignItems="center"
                                                alignContent="center"
                                                style="padding: var(--gap-XS, 6px) var(--gap-S, 8px);"
                                            >
                                                Expand row

                                                <Layout.Stack
                                                    inline
                                                    gap="xxxs"
                                                    direction="row"
                                                    alignItems="center"
                                                    alignContent="center"
                                                >
                                                    <Keyboard
                                                        key={SpecialCharacter.Command}
                                                        size="s"
                                                    />
                                                    <Keyboard key={'Enter'} autoWidth size="s" />
                                                </Layout.Stack>
                                            </Layout.Stack>
                                        </svelte:fragment>
                                    </Popover>
                                </Layout.Stack>
                            </Spreadsheet.Cell>
                        </button>
                    {:else}
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
                    {/if}
                {/each}
            </Spreadsheet.Row.Base>
        {/each}

        <svelte:fragment slot="footer">
            <Typography.Text variant="m-400" color="--fgcolor-neutral-secondary">
                {selectedRows.length ? `${selectedRows.length} records selected` : `10 records`}
            </Typography.Text>
        </svelte:fragment>
    </Spreadsheet.Root>

    <Modal size="s" title="Row Expanded" bind:open={showExpandModal}>
        <Typography.Text>Keyboard shortcut (Cmd+Enter) triggered for:</Typography.Text>
        <Stack gap="xxs">
            <Typography.Text>Row Index: {expandedRowData?.rowIndex ?? 'N/A'}</Typography.Text>
            <Typography.Text>Row ID: {expandedRowData?.rowId || 'N/A'}</Typography.Text>
        </Stack>

        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button.Button size="s" on:click={() => (showExpandModal = false)}
                    >Close</Button.Button
                >
            </Stack>
        </svelte:fragment>
    </Modal>
</Story>

<style>
    :global([role='tooltip']) {
        transition: none !important;
    }
</style>
