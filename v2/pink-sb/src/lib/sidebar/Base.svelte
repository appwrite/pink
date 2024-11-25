<script lang="ts">
    type $$Props = HTMLElement & {
        state?: 'closed' | 'open' | 'icons';
    };

    export let state: $$Props['state'] = 'open';
</script>

<nav class:only-icons={state === 'icons'} {...$$props}>
    <slot name="top"></slot>
    <div class="middle">
        <slot name="middle"></slot>
    </div>
    <slot name="bottom"></slot>
</nav>

<style lang="scss">
    nav {
        height: calc(100vh - 48px);
        display: flex;
        width: 200px;

        padding: var(--space-7, 16px);
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--gap-none, 0px);
        flex-shrink: 0;

        background: var(--color-bgcolor-neutral-primary, #fff);
        border-right: var(--border-width-s, 1px) solid var(--color-border-neutral, #ededf0);

        transition: width 0.2s ease-in-out;

        &.only-icons {
            width: 65px;
        }
    }

    .middle {
        flex-grow: 1;
    }
</style>
