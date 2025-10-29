<script context="module" lang="ts">
    import { CompoundTagRoot, CompoundTagChild } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/CompoundTag',
        component: CompoundTagRoot
    };
</script>

<script>
    import Icon from '$lib/Icon.svelte';
    import Badge from '$lib/Badge.svelte';
    import Popover from '$lib/Popover.svelte';
    import ActionMenu from '$lib/action-menu/index.js';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import {
        IconXCircle,
        IconTag,
        IconFilter,
        IconCheck,
        IconX,
        IconInfo,
        IconChevronDoubleRight,
        IconDuplicate
    } from '@appwrite.io/pink-icons-svelte';
</script>

<Template let:args>
    <CompoundTagRoot {...args} />
</Template>

<Story name="Default" let:args>
    <CompoundTagRoot size={args.size}>
        <CompoundTagChild on:click={() => console.log('Clicked Status')}>Status</CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked is')}>is</CompoundTagChild>
        <CompoundTagChild selected on:click={() => console.log('Clicked Active')}
            >Active</CompoundTagChild
        >
        <CompoundTagChild aria-label="Dismiss" dismiss>
            <Icon size="s" icon={IconX} />
        </CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="Action" let:args>
    <CompoundTagRoot size={args.size}>
        <CompoundTagChild>
            <Icon icon={IconDuplicate} />
            Action
        </CompoundTagChild>
        <CompoundTagChild aria-label="Dismiss" dismiss>
            <Icon size="s" icon={IconX} />
        </CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="Filter Example" let:args>
    <CompoundTagRoot size={args.size}>
        <CompoundTagChild on:click={() => console.log('Clicked field')}>
            <Icon icon={IconFilter} />
            Build duration
        </CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked operator')}>is</CompoundTagChild>
        <CompoundTagChild selected on:click={() => console.log('Clicked value')}
            >more than 2 minutes</CompoundTagChild
        >
        <CompoundTagChild on:click={() => console.log('Clicked remove')}>
            <Icon icon={IconXCircle} />
        </CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="Status Example" let:args>
    <CompoundTagRoot size={args.size}>
        <CompoundTagChild on:click={() => console.log('Clicked type')}>Status</CompoundTagChild>
        <CompoundTagChild selected on:click={() => console.log('Clicked status')}>
            <Icon icon={IconCheck} />
            Completed
        </CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked action')}>
            <Icon icon={IconXCircle} />
        </CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="Small Size" let:args>
    <CompoundTagRoot size="s">
        <CompoundTagChild on:click={() => console.log('Clicked Tag')}>Tag</CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked is')}>is</CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked Tag')}>Tag</CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="X-Small Size" let:args>
    <CompoundTagRoot size="xs">
        <CompoundTagChild on:click={() => console.log('Clicked Filter')}>Filter</CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked Active')}>Active</CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="With Disabled Child" let:args>
    <CompoundTagRoot size={args.size}>
        <CompoundTagChild on:click={() => console.log('Clicked Tag')}>Tag</CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked is')}>is</CompoundTagChild>
        <CompoundTagChild disabled on:click={() => console.log('Clicked Tag')}>Tag</CompoundTagChild
        >
        <CompoundTagChild on:click={() => console.log('Clicked close')}>×</CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="Code Variant" let:args>
    <CompoundTagRoot size={args.size}>
        <CompoundTagChild on:click={() => console.log('Clicked function')}
            >function</CompoundTagChild
        >
        <CompoundTagChild variant="code" on:click={() => console.log('Clicked name')}
            >getUserData</CompoundTagChild
        >
        <CompoundTagChild on:click={() => console.log('Clicked params')}>()</CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked return')}>return</CompoundTagChild>
    </CompoundTagRoot>
</Story>

<Story name="With Action Menu" let:args>
    <CompoundTagRoot size={args.size}>
        <CompoundTagChild on:click={() => console.log('Clicked Tag')}>Tag</CompoundTagChild>
        <CompoundTagChild on:click={() => console.log('Clicked is')}>is</CompoundTagChild>
        <Popover let:toggle placement="bottom-start" padding="none">
            <CompoundTagChild selected on:click={toggle}>Actions</CompoundTagChild>
            <svelte:fragment slot="tooltip">
                <ActionMenu.Root>
                    <ActionMenu.Item.Button
                        leadingIcon={IconInfo}
                        trailingIcon={IconChevronDoubleRight}
                        badge="1"
                    >
                        Default
                    </ActionMenu.Item.Button>
                    <ActionMenu.Item.Button
                        leadingIcon={IconInfo}
                        trailingIcon={IconChevronDoubleRight}
                        badge="1"
                    >
                        Default with a very long text
                    </ActionMenu.Item.Button>
                    <ActionMenu.Item.Button
                        leadingIcon={IconInfo}
                        trailingIcon={IconChevronDoubleRight}
                        disabled
                    >
                        Disabled
                    </ActionMenu.Item.Button>
                    <ActionMenu.Item.Button leadingIcon={IconInfo} status="danger">
                        Danger
                    </ActionMenu.Item.Button>
                    <ActionMenu.Item.Button leadingIcon={IconInfo} status="danger" disabled>
                        Danger Disabled
                    </ActionMenu.Item.Button>
                </ActionMenu.Root>
            </svelte:fragment>
        </Popover>
        <CompoundTagChild dismiss on:click={() => console.log('Clicked close')}>
            <Icon icon={IconX} />
        </CompoundTagChild>
    </CompoundTagRoot>
</Story>
