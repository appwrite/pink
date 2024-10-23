export type Directory = {
    id: string;
    title: string;
    fullPath: string;
    fileCount: number;
    thumbnailUrl: string;
    children?: Directory[];
};

export type Icon = 'svelte' | 'folder' | 'js';
