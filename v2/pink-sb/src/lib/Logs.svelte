<script lang="ts">
    import Fuse from 'fuse.js';
    import { IconDuplicate, IconSearch } from '@appwrite.io/pink-icons-svelte';
    import { Button, Card, Icon, Input } from './index.js';
    import Stack from './layout/Stack.svelte';
    import Tooltip from './Tooltip.svelte';
    import { ansicolor } from 'ansicolor';

    export let logs: string;

    const escapedLogs = escapeHTML(logs);
    export let theme: 'light' | 'dark' = 'light';

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

    function escapeHTML(str: string) {
        const div = document.createElement('div');
        const textNode = document.createTextNode(str);
        div.appendChild(textNode);
        const escaped = div.innerHTML;
        div.remove();
        return escaped;
    }

    let search = '';
    const fuse = new Fuse(
        escapedLogs.split('\n').map((line) => ({ line })),
        {
            keys: ['line'],
            includeScore: true
        }
    );

    let tooltipMessage = 'Click to copy';

    //TODO: update colors
    ansicolor.rgb =
        theme === 'light'
            ? {
                  black: [0, 0, 0],
                  darkGray: [86, 86, 92],
                  lightGray: [151, 151, 155],
                  white: [0, 0, 0],
                  red: [179, 18, 18],
                  lightRed: [179, 18, 18],
                  green: [10, 113, 79],
                  lightGreen: [10, 113, 79],
                  yellow: [97, 37, 10],
                  lightYellow: [97, 37, 10],
                  blue: [62, 98, 152],
                  lightBlue: [62, 98, 152],
                  magenta: [74, 62, 152],
                  lightMagenta: [74, 62, 152],
                  cyan: [78, 126, 124],
                  lightCyan: [78, 126, 124]
              }
            : {
                  black: [255, 255, 255],
                  darkGray: [129, 129, 134],
                  lightGray: [195, 195, 198],
                  white: [255, 255, 255],
                  red: [255, 69, 58],
                  lightRed: [255, 69, 58],
                  green: [16, 185, 129],
                  lightGreen: [16, 185, 129],
                  yellow: [254, 124, 67],
                  lightYellow: [254, 124, 67],
                  blue: [104, 163, 254],
                  lightBlue: [104, 163, 254],
                  magenta: [203, 194, 255],
                  lightMagenta: [203, 194, 255],
                  cyan: [133, 219, 216],
                  lightCyan: [133, 219, 216]
              };

    function formatLogs(logs: string) {
        let output = '';
        if (!logs) return output;
        const iterator = ansicolor.parse(logs);
        console.log(iterator);
        for (const element of iterator.spans) {
            console.log(element);
            if (element?.color?.name && element.css)
                output += `<span style="${element.css}">${element.text}</span>`;
            else output += `${element.text}`;
        }

        return output;
    }

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
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        <code
            >{#if filteredLogs?.length}{@html formatLogs(filteredLogs)}{:else}{@html formatLogs(
                    escapedLogs
                )}{/if}</code
        >
    </pre>
</Card.Base>

<style lang="scss">
    pre {
        max-height: 600px;
        width: 100%;
        overflow: scroll;
        display: flex;
        flex-direction: column-reverse;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
