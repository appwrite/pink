<script lang="ts">
    import { onMount, onDestroy, setContext } from 'svelte';
    import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
    import type { Placement } from '@floating-ui/dom';
    import type { TooltipContext } from './tooltip-store.js';
    import { TOOLTIP_CONTEXT_KEY } from './tooltip-store.js';

    export let showDelay = 100;
    export let hideDelay = 500;
    export let defaultPlacement: Placement = 'top';
    export let defaultPadding: 'none' | 'm' = 'm';
    export let defaultMaxWidth = '11.25rem';
    export let defaultOffsetAmount = 6;

    let tooltipElement: HTMLDivElement;
    let currentAnchor: HTMLElement | null = null;
    let currentAnchorId: string | symbol | null = null;
    let currentPlacement: Placement = defaultPlacement;
    let currentPadding: 'none' | 'm' = defaultPadding;
    let currentMaxWidth = defaultMaxWidth;
    let currentOffsetAmount = defaultOffsetAmount;
    let isVisible = false;

    let showTimeout: ReturnType<typeof setTimeout> | null = null;
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;
    let cleanup: (() => void) | null = null;

    async function updatePosition() {
        if (!currentAnchor || !tooltipElement) return;

        const { x, y } = await computePosition(currentAnchor, tooltipElement, {
            placement: currentPlacement,
            middleware: [
                offset(currentOffsetAmount),
                flip(),
                shift({ padding: 8 })
            ]
        });

        tooltipElement.style.setProperty('--tooltip-x', `${x}px`);
        tooltipElement.style.setProperty('--tooltip-y', `${y}px`);
    }

    async function setupAutoUpdate() {
        if (cleanup) {
            cleanup();
            cleanup = null;
        }

        if (!currentAnchor || !tooltipElement) return;

        await updatePosition();
        cleanup = autoUpdate(currentAnchor, tooltipElement, updatePosition);
    }

    function showTooltip(
        anchor: HTMLElement,
        anchorId: string | symbol,
        options: {
            placement?: Placement;
            padding?: 'none' | 'm';
            maxWidth?: string;
            offsetAmount?: number;
        } = {}
    ) {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        
        // Update anchor and options immediately
        currentAnchor = anchor;
        currentAnchorId = anchorId;
        currentPlacement = options.placement ?? defaultPlacement;
        currentPadding = options.padding ?? defaultPadding;
        currentMaxWidth = options.maxWidth ?? defaultMaxWidth;
        currentOffsetAmount = options.offsetAmount ?? defaultOffsetAmount;

        if (isVisible) {
            // Already visible, just move to new anchor immediately
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            setupAutoUpdate();
        } else {
            // Not visible yet, show with delay
            if (showTimeout) {
                clearTimeout(showTimeout);
            }

            showTimeout = setTimeout(async () => {
                isVisible = true;
                await setupAutoUpdate();
                showTimeout = null;
            }, showDelay);
        }
    }

    function hideTooltip() {
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }

        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        hideTimeout = setTimeout(() => {
            isVisible = false;
            currentAnchor = null;
            currentAnchorId = null;
            
            if (cleanup) {
                cleanup();
                cleanup = null;
            }
            
            hideTimeout = null;
        }, hideDelay);
    }

    function handleTooltipMouseEnter() {
        // Cancel hide when hovering over tooltip
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    }

    function handleTooltipMouseLeave() {
        // Start hide timer when leaving tooltip
        hideTooltip();
    }

    // Provide context to child components
    setContext<TooltipContext>(TOOLTIP_CONTEXT_KEY, {
        showTooltip,
        hideTooltip,
        defaultPlacement,
        defaultPadding,
        defaultMaxWidth,
        defaultOffsetAmount
    });

    onMount(() => {
        // Move tooltip to body for proper z-index
        if (tooltipElement && tooltipElement.parentElement !== document.body) {
            document.body.appendChild(tooltipElement);
        }
    });

    onDestroy(() => {
        if (showTimeout) clearTimeout(showTimeout);
        if (hideTimeout) clearTimeout(hideTimeout);
        if (cleanup) cleanup();
        
        if (tooltipElement && tooltipElement.parentElement) {
            tooltipElement.parentElement.removeChild(tooltipElement);
        }
    });
</script>

<svelte:window on:resize={updatePosition} />

<slot />

<div
    bind:this={tooltipElement}
    class:visible={isVisible}
    class:padding-none={currentPadding === 'none'}
    class:padding-m={currentPadding === 'm'}
    style:max-inline-size={currentMaxWidth}
    role="tooltip"
    aria-hidden={!isVisible}
    on:mouseenter={handleTooltipMouseEnter}
    on:mouseleave={handleTooltipMouseLeave}
>
    <slot name="tooltip" anchor={currentAnchorId} />
</div>

<style lang="scss">
    [role='tooltip'] {
        display: inline-flex;
        width: max-content;
        position: absolute;
        left: var(--tooltip-x, 0px);
        top: var(--tooltip-y, 0px);
        justify-content: center;
        align-items: center;
        gap: var(--space-0);
        border-radius: var(--border-radius-s);
        background: var(--bgcolor-neutral-invert-weak);
        color: var(--fgcolor-on-invert);
        visibility: hidden;
        opacity: 0;
        transition: 
            opacity 0.2s ease-out,
            transform 0.2s ease-out,
            left 0.2s ease-out,
            top 0.2s ease-out;
        transform: translateY(0.5rem);
        z-index: 9002;
        pointer-events: none;

        &.visible {
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
        }

        &.padding {
            &-none {
                padding: 0;
            }
            &-m {
                padding: var(--space-2) var(--space-4);
            }
        }
    }
</style>