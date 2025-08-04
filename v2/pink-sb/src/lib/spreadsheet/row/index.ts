import type { RootProp } from '../index.js';
import Base from './Base.svelte';

export type RowBaseProps = {
    id?: string;
    root: RootProp;
    index?: number;
    select?: true | 'disabled' | 'hidden';
    disabled?: boolean;
};

export default {
    Base
};
