export type Size = 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB';
export declare function humanFileSize(
    bytes: number,
    useBits?: boolean
): {
    value: string;
    unit: Size;
};
export {};
