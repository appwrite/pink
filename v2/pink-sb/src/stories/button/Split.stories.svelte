<script context="module">
    import { Icon } from '$lib/index.js';
    import { Button, Split } from '$lib/button/index.js';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';

    export const meta = {
        title: 'Components/Button/Split',
        component: Split
    };
</script>

<script lang="ts">
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default">
    <Split>
        <Button variant="secondary">First</Button>
        <Button variant="secondary">Second</Button>
        <Button variant="secondary">Third</Button>
    </Split>
</Story>

<Story name="Small">
    <Split>
        <Button size="s" variant="secondary">First</Button>
        <Button size="s" variant="secondary">Second</Button>
        <Button size="s" variant="secondary">Third</Button>
    </Split>
</Story>
<Story name="X-Small">
    <Split>
        <Button size="xs" variant="secondary">First</Button>
        <Button size="xs" variant="secondary">Second</Button>
        <Button size="xs" variant="secondary">Third</Button>
    </Split>
</Story>
<Story name="With icon">
    <Split>
        <Button variant="secondary" size="s">Action text</Button>
        <Button variant="secondary" size="s">
            <Icon icon={IconChevronDown} />
        </Button>
    </Split>
</Story>
<Story name="Mixed">
    <Split>
        <Button>First</Button>
        <Button variant="secondary">Second</Button>
        <Button>Third</Button>
    </Split>
</Story>
