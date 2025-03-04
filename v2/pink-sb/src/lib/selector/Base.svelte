<script lang="ts">
    import { Layout, Typography } from '$lib/index.js';

    export let id: string | null | undefined;
    export let label: string | undefined;
    export let description: string | undefined;
</script>

<Layout.Stack inline gap="s" alignItems="flex-start" direction="row">
    <slot />
    {#if label}
        <Layout.Stack inline gap="xxs">
            <label for={id}>
                <Typography.Text variant="m-500">{label}</Typography.Text>
            </label>
            {#if description}
                <Typography.Text variant="m-400" color="--fgcolor-neutral-tertiary"
                    >{description}</Typography.Text
                >
            {/if}
        </Layout.Stack>
    {/if}
</Layout.Stack>

<style lang="scss">
    label {
        cursor: pointer;
    }
</style>
