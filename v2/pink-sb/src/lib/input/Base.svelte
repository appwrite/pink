<script>
    import Stack from '$lib/layout/Stack.svelte';

    /**
     * @type {string}
     */
    export let id;
    /**
     * @type {string}
     */
    export let label;
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
