<script lang="ts">
    import type { Placement } from '@floating-ui/dom';
    import { computePosition, shift, offset, flip } from '@floating-ui/dom';

    export let inline = true;
    export let placement: Placement | undefined = undefined;

    let show = false;
    let id = 'tooltip-' + Math.random().toString(16).slice(2);
    let referenceElement: HTMLDivElement;
    let tooltipElement: HTMLDivElement;

    async function toggle(event: Event) {
        event.stopPropagation();
        await update();
        show = !show;
    }

    async function onBlur(event: MouseEvent & { currentTarget: EventTarget & Window }) {
        if (show && !tooltipElement.contains(event.target as Node)) {
            show = false;
        }
    }

    function onKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & Window }) {
        if (show && event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            show = false;
        }
    }

    async function update() {
        const { x, y } = await computePosition(referenceElement, tooltipElement, {
            placement,
            middleware: [offset(6), flip(), shift()]
        });

        Object.assign(tooltipElement.style, {
            left: `${x}px`,
            top: `${y}px`
        });
    }

    //TODO: fix multiple tooltips remaining open
</script>

<svelte:window on:click={onBlur} on:keydown={onKeyDown} on:resize={update} />

<div
    style:display={inline ? 'inline-block' : 'block'}
    aria-describedby={id}
    bind:this={referenceElement}
>
    <slot showing={show} {toggle} {update} />
</div>
<div {id} bind:this={tooltipElement} aria-hidden={!show} role="tooltip">
    <slot showing={show} {toggle} {update} name="tooltip" />
</div>

<style lang="scss">
    [role='tooltip'] {
        display: inline-flex;
        width: max-content;
        position: absolute;
        padding: var(--gap-s) var(--gap-m);
        justify-content: center;
        align-items: center;
        gap: var(--gap-xxs);
        background: var(--color-bgcolor-neutral-primary);
        border: var(--border-width-s) solid var(--color-border-neutral);
        border-radius: var(--border-radius-m);
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);
        visibility: hidden;

        &[aria-hidden='false'] {
            visibility: visible;
        }
    }
</style>
