import type { RootProp } from '../index.js';
import Base from './Base.svelte';

export type RowBaseProps = {
    id?: string;
    root: RootProp;
    select?: true | 'disabled' | 'hidden';
};

export default {
    Base
};
