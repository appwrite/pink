<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import Cell from '../cell/Base.svelte';

    type $$Props = ComponentProps<Cell>;
    export let column: $$Props['column'];
    export let root: $$Props['root'];
</script>

<Cell {column} {root} {...$$restProps}><slot /></Cell>
