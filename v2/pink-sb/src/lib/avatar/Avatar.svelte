<script lang="ts">
    type $$Props = Partial<{
        src: string;
        alt: string;
        size: 'xs' | 's' | 'm' | 'l' | 'xl';
        empty: boolean;
    }>;
    export let src: $$Props['src'] = '';
    export let alt: $$Props['alt'] = '';
    export let size: $$Props['size'] = 'm';
    export let empty: $$Props['empty'] = false;
</script>

{#if src}
    <img
        {src}
        {alt}
        class:xs={size === 'xs'}
        class:s={size === 's'}
        class:l={size === 'l'}
        class:xl={size === 'xl'}
    />
{:else}
    <div
        class:empty
        class:xs={size === 'xs'}
        class:s={size === 's'}
        class:l={size === 'l'}
        class:xl={size === 'xl'}
    >
        {#if !empty}
            <slot />
        {/if}
    </div>
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
        border: var(--border-width-s) solid var(--color-border-neutral-strong);
        background: var(--color-bgcolor-neutral-secondary);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .empty {
        border: 1px dashed var(--color-border-neutral-strong);
        background: var(--color-bgColor-neutral-primary);
    }
    .xs {
        --p-avatar-size: 24px;
    }
    .s {
        --p-avatar-size: 32px;
    }
    .l {
        --p-avatar-size: 48px;
    }
    .xl {
        --p-avatar-size: 64px;
    }
</style>
