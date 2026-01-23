<script lang="ts">
    import { setContext } from 'svelte';
    import { BUTTON_SPLIT_CONTEXT } from './index.js';

    setContext(BUTTON_SPLIT_CONTEXT, true);
</script>

<div>
    <slot />
</div>

<style lang="scss">
    div {
        display: inline-flex;
        flex-direction: row;
    }
</style>
