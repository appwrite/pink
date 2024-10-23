<script lang="ts">
    import Badge from '$lib/Badge.svelte';
    import Image from '$lib/Image.svelte';
    import { Layout, Card, Typography } from '$lib/index.js';
    import type { BaseCardProps } from './Base.svelte';

    type $$Props = BaseCardProps & {
        title: string;
        src: string;
        alt: string;
        description?: string;
    };

    export let description: $$Props['description'] = '';
    export let title: $$Props['title'] = '';
    export let src: string;
    export let alt: string;
    export let badge: {
        content: string;
        show: boolean;
        variant?: 'primary' | 'secondary' | 'accent';
        type?: 'success' | 'warning' | 'error' | undefined;
        size?: 'x-small' | 'small' | 'medium';
    } = {
        variant: 'secondary',
        type: undefined,
        content: '',
        show: false,
        size: 'small'
    };

    const height = 146;
</script>

<Layout.Stack gap="s">
    <Image {src} {alt} {height} radius="small" style="height: {height}px" />
    <div style="padding-inline-start: var(--space-3)">
        <Layout.Stack gap="none">
            <Layout.Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="none"
            >
                <div style="padding-block: var(--space-3); min-width: 0">
                    <Typography.Text variant="m-500" truncate>{title}</Typography.Text>
                </div>
                <slot />
            </Layout.Stack>
            <Layout.Stack direction="row" gap="xs" alignItems="center">
                {#if badge.show}
                    <Badge
                        content={badge.content}
                        variant={badge?.variant ?? 'secondary'}
                        type={badge?.type}
                        size={badge?.size ?? 'x-small'}
                    />
                {/if}
                {#if description}
                    <p class="description">
                        {description}
                    </p>
                {/if}
            </Layout.Stack>
        </Layout.Stack>
    </div>
</Layout.Stack>

<style lang="scss">
    .description {
        font-family: var(--font-family-sansserif);
        letter-spacing: -0.063px;
        font-size: var(--font-size-xs);
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
