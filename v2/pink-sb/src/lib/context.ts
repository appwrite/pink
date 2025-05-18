import { getContext, hasContext, setContext } from 'svelte';
import { type Writable, writable } from 'svelte/store';

export const ROOT_ACTIVE_POPOVER = Symbol('ROOT_ACTIVE_POPOVER');

export const activePopover = {
    get: () => {
        if (!hasContext(ROOT_ACTIVE_POPOVER)) throw new Error('root is not initialized');
        return getContext<Writable<string | null>>(ROOT_ACTIVE_POPOVER);
    },
    init: () => {
        return setContext(ROOT_ACTIVE_POPOVER, writable<string | null>(null));
    }
};
