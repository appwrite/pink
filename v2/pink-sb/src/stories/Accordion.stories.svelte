<script context="module" lang="ts">
    import { Accordion } from '$lib/index.js';
    import { IconInfo } from '@appwrite.io/pink-icons-svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Accordion',
        component: Accordion.Root
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="default">
    <Accordion.Root>
        <Accordion.Item title="With avatar" icon={IconInfo}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nisi eveniet neque unde
            minima id?
        </Accordion.Item>
        <Accordion.Item title="With checkbox" selectable>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nisi eveniet neque unde
            minima id?
        </Accordion.Item>
        <Accordion.Item title="With checkbox and avatar" icon={IconInfo} selectable>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nisi eveniet neque unde
            minima id?
        </Accordion.Item>
        <Accordion.Item title="Some other title" badge="Badge">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, expedita quisquam.
            Quaerat nemo dolores voluptate neque iste beatae placeat qui deleniti quibusdam
            pariatur, doloremque consequatur nam animi? Voluptate consectetur repellendus vitae?
            Sequi, autem officia illum aut vitae porro eum sed?
        </Accordion.Item>
        <Accordion.Item title="I'm disabled" badge="Disabled" disabled>
            You shouldn't be able to open this item.
        </Accordion.Item>
    </Accordion.Root>
</Story>
