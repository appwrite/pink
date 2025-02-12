<script lang="ts">
    import IconComponent from '$lib/Icon.svelte';
    import { Layout, Card, Typography } from '$lib/index.js';
    import Selector from '$lib/selector/index.js';
    import type { ComponentType } from 'svelte';
    import type { BaseCardProps } from './Base.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import Image from '$lib/Image.svelte';

    type $$Props = BaseCardProps &
        HTMLAttributes<HTMLInputElement> & {
            name: string;
            value: string;
            group: string;
            title: string;
            info?: string | undefined;
            icon?: ComponentType;
            imageRadius?: 'xxs' | 'xs' | 's' | 'm' | 'l';
        };

    export let value: $$Props['value'];
    export let group: $$Props['group'];
    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 's';
    export let padding: $$Props['padding'] = 'xs';
    export let title: string;
    export let name: $$Props['name'];
    export let info: string | undefined = undefined;
    export let icon: ComponentType | undefined = undefined;
    export let id: $$Props['id'] = undefined;
    export let src: string | undefined = undefined;
    export let alt: string | undefined = undefined;
    export let imageRadius: $$Props['imageRadius'] = 'xs';
</script>

<Card.Label {variant} {radius} {padding} selected={value === group}>
    <Layout.Stack gap="m">
        {#if src}
            <Image
                radius={imageRadius}
                {src}
                alt={alt ?? title}
                height={148}
                style="height: 148px; pointer-events: none"
            />
        {/if}
        <Layout.Stack direction="row" gap="s">
            <!-- TODO: temporary fix -->
            <span
                style:height={$$slots?.action ? '1.75rem' : '1.25rem'}
                style:display="inline-flex"
                style:align-items="center"
            >
                <Selector.Radio bind:value bind:group {id} {name} size="s" />
            </span>
            <Layout.Stack gap="s">
                <!-- only show if title, action or title + icon exists -->
                {#if title || $$slots?.action || (title && icon)}
                    <Layout.Stack gap="xxs">
                        <Layout.Stack
                            direction="row"
                            gap="xs"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Layout.Stack direction="row" gap="xs" alignItems="center">
                                {#if title}
                                    <Typography.Text
                                        variant="m-600"
                                        color="--color-fgcolor-neutral-primary"
                                        >{title}</Typography.Text
                                    >
                                {/if}
                                <slot name="action" />
                            </Layout.Stack>
                            {#if title && icon}
                                <IconComponent {icon} size="m" />
                            {/if}
                        </Layout.Stack>
                        {#if $$slots.default}
                            <Typography.Text variant="m-400"><slot /></Typography.Text>
                        {/if}
                    </Layout.Stack>
                {/if}
                {#if info}
                    <Layout.Stack
                        direction="row"
                        gap="xs"
                        alignContent="center"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography.Text variant="m-400" color="--color-fgcolor-neutral-primary"
                            >{info}</Typography.Text
                        >

                        {#if !title && icon}
                            <IconComponent {icon} size="s" />
                        {/if}
                    </Layout.Stack>
                {/if}
            </Layout.Stack>
        </Layout.Stack>
    </Layout.Stack>
</Card.Label>

<style lang="scss">
    .info {
        color: var(--color-fgcolor-neutral-primary, #2d2d31);
        font-family: var(--font-family-sansserif);
        font-size: var(--font-size-s, 14px);
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 19.6px */
        letter-spacing: -0.063px;
    }
</style>
