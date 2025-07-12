<script lang="ts">
    import Cell from '../Cell.svelte';
    import { type ComponentProps, createEventDispatcher } from 'svelte';

    type $$Props = ComponentProps<Cell>;
    export let root: $$Props['root'];
    export let column: $$Props['column'];
    export let icon: $$Props['icon'] | undefined = undefined;

    const dispatch = createEventDispatcher();

    function forward(event: CustomEvent) {
        dispatch(event.type, event.detail);
    }
</script>

<Cell isHeader {icon} {column} {root} {...$$restProps} on:contextmenu={forward}><slot /></Cell>
