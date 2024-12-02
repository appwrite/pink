<script lang="ts">
    import Cell from '../Cell.svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';

    export let disabled: boolean = false;
    export let width: string | undefined = undefined;
    export let checked: boolean | 'indeterminate' = false;
</script>

<Cell {width}>
    <Checkbox size="s" on:change bind:checked {disabled} />
</Cell>
