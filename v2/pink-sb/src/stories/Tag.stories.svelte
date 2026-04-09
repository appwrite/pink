<script context="module" lang="ts">
    import { Tag } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Tag',
        component: Tag
    };
</script>

<script>
    import Icon from '$lib/Icon.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { IconDuplicate } from '@appwrite.io/pink-icons-svelte';
</script>

<Template let:args>
    <Tag {...args}>Content</Tag>
</Template>

<Story name="Default" />
<Story name="Code" args={{ variant: 'code' }} />
<Story name="Small" args={{ size: 's' }} />
<Story name="X-Small" args={{ size: 'xs' }} />
<Story name="Selected" args={{ selected: true }} />
<Story name="Action" let:args>
    <Tag {...args}>
        <Icon icon={IconDuplicate} />
        Action
    </Tag>
</Story>
