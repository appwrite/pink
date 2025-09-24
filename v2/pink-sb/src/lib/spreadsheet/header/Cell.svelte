<script lang="ts">
    import Cell from '../Cell.svelte';
    import { type ComponentProps, createEventDispatcher } from 'svelte';

    type $$Props = ComponentProps<Cell>;
    export let root: $$Props['root'];
    export let column: $$Props['column'];
    export let icon: $$Props['icon'] | undefined = undefined;
    export let isEditable: $$Props['isEditable'] | undefined = undefined;
    export let openEditOnTap: $$Props['openEditOnTap'] | undefined = undefined;

    const dispatch = createEventDispatcher();

    function forward(event: CustomEvent) {
        dispatch(event.type, event.detail);
    }
</script>

<Cell
    isHeader
    {isEditable}
    {icon}
    {column}
    {root}
    {openEditOnTap}
    {...$$restProps}
    on:contextmenu={forward}
>
    <slot />

    <!-- slot forwarding -->
    <slot slot="cell-editor" name="cell-editor" />
</Cell>
