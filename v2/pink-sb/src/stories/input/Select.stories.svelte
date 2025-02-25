<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { Meta } from '@storybook/svelte';
    import { IconSun } from '@appwrite.io/pink-icons-svelte';

    export const meta = {
        title: 'Components/Input/Select',
        component: Input.Select,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Select option',
            value: 'option2',
            options: [
                {
                    label: 'Option 1',
                    value: 'option1'
                },
                {
                    label: 'Option 2',
                    value: 'option2',
                    leadingIcon: IconSun
                },
                {
                    label: 'Option 3',
                    value: 'option3',
                    leadingHtml:
                        "<img src='https://cloud.appwrite.io/v1/avatars/flags/de?width=22&height=15' alt='Flag of Germany'/>"
                },
                {
                    label: 'Option 4',
                    badge: 'badge',
                    value: 'option4'
                },
                {
                    label: 'Option 5',
                    disabled: true,
                    value: 'option5'
                }
            ]
        },
        argTypes: {
            state: {
                options: ['default', 'success', 'warning', 'error'],
                control: { type: 'select' }
            }
        }
    } satisfies Meta;
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import Select from '$lib/input/Select.svelte';
    import { Button } from '$lib/button/index.js';
    import Stack from '$lib/layout/Stack.svelte';
    import Dialog from '$lib/Dialog.svelte';
    import Modal from '$lib/Modal.svelte';

    let open = false;
</script>

<Template let:args>
    <Input.Select {...args} />
</Template>

<Story name="Default" />
<Story name="Empty" args={{ options: [] }} />
<Story name="Success" args={{ state: 'success' }} />
<Story name="Warning" args={{ state: 'warning' }} />
<Story name="Error" args={{ state: 'error' }} />
<Story name="Readonly" args={{ readonly: true, value: 'option2' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Helper" args={{ helper: 'This is a helper text.' }} />
<Story
    name="Longer helper"
    args={{
        helper: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nisi eveniet neque unde minima id'
    }}
/>
<Story name="Helper - success" args={{ state: 'success', helper: 'This is a helper text.' }} />
<Story name="Helper - warning" args={{ state: 'warning', helper: 'This is a helper text.' }} />
<Story name="Helper - error" args={{ state: 'error', helper: 'This is a helper text.' }} />

<!-- inside modals and dialogs -->
<Story name="Inside Dialog" let:args>
    <Dialog title="Select an option" bind:open>
        <Stack>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem
            alias omnis quod.

            <Select
                options={Array.from({ length: 10 }, (_, i) => ({
                    label: `Option ${i + 1}`,
                    value: `option${i + 1}`
                }))}
            />
        </Stack>

        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button variant="text" size="s" on:click={() => (open = false)}>Cancel</Button>
                <Button on:click={() => (open = false)} size="s">Save</Button>
            </Stack>
        </svelte:fragment>
    </Dialog>
    <Button on:click={() => (open = !open)}>Open Dialog</Button>
</Story>

<Story name="Inside Modal" let:args>
    <Modal title="Select an option" bind:open>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam molestiae voluptatem alias
        omnis quod.
        <Select
            options={Array.from({ length: 10 }, (_, i) => ({
                label: `Option ${i + 1}`,
                value: `option${i + 1}`
            }))}
        />

        <svelte:fragment slot="footer">
            <Stack direction="row" gap="s" justifyContent="flex-end">
                <Button variant="text" size="s" on:click={() => (open = false)}>Cancel</Button>
                <Button on:click={() => (open = false)} size="s">Save</Button>
            </Stack>
        </svelte:fragment>
    </Modal>
    <Button on:click={() => (open = !open)}>Open Modal</Button>
</Story>
