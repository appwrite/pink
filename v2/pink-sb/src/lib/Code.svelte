<script lang="ts">
    // import '$scss/shiki.css';
    import { codeToHtml } from 'shiki';
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
    import Button from './button/Button.svelte';
    import Icon from '$lib/Icon.svelte';
    import { IconDuplicate } from '@appwrite.io/pink-icons-svelte';

    const testCode = `
    import { writable } from 'svelte/store';

    export const count = writable(0);
    `;

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

    export let code: string = testCode;
    export let lang: Language = 'js';
    export let lineNumbers: boolean = true;

    let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;

    const theme = createCssVariablesTheme({
        name: 'appwrite',
        variablePrefix: '--shiki-',
        fontStyle: true
    });

    onMount(async () => {
        highlighter = await createHighlighter({
            langs: languages,
            themes: [theme]
        });
    });
</script>

<div class="code-header">
    <p class="code-lang">{lang}</p>
    <Button
        variant="text"
        icon
        size="small"
        on:click={() => {
            console.log('test');
        }}
    >
        <Icon size="small" icon={IconDuplicate} color="--color-fgcolor-neutral-tertiary" />
    </Button>
</div>
<div class="code-block">
    {@html highlighter?.codeToHtml(code.trim(), {
        lang,
        theme: 'appwrite',
        transformers: [
            {
                code(node) {
                    this.addClassToHast(node, 'web-code');
                    if (lineNumbers) this.addClassToHast(node, 'line-numbers');
                }
            }
        ]
    })}
</div>

<style lang="scss">
    .code {
        &-header {
            display: flex;
            padding: var(--space-3) var(--space-4);
            justify-content: space-between;
            align-items: center;
            border-radius: var(--border-radius-s) var(--border-radius-s) var(--border-radius-none)
                var(--border-radius-none);
            border: var(--border-width-s, 1px) solid var(--color-border-neutral);
            border-bottom: none;
            background: var(--color-bgcolor-neutral-secondary);
        }
        &-block {
            border-radius: var(--border-radius-none) var(--border-radius-none)
                var(--border-radius-s) var(--border-radius-s);
            border: var(--border-width-s) solid var(--color-border-neutral);
            background: var(--color-bgcolor-neutral-primary);
        }
    }
    :global(.shiki .line-numbers .line) {
        counter-increment: line;
    }

    :global(.shiki .line-numbers .line:before) {
        content: counter(line);
        display: inline-block;
        text-align: right;
        padding-right: 1rem;
        color: #6c6c71;
        width: 2.5rem;
    }
</style>
