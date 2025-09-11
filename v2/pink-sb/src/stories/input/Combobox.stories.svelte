<script context="module" lang="ts">
    import type { MetaProps } from '@storybook/addon-svelte-csf';
    import { Story } from '@storybook/addon-svelte-csf';
    import { Input } from '$lib/index.js';

    // Define a constant for your default options
    const defaultOptions = [
        {
            label: 'Option 1',
            value: 'option1'
        },
        {
            label: 'Option 2',
            value: 'option2'
        },
        {
            label: 'Option 3',
            disabled: true,
            value: 'option3'
        },
        ...Array.from({ length: 100 }, (_, i) => ({
            label: `Option ${i + 4}`,
            value: `option${i + 4}`
        }))
    ];

    export const meta: MetaProps = {
        title: 'Components/Input/Combobox',
        component: Input.ComboBox,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Select option',
            options: defaultOptions
        },
        argTypes: {
            state: {
                options: ['default', 'success', 'warning', 'error'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script lang="ts">
    let searchValue = '';
    let noResultsOption:
        | string
        | {
              message: string;
              disabled?: boolean;
          }
        | undefined = undefined;

    let debounceTimer: ReturnType<typeof setTimeout>;

    function mockSearch() {
        noResultsOption = {
            disabled: true,
            message: 'Loading...'
        };

        setTimeout(() => (noResultsOption = undefined), 1250);
    }

    $: if (searchValue) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const isValueInOptions = defaultOptions.some((opt) => opt.label === searchValue);
            if (!isValueInOptions) {
                mockSearch();
            }
        }, 150);
    }
</script>

<div class="container">
    <Story name="Default" let:args>
        <Input.ComboBox {...args} />
    </Story>

    <Story name="Custom empty option" let:args>
        <Input.ComboBox {...args} {noResultsOption} bind:value={searchValue} />
    </Story>
</div>

<style>
    .container {
        margin: 100px auto;
        width: 500px;
    }
</style>
