<script lang="ts">
    import Fuse from 'fuse.js';
    import { IconDuplicate, IconSearch } from '@appwrite.io/pink-icons-svelte';
    import { Button, Card, Icon, Input } from './index.js';
    import Stack from './layout/Stack.svelte';
    import Tooltip from './Tooltip.svelte';

    export let logs: string;

    async function securedCopy(value: string) {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            return false;
        }

        return true;
    }

    function unsecuredCopy(value: string) {
        const textArea = document.createElement('textarea');
        textArea.value = value;

        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        let success = true;
        try {
            document.execCommand('copy');
        } catch {
            success = false;
        } finally {
            document.body.removeChild(textArea);
        }

        return success;
    }

    export async function copy(value: string) {
        // securedCopy works only in HTTPS environment.
        // unsecuredCopy works in HTTP and only runs if securedCopy fails.
        const success = (await securedCopy(value)) || unsecuredCopy(value);

        return success;
    }

    let search = '';
    const fuse = new Fuse(
        logs.split('\n').map((line) => ({ line })),
        {
            keys: ['line'],
            includeScore: true
        }
    );

    let tooltipMessage = 'Click to copy';

    $: filteredLogs = fuse
        .search(search)
        .map((result) => result.item.line)
        .join('\n');
</script>

<Card.Base variant="secondary" padding="xs">
    <Stack direction="row" gap="s">
        <slot name="header" />
        <Input.Text placeholder="Search logs" bind:value={search}>
            <svelte:fragment slot="start">
                <Icon icon={IconSearch} />
            </svelte:fragment>
        </Input.Text>
        <Tooltip>
            <Button.Button
                variant="secondary"
                icon
                size="s"
                on:click={() => {
                    copy(logs);
                    tooltipMessage = 'Copied';
                    setTimeout(() => {
                        tooltipMessage = 'Click to copy';
                    }, 2000);
                }}
            >
                <Icon icon={IconDuplicate} />
            </Button.Button>
            <p slot="tooltip">{tooltipMessage}</p>
        </Tooltip>
    </Stack>
    <pre>
        <code>{filteredLogs?.length ? filteredLogs : logs}</code>
    </pre>
</Card.Base>

<style lang="scss">
    pre {
        max-height: 600px;
        overflow-y: auto;
        display: flex;
        flex-direction: column-reverse;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
