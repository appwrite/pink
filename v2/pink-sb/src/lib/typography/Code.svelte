<script lang="ts">
    export let size: 'small' | 'medium' = 'medium';
</script>

<code class:small={size === 'small'} class:medium={size === 'medium'}><slot /></code>

<style lang="scss">
    code {
        font-family: var(--font-family-code);
        line-height: 140%;
        letter-spacing: 0;
        font-weight: 400;
        font-size: var(--font-size-s);
        &.small {
            font-size: var(--font-size-xs);
        }
    }
</style>
