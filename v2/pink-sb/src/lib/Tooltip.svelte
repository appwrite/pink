<script lang="ts">
    import type { Placement } from '@floating-ui/dom';
    import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
    import { onMount } from 'svelte';

    export let placement: Placement | undefined = undefined;
    export let padding: 'none' | 'm' = 'm';
    export let offsetAmount: number = 6;
    export let disabled = false;
    export let maxWidth = '11.25rem';
    let show = false;
    const id = 'tooltip-' + crypto.randomUUID();
    let referenceElement: HTMLSpanElement;
    let tooltipElement: HTMLDivElement;

    async function showTooltip() {
        await update();
        show = !disabled;
    }

    function hideTooltip() {
        show = false;
    }

    async function update() {
        const firstChild = referenceElement.firstChild;
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

    onMount(() => autoUpdate(referenceElement, tooltipElement, update));
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
    <slot showing={show} {update} />
</span>
<div
    {id}
    bind:this={tooltipElement}
    aria-hidden={!show}
    class:padding-none={padding === 'none'}
    class:padding-m={padding === 'm'}
    role="tooltip"
    style:max-inline-size={maxWidth}
    data-state={!show ? 'closed' : 'open'}
>
    <slot showing={show} {update} name="tooltip" />
</div>

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
        background: var(--color-bgcolor-neutral-invert-weak);
        color: var(--color-fgcolor-on-invert);
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 0.2s;
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

        &[data-state='open'] {
            animation: pink-tooltip-enter 0.2s ease-out;
        }

        &[data-state='closed'] {
            animation: pink-tooltip-exit 0.2s ease-out;
        }
    }
    @keyframes pink-tooltip-enter {
        from {
            opacity: 0;
            transform: translateY(0.5rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pink-tooltip-exit {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(0.5rem);
        }
    }
</style>
