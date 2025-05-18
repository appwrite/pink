<script context="module" lang="ts">
    import Popover from '$lib/Popover.svelte';
    import { userEvent, within } from '@storybook/test';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Popover',
        component: Popover
    };

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await step('click button', async () => {
            await userEvent.click(button);
        });
    };
</script>

<script>
    import Modal from '$lib/Modal.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import { Button } from '$lib/button/index.js';
    import ActionMenu from '$lib/action-menu';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { IconInfo, IconChevronDoubleRight } from '@appwrite.io/pink-icons-svelte';

    let open = false;
</script>

<Template let:args>
    <div class="container">
        <Popover {...args} let:toggle>
            <Button on:click={toggle}>Pop me</Button>
            <p slot="tooltip">Tooltip content</p>
        </Popover>
    </div>
</Template>

<Story name="Default" />
<Story name="Popped" {play} />
<Story name="Portalled" args={{ portal: true }} />
<Story name="Inside Modal">
    <div class="container">
        <Modal size="s" bind:open title="Popover & ActionMenu">
            <span slot="description">This is a Modal description title.</span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem alias
            omnis quod.

            <Popover let:toggle portal>
                <Button variant="secondary" on:click={toggle}
                    >Show a list of action menu items</Button
                >
                <svelte:fragment slot="tooltip">
                    <ActionMenu.Root>
                        <ActionMenu.Item.Button
                            leadingIcon={IconInfo}
                            trailingIcon={IconChevronDoubleRight}
                            badge="1"
                        >
                            Default
                        </ActionMenu.Item.Button>
                        <ActionMenu.Item.Button
                            leadingIcon={IconInfo}
                            trailingIcon={IconChevronDoubleRight}
                            badge="1"
                        >
                            Default with a very long text
                        </ActionMenu.Item.Button>
                        <ActionMenu.Item.Button
                            leadingIcon={IconInfo}
                            trailingIcon={IconChevronDoubleRight}
                            disabled
                        >
                            Default
                        </ActionMenu.Item.Button>
                        <ActionMenu.Item.Button leadingIcon={IconInfo} status="danger">
                            Danger
                        </ActionMenu.Item.Button>
                        <ActionMenu.Item.Button leadingIcon={IconInfo} status="danger" disabled>
                            Danger
                        </ActionMenu.Item.Button>
                    </ActionMenu.Root>
                </svelte:fragment>
            </Popover>

            <svelte:fragment slot="footer">
                <Stack direction="row" gap="s" justifyContent="flex-end">
                    <Button variant="text" size="s" on:click={() => (open = false)}>Cancel</Button>
                    <Button on:click size="s">Save</Button>
                </Stack>
            </svelte:fragment>
        </Modal>
        <Button on:click={() => (open = !open)}>Open Modal</Button>
    </div>
</Story>

<style>
    .container {
        margin: 12rem auto;
        display: grid;
        place-content: center;
    }
</style>
