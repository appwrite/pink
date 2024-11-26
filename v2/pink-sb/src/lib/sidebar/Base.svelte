<script lang="ts">
    import { Badge } from '$lib';

    type $$Props = HTMLElement & {
        state?: 'closed' | 'open' | 'icons';
    };

    export let state: $$Props['state'] = 'open';
</script>

<button
    class="collapse"
    class:icons={state === 'icons'}
    on:click={() => {
        state = state === 'icons' ? 'open' : 'icons';
    }}
>
    <div class="lines-container">
        <div class="line line-top"></div>
        <div class="line line-bottom"></div>
    </div>
    <div class="badge">
        <Badge size="xs" variant="primary" content={state === 'icons' ? 'Expand' : 'Collapse'} />
    </div>
</button>
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
        top: 48px;
        height: calc(100vh - 48px);
        display: flex;
        width: 200px;
        z-index: 10;

        padding: 0 var(--space-7, 16px) var(--space-7, 16px) var(--space-7, 16px);
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--gap-none, 0px);
        flex-shrink: 0;

        background: var(--color-bgcolor-neutral-primary, #fff);
        border-right: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);

        transition: all 0.2s ease-in-out;

        @media (min-width: 768px) {
            padding: var(--space-7, 16px);
        }

        &.only-icons {
            width: 65px;
        }
    }

    .collapse:hover + nav {
        width: 190px;
    }
    .collapse.icons:hover + nav {
        width: 75px;
    }

    .middle {
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
        @media (min-width: 1024px) {
            width: 20px;
            height: 20px;
            position: fixed;
            top: calc(50% - 10px);
            left: 220px;
            display: flex;
            align-items: center;
        }
    }

    .collapse.icons {
        left: 100px;
    }

    .lines-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .line {
        width: 2px;
        height: 6px;
        background-color: var(--color-fgcolor-neutral-secondary, #ededf0);
    }

    .collapse:hover .line {
        height: 8px;
    }

    .line-top {
        transform-origin: center center;
    }

    .line-bottom {
        transform-origin: center center;
    }

    .collapse:hover .line-top {
        transform: rotate(45deg) translate(1px, 1px); /* Align top part of `<` */
    }

    .collapse:hover .line-bottom {
        transform: rotate(-45deg) translate(1px, -1px); /* Align bottom part of `<` */
    }

    .icons:hover .line-top {
        transform: rotate(-45deg) translate(-1px, 1px); /* Align top part of `<` */
    }

    .icons:hover .line-bottom {
        transform: rotate(45deg) translate(-1px, -1px); /* Align bottom part of `<` */
    }

    .badge {
        opacity: 0;
        margin-left: var(--gap-s);
        transition: opacity 0.2s ease-in-out;
    }

    .collapse:hover .badge {
        opacity: 1;
    }
</style>
