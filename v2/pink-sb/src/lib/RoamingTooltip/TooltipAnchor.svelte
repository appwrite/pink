<script lang="ts">
    import { getContext, hasContext } from 'svelte';
    import type { Placement } from '@floating-ui/dom';
    import type { TooltipContext } from './tooltip-store.js';
    import { TOOLTIP_CONTEXT_KEY } from './tooltip-store.js';

    export let id: string | symbol;
    export let placement: Placement | undefined = undefined;
    export let padding: 'none' | 'm' | undefined = undefined;
    export let offsetAmount: number | undefined = undefined;
    export let maxWidth: string | undefined = undefined;
    export let disabled = false;

    if (!hasContext(TOOLTIP_CONTEXT_KEY)) {
        throw new Error('TooltipAnchor must be used within a TooltipProvider');
    }

    const tooltipContext = getContext<TooltipContext>(TOOLTIP_CONTEXT_KEY);

    const {
        showTooltip,
        hideTooltip,
        defaultPlacement,
        defaultPadding,
        defaultMaxWidth,
        defaultOffsetAmount
    } = tooltipContext;

    let anchorElement: HTMLElement;

    function handleMouseEnter() {
        if (disabled || !anchorElement) return;

        showTooltip(anchorElement, id, {
            placement: placement ?? defaultPlacement,
            padding: padding ?? defaultPadding,
            maxWidth: maxWidth ?? defaultMaxWidth,
            offsetAmount: offsetAmount ?? defaultOffsetAmount
        });
    }

    function handleMouseLeave() {
        if (disabled) return;
        hideTooltip();
    }

    function handleFocus() {
        if (disabled || !anchorElement) return;

        showTooltip(anchorElement, id, {
            placement: placement ?? defaultPlacement,
            padding: padding ?? defaultPadding,
            maxWidth: maxWidth ?? defaultMaxWidth,
            offsetAmount: offsetAmount ?? defaultOffsetAmount
        });
    }

    function handleBlur() {
        if (disabled) return;
        hideTooltip();
    }
</script>

<span
    bind:this={anchorElement}
    role="note"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:focus={handleFocus}
    on:blur={handleBlur}
>
    <slot />
</span>

<style lang="scss">
    span {
        display: inline-block;
    }
</style>
