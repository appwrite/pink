<script context="module" lang="ts">
    import { BottomSheet } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/BottomSheet',
        component: BottomSheet,
        args: {}
    };
</script>

<script lang="ts">
    let isOpen = false;
</script>

<div class="wrapper">
    <Story name="Top and bottom">
        <button
            on:click={() => {
                isOpen = true;
            }}>Open bottomsheet</button
        >
        <BottomSheet.Default bind:isOpen useSlots={true} sheetContainerRef={undefined}>
            <div slot="top"><div class="demo">Top</div></div>
            <div slot="bottom"><div class="demo">Bottom</div></div>
        </BottomSheet.Default>
    </Story>
    <Story name="Single content">
        <button
            on:click={() => {
                isOpen = true;
            }}>Open bottomsheet</button
        >
        <BottomSheet.Default bind:isOpen sheetContainerRef={undefined}
            ><div class="demo">content</div></BottomSheet.Default
        >
    </Story>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
    }

    .demo {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
