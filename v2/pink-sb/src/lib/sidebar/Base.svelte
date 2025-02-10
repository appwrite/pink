<script lang="ts">
    import { Badge, Icon } from '$lib/index.js';
    import { IconChevronLeft, IconChevronRight, IconMinus } from '@appwrite.io/pink-icons-svelte';
    import type { $$Props } from '$lib/sidebar/index.js';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let state: $$Props['state'] = 'open';
    export let resizable: $$Props['resizable'] = true;

    $: {
        console.log('base component state update', state);
    }
</script>

{#if resizable}
    <button
        class="collapse"
        class:icons={state === 'icons'}
        on:click={() => {
            console.log('trigger collapse button');
            state = state === 'icons' ? 'open' : 'icons';
            dispatch('resize', state);
        }}
    >
        <div class="lines-container">
            <div class="icon icon-idle minus-icon"><Icon icon={IconMinus} /></div>
            <div class="icon icon-hover">
                <Icon
                    icon={state === 'icons' ? IconChevronRight : IconChevronLeft}
                    color="--color-fgcolor-neutral-tertiary"
                />
            </div>
        </div>
        <div class="badge">
            <Badge
                size="xs"
                variant="secondary"
                content={state === 'icons' ? 'Expand' : 'Collapse'}
            />
        </div>
    </button>
{/if}
<nav
    class:only-icons={state === 'icons'}
    class:open={state === 'open'}
    class:closed={state === 'closed'}
    {...$$props}
>
    <slot name="top"></slot>
    <div class="middle">
        <slot name="middle"></slot>
    </div>
    <slot name="bottom"></slot>
</nav>

<style lang="scss">
    nav {
        position: fixed;
        top: 0;
        height: 100vh;
        display: flex;
        width: 200px;
        z-index: 15;

        max-height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;

        padding: 0 var(--space-7, 16px) var(--space-7, 16px) var(--space-7, 16px);
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--gap-none, 0px);
        flex-shrink: 0;

        background: var(--color-bgcolor-neutral-primary, #fff);
        border-right: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);

        transition: all 0.2s ease-in-out;

        @media (min-width: 1024px) {
            overflow: visible;
            padding: var(--space-7, 16px);
            top: 48px;
            height: calc(100vh - 48px);
        }

        &.only-icons {
            width: 66px;
        }
    }

    .middle {
        width: 100%;
        flex-grow: 1;
    }

    .closed {
        transform: translateX(-100%);

        @media (min-width: 1024px) {
            transform: translateX(0);
        }
    }

    .collapse {
        display: none;
        transition: all 0.2s ease-in-out;
        @media (min-width: 1024px) {
            height: 20px;
            position: fixed;
            top: calc(50% - 10px);
            left: 210px;
            display: flex;
            align-items: center;
            z-index: 40;

            ::before {
                content: '';
                position: absolute;
                top: -10px; /* Increase the hover area */
                right: -10px;
                bottom: -10px;
                left: -20px;
                background: transparent; /* Ensure it's invisible */
                z-index: -1; /* Keeps it below the actual content */
            }
        }

        .minus-icon {
            transform: rotate(-90deg);
        }
        .icon {
            display: flex;
            align-items: center;
            color: var(--color-fgcolor-neutral-tertiary);
        }
        .icon-idle {
            display: block;
        }
        .icon-hover {
            display: none;
        }

        &:hover {
            .icon-idle {
                display: none;
            }
            .icon-hover {
                display: flex;
            }
        }

        &:hover + nav {
            width: 195px;
        }

        &.icons:hover + nav {
            width: 70px;
        }
    }

    .collapse.icons {
        left: 80px;
    }

    .lines-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 25px;
        margin-right: 0;
        transition: all 0.2s ease-in-out;
        overflow: hidden;
    }

    .line {
        width: 2px;
        height: 6px;
        background-color: var(--color-fgcolor-neutral-secondary, #ededf0);
    }

    .badge {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }

    .collapse:hover .badge {
        opacity: 1;
    }
</style>
