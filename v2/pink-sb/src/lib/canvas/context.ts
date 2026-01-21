import { getContext, hasContext, setContext } from 'svelte';
import type { CanvasRootProps } from './index.js';

const PINK_CANVAS_CONTEXT_KEY = Symbol('pink-canvas');

export function setCanvasContext(props: CanvasRootProps) {
    setContext(PINK_CANVAS_CONTEXT_KEY, props);
}

export function getCanvasContext(): CanvasRootProps {
    if (!hasContext(PINK_CANVAS_CONTEXT_KEY)) {
        throw new Error('Canvas context not found. Component must be used within Canvas.Root');
    }
    return getContext<CanvasRootProps>(PINK_CANVAS_CONTEXT_KEY);
}
