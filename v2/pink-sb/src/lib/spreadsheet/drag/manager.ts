import type { SpreadsheetColumn } from '../index.js';

export type DragState = {
    sourceId: string;
    sourceIndex: number;
    targetId: string | null;
    startX: number;
    width: number;
};

export class DragManager {
    private columns: SpreadsheetColumn[];
    private readonly root: HTMLElement;
    private state: DragState | null = null;

    private columnIndexCache = new Map<string, number>();

    constructor(root: HTMLElement, columns: SpreadsheetColumn[]) {
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

    endDrag(): SpreadsheetColumn[] | null {
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
        // todo: we shouldn't use querySelector - we should be explicit
        const resizer = previewElement.querySelector('.column-resizer');
        if (resizer) resizer.remove();

        // Remove drop indicators if any
        const dropIndicators = previewElement.querySelectorAll('.drop-indicator');
        dropIndicators.forEach((indicator) => indicator.remove());

        const computed = getComputedStyle(header);
        for (const prop of computed) {
            previewElement.style.setProperty(prop, computed.getPropertyValue(prop));
        }

        previewElement.style.background = 'var(--bgcolor-neutral-default)';
        previewElement.style.borderRadius = 'var(--border-radius-s)';
        previewElement.style.border = '1px solid var(--brand-mint-600)';
        previewElement.style.opacity = '0.9';
        previewElement.style.zIndex = '1000';
        previewElement.style.position = 'absolute';
        previewElement.style.left = '-9999px';
        previewElement.style.top = '-9999px';

        document.body.appendChild(previewElement);

        dragEvent.dataTransfer.dropEffect = 'move';
        dragEvent.dataTransfer.effectAllowed = 'move';
        dragEvent.dataTransfer.setDragImage(previewElement, dragEvent.offsetX, dragEvent.offsetY);

        setTimeout(() => {
            if (previewElement.parentNode) {
                previewElement.parentNode.removeChild(previewElement);
            }
        }, 100);

        return previewElement;
    }
}
