<script lang="ts">
    import Fuse from 'fuse.js';
    import {
        IconArrowSmDown,
        IconArrowSmUp,
        IconDuplicate,
        IconSearch,
        IconX
    } from '@appwrite.io/pink-icons-svelte';
    import { Button, Card, Icon, Input, Typography } from './index.js';
    import Stack from './layout/Stack.svelte';
    import Tooltip from './Tooltip.svelte';
    import { ansicolor } from 'ansicolor';
    import { onMount, onDestroy } from 'svelte';

    export let logs: string;

    export let theme: 'light' | 'dark' = 'light';
    export let showScrollButton = true;
    export let height = 'auto';
    export let fullHeight = false;
    let search = '';
    let tooltipMessage = 'Click to copy';
    let preElement: HTMLPreElement;
    let preHeight: number;
    let codeElement: HTMLElement;
    let codeHeight: number;
    let showTopButton = false;
    let showBottomButton = false;

    onMount(() => {
        updateScrollButtonVisibility();
    });

    onDestroy(() => {
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
    });

    let updateTimeout: ReturnType<typeof setTimeout>;

    function debouncedUpdate() {
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        updateTimeout = setTimeout(() => {
            updateScrollButtonVisibility();
        }, 100);
    }

    function clearSearch() {
        search = '';
    }

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
        const success = (await securedCopy(value)) || unsecuredCopy(value);
        return success;
    }

    function escapeHTML(str: string) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

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
        if (!preElement) return;

        if (!isShowingAllLogs) {
            showTopButton = false;
            showBottomButton = false;
            return;
        }

        const hasScroll = preElement.scrollHeight > preElement.clientHeight;

        const atEnd = reverseActive
            ? preElement.scrollTop === 0
            : Math.ceil(preElement.scrollTop + preElement.clientHeight) >=
              preElement.scrollHeight - 1;

        showTopButton = hasScroll && atEnd;
        showBottomButton = hasScroll && !atEnd;
    }

    function formatLogs(logs: string) {
        let output = '';
        if (!logs) return output;
        const iterator = ansicolor.parse(logs);

        for (const element of iterator.spans) {
            if (element?.color?.name && element.css)
                output += `<span style="${element.css}">${element.text}</span>`;
            else output += element.text;
        }

        return output;
    }

    function cleanLogs(logs: string) {
        const iterator = ansicolor.parse(logs);
        let output = '';
        for (const element of iterator.spans) {
            if (element?.color?.name && element.css) {
                output += `${element.text}`;
            } else {
                output += `${element.text}`;
            }
        }
        return output;
    }

    function calculateSimilarity(str1: string, str2: string): number {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;

        if (longer.length === 0) return 1.0;

        const distance = levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }

    function levenshteinDistance(str1: string, str2: string): number {
        const matrix = [];

        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[str2.length][str1.length];
    }

    $: escapedLogs = escapeHTML(logs) ?? '';
    $: plainLogs = cleanLogs(logs) ?? '';

    $: fuse = new Fuse(plainLogs?.split('\n')?.map((line) => ({ line })) ?? [], {
        keys: ['line'],
        includeScore: true,
        includeMatches: true,
        threshold: 0.4,
        distance: 100,
        minMatchCharLength: 2,
        ignoreLocation: true,
        findAllMatches: true,
        useExtendedSearch: false,
        isCaseSensitive: false
    });

    $: searchResults = search
        ? search.trim().length === 1
            ? (plainLogs?.split('\n') ?? [])
                  .filter((line) => line.toLowerCase().includes(search.trim().toLowerCase()))
                  .map((line) => ({
                      item: { line },
                      score: 0,
                      matches: [] as { indices: readonly [number, number][] }[]
                  }))
            : fuse.search(search.trim()).sort((a, b) => {
                  const scoreA = a.score ?? 1;
                  const scoreB = b.score ?? 1;
                  const searchTerm = search.trim().toLowerCase();

                  const exactMatchA = a.item.line.toLowerCase().includes(searchTerm) ? 0 : 1;
                  const exactMatchB = b.item.line.toLowerCase().includes(searchTerm) ? 0 : 1;

                  if (exactMatchA !== exactMatchB) {
                      return exactMatchA - exactMatchB;
                  }

                  return scoreA - scoreB;
              })
        : [];

    $: filteredLogs = search
        ? searchResults
              .map((result) => {
                  const line = result.item.line;
                  const searchTerm = search.trim();
                  const searchLower = searchTerm.toLowerCase();
                  const lineLower = line.toLowerCase();

                  const exactMatchIndex = lineLower.indexOf(searchLower);

                  if (exactMatchIndex !== -1) {
                      let out = '';
                      let cursor = 0;
                      let currentIndex = exactMatchIndex;

                      while (currentIndex !== -1) {
                          out += line.slice(cursor, currentIndex);
                          out += `<mark class="log-highlight-exact">${line.slice(currentIndex, currentIndex + searchTerm.length)}</mark>`;
                          cursor = currentIndex + searchTerm.length;
                          currentIndex = lineLower.indexOf(searchLower, cursor);
                      }
                      out += line.slice(cursor);
                      return out;
                  }

                  const matches = (result.matches || []).flatMap(
                      (m: { indices?: ReadonlyArray<readonly [number, number]> }) => m.indices ?? []
                  ) as ReadonlyArray<readonly [number, number]>;
                  if (!matches?.length) return line;

                  const meaningfulMatchesReadonly = matches.filter(([start, end]) => {
                      const matchLength = end - start + 1;
                      const matchText = line.slice(start, end + 1).toLowerCase();
                      const searchLower = searchTerm.toLowerCase();

                      if (matchLength < 3) return false;

                      const similarity = calculateSimilarity(matchText, searchLower);
                      return similarity > 0.6;
                  });

                  const meaningfulMatches: [number, number][] = meaningfulMatchesReadonly.map(
                      ([start, end]) => [start, end]
                  );

                  if (!meaningfulMatches.length) return line;

                  const mergedMatches: [number, number][] = [];
                  const sortedMatches = meaningfulMatches.sort((a, b) => a[0] - b[0]);

                  for (const [start, end] of sortedMatches) {
                      if (mergedMatches.length === 0) {
                          mergedMatches.push([start, end]);
                      } else {
                          const last = mergedMatches[mergedMatches.length - 1];
                          if (start <= last[1] + 1) {
                              last[1] = Math.max(last[1], end);
                          } else {
                              mergedMatches.push([start, end]);
                          }
                      }
                  }

                  let out = '';
                  let cursor = 0;
                  for (const [start, end] of mergedMatches) {
                      out += line.slice(cursor, start);
                      out += `<mark class="log-highlight-fuzzy">${line.slice(start, end + 1)}</mark>`;
                      cursor = end + 1;
                  }
                  out += line.slice(cursor);
                  return out;
              })
              .join('\n')
        : '';

    $: isShowingAllLogs = !search || (search && searchResults.length === 0);

    $: isCopyDisabled = Boolean(search) && searchResults.length === 0;

    $: if (escapedLogs) {
        preHeight = preElement?.clientHeight;
        codeHeight = codeElement?.clientHeight;
        debouncedUpdate();
    }

    $: reverseActive = !search && preHeight < codeHeight;
