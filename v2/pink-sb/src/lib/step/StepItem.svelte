<script lang="ts">
    import ActiveIndicator from './active-indicator.svg';
    import Done from './done.svg';
    import { Badge, Tag, Icon, Layout } from '$lib/index.js';
    import { IconCheck, IconCheckCircle } from '@appwrite.io/pink-icons-svelte';
    export let state: 'previous' | 'current' | 'next';
    export let noLine: boolean = false;
    export let shortLine: boolean = false;
    export let hideBadge: boolean = false;
</script>

<div class="stepitem" class:noline={noLine} class:shortline={shortLine}>
    {#if state === 'previous' || state === 'next'}
        <div class="dot-inactive" />
    {:else if state === 'current'}
        <div class="dot-active">
            <img src={ActiveIndicator} alt="Active" />
        </div>
    {/if}
    {#if !hideBadge}
        <div class="badge">
            <Badge
                variant="secondary"
                content={state === 'next'
                    ? 'Next'
                    : state === 'current'
                      ? 'Current'
                      : `<div class="done"><img src="${Done}"/> Done</Layout.Stack>`}
            />
        </div>
    {/if}
    <div class:badge-margin={!hideBadge}>
        <slot />
    </div>
</div>

<style lang="scss">
    .stepitem {
        padding: var(--space-9) 0 var(--space-9) var(--space-10);
        position: relative;

        &::before {
            content: '';
            position: absolute;
            background-color: var(--color-bgcolor-neutral-tertiary, #ededf0);
            width: var(--border-width-m);
            height: 100%;
            margin-inline: calc(-1 * var(--space-10));
            z-index: 0;
        }
    }

    .stepitem.noline::before {
        display: none;
    }

    .stepitem.shortline::before {
        height: calc(100% - var(--base-80));
    }

    .dot-inactive {
        width: 7px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: var(--color-light-neutral-10, #ededf0);
        margin-inline: calc(-1 * (var(--base-36) - 1px));
        position: absolute;
    }

    .dot-active {
        width: 16px;
        height: 16px;
        position: absolute;
        margin-inline: calc(-1 * (var(--base-36) + var(--base-2)));
        margin-block: calc(-1 * var(--space-2));
        background-color: var(--color-bgcolor-neutral-primary);

        img {
            position: absolute;
            right: var(--space-1);
        }
    }

    .dot-active::before {
        content: '';
        width: 1px;
        height: var(--base-80);
        background: linear-gradient(
            to bottom,
            rgba(253, 54, 110, 0) 0%,
            rgba(253, 54, 110, 1) 50%,
            rgba(253, 54, 110, 0) 100%
        );
        margin-inline: var(--base-6);
        position: absolute;
        margin-block: calc(-1 * var(--base-32));
        z-index: -1;
    }

    :global(.badge .done) {
        display: flex;
        flex-direction: row;
        gap: var(--gap-xxs, 4px);
        align-items: center;
    }

    :global(.badge img) {
        width: 20px;
        height: 20px;
    }

    .badge {
        position: absolute;
        margin-block: calc(-1 * var(--space-4));
    }

    .badge-margin {
        margin-block-start: var(--space-10);
    }
</style>
