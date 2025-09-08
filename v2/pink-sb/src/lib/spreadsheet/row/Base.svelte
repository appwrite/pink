<script lang="ts">
    import Cell from '../Cell.svelte';
    import { EMPTY_ROW_ID } from '../index.js';
    import { onMount, setContext } from 'svelte';
    import type { RowBaseProps } from './index.js';
    import Checkbox from '$lib/selector/Checkbox.svelte';

    type $$Props = RowBaseProps &
        Partial<{
            type: 'row' | 'header';
            sticky: boolean;
        }>;

    export let root: $$Props['root'];
    export let virtualItem: $$Props['virtualItem'] = undefined;

    export let showSelectOnHover: $$Props['showSelectOnHover'] = undefined;
    export let valueWithoutHover: $$Props['valueWithoutHover'] = undefined;

    export let type: $$Props['type'] = 'row';
    export let id: $$Props['id'] = undefined;
    export let index: $$Props['index'] = undefined;
    export let sticky: $$Props['sticky'] = false;
    export let select: $$Props['select'] = true;

    const isHeader = type === 'header';
    let checkboxElement: Checkbox | null = null;

    const baseFontSize = 12; /* var(--font-size-xs) */
    const thresholdDigits = 3; /* start reducing after 4 digits */
    const pxReductionPerDigit = 2; /* 2px */

    function toggle() {
        if (id) {
            root.toggle(id);

            if (showSelectOnHover) {
                checkboxElement?.blur();
            }
        }
    }

    onMount(() => {
        if (id && !isEmptyRow && select === true) root.addAvailableId(id);

        return () => {
            /* Clean up only if:
               - `id` exists,
               - the row is not marked as empty (`!isEmptyRow`),
               - and the item is not virtual (`!virtualItem`)
            */
            if (id && !isEmptyRow && !virtualItem) {
                root.removeAvailableId(id);
            }
        };
    });

    $: isEmptyRow = id?.includes(EMPTY_ROW_ID) || false;
    $: selected = id ? root.selectedRows.includes(id) : false;

    $: hoverSelect = !!showSelectOnHover && !isHeader && !isEmptyRow && select !== 'hidden';

    if (root.keyboardNavigation && !isEmptyRow) {
        const rowIndex = isHeader ? 0 : (index ?? 0) + 1;
        setContext('row', rowIndex);
    }

    $: fontSizeStyle = (() => {
        const valueLength = valueWithoutHover ? String(valueWithoutHover).length : 0;
        if (valueLength > thresholdDigits) {
            const reduction = (valueLength - thresholdDigits) * pxReductionPerDigit;
            const newSize = Math.max(baseFontSize - reduction, 8); /* 8px min */

            if (newSize === 8 && valueLength > 6) {
                return `font-size: ${newSize}px; letter-spacing: -0.75px; padding-inline-end: 2px;`;
            }

            return `font-size: ${newSize}px;`;
        }

        return `font-size: var(--font-size-xs)`;
    })();
</script>

<div
    data-empty-row={isEmptyRow}
    class:virtual-row={!!virtualItem}
    class:sticky-header={sticky && isHeader}
    role={!isHeader ? 'row' : 'rowheader'}
    style:height={virtualItem ? `${virtualItem.size}px` : undefined}
    style:transform={virtualItem ? `translateY(${virtualItem.start}px)` : undefined}
>
    {#if root.allowSelection}
        <Cell {isHeader} column={`__select_${id}`} {root}>
            <div
                class:selected
                class:hover-select={hoverSelect}
                class:hide-checkbox={(!isHeader && isEmptyRow) || select === 'hidden'}
            >
                {#if hoverSelect && !selected}
                    <div
                        aria-hidden="true"
                        style={fontSizeStyle}
                        aria-label={String(valueWithoutHover)}
                        class="select-layer select-placeholder"
                    >
                        {valueWithoutHover}
                    </div>
                {/if}

                <div class="select-layer select-checkbox">
                    <Checkbox
                        size="s"
                        bind:this={checkboxElement}
                        disabled={(!isHeader && isEmptyRow) ||
                            root.loading ||
                            select === 'disabled'}
                        on:change={isHeader ? root.toggleAll : toggle}
                        on:blur={() => console.log(`checkbox blurred?`)}
                        checked={isHeader
                            ? root.selectedAll
                                ? true
                                : root.selectedSome
                                  ? 'indeterminate'
                                  : false
                            : selected}
                    />
                </div>
            </div>
        </Cell>
    {/if}

    <slot {toggle} {selected} />
</div>

<style lang="scss">
    div {
        width: 100%;
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid;
        background: var(--bgcolor-neutral-primary);

        // quick fix instead of handling per cell!
        &[role='row'][data-empty-row='false']:hover :global(div:not(.select-checkbox)) {
            cursor: pointer;
            background-color: var(--overlay-neutral-hover);
            transition: background-color 125ms ease-in-out;
        }

        &[role='rowheader'] {
            background: var(--bgcolor-neutral-default);
        }

        & .hide-checkbox {
            visibility: hidden;
        }

        &.virtual-row {
            top: 0;
            left: 0;
            width: 100%;
            position: absolute;
            grid-column: unset;
            will-change: transform;
            grid-template-columns: var(--grid-template-columns);

            &:has([data-editing-mode='true']) {
                z-index: 1;
            }
        }

        .hover-select {
            display: inline-flex;
        }

        .select-placeholder {
            font-style: normal;
            font-weight: 500;
            color: var(--fgcolor-neutral-secondary);
            font-family: var(--font-family-sansserif), var(--sans-fallbacks);
        }

        .hover-select .select-layer {
            inset: 0;
            display: grid;
            position: absolute;
            place-items: center;

            transition:
                opacity 120ms ease,
                transform 120ms ease;
        }

        .hover-select .select-placeholder {
            opacity: 0.85;
            transform: translateY(0);
        }

        .hover-select .select-checkbox {
            opacity: 0;
            transform: translateY(2px);
        }

        .hover-select:hover .select-checkbox,
        .hover-select:focus-within .select-checkbox,
        .hover-select.selected .select-checkbox {
            opacity: 1;
            transform: translateY(0);
        }

        .hover-select:hover .select-placeholder,
        .hover-select:focus-within .select-placeholder {
            opacity: 0;
            transform: translateY(-2px);
        }
    }

    .sticky-header {
        top: 0;
        z-index: 4;
        position: sticky;
    }
</style>
