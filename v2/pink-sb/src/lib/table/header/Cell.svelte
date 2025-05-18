<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import Cell from '../Cell.svelte';

    type $$Props = ComponentProps<Cell>;
    export let column: $$Props['column'];
    export let root: $$Props['root'];
</script>

<Cell {column} {root} {...$$restProps}><slot /></Cell>
