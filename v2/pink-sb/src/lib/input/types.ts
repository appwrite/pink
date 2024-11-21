import type { HTMLInputAttributes } from 'svelte/elements';
import { type ComponentType } from 'svelte';

export type States = 'default' | 'success' | 'warning' | 'error';

export type SelectProps = Omit<HTMLInputAttributes, 'value'> & {
    options: Array<{
        label: string;
        value: string | boolean | number | null;
        disabled?: boolean;
        readonly?: boolean;
        badge?: string;
        leadingIcon?: ComponentType;
        trailingIcon?: ComponentType;
        leadingHtml?: string;
    }>;
    isSearchable?: boolean;
} & Partial<{
        value: string | boolean | number | null;
        label: string;
        state: States;
        helper: string;
    }>;
