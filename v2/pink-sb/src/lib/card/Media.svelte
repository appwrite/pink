<script lang="ts">
    import Avatar from '$lib/avatar/Avatar.svelte';
    import Badge from '$lib/Badge.svelte';
    import Image from '$lib/Image.svelte';
    import { Layout, Typography } from '$lib/index.js';
    import type { BaseCardProps } from './Base.svelte';

    type $$Props = BaseCardProps & {
        title: string;
        src: string;
        alt: string;
        description?: string;
        avatar?: boolean;
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
        size?: 'xs' | 's' | 'm';
    } = {
        variant: 'secondary',
        type: undefined,
        content: '',
        show: false,
        size: 's'
    };
    export let objectPosition: 'center' | 'top' | 'bottom' | 'left' | 'right' = 'top';
    export let avatar: $$Props['avatar'] = false;
</script>

<Layout.Stack gap="xxxs">
    <div class="image">
        <Image {src} {alt} ratio="16/9" radius="s" border {objectPosition} />
        {#if avatar}
            <span class="image-avatar">
                <Avatar size="xs">
                    <slot name="avatar" />
                </Avatar>
            </span>
        {/if}
    </div>
    <div style="padding-inline-start: var(--space-3)">
        <Layout.Stack gap="none">
            <Layout.Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap="none"
            >
                <div style="padding-block: var(--space-3); min-width: 0">
                    <Typography.Text
                        variant="m-500"
                        color="--fgcolor-neutral-primary"
                        truncate>{title}</Typography.Text
                    >
                </div>
                <slot />
            </Layout.Stack>
            <Layout.Stack direction="row" gap="xs" alignItems="center">
                {#if badge.show}
                    <span>
                        <Badge
                            content={badge.content}
                            variant={badge?.variant ?? 'secondary'}
                            type={badge?.type}
                            size={badge?.size ?? 'xs'}
                        />
                    </span>
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
    .image {
        position: relative;

        &-avatar {
            position: absolute;
            bottom: var(--space-4);
            left: var(--space-4);
            z-index: 1;
        }
    }
    .description {
        font-family: var(--font-family-sansserif);
        letter-spacing: -0.063px;
        font-size: var(--font-size-xs);
        color: var(--fgcolor-neutral-secondary);
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
