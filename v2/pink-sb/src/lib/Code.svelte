<script lang="ts">
    import {
        createCssVariablesTheme,
        createHighlighter,
        type BuiltinLanguage,
        type PlainTextLanguage,
        type HighlighterGeneric,
        type BundledLanguage,
        type BundledTheme
    } from 'shiki';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import Button from './button/Button.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconDuplicate } from '@appwrite.io/pink-icons-svelte';
    import Tooltip from './Tooltip.svelte';
    import Spinner from './Spinner.svelte';
    import Select from './input/Select.svelte';
    import { copy } from './helpers/copy.js';

    type Language = BuiltinLanguage | PlainTextLanguage;

    const languages: Language[] = [
        'js',
        'javascript',
        'dart',
        'ts',
        'typescript',
        'xml',
        'html',
        'sh',
        'md',
        'json',
        'swift',
        'php',
        'diff',
        'python',
        'ruby',
        'csharp',
        'kotlin',
        'java',
        'cpp',
        'bash',
        'powershell',
        'cmd',
        'yaml',
        'text',
        'graphql',
        'http',
        'go',
        'py',
        'rb',
        'cs',
        'css',
        'groovy',
        'ini',
        'txt',
        'dotenv'
    ];

    const theme = createCssVariablesTheme({
        name: 'appwrite',
        variablePrefix: '--shiki-',
        fontStyle: true
    });

    export let code: string;
    export let lang: Language = 'javascript';
    export let lineNumbers = true;

    let tooltipContent = 'Copy';
    let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
    let htmlCode: string;

    onMount(async () => {
        highlighter = await createHighlighter({
            langs: languages,
            themes: [theme]
        });

        htmlCode = highlightCode(code, lang);
    });

    function highlightCode(code: string, lang: Language) {
        return highlighter?.codeToHtml(code.trim(), {
            lang,
            theme: 'appwrite',
            transformers: [
                {
                    code(node) {
                        if (lineNumbers) this.addClassToHast(node, 'line-numbers');
                    }
                }
            ]
        });
    }

    async function copyCode() {
        const success = await copy(code);

        if (success) {
            tooltipContent = 'Copied';
        } else {
            tooltipContent = 'Failed to copy';
        }
        setTimeout(() => {
            tooltipContent = 'Copy';
        }, 3000);
    }

    $: if (lang && highlighter) {
        htmlCode = highlightCode(code, lang);
    }
</script>

<header role="generic">
    <p class="lang">{lang}</p>
    <div>
        <!-- <Select bind:value={lang} options={languages} /> -->
        {#key tooltipContent}
            <Tooltip>
                <Button variant="text" icon size="small" on:click={copyCode}>
                    <Icon size="small" icon={IconDuplicate} />
                </Button>
                <p slot="tooltip">{tooltipContent}</p>
            </Tooltip>
        {/key}
    </div>
</header>
<div class="code-block">
    {#if htmlCode}
        <div transition:fade={{ duration: 300 }}>
            {@html htmlCode}
        </div>
    {:else}
        <div class="loader">
            <Spinner />
        </div>
    {/if}
</div>

<style lang="scss">
    header {
        display: flex;
        padding: var(--space-3) var(--space-4);
        justify-content: space-between;
        align-items: center;
        border-radius: var(--border-radius-s) var(--border-radius-s) var(--border-radius-none)
            var(--border-radius-none);
        border: var(--border-width-s, 1px) solid var(--color-border-neutral);
        border-bottom: none;
        background: var(--color-bgcolor-neutral-secondary);
        .lang {
            min-width: var(--icon-size-m);
            padding: var(--space-1) var(--space-2);
            border-radius: var(--border-radius-xs);
            background: var(--color-overlay-on-neutral);
        }
    }
    .code-block {
        border-radius: var(--border-radius-none) var(--border-radius-none) var(--border-radius-s)
            var(--border-radius-s);
        border: var(--border-width-s) solid var(--color-border-neutral);
        background: var(--color-bgcolor-neutral-primary);
    }
    .loader {
        padding: var(--space-4) var(--space-6);
    }
    :global(.shiki .line-numbers .line) {
        counter-increment: line;
    }
    :global(.shiki :not(.line-numbers) .line) {
        padding-inline-start: 1rem;
    }

    :global(.shiki .line-numbers .line:before) {
        content: counter(line);
        display: inline-block;
        text-align: right;
        color: #6c6c71;
        padding-inline-end: 1rem;
        width: 2.5rem;
    }
</style>
