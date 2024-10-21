<script lang="ts">
    export let variant: '500' | '400';
</script>

<span class:variant-400={variant === '400'} class:variant-500={variant === '500'} {...$$restProps}>
    <slot />
</span>

<style lang="scss">
    span {
        font-family: var(--font-family-sansserif);
        line-height: 140%;
        letter-spacing: -0.063px;
        font-size: var(--font-size-xs);
        font-weight: 400;
        &.variant-500 {
            font-size: var(--font-size-s);
            font-weight: 500;
        }
    }
</style>
