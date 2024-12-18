declare const sizes: readonly ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
export type Size = (typeof sizes)[number];
export declare function humanFileSize(
    bytes: number,
    useBits?: boolean
): {
    value: string;
    unit: Size;
};
export {};
