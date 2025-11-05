<script lang="ts">
    import { Layout, Typography } from '$lib/index.js';

    export let id: string | null | undefined;
    export let label: string | undefined;
    export let description: string | undefined;
    export let truncate: boolean = false;
</script>

<Layout.Stack inline gap="s" alignItems="flex-start" direction="row">
    <slot />
    {#if label}
        <div style={truncate ? 'min-width: 0' : undefined}>
            <Layout.Stack inline gap="xxs">
                <label for={id}>
                    <Typography.Text variant="m-500" {truncate}>{label}</Typography.Text>
                </label>
                {#if description}
                    <Typography.Text variant="m-400" color="--fgcolor-neutral-tertiary" {truncate}
                        >{description}</Typography.Text
                    >
                {:else if $$slots.description}
                    <slot name="description"></slot>
                {/if}
            </Layout.Stack>
        </div>
    {/if}
</Layout.Stack>

<style lang="scss">
    label {
        cursor: pointer;
    }
</style>
