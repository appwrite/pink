<script lang="ts">
    import Cell from '../Cell.svelte';
    import type { ComponentProps } from 'svelte';

    type $$Props = ComponentProps<Cell>;
    export let root: $$Props['root'];
    export let column: $$Props['column'];
    export let isAction: $$Props['isAction'];
    export let icon: $$Props['icon'] | undefined = undefined;
</script>

<Cell isHeader {isAction} {icon} {column} {root} {...$$restProps}><slot /></Cell>
