<script lang="ts">
    type $$Props = HTMLElement & {
        state?: 'closed' | 'open' | 'icons';
    };

    export let state: $$Props['state'] = 'open';
</script>

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

    .middle {
        flex-grow: 1;
    }

    .closed {
        transform: translateX(-100%);

        @media (min-width: 1024px) {
            transform: translateX(0);
        }
    }
</style>
