import Root from './Root.svelte';
import Grid from './Grid.svelte';
import Object from './Object.svelte';
import Image from './Image.svelte';
import Shape from './Shape.svelte';
import ResizeHandle from './ResizeHandle.svelte';
import type { Tweened } from 'svelte/motion';
import type { Readable, Writable } from 'svelte/store';

export type Vec2 = {
    x: number;
    y: number;
};

export type Vec4 = {
    x: number;
    y: number;
    w: number;
    h: number;
};

export type CanvasSettings = {
    canPan: boolean;
    panDirection: 'xy' | 'x' | 'y';
    canZoom: boolean;
    canSelect: boolean;
    snapToGrid: boolean;
    gridSize: number;
    bounds: {
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
        minZoom: number;
        maxZoom: number;
        limit: 'soft' | 'hard';
    };
    grid: {
        dotSize: number;
        dotColor: string;
        dotOpacity: number;
    };
};

export type CanvasObject = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation?: number;
    selected?: boolean;
    locked?: boolean;
    maintainAspectRatio?: boolean;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
};

export type CanvasImageObject = CanvasObject & {
    type: 'image';
    src: string;
    alt?: string;
    cropX?: number; // Crop offset X (0-1, relative to image)
    cropY?: number; // Crop offset Y (0-1, relative to image)
    cropWidth?: number; // Crop width (0-1, relative to image)
    cropHeight?: number; // Crop height (0-1, relative to image)
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'; // How image fits in container
};

export type CanvasShapeObject = CanvasObject & {
    type: 'shape';
    shape: 'rectangle' | 'circle';
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
};

export type CanvasObjectUnion = CanvasImageObject | CanvasShapeObject;

export type ResizeHandlePosition = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';

export type CanvasRootProps = Readonly<{
    viewOffset: Tweened<Vec2> | Readable<Vec2>;
    viewPort: Writable<Vec4>;
    zoom: Tweened<number>;
    settings: Writable<CanvasSettings>;
    selectedObjects: Writable<Set<string>>;
    objects: Writable<CanvasObjectUnion[]>;
    panTo: (
        x: number,
        y: number,
        opts?: { delay?: number; duration?: number; hard?: boolean }
    ) => void;
    zoomTo: (zoom: number, opts?: { delay?: number; duration?: number }) => Promise<void>;
    selectObject: (id: string, multi?: boolean) => void;
    deselectObject: (id: string) => void;
    deselectAll: () => void;
    updateObject: (id: string, updates: Partial<CanvasObject>) => void;
    deleteObject: (id: string) => void;
}>;

export default {
    Root,
    Grid,
    Object,
    Image,
    Shape,
    ResizeHandle
};
