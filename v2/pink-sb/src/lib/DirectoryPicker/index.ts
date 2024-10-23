export type Directory = {
    id: string;
    name: string;
    fullPath: string;
    fileCount: number;
    thumbnailUrl: string;
    subDirectories: Directory[];
};
