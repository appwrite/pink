<script>
    import Row from './Row.svelte';
</script>

<div>
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
    div {
        overflow-x: auto;
        [role='table'] {
            display: table;
            width: 100%;
            overflow: hidden;
            border: 1px solid var(--color-border-neutral);
            border-radius: var(--border-radius-s);
        }
    }
</style>