</script>

<Card.Base variant="secondary" padding="none">
    <Stack gap="none">
        <div class="logs-header">
            <Stack direction="row" gap="s">
                <slot name="header" />
                <div class="search-input-wrapper">
                    <Input.Text
                        placeholder="Find in logs"
                        bind:value={search}
                        --bgcolor-neutral-default="var(--bgcolor-neutral-primary)"
                    >
                        <svelte:fragment slot="start">
                            <Icon icon={IconSearch} />
                        </svelte:fragment>
                        <svelte:fragment slot="end">
                            {#if search}
                                <button
                                    class="nav-button close-button"
                                    on:click={clearSearch}
                                    aria-label="Clear search"
                                >
                                    <Icon icon={IconX} size="s" />
                                </button>
                            {/if}
                        </svelte:fragment>
                    </Input.Text>
                </div>
                <Tooltip>
                    <Button.Button
                        variant="secondary"
                        icon
                        size="s"
                        disabled={isCopyDisabled}
                        on:click={() => {
                            if (isCopyDisabled) return;

                            const logsToCopy =
                                search && searchResults.length > 0
                                    ? cleanLogs(
                                          searchResults.map((result) => result.item.line).join('\n')
                                      )
                                    : cleanLogs(logs);

                            copy(logsToCopy);
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
        <div>
            {#if search && searchResults.length === 0}
                <div class="empty-state" role="status" aria-live="polite">
                    <Typography.Text
                        align="center"
                        color="--fgcolor-neutral-primary"
                        variant="m-600">No results</Typography.Text
                    >
                    <Typography.Text align="center" color="--fgcolor-neutral-secondary">
                        Your query didn't match any log lines.
                    </Typography.Text>
                    <Button.Button variant="secondary" size="s" on:click={clearSearch}>
                        Clear search
                    </Button.Button>
                </div>
            {:else}
                <pre
                    class:full-height={fullHeight}
                    class:reverseDirection={!search && preHeight < codeHeight}
                    style:--p-height={height}
                    bind:this={preElement}
                    on:scroll={updateScrollButtonVisibility}><code bind:this={codeElement}
                        >{@html formatLogs(
                            search
                                ? searchResults.length
                                    ? filteredLogs
                                    : escapedLogs
                                : escapedLogs
                        )}</code
                    ></pre>
            {/if}
            {#if showScrollButton && preElement}
                <div class="button-wrapper">
                    <Stack direction="row" gap="xs">
                        {#if showTopButton}
                            <Button.Button size="xs" variant="secondary" on:click={scrollToTop}>
                                <Icon slot="start" icon={IconArrowSmUp} size="s" /> Scroll to top
                            </Button.Button>
                        {/if}
                        {#if showBottomButton && !showTopButton}
                            <Button.Button size="xs" variant="secondary" on:click={scrollToBottom}>
                                <Icon slot="start" icon={IconArrowSmDown} size="s" /> Scroll to bottom
                            </Button.Button>
                        {/if}
                    </Stack>
                </div>
            {/if}
        </div>
    </Stack>
</Card.Base>

<style lang="scss">
    .logs-header {
        padding: var(--space-6);
        padding-block-end: 0;
    }

    .search-input-wrapper {
        flex: 1;
        min-width: 0;
    }

    .empty-state {
        display: grid;
        place-items: center;
        gap: var(--space-3);
        padding: var(--space-10);
        color: var(--fgcolor-neutral-secondary);
        text-align: center;
        min-block-size: 160px;
        border-radius: var(--border-radius-m);
        background: var(--bgcolor-neutral-primary);
    }

    .nav-button {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: var(--border-radius-xs);
        cursor: pointer;
        color: var(--fgcolor-neutral-secondary);
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
            background-color: var(--bgcolor-neutral-secondary);
            color: var(--fgcolor-neutral-primary);
        }

        &:active:not(:disabled) {
            background-color: var(--bgcolor-neutral-tertiary);
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        &.close-button {
            color: var(--fgcolor-neutral-tertiary);
        }
    }

    div {
        position: relative;

        pre {
            margin: 0;
            color: var(--fgcolor-neutral-primary);
            font-family: var(--font-family-code), var(--mono-fallbacks);
            font-size: var(--font-size-xs);
            white-space: pre-wrap;
            word-break: break-word;
            overflow-wrap: break-word;
            line-height: 140%;
            letter-spacing: 0;
            max-height: 600px;
            width: 100%;
            overflow-y: scroll;
            overflow-x: auto;
            display: flex;
            flex-direction: column;
            padding: var(--space-6);
            scroll-behavior: smooth;
            height: var(--p-height);
            min-height: 10px;

            code {
                white-space: pre-wrap;
                word-break: break-word;
                overflow-wrap: break-word;

                :global(.log-highlight-exact) {
                    background-color: rgba(254, 124, 67, 0.5);
                    font-weight: 600;
                    border-radius: 2px;
                    padding: 0 2px;
                    color: inherit;
                }

                :global(.log-highlight-fuzzy) {
                    background-color: rgba(254, 124, 67, 0.25);
                    border-radius: 2px;
                    padding: 0 2px;
                    color: inherit;
                }
            }

            &.full-height {
                min-height: 300px;
                max-height: none;
            }
            &.reverseDirection {
                flex-direction: column-reverse;
            }
        }
        .button-wrapper {
            position: absolute;
            bottom: var(--space-4);
            right: var(--space-4);
        }
    }
</style>
