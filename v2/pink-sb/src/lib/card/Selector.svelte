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
            imageSize?: number;
            imageRadius?: 'xxs' | 'xs' | 's' | 'm' | 'l';
            disabled?: boolean;
            src?: string;
            alt?: string | undefined;
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
    export let src: $$Props['src'] = undefined;
    export let alt: $$Props['alt'] = undefined;
    export let imageRadius: $$Props['imageRadius'] = 'xs';
    export let imageSize: $$Props['imageSize'] = 148;
    export let disabled: $$Props['disabled'] = undefined;
</script>

<Card.Label {variant} {radius} {padding} selected={value === group} {disabled}>
    <Layout.Stack gap="m">
        {#if src}
            <div
                style:height="148px"
                style:width="148px"
                style:alig-content="center"
                style:justify-items="center"
            >
                <Image
                    radius={imageRadius}
                    {src}
                    alt={alt ?? title}
                    height={imageSize}
                    width={imageSize}
                    style={`height: ${imageSize}px; width: ${imageSize}px; pointer-events: none`}
                />
            </div>
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
                    <Layout.Stack gap={$$slots.default ? 'xxs' : 'none'}>
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
                                        color="--fgcolor-neutral-primary">{title}</Typography.Text
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
                        <Typography.Text variant="m-400" color="--fgcolor-neutral-primary"
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
