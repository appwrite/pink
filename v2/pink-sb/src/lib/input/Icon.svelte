<script lang="ts">
    import type { ComponentType } from 'svelte';

    export let icon: ComponentType;
</script>

<i><svelte:component this={icon} /></i>

<style lang="scss">
    i {
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
    }
</style>
