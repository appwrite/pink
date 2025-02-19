<script lang="ts">
    export let variant: 'l-600' | 'l-500' | 'l-400' | 'm-600' | 'm-500' | 'm-400' = 'm-400';
    export let color: string = '';
    export let truncate = false;
    export let align: 'start' | 'center' | 'end' = 'start';
</script>

<p
    class:l-600={variant === 'l-600'}
    class:l-500={variant === 'l-500'}
    class:l-400={variant === 'l-400'}
    class:m-400={variant === 'm-400'}
    class:m-600={variant === 'm-600'}
    class:m-500={variant === 'm-500'}
    class:center={align === 'center'}
    class:end={align === 'end'}
    style:--font-color={`var(${color})`}
    class:truncate
    {...$$restProps}
>
    <slot />
</p>

<style lang="scss">
    @use './typography';

    p {
        font-family: var(--font-family-sansserif);
        font-size: var(--font-size-s);
        line-height: 140%;
        letter-spacing: -0.063px;
        font-weight: 400;
        color: var(--font-color);
        text-align: start;
    }
    .l-600,
    .l-500,
    .l-400 {
        font-size: var(--font-size-m);
        letter-spacing: -0.16px;
    }
    .l-600,
    .m-600 {
        font-weight: 600;
    }
    .l-500,
    .m-500 {
        font-weight: 500;
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
