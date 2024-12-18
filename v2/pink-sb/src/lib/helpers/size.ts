import prettyBytes from 'pretty-bytes';

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] as const;
export type Size = (typeof sizes)[number];

export function humanFileSize(
    bytes: number,
    useBits = false
): {
    value: string;
    unit: Size;
} {
    if (typeof bytes !== 'number') return { value: '0', unit: 'Bytes' };
    const value = prettyBytes(bytes, {
        locale: 'en',
        bits: useBits
    }).split(' ');

    return {
        value: value[0],
        unit: value[1].toUpperCase() as Size
    };
}
