<script lang="ts">
    import type { Column, RootProp } from '../index.js';

    export let openIds: string[] = [];
    export let single: boolean = false;
    export let columns: Array<Column> | number;

    let registeredIds: Set<string> = new Set();

    function isOpen(id: string): boolean {
        return openIds.includes(id);
    }

    function open(id: string): void {
        if (!registeredIds.has(id)) return;
        if (single) {
            openIds = [id];
        } else if (!openIds.includes(id)) {
            openIds = [...openIds, id];
        }
    }

    function close(id: string): void {
        if (!registeredIds.has(id)) return;
        openIds = openIds.filter((openId) => openId !== id);
    }

    function toggle(id: string): void {
        if (isOpen(id)) close(id);
        else open(id);
    }

    function register(id: string): void {
        registeredIds.add(id);
        registeredIds = registeredIds;
    }

    function unregister(id: string): void {
        registeredIds.delete(id);
        registeredIds = registeredIds;
        openIds = openIds.filter((openId) => openId !== id);
    }

    function getColumn(columnId: string): Column | undefined {
        return columnsArray.find((column) => column.id === columnId);
    }

    function isFirstColumn(columnId: string): boolean {
        return columnsArray.length > 0 && columnsArray[0].id === columnId;
    }

    $: columnsArray =
        typeof columns === 'number'
            ? Array.from({ length: Math.max(1, Math.floor(columns)) }, (_, i) => ({
                  id: i.toString(),
                  align: 'left' as const
              }))
            : columns;

    $: columnsCount = columnsArray.length;

    $: root = {
        single,
        openIds,
        isOpen,
        open,
        close,
        toggle,
        register,
        unregister,
        getColumn,
        isFirstColumn,

        columns: columnsArray,
        columnsCount
    } as RootProp;
</script>

<div class="accordion-table">
    <div class="body">
        <slot {root} />
    </div>
</div>

<style lang="scss">
    .accordion-table {
        --row-gap: 4px;
        --row-height: 40px;

        --divider-color: var(--border-neutral, rgba(0, 0, 0, 0.12));
        --divider-strong: var(--border-neutral-strong, rgba(0, 0, 0, 0.18));
        --overlay-hover: var(--overlay-neutral-hover, rgba(0, 0, 0, 0.04));
        --row-open-bg: var(--bgcolor-neutral-default, rgba(0, 0, 0, 0.02));
        --accordion-bg: var(--bgcolor-neutral-default, var(--row-open-bg));

        border: var(--border-width-s, 1px) solid var(--divider-strong);
        border-radius: var(--border-radius-s);
        background: var(--bgcolor-neutral-primary);
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        max-width: 100%;
        -webkit-overflow-scrolling: touch;
    }

    @media (prefers-color-scheme: dark) {
        .accordion-table {
            --divider-color: var(--border-neutral, rgba(255, 255, 255, 0.08));
            --divider-strong: var(--border-neutral-strong, rgba(255, 255, 255, 0.12));
            --overlay-hover: var(--overlay-neutral-hover, rgba(255, 255, 255, 0.02));
            --row-open-bg: var(--bgcolor-neutral-default-dark, rgba(255, 255, 255, 0.02));
        }
    }

    .body {
        width: 100%;
        display: block;
    }
</style>
