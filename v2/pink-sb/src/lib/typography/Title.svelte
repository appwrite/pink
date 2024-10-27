<script lang="ts">
    export let size: 'xl' | 'l' | 'm' | 's' = 'm' 
    export let truncate = false;
</script>

{#if size === 'xl'}
    <h1 class="xl" class:truncate {...$$restProps}><slot /></h1>
{:else if size === 'l'}
    <h2 class="l" class:truncate {...$$restProps}><slot /></h2>
{:else if size === 'm'}
    <h3 class="m" class:truncate {...$$restProps}><slot /></h3>
{:else}
    <h4 class="s" class:truncate {...$$restProps}><slot /></h4>
{/if}

<style lang="scss">
    @use './typography';
    h1,
    h2,
    h3,
    h4 {
        font-family: var(--font-family-brand);
        font-weight: 400;
    }
    .xl {
        font-size: var(--font-size-xxxl);
        line-height: 140%;
        letter-spacing: -0.144px;
    }
    .l {
        font-size: var(--font-size-xxl);
        line-height: 130%;
        letter-spacing: -0.144px;
    }
    .m {
        font-size: var(--font-size-xl);
        line-height: 120%;
        letter-spacing: -0.144px;
    }
    .s {
        font-size: var(--font-size-l);
        line-height: 130%;
    }

    .truncate {
        @include typography.truncate;
    }
</style>
