<script context="module" lang="ts">
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Canvas',
        parameters: { layout: 'fullscreen' }
    };
</script>

<script lang="ts">
    import { Story } from '@storybook/addon-svelte-csf';
    import Canvas from '$lib/canvas/index.js';
    import type { CanvasObjectUnion } from '$lib/canvas/index.js';

    let canvasObjects: CanvasObjectUnion[] = [
        {
            id: 'image-1',
            type: 'image',
            x: 100,
            y: 100,
            width: 300,
            height: 200,
            src: 'https://picsum.photos/id/1015/600/400',
            alt: 'Example image',
            maintainAspectRatio: false,
            selected: false
        },
        {
            id: 'shape-1',
            type: 'shape',
            shape: 'rectangle',
            x: 500,
            y: 150,
            width: 200,
            height: 150,
            fill: 'var(--brand-mint-100)',
            stroke: 'var(--brand-mint-600)',
            strokeWidth: 2,
            selected: false
        },
        {
            id: 'shape-2',
            type: 'shape',
            shape: 'circle',
            x: 300,
            y: 400,
            width: 150,
            height: 150,
            fill: 'var(--brand-purple-100)',
            stroke: 'var(--brand-purple-600)',
            strokeWidth: 2,
            selected: false
        }
    ];

    let showGrid = true;
</script>

<Story name="Basic Canvas">
    <Canvas.Root {showGrid} bind:objects={canvasObjects}>
        {#each canvasObjects as obj (obj.id)}
            {#if obj.type === 'image'}
                <Canvas.Image object={obj} />
            {:else if obj.type === 'shape'}
                <Canvas.Shape object={obj} />
            {/if}
        {/each}
    </Canvas.Root>
</Story>

<Story name="Without Grid">
    <Canvas.Root showGrid={false} bind:objects={canvasObjects}>
        {#each canvasObjects as obj (obj.id)}
            {#if obj.type === 'image'}
                <Canvas.Image object={obj} />
            {:else if obj.type === 'shape'}
                <Canvas.Shape object={obj} />
            {/if}
        {/each}
    </Canvas.Root>
</Story>

<Story name="Custom Grid">
    <Canvas.Root
        settings={{
            grid: {
                dotSize: 2,
                dotColor: 'blue',
                dotOpacity: 50
            },
            gridSize: 30
        }}
        bind:objects={canvasObjects}
    >
        {#each canvasObjects as obj (obj.id)}
            {#if obj.type === 'image'}
                <Canvas.Image object={obj} />
            {:else if obj.type === 'shape'}
                <Canvas.Shape object={obj} />
            {/if}
        {/each}
    </Canvas.Root>
</Story>

