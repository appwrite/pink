<script lang="ts">
    import { Button } from '$lib/button/index.js';
    import type { ComponentType } from 'svelte';
    import Cell from '../Cell.svelte';
    import Icon from '$lib/Icon.svelte';

    export let icon: ComponentType;
    export let width: string | undefined = undefined;
</script>

<Cell {width}>
    <Button variant="ghost" on:click on:mousedown><Icon {icon} /></Button>
</Cell>
