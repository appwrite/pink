<script lang="ts">
    import { setContext } from 'svelte';

    setContext('avatar-group', true);
</script>

<div>
    <slot />
</div>

<style lang="scss">
    div {
        display: flex;
    }
</style>
