<script lang="ts">
    import { hasContext } from 'svelte';

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

    const inGroup = hasContext('avatar-group');
</script>

{#if src}
    <img
        data-avatar
        {src}
        {alt}
        class:xs={size === 'xs'}
        class:s={size === 's'}
        class:l={size === 'l'}
        class:xl={size === 'xl'}
        class:in-group={inGroup}
    />
{:else}
    <div
        data-avatar
        class:empty
        class:xs={size === 'xs'}
        class:s={size === 's'}
        class:l={size === 'l'}
        class:xl={size === 'xl'}
        class:in-group={inGroup}
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
        width: var(--p-avatar-size);
        height: var(--p-avatar-size);
        border-radius: var(--border-radius-circle);
        background: var(--bgcolor-neutral-secondary);

        &.in-group:has(+ *) {
            margin-right: -0.5rem;
            border: var(--border-width-s) solid var(--border-neutral-strong);

            @for $i from 1 through 5 {
                &:nth-child(#{$i}) {
                    z-index: #{6 - $i};
                }
            }
        }
    }
    div {
        border: var(--border-width-s) solid var(--border-neutral-strong);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .empty {
        border: 1px dashed var(--border-neutral-strong);
        background: var(--bgColor-neutral-primary);
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
