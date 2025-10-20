<script context="module" lang="ts">
    import { CompoundTag } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/CompoundTag',
        component: CompoundTag.CompoundTag
    };
</script>

<script>
    import Icon from '$lib/Icon.svelte';
    import Badge from '$lib/Badge.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { IconXCircle, IconTag, IconFilter, IconCheck } from '@appwrite.io/pink-icons-svelte';
</script>

<Template let:args>
    <CompoundTag.CompoundTag {...args} />
</Template>

<Story name="Default" let:args>
    <CompoundTag.CompoundTag size={args.size}>
        <CompoundTag.Child on:click={() => console.log('Clicked Status')}>Status</CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked is')}>is</CompoundTag.Child>
        <CompoundTag.Child selected on:click={() => console.log('Clicked Active')}>Active</CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked close')}>×</CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>

<Story name="Filter Example" let:args>
    <CompoundTag.CompoundTag size={args.size}>
        <CompoundTag.Child on:click={() => console.log('Clicked field')}>
            <Icon icon={IconFilter} />
            Build duration
        </CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked operator')}>is</CompoundTag.Child>
        <CompoundTag.Child selected on:click={() => console.log('Clicked value')}>more than 2 minutes</CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked remove')}>
            <Icon icon={IconXCircle} />
        </CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>

<Story name="Status Example" let:args>
    <CompoundTag.CompoundTag size={args.size}>
        <CompoundTag.Child on:click={() => console.log('Clicked type')}>Status</CompoundTag.Child>
        <CompoundTag.Child selected on:click={() => console.log('Clicked status')}>
            <Icon icon={IconCheck} />
            Completed
        </CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked action')}>
            <Icon icon={IconXCircle} />
        </CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>

<Story name="Small Size" let:args>
    <CompoundTag.CompoundTag size="s">
        <CompoundTag.Child on:click={() => console.log('Clicked Tag')}>Tag</CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked is')}>is</CompoundTag.Child>
        <CompoundTag.Child selected on:click={() => console.log('Clicked Tag')}>Tag</CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>

<Story name="X-Small Size" let:args>
    <CompoundTag.CompoundTag size="xs">
        <CompoundTag.Child on:click={() => console.log('Clicked Filter')}>Filter</CompoundTag.Child>
        <CompoundTag.Child selected on:click={() => console.log('Clicked Active')}>Active</CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>

<Story name="With Disabled Child" let:args>
    <CompoundTag.CompoundTag size={args.size}>
        <CompoundTag.Child on:click={() => console.log('Clicked Tag')}>Tag</CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked is')}>is</CompoundTag.Child>
        <CompoundTag.Child selected disabled on:click={() => console.log('Clicked Tag')}>Tag</CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked close')}>×</CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>

<Story name="Custom Content" let:args>
    <CompoundTag.CompoundTag size={args.size}>
        <CompoundTag.Child on:click={() => console.log('Clicked label')}>
            <Icon icon={IconTag} />
            Tag
        </CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked operator')}>is</CompoundTag.Child>
        <CompoundTag.Child selected on:click={() => console.log('Clicked value')}>
            <Badge variant="primary" type="success" content="Active" />
        </CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked close')}>
            <Icon icon={IconXCircle} />
        </CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>

<Story name="Code Variant" let:args>
    <CompoundTag.CompoundTag size={args.size}>
        <CompoundTag.Child on:click={() => console.log('Clicked function')}>function</CompoundTag.Child>
        <CompoundTag.Child variant="code" on:click={() => console.log('Clicked name')}>getUserData</CompoundTag.Child>
        <CompoundTag.Child on:click={() => console.log('Clicked params')}>()</CompoundTag.Child>
        <CompoundTag.Child selected on:click={() => console.log('Clicked return')}>return</CompoundTag.Child>
    </CompoundTag.CompoundTag>
</Story>
