<script lang="ts">
    export let size: 's' | 'medium' | 'large' = 'medium';
    export let truncate = false;
</script>

<span
    class:s={size === 's'}
    class:medium={size === 'medium'}
    class:large={size === 'large'}
    class:truncate
    {...$$restProps}
>
    <slot />
</span>

<style lang="scss">
    @use './typography';

    span {
        font-family: var(--font-family-monospace);
        line-height: 140%;
        font-size: var(--font-size-s);
        letter-spacing: -0.16px;
        &.s {
            font-size: var(--font-size-xs);
            letter-spacing: -0.063px;
            line-height: 130%;
        }
        &.large {
            font-size: var(--font-size-m);
        }
    }

    .truncate {
        @include typography.truncate;
    }
</style>
