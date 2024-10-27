<script lang="ts">
    type $$Props = Partial<{
        src: string;
        alt: string;
        size: 'xs' | 's' | 'm' | 'large' | 'xl';
    }>;
    export let src: $$Props['src'] = '';
    export let alt: $$Props['alt'] = '';
    export let size: $$Props['size'] = 'm';
</script>

{#if src}
    <img
        {src}
        {alt}
        class:xs={size === 'xs'}
        class:s={size === 's'}
        class:large={size === 'large'}
        class:xl={size === 'xl'}
    />
{:else}
    <div
        class:xs={size === 'xs'}
        class:s={size === 's'}
        class:large={size === 'large'}
        class:xl={size === 'xl'}
    />
{/if}

<style lang="scss">
    img,
    div {
        --p-avatar-size: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: var(--border-radius-circle);
        width: var(--p-avatar-size);
        height: var(--p-avatar-size);
    }
    div {
        border: 1px dashed var(--color-border-neutral-strong);
        background: var(--color-bgColor-neutral-primary);
    }
    .xs {
        --p-avatar-size: 24px;
    }
    .s {
        --p-avatar-size: 32px;
    }
    .large {
        --p-avatar-size: 48px;
    }
    .xl {
        --p-avatar-size: 64px;
    }
</style>
