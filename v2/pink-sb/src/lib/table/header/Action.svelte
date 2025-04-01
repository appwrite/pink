<script lang="ts">
    import { Button } from '$lib/button/index.js';
    import type { ComponentProps, ComponentType } from 'svelte';
    import Cell from '../Cell.svelte';
    import Icon from '$lib/Icon.svelte';

    type $$Props = ComponentProps<Cell>;
    export let column: $$Props['column'];
    export let root: $$Props['root'];
    export let icon: ComponentType;
</script>

<Cell {column} {root}>
    <Button variant="ghost" on:click on:mousedown><Icon {icon} /></Button>
</Cell>
