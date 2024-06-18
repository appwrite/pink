<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import type { HTMLInputAttributes } from 'svelte/elements';

    export let id: HTMLInputAttributes['id'];
    export let label: string;
</script>

<Stack direction="column" gap="s">
    <label for={id}>{label}</label>
    <slot />
</Stack>

<style lang="scss">
    label {
        font-style: normal;
        font-weight: 500;
        line-height: 140%;
    }
</style>
