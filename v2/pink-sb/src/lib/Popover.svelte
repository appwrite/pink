<script lang="ts">
    import type { Placement } from '@floating-ui/dom';
    import { computePosition, autoUpdate, shift, offset, flip } from '@floating-ui/dom';
    import { onMount } from 'svelte';
    import { activePopover } from './context.js';

    export let portal: boolean = false;
    export let padding: 'none' | 'm' = 'm';
    export let placement: Placement | undefined = undefined;

    const activeInstance = activePopover.get();
    let id = 'popover-' + Math.random().toString(36).substring(2, 9);
    let referenceElement: HTMLSpanElement;
    let tooltipElement: HTMLDivElement;

    $: showTooltip = $activeInstance === id;

    function toggle(e?: Event) {
        return tooltipAction(e, 'toggle');
    }

    function show(e?: Event) {
        return tooltipAction(e, 'show');
    }

    function hide(e?: Event) {
        return tooltipAction(e, 'hide');
    }

    async function tooltipAction(event: Event | undefined, action: 'toggle' | 'show' | 'hide') {
        event?.preventDefault();
        event?.stopPropagation();
        await update();

        if (action === 'toggle') {
            activeInstance.set($activeInstance === id ? null : id);
        } else if (action === 'show') {
            activeInstance.set(id);
        } else if (action === 'hide') {
            activeInstance.set(null);
        }
    }

    async function onBlur(event: MouseEvent & { currentTarget: EventTarget & Window }) {
        const target = event.target as Node;
        if (showTooltip && !tooltipElement.contains(target) && document.contains(target)) {
            activeInstance.set(null);
        }
    }

    function onKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & Window }) {
        if (showTooltip && event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            activeInstance.set(null);
        }
    }

    async function update() {
        if (!referenceElement || !tooltipElement) return;
        const firstChild = referenceElement.firstChild;
        if (!(firstChild instanceof HTMLElement)) {
            return;
        }
        const { x, y } = await computePosition(firstChild, tooltipElement, {
            placement,
            middleware: [offset(2), flip(), shift()]
        });

        Object.assign(tooltipElement.style, {
            left: `${x}px`,
            top: `${y}px`
        });
    }

    function portalPopover(node: HTMLElement) {
        if (!portal) return;

        const target = document.body;
        target.appendChild(node);

        return {
            destroy() {
                if (node.parentNode === target) {
                    target.removeChild(node);
                }
            }
        };
    }

    onMount(() => autoUpdate(referenceElement, tooltipElement, update));
</script>

<svelte:window on:click={onBlur} on:keydown={onKeyDown} on:resize={update} />

<span aria-describedby={id} bind:this={referenceElement}>
    <slot showing={showTooltip} {toggle} {update} {show} {hide} />
</span>
<div
    {id}
    role="tooltip"
    aria-hidden={!showTooltip}
    bind:this={tooltipElement}
    class:padding-m={padding === 'm'}
    class:padding-none={padding === 'none'}
    use:portalPopover
>
    <slot showing={showTooltip} {toggle} {update} {show} {hide} name="tooltip" />
</div>

<style lang="scss">
    span {
        display: contents;
    }
    [role='tooltip'] {
        display: inline-flex;
        width: max-content;
        position: absolute;
        justify-content: center;
        align-items: center;
        gap: var(--gap-xxs);
        background: var(--bgcolor-neutral-primary);
        transition: all 0.15s ease-in-out;
        border: var(--border-width-s) solid var(--border-neutral);
        border-radius: var(--border-radius-m);
        box-shadow:
            0px 1px 3px 0px rgba(0, 0, 0, 0.03),
            0px 4px 4px 0px rgba(0, 0, 0, 0.04);
        opacity: 0;
        visibility: hidden;

        //tmp fix:
        z-index: 9001;
        &.padding- {
            &m {
                padding: var(--space-5);
            }
            &none {
                padding: 0;
            }
        }

        &[aria-hidden='false'] {
            opacity: 1;
            visibility: visible;
        }
    }
</style>
