<script lang="ts">
    type $$Props = Partial<{
        src: string;
        alt: string;
        size: 'xs' | 'small' | 'medium' | 'large' | 'x-large';
    }>;
    export let src: $$Props['src'] = '';
    export let alt: $$Props['alt'] = '';
    export let size: $$Props['size'] = 'medium';
</script>

{#if src}
    <img
        {src}
        {alt}
        class:xs={size === 'xs'}
        class:small={size === 'small'}
        class:large={size === 'large'}
        class:x-large={size === 'x-large'}
    />
{:else}
    <div
        class:xs={size === 'xs'}
        class:small={size === 'small'}
        class:large={size === 'large'}
        class:x-large={size === 'x-large'}
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
    .small {
        --p-avatar-size: 32px;
    }
    .large {
        --p-avatar-size: 48px;
    }
    .x-large {
        --p-avatar-size: 64px;
    }
</style>
