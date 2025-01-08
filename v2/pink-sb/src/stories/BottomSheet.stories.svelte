<script context="module" lang="ts">
    import { BottomSheet, type SheetMenu } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/BottomSheet',
        component: BottomSheet,
        args: {}
    };
</script>

<script lang="ts">
    import { IconChevronRight, IconPlus } from '@appwrite.io/pink-icons-svelte';

    let isOpen = false;

    const menu: SheetMenu = {
        top: {
            items: [
                {
                    name: 'Organization settings',
                    onClick: () => {
                        console.log('goto organization settings');
                    }
                }
            ]
        },
        bottom: {
            items: [
                {
                    name: 'Switch organization',
                    trailingIcon: IconChevronRight,
                    subMenu: {
                        top: {
                            title: 'Switch Organization',
                            items: [
                                {
                                    name: 'Acme Corp',
                                    onClick: () => {
                                        console.log('switch Acme Corp');
                                    }
                                },
                                {
                                    name: 'Acme org',
                                    onClick: () => {
                                        console.log('switch Acme Org');
                                    }
                                },
                                {
                                    name: 'Personal projects',
                                    onClick: () => {
                                        console.log('Personal projects');
                                    }
                                }
                            ]
                        },
                        bottom: {
                            items: [
                                {
                                    name: 'Create organization',
                                    leadingIcon: IconPlus,
                                    onClick: () => {
                                        console.log('Create organization');
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    };
</script>

<div class="wrapper">
    <Story name="Menu"
        ><button
            on:click={() => {
                isOpen = true;
            }}>Open bottomsheet</button
        ><BottomSheet.Menu bind:isOpen {menu}></BottomSheet.Menu></Story
    >
    <Story name="Top and bottom">
        <button
            on:click={() => {
                isOpen = true;
            }}>Open bottomsheet</button
        >
        <BottomSheet.Default bind:isOpen useSlots={true}>
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
        <BottomSheet.Default bind:isOpen><div class="demo">content</div></BottomSheet.Default>
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
