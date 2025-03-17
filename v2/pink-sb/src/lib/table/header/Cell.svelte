<script lang="ts">
    import type { ComponentProps } from 'svelte';
    import Cell from '../Cell.svelte';

    type $$Props = ComponentProps<Cell>;
    export let id: $$Props['id'];
    export let root: $$Props['root'];
</script>

<Cell {id} {root} {...$$restProps}><slot /></Cell>
