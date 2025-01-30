<script lang="ts">
    import Fuse from 'fuse.js';
    import { IconDuplicate, IconSearch } from '@appwrite.io/pink-icons-svelte';
    import { Button, Card, Icon, Input } from './index.ts';
    import Stack from './layout/Stack.svelte';

    export let logs: string;
    let search = '';
    const fuse = new Fuse(
        logs.split('\n').map((line) => ({ line })),
        {
            keys: ['line'],
            includeScore: true
        }
    );

    $: filteredLogs = fuse
        .search(search)
        .map((result) => result.item.line)
        .join('\n');
</script>

<Card.Base variant="secondary" padding="m">
    <Stack direction="row" gap="s">
        <slot name="header" />
        <Input.Text placeholder="Search logs" bind:value={search}>
            <svelte:fragment slot="start">
                <Icon icon={IconSearch} />
            </svelte:fragment>
        </Input.Text>
        <Button.Button variant="secondary" icon size="s">
            <Icon icon={IconDuplicate} />
        </Button.Button>
    </Stack>
    <pre>
        <code>{filteredLogs?.length ? filteredLogs : logs}</code>
    </pre>
</Card.Base>

<style lang="scss">
    pre {
        max-height: 600px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column-reverse;
    }
</style>
