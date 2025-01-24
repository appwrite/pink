<script context="module" lang="ts">
    import type {MetaProps} from '@storybook/addon-svelte-csf';
    import {Story, Template} from '@storybook/addon-svelte-csf';
    import Combobox from '$lib/Combobox.svelte';

    export const meta: MetaProps = {
        title: 'Components/Combobox',
        component: Combobox,
        args: {
            id: 'id',
            name: 'name',
            label: 'Label',
            placeholder: 'Select option',
            value: '',
            options: [
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
                    value: 'option3'
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
                control: {type: 'select'}
            }
        }
    };
</script>


<div class="container">
    <div class="wrapper">
        <Template let:args>
            <Combobox {...args}/>
        </Template>
    </div>
</div>

<Story name="Default" let:args />
<Story name="Tooltip" args={{ tooltip: 'This is a tooltip' }}/>

<style>
    .container {
        margin: 100px auto;
        width: fit-content;
    }
    .wrapper {
        padding: 100px;
    }
</style>
