import type { Column } from '../index.ts';

export type DragState = {
    sourceId: string;
    sourceIndex: number;
    targetId: string | null;
    startX: number;
    width: number;
};

export class DragManager {
    private columns: Column[];
    private readonly root: HTMLElement;
    private state: DragState | null = null;

    private columnIndexCache = new Map<string, number>();

    constructor(root: HTMLElement, columns: Column[]) {
        this.root = root;
        this.columns = columns;
    }

    private getColumnElement(columnId: string): HTMLElement | null {
        return this.root.querySelector(`[data-column-id="${columnId}"]`);
    }

    private getColumnIndex(columnId: string): number {
        if (this.columnIndexCache.has(columnId)) {
            return this.columnIndexCache.get(columnId)!;
        }

        const idx = this.columns.findIndex((col) => col.id === columnId);
        if (idx !== -1) this.columnIndexCache.set(columnId, idx);
        return idx;
    }

    startDrag(columnId: string, event?: DragEvent) {
        const column = this.getColumnElement(columnId);
        if (!column || !event?.dataTransfer) return;

        const sourceIndex = this.getColumnIndex(columnId);
        if (sourceIndex === -1) return;

        const sourceCol = this.columns[sourceIndex];
        if (!sourceCol.draggable) return;

        this.state = {
            sourceId: columnId,
            sourceIndex,
            targetId: null,
            startX: event.clientX,
            width: column.getBoundingClientRect().width
        };

        this.createDragPreviewImage(column, event);
    }

    handleDragOver(columnId: string, event?: DragEvent): boolean {
        if (!this.state || !event?.dataTransfer) return false;
        event.preventDefault();

        const targetIdx = this.getColumnIndex(columnId);
        const targetCol = targetIdx !== -1 ? this.columns[targetIdx] : undefined;

        if (!targetCol?.draggable) {
            event.dataTransfer.dropEffect = 'none';
            return false;
        }

        this.state.targetId = columnId;
        event.dataTransfer.dropEffect = 'move';
        return true;
    }

    endDrag(): Column[] | null {
        if (!this.state) return null;

        const { targetId, sourceIndex } = this.state;

        if (targetId) {
            const targetIndex = this.getColumnIndex(targetId);
            if (targetIndex !== -1 && targetIndex !== sourceIndex) {
                const newColumns = [...this.columns];
                const [movedColumn] = newColumns.splice(sourceIndex, 1);
                newColumns.splice(targetIndex, 0, movedColumn);
                this.columns = newColumns;
                this.invalidateIndexCache();
                return newColumns;
            }
        }

        this.state = null;
        return null;
    }

    // noinspection JSUnusedGlobalSymbols
    cancelDrag() {
        this.invalidateIndexCache();

        if (!this.state) return;
        this.state = null;
    }

    private invalidateIndexCache() {
        this.columnIndexCache.clear();
    }

    private createDragPreviewImage(header?: HTMLElement, dragEvent?: DragEvent) {
        if (!header || !dragEvent || !dragEvent?.dataTransfer) return null;

        const previewElement = header.cloneNode(true) as HTMLElement;
        const resizer = previewElement.querySelector('.column-resizer');
        if (resizer) resizer.remove();

        const computed = getComputedStyle(header);
        for (const prop of computed) {
            previewElement.style.setProperty(prop, computed.getPropertyValue(prop));
        }

        previewElement.style.background = 'var(--border-neutral)';
        previewElement.style.borderRadius = 'var(--border-radius-xs)';

        document.body.appendChild(previewElement);

        dragEvent.dataTransfer.effectAllowed = 'move';
        dragEvent.dataTransfer.setDragImage(previewElement, dragEvent.offsetX, dragEvent.offsetY);
        return previewElement;
    }
}
