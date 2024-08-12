<script lang="ts">
    import { computePosition, shift, offset, autoPlacement } from '@floating-ui/dom';

    export let inline = true;

    let show = false;
    let id = 'tooltip-' + Math.random().toString(16).slice(2);
    let referenceElement: HTMLDivElement;
    let tooltipElement: HTMLDivElement;

    function showTooltip() {
        show = true;
    }
    function hideTooltip() {
        show = false;
    }
    async function update() {
        const { x, y } = await computePosition(referenceElement, tooltipElement, {
            middleware: [offset(6), autoPlacement(), shift()]
        });

        Object.assign(tooltipElement.style, {
            left: `${x}px`,
            top: `${y}px`
        });
    }

    $: if (show) update();
</script>

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
    <slot />
</div>
<div {id} bind:this={tooltipElement} aria-hidden={!show} role="tooltip">
    <slot name="tooltip" />
</div>

<style lang="scss">
    [role='tooltip'] {
        display: inline-flex;
        width: max-content;
        position: absolute;
        padding: var(--space-2) var(--space-4);
        justify-content: center;
        align-items: center;
        gap: var(--space-0);
        border-radius: var(--border-radius-s);
        background: var(--color-bgcolor-neutral-invert-weak);
        color: var(--color-fgcolor-on-invert);
        visibility: hidden;

        &[aria-hidden='false'] {
            visibility: visible;
        }
    }
</style>
