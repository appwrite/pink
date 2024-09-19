<script lang="ts">
    import { Layout, Card } from '$lib/index.js';
    import Selector from '$lib/selector/index.js';
    import type { BaseCardProps } from './Base.svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = BaseCardProps &
        HTMLAttributes<HTMLButtonElement> & {
            value: string;
            group: string;
        };

    export let value: $$Props['value'];
    export let group: $$Props['group'];
    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'medium';
    export let padding: $$Props['padding'] = 'small';
</script>

<Card.Label {variant} {radius} {padding} selected={value === group}>
    <Layout.Stack direction="row" gap="s">
        <!-- TODO: temporary fix -->
        <span style:height="1.25rem" style:display="inline-flex" style:align-items="center">
            <Selector.Radio {value} bind:group size="small" />
        </span>
        <Layout.Stack gap="xs">
            <span><slot name="title" /></span>
            <span><slot /></span>
        </Layout.Stack>
    </Layout.Stack>
</Card.Label>
