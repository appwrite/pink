<script lang="ts" context="module">
    import type { ComponentType } from 'svelte';
    export type GroupItem = {
        id: string;
        label: string;
        icon: ComponentType;
        disabled?: boolean;
    };
</script>

<script lang="ts">
    import { createToggleGroup } from '@melt-ui/svelte';
    import Icon from '$lib/Icon.svelte';
    import { onMount } from 'svelte';

    export let buttons: GroupItem[];
    export let active: string | undefined = undefined;

    let activeButton: HTMLElement;
    let indicator: HTMLElement;
    let containerRef: HTMLElement;
    let isInitialPosition = true;

    const {
        elements: { root, item },
        states: { value }
    } = createToggleGroup({
        type: 'single',
        onValueChange: ({ curr, next }) => {
            if (next === undefined || Array.isArray(next)) return curr;
            active = next;

            // Update indicator position when value changes
            updateIndicatorPosition();
            return next;
        }
    });

    const updateIndicatorPosition = () => {
        if (!containerRef || !indicator) return;

        const activeEl = containerRef.querySelector(`[data-id="${active}"]`);
        if (!activeEl) return;

        const containerRect = containerRef.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();

        const left = activeRect.left - containerRect.left - 1;

        // Remove transform transition for initial positioning
        if (isInitialPosition) {
            indicator.style.transition = 'opacity 0.2s ease';
        }

        indicator.style.transform = `translateX(${left}px)`;
        indicator.style.width = `${activeRect.width}px`;
        indicator.style.opacity = '1';

        if (isInitialPosition) {
            // Force reflow to ensure the transition removal takes effect
            indicator.offsetHeight;
            // Restore all transitions
            indicator.style.transition = '';
            isInitialPosition = false;
        }
    };

    onMount(() => {
        updateIndicatorPosition();
    });

    $: value.set(active ?? undefined);
    $: if (active) {
        setTimeout(updateIndicatorPosition, 0);
    }
</script>

<div {...$root} use:root bind:this={containerRef}>
    <span bind:this={indicator} />
    {#each buttons as button}
        <button
            {...$item(button.id)}
            use:item
            aria-label={button.label}
            disabled={button.disabled}
            data-id={button.id}
        >
            <Icon icon={button.icon} />
        </button>
    {/each}
</div>

<style lang="scss">
    @use '../scss/mixins/transitions';

    div {
        @include transitions.common;

        display: inline-flex;
        padding: var(--space-1);
        gap: var(--space-3);
        position: relative;

        border-radius: var(--border-radius-s);
        border: 1px solid var(--color-border-neutral);
        background: var(--color-bgcolor-neutral-default);

        span {
            position: absolute;
            height: calc(100% - var(--space-2));
            top: var(--space-1);
            left: 0;
            background: var(--color-bgcolor-neutral-tertiary);
            border-radius: var(--border-radius-xs);
            transition:
                transform 0.2s ease,
                width 0.2s ease,
                opacity 0.2s ease;
            pointer-events: none;
            opacity: 0;
        }

        button {
            @include transitions.common;

            display: inline-flex;
            padding: var(--space-2);
            border-radius: var(--border-radius-xs);
            outline-offset: var(--border-width-l);
            position: relative;
            z-index: 1;

            &:not(:disabled) {
                cursor: pointer;
            }

            &:hover:not(&[aria-checked='true']):not(:disabled) {
                background: var(--color-overlay-button-neutral-hover);
            }

            &:disabled {
                opacity: 0.4;
            }

            &:focus-visible {
                outline: var(--border-width-l) solid var(--color-border-focus);
            }
        }
    }
</style>
