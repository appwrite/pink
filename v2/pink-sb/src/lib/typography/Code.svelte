<script lang="ts">
    export let size: 's' | 'm' = 'm';
</script>

<code class:s={size === 's'} class:m={size === 'm'} {...$$restProps}><slot /></code>

<style lang="scss">
    code {
        font-family: var(--font-family-code);
        line-height: 140%;
        letter-spacing: 0;
        font-weight: 400;
        font-size: var(--font-size-s);
        &.s {
            font-size: var(--font-size-xs);
        }
    }
</style>
