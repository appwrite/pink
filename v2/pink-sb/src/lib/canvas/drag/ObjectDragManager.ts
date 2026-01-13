import type { Vec2, CanvasObject } from '../index.js';

export type DragState = {
    objectId: string;
    startX: number;
    startY: number;
    objectStartX: number;
    objectStartY: number;
};

export class ObjectDragManager {
    private state: DragState | null = null;

    startDrag(object: CanvasObject, startPoint: Vec2, zoom: number): void {
        this.state = {
            objectId: object.id,
            startX: startPoint.x / zoom,
            startY: startPoint.y / zoom,
            objectStartX: object.x,
            objectStartY: object.y
        };
    }

    handleDrag(currentPoint: Vec2, zoom: number): Vec2 | null {
        if (!this.state) return null;

        const { startX, startY, objectStartX, objectStartY } = this.state;
        const currentX = currentPoint.x / zoom;
        const currentY = currentPoint.y / zoom;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        return {
            x: objectStartX + deltaX,
            y: objectStartY + deltaY
        };
    }

    endDrag(): string | null {
        if (!this.state) return null;
        const objectId = this.state.objectId;
        this.state = null;
        return objectId;
    }

    cancelDrag(): void {
        this.state = null;
    }

    isDragging(): boolean {
        return this.state !== null;
    }

    getDraggedObjectId(): string | null {
        return this.state?.objectId ?? null;
    }
}
