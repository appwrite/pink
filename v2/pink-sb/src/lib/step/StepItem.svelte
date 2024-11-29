<script lang="ts">
    import ActiveIndicator from './active-indicator.svg';
    import Done from './done.svg';
    import { Tag } from '$lib/index.js';
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
            <Tag size="s">
                {#if state === 'next'}
                    Next
                {:else if state === 'current'}
                    Now
                {:else}
                    <img src={Done} alt="Done icon" /> <span>Done</span>
                {/if}
            </Tag>
        </div>
    {/if}
    <div class:badge-margin={!hideBadge}>
        <slot />
    </div>
</div>

<style lang="scss">
    .stepitem {
        padding: var(--space-9) var(--space-10);
        position: relative;

        &::before {
            content: '';
            position: absolute;
            background-color: var(--color-light-neutral-10, #ededf0);
            width: var(--border-width-m);
            height: 100%;
            margin-inline: calc(-1 * var(--space-10));
            z-index: -2;
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

    .badge {
        position: absolute;
        margin-block: calc(-1 * var(--space-4));

        img {
            width: 20px;
            height: 20px;
        }
    }

    .badge-margin {
        margin-block: var(--space-10);
    }
</style>
