import { getContext, hasContext, setContext } from 'svelte';
import type { CanvasRootProps } from './index.js';

const CANVAS_CONTEXT_KEY = Symbol('canvas');

export function setCanvasContext(props: CanvasRootProps) {
    setContext(CANVAS_CONTEXT_KEY, props);
}

export function getCanvasContext(): CanvasRootProps {
    if (!hasContext(CANVAS_CONTEXT_KEY)) {
        throw new Error('Canvas context not found. Component must be used within Canvas.Root');
    }
    return getContext<CanvasRootProps>(CANVAS_CONTEXT_KEY);
}
