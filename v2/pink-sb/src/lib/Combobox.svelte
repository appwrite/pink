<script lang="ts">
    import { Input } from '$lib/index.js';
    import type { SelectProps } from '$lib/input/types.js';

    type ComboboxProps = SelectProps & {
        options: SelectProps['options'];
        placeholder?: SelectProps['placeholder'];
        label?: SelectProps['label'];
        value?: SelectProps['value'];
        id?: SelectProps['id'];
        state?: SelectProps['state'];
        helper?: SelectProps['helper'];
        disabled?: SelectProps['disabled'];
        readonly?: SelectProps['readonly'];
    };

    export let options: ComboboxProps['options'];
    export let placeholder: ComboboxProps['placeholder'];
    export let label: ComboboxProps['label'];
    export let value: ComboboxProps['value'];
    export let id: ComboboxProps['id'];
    export let state: ComboboxProps['state'];
    export let helper: ComboboxProps['helper'];
    export let disabled: ComboboxProps['disabled'] = false;
    export let readonly: ComboboxProps['readonly'] = false;
</script>

<div>
    <Input.Select
        {options}
        {placeholder}
        {label}
        {value}
        {id}
        {state}
        {helper}
        {disabled}
        {readonly}
        isSearchable={true}
    />
</div>
