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
        padding: 24px 29px;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            background-color: var(--color-light-neutral-10, #ededf0);
            width: 1px;
            height: 100%;
            margin-left: -30px;
            z-index: -2;
        }
    }

    .stepitem.noline::before {
        display: none;
    }

    .stepitem.shortline::before {
        height: calc(100% - 50px);
    }

    .dot-inactive {
        width: 7px;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: var(--color-light-neutral-10, #ededf0);
        margin-left: -33px;
        position: absolute;
    }

    .dot-active {
        width: 16px;
        height: 17px;
        position: absolute;
        margin-left: -37px;
        margin-top: -3px;
        background-color: var(--color-bgcolor-neutral-primary);
    }

    .dot-active::before {
        content: '';
        width: 1px;
        height: 80px;
        background: linear-gradient(
            to bottom,
            rgba(253, 54, 110, 0) 0%,
            rgba(253, 54, 110, 1) 50%,
            rgba(253, 54, 110, 0) 100%
        );
        margin-left: 7px;
        position: absolute;
        margin-top: -30px;
        z-index: -1;
    }

    .badge {
        position: absolute;
        margin-top: -9px;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .badge-margin {
        margin-top: 30px;
    }
</style>
