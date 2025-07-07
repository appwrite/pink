<script context="module" lang="ts">
    import { TooltipProvider, TooltipAnchor } from '$lib/RoamingTooltip/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/RoamingTooltip',
        component: TooltipProvider,
        parameters: {
            docs: {
                description: {
                    component:
                        'A roaming tooltip system that uses a single tooltip instance that smoothly moves between different anchor elements.'
                }
            }
        },
        argTypes: {
            showDelay: {
                control: { type: 'number', min: 0, max: 2000, step: 50 },
                description: 'Delay in milliseconds before showing tooltip'
            },
            hideDelay: {
                control: { type: 'number', min: 0, max: 2000, step: 50 },
                description: 'Delay in milliseconds before hiding tooltip'
            },
            defaultPlacement: {
                control: { type: 'select' },
                options: ['top', 'bottom', 'left', 'right'],
                description: 'Default placement for all tooltips'
            },
            defaultPadding: {
                control: { type: 'select' },
                options: ['none', 'm'],
                description: 'Default padding for all tooltips'
            }
        }
    };
</script>

<script>
    import { Button } from '$lib/button/index.js';
    import { IconPencil, IconSave, IconTrash } from '@appwrite.io/pink-icons-svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { Icon } from '$lib/index.ts';
</script>

<Template let:args>
    <div class="container">
        <TooltipProvider {...args}>
            <div class="demo-grid">
                <TooltipAnchor id="save">
                    <Button><Icon icon={IconSave} /></Button>
                </TooltipAnchor>

                <TooltipAnchor id="edit">
                    <Button><Icon icon={IconPencil} /></Button>
                </TooltipAnchor>

                <TooltipAnchor id="delete">
                    <Button><Icon icon={IconTrash} /></Button>
                </TooltipAnchor>
            </div>

            <div slot="tooltip" let:anchor>
                {#if anchor === 'save'}
                    Save file
                {:else if anchor === 'edit'}
                    Edit file
                {:else if anchor === 'delete'}
                    Delete file
                {/if}
            </div>
        </TooltipProvider>
    </div>
</Template>

<Story
    name="Default"
    args={{
        showDelay: 100,
        hideDelay: 500,
        defaultPlacement: 'top',
        defaultPadding: 'm'
    }}
/>

<Story name="Different Placements">
    <div class="placement-container">
        <TooltipProvider>
            <div class="placement-grid">
                <TooltipAnchor id="top" placement="top">
                    <Button>Top</Button>
                </TooltipAnchor>

                <TooltipAnchor id="right" placement="right">
                    <Button>Right</Button>
                </TooltipAnchor>

                <TooltipAnchor id="bottom" placement="bottom">
                    <Button>Bottom</Button>
                </TooltipAnchor>

                <TooltipAnchor id="left" placement="left">
                    <Button>Left</Button>
                </TooltipAnchor>
            </div>

            <div slot="tooltip" let:anchor>
                Tooltip positioned at the {anchor}
            </div>
        </TooltipProvider>
    </div>
</Story>

<style>
    .container {
        padding: 8rem 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
    }

    .demo-grid {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .placement-container {
        padding: 4rem 2rem;
    }

    .placement-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        place-items: center;
        max-width: 400px;
        margin: 0 auto;
    }
</style>
