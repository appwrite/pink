<script context="module" lang="ts">
    import { type Readable } from 'svelte/store';

    export const TABLE_CONTEXT = Symbol('table');

    export interface TableContext {
        selection: boolean;
        selectedIds: Readable<string[]>;
        allSelected: Readable<boolean>;
        someSelected: Readable<boolean>;
        isSelected: (id: string) => boolean;
        toggleRow: (id: string) => void;
        toggleAll: () => void;
    }
</script>

<script lang="ts">
    import Row from './Row.svelte';
    import { setContext } from 'svelte';
    import { writable, derived } from 'svelte/store';

    export let selection = false;
    export let selectedIds: string[] = [];
    export let selectableIds: string[] = [];

    const selectedIdsStore = writable(selectedIds);

    const allSelected = derived(
        selectedIdsStore,
        ($ids) => selectableIds.length > 0 && selectableIds.every((id) => $ids.includes(id))
    );

    const someSelected = derived(
        [selectedIdsStore, allSelected],
        ([$ids, $all]) => !$all && selectableIds.some((id) => $ids.includes(id))
    );

    function isSelected(id: string): boolean {
        return selectedIds.includes(id);
    }

    function toggleRow(id: string) {
        selectedIds = isSelected(id)
            ? selectedIds.filter((sel) => sel !== id)
            : [...selectedIds, id];

        selectedIdsStore.set(selectedIds);
    }

    function toggleAll() {
        selectedIds = $allSelected ? [] : [...selectableIds];
        selectedIdsStore.set(selectedIds);
    }

    setContext<TableContext>(TABLE_CONTEXT, {
        selection,
        selectedIds: selectedIdsStore,
        allSelected,
        someSelected,
        isSelected,
        toggleRow,
        toggleAll
    });
</script>

<div class="root">
    <div role="table">
        {#if $$slots.header}
            <Row type="header">
                <slot name="header" />
            </Row>
        {/if}
        <slot />
    </div>
</div>

<style lang="scss">
    .root {
        overflow-x: auto;
        border: 1px solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);
        background: var(--color-bgcolor-neutral-primary);

        ::-webkit-scrollbar {
            display: none;
        }

        [role='table'] {
            display: table;
            width: 100%;
            overflow: hidden;
        }
    }
</style>
