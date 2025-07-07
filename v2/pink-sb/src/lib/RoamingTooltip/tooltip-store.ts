import type { Placement } from '@floating-ui/dom';

export interface TooltipContext {
    showTooltip: (
        anchor: HTMLElement,
        anchorId: string | symbol,
        options?: {
            placement?: Placement;
            padding?: 'none' | 'm';
            maxWidth?: string;
            offsetAmount?: number;
        }
    ) => void;
    hideTooltip: () => void;
    defaultPlacement: Placement;
    defaultPadding: 'none' | 'm';
    defaultMaxWidth: string;
    defaultOffsetAmount: number;
}

export const TOOLTIP_CONTEXT_KEY = Symbol('tooltip-provider');