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

    $: show = $activeInstance === id;

    async function toggle(event?: Event) {
        event?.preventDefault();
        event?.stopPropagation();
        await update();
        activeInstance.set($activeInstance === id ? null : id);
    }

    async function onBlur(event: MouseEvent & { currentTarget: EventTarget & Window }) {
        const target = event.target as Node;
        if (show && !tooltipElement.contains(target) && target.parentElement !== null) {
            activeInstance.set(null);
        }
    }

    function onKeyDown(event: KeyboardEvent & { currentTarget: EventTarget & Window }) {
        if (show && event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            activeInstance.set(null);
        }
    }

    async function update() {
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
    <slot showing={show} {toggle} {update} />
</span>
<div
    {id}
    bind:this={tooltipElement}
    aria-hidden={!show}
    role="tooltip"
    class:padding-m={padding === 'm'}
    class:padding-none={padding === 'none'}
    use:portalPopover
>
    <slot showing={show} {toggle} {update} name="tooltip" />
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
