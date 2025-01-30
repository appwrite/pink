<script lang="ts">
    export let type: 'row' | 'header' = 'row';
</script>

<div role={type === 'row' ? 'row' : 'rowheader'}>
    <slot />
</div>

<style lang="scss">
    div {
        display: table-row;
        width: 100%;
        background: var(--color-bgcolor-neutral-primary);

        &[role='rowheader'] {
            background: var(--color-bgcolor-neutral-default);
        }

        &:last-child {
            :global([role='cell']) {
                border-bottom: 0;
            }
        }
    }
</style>
