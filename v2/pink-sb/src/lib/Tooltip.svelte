<script lang="ts">
    import type { Placement } from '@floating-ui/dom';
    import { computePosition, flip, offset, shift } from '@floating-ui/dom';

    export let inline = true;
    export let placement: Placement | undefined = undefined;
    export let padding: 'none' | 'm' = 'm';
    export let offsetAmount: number = 6;
    let show = false;
    const id = 'tooltip-' + Math.random().toString(16).slice(2);
    let referenceElement: HTMLDivElement;
    let tooltipElement: HTMLDivElement;

    async function showTooltip() {
        await update();
        show = true;
    }

    function hideTooltip() {
        show = false;
    }

    async function update() {
        const { x, y } = await computePosition(referenceElement, tooltipElement, {
            placement,
            middleware: [offset(offsetAmount), flip(), shift()]
        });

        Object.assign(tooltipElement.style, {
            left: `${x}px`,
            top: `${y}px`
        });
    }
</script>

<svelte:window on:resize={update} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    style:display={inline ? 'inline-block' : 'block'}
    aria-describedby={id}
    bind:this={referenceElement}
    on:mouseenter={showTooltip}
    on:focus={showTooltip}
    on:focusin={showTooltip}
    on:mouseleave={hideTooltip}
    on:blur={hideTooltip}
>
    <slot showing={show} {update} />
</div>
<div
    {id}
    bind:this={tooltipElement}
    aria-hidden={!show}
    class:padding-none={padding === 'none'}
    class:padding-m={padding === 'm'}
    role="tooltip"
    data-state={!show ? 'closed' : 'open'}
>
    <slot showing={show} {update} name="tooltip" />
</div>

<style lang="scss">
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
