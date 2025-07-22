<script lang="ts">
    import { tick } from 'svelte';
    import type { Placement } from '@floating-ui/dom';
    import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

    export let placement: Placement | undefined = undefined;
    export let padding: 'none' | 'm' = 'm';
    export let offsetAmount: number = 6;
    export let disabled = false;
    export let maxWidth = '11.25rem';

    let show = false;
    let showing = false;
    const id = 'tooltip-' + Math.random().toString(36).substring(2, 9);
    let referenceElement: HTMLSpanElement;
    let tooltipElement: HTMLDivElement;

    async function showTooltip() {
        await update();
        showing = show = !disabled;
    }

    function hideTooltip() {
        show = false;
    }

    async function update() {
        if (!referenceElement || !tooltipElement) return;

        const firstChild = referenceElement.firstElementChild;
        if (!(firstChild instanceof HTMLElement)) {
            return;
        }

        const { x, y } = await computePosition(firstChild, tooltipElement, {
            placement,
            middleware: [offset(offsetAmount), flip(), shift()]
        });

        Object.assign(tooltipElement.style, {
            left: `${x}px`,
            top: `${y}px`
        });
    }

    function fadeSlide(_: Node, { y = 8, duration = 200 } = {}) {
        return {
            duration,
            css: (time: number) => `
                opacity: ${time};
                transform: translateY(${(1 - time) * y}px);
             `
        };
    }

    function autoUpdateAction(_: HTMLDivElement) {
        tick().then(() => {
           if (!referenceElement || !tooltipElement) return;

           const cleanup = autoUpdate(referenceElement, tooltipElement, update);
           return { destroy: cleanup };
        });
    }
</script>

<svelte:window on:resize={update} />

<span
    role="note"
    aria-describedby={id}
    bind:this={referenceElement}
    on:mouseenter={showTooltip}
    on:focus={showTooltip}
    on:focusin={showTooltip}
    on:mouseleave={hideTooltip}
    on:blur={hideTooltip}
>
    <slot {showing} {update} />
</span>

{#if show}
    <div
        {id}
        transition:fadeSlide
        use:autoUpdateAction
        on:transitionend={() => (showing = false)}
        bind:this={tooltipElement}
        aria-hidden={!show}
        class:padding-none={padding === 'none'}
        class:padding-m={padding === 'm'}
        role="tooltip"
        style:max-inline-size={maxWidth}
        data-state={!show ? 'closed' : 'open'}
    >
        <slot {showing} {update} name="tooltip" />
    </div>
{/if}

<style lang="scss">
    [role='note'] {
        display: contents;
    }

    [role='tooltip'] {
        display: inline-flex;
        width: max-content;
        position: absolute;
        justify-content: center;
        align-items: center;
        gap: var(--space-0);
        border-radius: var(--border-radius-s);
        background: var(--bgcolor-neutral-invert-weak);
        color: var(--fgcolor-on-invert);
        visibility: hidden;
        opacity: 0;
        z-index: 9002;

        &[aria-hidden='false'] {
            visibility: visible;
            opacity: 1;
            transition: visibility 0s linear 0s;
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
