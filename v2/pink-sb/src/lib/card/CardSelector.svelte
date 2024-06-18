<script lang="ts">
    import type { BaseCardProps } from './Base.svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import CardButton from './CardButton.svelte';
    import Radio from '$lib/selector/Radio.svelte';
    import Stack from '$lib/layout/Stack.svelte';

    type $$Props = BaseCardProps &
        HTMLAttributes<HTMLButtonElement> & {
            value: string;
            group: string;
        } & Partial<{
            selected: boolean;
        }>;

    export let value: $$Props['value'];
    export let group: $$Props['group'];
    export let selected: $$Props['selected'] = false;
    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'medium';
    export let padding: $$Props['padding'] = 'small';
</script>

<label>
    <CardButton {selected} {variant} {radius} {padding}>
        <Stack direction="row" gap="s">
            <!-- TODO: temporary fix -->
            <span style:height="1.25rem" style:display="inline-flex" style:align-items="center">
                <Radio bind:value bind:group size="small" />
            </span>
            <Stack gap="xs">
                <span><slot name="title" /></span>
                <span><slot /></span>
            </Stack>
        </Stack>
    </CardButton>
</label>

<style lang="scss">
</style>
