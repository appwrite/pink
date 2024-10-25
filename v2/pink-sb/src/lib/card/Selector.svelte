<script lang="ts">
    import IconComponent from '$lib/Icon.svelte';
    import { Layout, Card, Typography } from '$lib/index.js';
    import Selector from '$lib/selector/index.js';
    import type { ComponentType } from 'svelte';
    import type { BaseCardProps } from './Base.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import Image from '$lib/Image.svelte';

    type $$Props = BaseCardProps &
        HTMLAttributes<HTMLButtonElement> & {
            value: string;
            group: string;
            title: string;
            info?: string | undefined;
            icon?: ComponentType;
        };

    export let value: $$Props['value'];
    export let group: $$Props['group'];
    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'medium';
    export let padding: $$Props['padding'] = 'small';
    export let title: string;
    export let info: string | undefined = undefined;
    export let icon: ComponentType | undefined = undefined;
    export let src: string | undefined = undefined;
    export let alt: string | undefined = undefined;
</script>

<Card.Label {variant} {radius} {padding} selected={value === group}>
    <Layout.Stack gap="m">
        {#if src}
            <Image {src} alt={alt ?? title} height={148} style="height: 148px;" />
        {/if}
        <Layout.Stack direction="row" gap="s">
            <!-- TODO: temporary fix -->
            <span
                style:height={$$slots?.action ? '1.75rem' : '1.25rem'}
                style:display="inline-flex"
                style:align-items="center"
            >
                <Selector.Radio {value} bind:group size="small" />
            </span>
            <Layout.Stack gap="s">
                <Layout.Stack gap="xs">
                    <Layout.Stack
                        direction="row"
                        gap="xs"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Layout.Stack direction="row" gap="xs" alignItems="center">
                            {#if title}
                                <p class="title">{title}</p>
                            {/if}
                            <slot name="action" />
                        </Layout.Stack>
                        {#if icon}
                            <IconComponent {icon} />
                        {/if}
                    </Layout.Stack>
                    <Typography.Text variant="m-400"><slot /></Typography.Text>
                </Layout.Stack>
                {#if info}
                    <span class="info">{info}</span>
                {/if}
            </Layout.Stack>
        </Layout.Stack>
    </Layout.Stack>
</Card.Label>

<style lang="scss">
    .title {
        font-family: var(--font-family-sansserif);
        font-size: var(--font-size-s);
        line-height: 140%;
        letter-spacing: -0.063px;
        font-weight: 600;
    }
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
