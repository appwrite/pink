<script>
    import Row from './Row.svelte';
</script>

<div class="root">
    <div role="table">
        {#if $$slots.header}
            <Row type="header">
                <slot name="header" />
            </Row>
        {/if}
        <slot />
    </div>
</div>

<style lang="scss">
    .root {
        overflow-x: auto;
        border: 1px solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);

        ::-webkit-scrollbar {
            display: none;
        }

        [role='table'] {
            display: table;
            width: 100%;
            overflow: hidden;
        }
    }
</style>
