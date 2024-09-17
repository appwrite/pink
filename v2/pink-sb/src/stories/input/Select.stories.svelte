<script context="module" lang="ts">
    import { Input } from '$lib/index.js';
    import type { Meta } from '@storybook/svelte';

    export const meta = {
        title: 'Components/Input/Select',
        component: Input.Select,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Select option',
            value: '',
            options: {
                option1: {
                    label: 'Option 1'
                },
                option2: {
                    label: 'Option 2'
                },
                option3: {
                    label: 'Option 3'
                },
                optionBadge: {
                    label: 'Option 4',
                    badge: 'badge'
                },
                optionDisabled: {
                    label: 'Option 5',
                    disabled: true
                }
            }
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
</script>

<Template let:args>
    <Input.Select {...args} />
</Template>

<Story name="Default" />
<Story name="Success" args={{ state: 'success' }} />
<Story name="Warning" args={{ state: 'warning' }} />
<Story name="Error" args={{ state: 'error' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Helper" args={{ helper: 'This is a helper text.' }} />
<Story name="Helper - success" args={{ state: 'success', helper: 'This is a helper text.' }} />
<Story name="Helper - warning" args={{ state: 'warning', helper: 'This is a helper text.' }} />
<Story name="Helper - error" args={{ state: 'error', helper: 'This is a helper text.' }} />
