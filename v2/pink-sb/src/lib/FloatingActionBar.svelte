<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import { onMount } from 'svelte';

    let container: HTMLDivElement;
    let width: string;

    const observer = new ResizeObserver((entries) => {
        console.log(entries);
        width = entries[0]?.borderBoxSize[0].inlineSize + 'px';
    });

    onMount(() => {
        observer.observe(container);
        return () => observer.unobserve(container);
    });
    $: console.log(width);
</script>

<div bind:this={container} style:--p-floating-action-bar-width={width}>
    <Stack justifyContent="flex-start" alignItems="center" direction="row" gap="s">
        <slot name="start" />
    </Stack>
    <Stack justifyContent="flex-end" alignItems="center" direction="row" gap="s">
        <slot name="end" />
    </Stack>
</div>

<style lang="scss">
    div {
        position: absolute;
        bottom: var(--space-10);
        left: calc(50% - var(--p-floating-action-bar-width) / 2);
        display: flex;
        gap: var(--gap-s);
        width: 100%;
        max-width: 400px;
        padding: var(--space-6);
        justify-content: space-between;
        align-items: center;

        border-radius: var(--border-radius-l);
        border: 1px solid var(--color-border-neutral-weak);
        background: var(--color-bgcolor-neutral-primary);

        box-shadow:
            0px 56px 32px 0px rgba(0, 0, 0, 0.02),
            0px 6px 14px 0px rgba(0, 0, 0, 0.04),
            0px 24px 25px 0px rgba(0, 0, 0, 0.03);
    }
</style>
