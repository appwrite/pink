const bigintPattern = /^-?\d+$/;
const defaultStep = 1n;

function parseBigIntString(raw: string): bigint | null {
    const trimmed = raw.trim();

    if (trimmed === '' || !bigintPattern.test(trimmed)) {
        return null;
    }

    try {
        return BigInt(trimmed);
    } catch {
        return null;
    }
}

export function parseBigIntValue(raw: unknown): bigint | null {
    if (raw === undefined) {
        return null;
    }

    if (typeof raw === 'bigint') {
        return raw;
    }

    if (typeof raw === 'number') {
        return Number.isFinite(raw) ? BigInt(Math.trunc(raw)) : null;
    }

    const trimmed = String(raw ?? '').trim();

    if (trimmed === '') {
        return 0n;
    }

    return parseBigIntString(trimmed);
}

export function parseBigIntStep(raw: unknown): bigint {
    if (typeof raw === 'number') {
        if (!Number.isFinite(raw) || raw === 0) {
            return defaultStep;
        }

        return BigInt(Math.trunc(raw));
    }

    if (typeof raw === 'string') {
        const trimmed = raw.trim();

        if (trimmed === '' || trimmed === 'any') {
            return defaultStep;
        }

        return parseBigIntString(trimmed) ?? defaultStep;
    }

    return defaultStep;
}
