<script lang="ts">
    import Cell from '../Cell.svelte';

    export let width: string | undefined = undefined;
</script>

<Cell {width}><slot /></Cell>
