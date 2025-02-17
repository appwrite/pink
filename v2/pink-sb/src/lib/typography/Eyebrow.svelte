<script lang="ts">
    export let size: 's' | 'm' | 'l' = 'm';
    export let truncate = false;
    export let align: 'start' | 'center' | 'end' = 'start';
</script>

<span
    class:s={size === 's'}
    class:m={size === 'm'}
    class:l={size === 'l'}
    class:truncate
    class:center={align === 'center'}
    class:end={align === 'end'}
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
        &.l {
            font-size: var(--font-size-m);
        }
    }
    .center {
        text-align: center;
    }
    .end {
        text-align: end;
    }
    .truncate {
        @include typography.truncate;
    }
</style>
