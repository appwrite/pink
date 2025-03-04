import type { ComponentType } from 'svelte';

export type Directory = {
    title: string;
    fullPath: string;
    thumbnailUrl?: string;
    thumbnailIcon?: ComponentType;
    thumbnailHtml?: string;
    fileCount?: number | undefined;
    children?: Directory[];
    showThumbnail?: boolean;
};

export type Icon = 'svelte' | 'folder' | 'js';
