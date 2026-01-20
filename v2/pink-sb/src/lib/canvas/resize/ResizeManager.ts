import type { CanvasObject, ResizeHandlePosition, Vec2 } from '../index.js';

export type ResizeState = {
    objectId: string;
    startX: number;
    startY: number;
    objectStartX: number;
    objectStartY: number;
    startWidth: number;
    startHeight: number;
    handle: ResizeHandlePosition;
    maintainAspectRatio: boolean;
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number;
};

export class ResizeManager {
    private state: ResizeState | null = null;

    startResize(
        object: CanvasObject,
        handle: ResizeHandlePosition,
        startPoint: Vec2,
        zoom: number
    ): void {
        this.state = {
            objectId: object.id,
            startX: startPoint.x / zoom,
            startY: startPoint.y / zoom,
            objectStartX: object.x,
            objectStartY: object.y,
            startWidth: object.width,
            startHeight: object.height,
            handle,
            maintainAspectRatio: object.maintainAspectRatio ?? false,
            minWidth: object.minWidth ?? 20,
            minHeight: object.minHeight ?? 20,
            maxWidth: object.maxWidth ?? Infinity,
            maxHeight: object.maxHeight ?? Infinity
        };
    }

    handleResize(
        currentPoint: Vec2,
        zoom: number
    ): {
        x: number;
        y: number;
        width: number;
        height: number;
    } | null {
        if (!this.state) return null;

        const {
            startX,
            startY,
            objectStartX,
            objectStartY,
            startWidth,
            startHeight,
            handle,
            maintainAspectRatio,
            minWidth,
            minHeight,
            maxWidth,
            maxHeight
        } = this.state;

        const currentX = currentPoint.x / zoom;
        const currentY = currentPoint.y / zoom;

        const deltaX = currentX - startX;
        const deltaY = currentY - startY;

        let newX = objectStartX;
        let newY = objectStartY;
        let newWidth = startWidth;
        let newHeight = startHeight;

        // Calculate resize based on handle position
        switch (handle) {
            case 'north-west':
                newX = objectStartX + deltaX;
                newY = objectStartY + deltaY;
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
                break;
            case 'north':
                newY = objectStartY + deltaY;
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
                break;
            case 'north-east':
                newY = objectStartY + deltaY;
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight - deltaY));
                break;
            case 'east':
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
                break;
            case 'south-east':
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
                break;
            case 'south':
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
                break;
            case 'south-west':
                newX = objectStartX + deltaX;
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
                newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY));
                break;
            case 'west':
                newX = objectStartX + deltaX;
                newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth - deltaX));
                break;
        }

        // Maintain aspect ratio if needed
        if (maintainAspectRatio && startWidth > 0 && startHeight > 0) {
            const aspectRatio = startWidth / startHeight;

            if (handle === 'north' || handle === 'south') {
                // Vertical resize - adjust width
                newWidth = newHeight * aspectRatio;
                if (handle === 'north') {
                    newX = objectStartX + (startWidth - newWidth) / 2;
                }
            } else if (handle === 'east' || handle === 'west') {
                // Horizontal resize - adjust height
                newHeight = newWidth / aspectRatio;
                if (handle === 'west') {
                    newY = objectStartY + (startHeight - newHeight) / 2;
                }
            } else {
                // Corner resize - use the dimension that changed more
                const widthChange = Math.abs(newWidth - startWidth);
                const heightChange = Math.abs(newHeight - startHeight);

                if (widthChange > heightChange) {
                    newHeight = newWidth / aspectRatio;
                    // Adjust position for handles that affect Y
                    if (handle === 'north-west' || handle === 'north-east') {
                        newY = objectStartY + startHeight - newHeight;
                    }
                } else {
                    newWidth = newHeight * aspectRatio;
                    // Adjust position for handles that affect X
                    if (handle === 'north-west' || handle === 'south-west') {
                        newX = objectStartX + startWidth - newWidth;
                    }
                }
            }

            // Re-apply constraints after aspect ratio adjustment
            if (newWidth < minWidth) {
                newWidth = minWidth;
                newHeight = newWidth / aspectRatio;
            }
            if (newHeight < minHeight) {
                newHeight = minHeight;
                newWidth = newHeight * aspectRatio;
            }
            if (newWidth > maxWidth) {
                newWidth = maxWidth;
                newHeight = newWidth / aspectRatio;
            }
            if (newHeight > maxHeight) {
                newHeight = maxHeight;
                newWidth = newHeight * aspectRatio;
            }
        }

        return {
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
        };
    }

    endResize(): string | null {
        if (!this.state) return null;
        const objectId = this.state.objectId;
        this.state = null;
        return objectId;
    }

    cancelResize(): void {
        this.state = null;
    }

    isResizing(): boolean {
        return this.state !== null;
    }
}
