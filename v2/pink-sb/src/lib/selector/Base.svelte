<script lang="ts">
    import { Layout, Typography } from '$lib/index.js';

    export let id: string | undefined;
    export let label: string | undefined;
</script>

<Layout.Stack inline gap="s" alignItems="center" direction="row">
    <slot />
    {#if label}
        <label for={id}>
            <Typography.Text variant="m-600">{label}</Typography.Text>
        </label>
    {/if}
</Layout.Stack>

<style lang="scss">
    label {
        cursor: pointer;
    }
</style>
