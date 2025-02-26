<script lang="ts">
    import Fuse from 'fuse.js';
    import {
        IconArrowSmDown,
        IconArrowSmUp,
        IconDuplicate,
        IconSearch
    } from '@appwrite.io/pink-icons-svelte';
    import { Button, Card, Icon, Input } from './index.js';
    import Stack from './layout/Stack.svelte';
    import Tooltip from './Tooltip.svelte';
    import { ansicolor } from 'ansicolor';
    import { onMount } from 'svelte';

    export let logs: string;

    const escapedLogs = escapeHTML(logs);
    export let theme: 'light' | 'dark' = 'light';
    export let showScrollButton = true;

    onMount(() => {
        updateScrollButtonVisibility();
    });

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

    $: if (theme === 'dark') {
        ansicolor.rgb = {
            black: [0, 0, 0],
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
    } else {
        ansicolor.rgb = {
            black: [255, 255, 255],
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
        };
    }

    let preElement: HTMLPreElement;
    let showTopButton = false;
    let showBottomButton = false;

    function scrollToTop() {
        if (preElement) {
            preElement.scrollTop = (preElement.scrollHeight - preElement.clientHeight) * -1;
            showTopButton = false;
            updateScrollButtonVisibility();
        }
    }

    function scrollToBottom() {
        if (preElement) {
            preElement.scrollTop = preElement.scrollHeight;
            showBottomButton = false;
            updateScrollButtonVisibility();
        }
    }

    function updateScrollButtonVisibility() {
        console.log(preElement.scrollHeight, preElement.clientHeight, preElement.scrollTop);
        console.log(preElement.scrollHeight + preElement.scrollTop - preElement.clientHeight);
        if (!preElement) return;

        const hasScroll = preElement.scrollHeight > preElement.clientHeight;

        const isAtBottom = preElement.scrollTop === 0;
        showTopButton = hasScroll && isAtBottom;

        const distanceFromTop =
            preElement.scrollHeight - preElement.scrollTop - preElement.clientHeight;
        showBottomButton = hasScroll && distanceFromTop > 50 && !isAtBottom;
    }

    function formatLogs(logs: string) {
        let output = '';
        if (!logs) return output;
        const iterator = ansicolor.parse(logs);
        for (const element of iterator.spans) {
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

<Card.Base variant="secondary" padding="none">
    <Stack gap="xs">
        <div class="logs-header">
            <Stack direction="row" gap="s">
                <slot name="header" />
                <Input.Text
                    placeholder="Search logs"
                    bind:value={search}
                    --color-bgcolor-neutral-default="var(--color-bgcolor-neutral-primary)"
                >
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
        </div>
        {#key theme}
            <div>
                <pre
                    bind:this={preElement}
                    on:scroll={updateScrollButtonVisibility}>{#if filteredLogs?.length}<code
                            ><!-- eslint-disable-next-line svelte/no-at-html-tags -->{@html formatLogs(
                                filteredLogs
                            )}</code
                        >
                    {:else}<code
                            ><!-- eslint-disable-next-line svelte/no-at-html-tags -->{@html formatLogs(
                                escapedLogs
                            )}</code
                        >
                    {/if}</pre>
                {#if showScrollButton && preElement}
                    <div class="button-wrapper">
                        <Stack direction="row" gap="xs">
                            {#if showTopButton}
                                <Button.Button size="xs" variant="secondary" on:click={scrollToTop}>
                                    <Icon slot="start" icon={IconArrowSmUp} size="s" /> Scroll to top
                                </Button.Button>
                            {/if}
                            {#if showBottomButton}
                                <Button.Button
                                    size="xs"
                                    variant="secondary"
                                    on:click={scrollToBottom}
                                >
                                    <Icon slot="start" icon={IconArrowSmDown} size="s" /> Scroll to bottom
                                </Button.Button>
                            {/if}
                        </Stack>
                    </div>
                {/if}
            </div>
        {/key}
    </Stack>
</Card.Base>

<style lang="scss">
    .logs-header {
        padding: var(--space-6);
    }
    div {
        position: relative;

        pre {
            margin: 0;
            color: var(--color-fgcolor-neutral-primary);
            font-family: var(--font-family-code);
            font-size: var(--font-size-s);
            white-space: pre;
            line-height: 140%;
            letter-spacing: 0;
            max-height: 600px;
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            display: flex;
            flex-direction: column-reverse;
            padding: var(--space-6);
            white-space: pre-line;

            &::-webkit-scrollbar {
                width: var(--base-4);
                height: var(--base-4);
            }

            &::-webkit-scrollbar-track {
                background-color: transparent;
                border-radius: var(--border-radius-circle);
            }

            &::-webkit-scrollbar-corner {
                background-color: transparent;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: var(--border-radius-circle);
                background: var(--color-overlay-on-neutral);
                &:hover {
                    background: var(--color-overlay-neutral-hover);
                }
            }
        }
        .button-wrapper {
            position: absolute;
            bottom: var(--space-4);
            right: var(--space-4);
        }
    }
</style>
