export type Directory = {
    id: string;
    title: string;
    fullPath: string;
    thumbnailUrl: string;
    fileCount?: number | undefined;
    children?: Directory[];
};

export type Icon = 'svelte' | 'folder' | 'js';
