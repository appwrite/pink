import type { TableRootProps } from '../index.js';
import Base from './Base.svelte';
import Button from './Button.svelte';
import Link from './Link.svelte';

export type RowBaseProps = {
    id?: string;
    select?: true | 'disabled' | 'hidden';
    root: TableRootProps;
};

export default {
    Base,
    Button,
    Link
};
