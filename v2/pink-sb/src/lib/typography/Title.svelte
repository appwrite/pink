<script lang="ts">
    export let size: 'x-large' | 'large' | 'medium' | 'small';
</script>

{#if size === 'x-large'}
    <h1 class="x-large" {...$$restProps}><slot /></h1>
{:else if size === 'large'}
    <h2 class="large" {...$$restProps}><slot /></h2>
{:else if size === 'medium'}
    <h3 class="medium" {...$$restProps}><slot /></h3>
{:else}
    <h4 class="small" {...$$restProps}><slot /></h4>
{/if}

<style lang="scss">
    h1,
    h2,
    h3,
    h4 {
        font-family: var(--font-family-brand);
        font-weight: 400;
    }
    .x-large {
        font-size: var(--font-size-xxxl);
        line-height: 140%;
        letter-spacing: -0.144px;
    }
    .large {
        font-size: var(--font-size-xxl);
        line-height: 130%;
        letter-spacing: -0.144px;
    }
    .medium {
        font-size: var(--font-size-xl);
        line-height: 120%;
        letter-spacing: -0.144px;
    }
    .small {
        font-size: var(--font-size-l);
        line-height: 130%;
    }
</style>
