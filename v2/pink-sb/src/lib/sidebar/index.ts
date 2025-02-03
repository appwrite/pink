import Base from '$lib/sidebar/Base.svelte';

export type $$Props = {
    state?: 'closed' | 'open' | 'icons';
    resizable?: boolean;
    onResize?: (state: $$Props['state']) => void;
};

export default {
    Base
};
