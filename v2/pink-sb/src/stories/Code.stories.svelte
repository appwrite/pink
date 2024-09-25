<script context="module" lang="ts">
    import { Code } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    const codeExample = `
    import { writable } from 'svelte/store';

    export const count = writable(0);
    `;

    export const meta: MetaProps = {
        title: 'Components/Code',
        component: Code,
        args: {
            code: codeExample,
            lineNumbers: true
        },
        argTypes: {
            lang: {
                options: [
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
                ],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Code {...args} />
</Template>

<Story name="Default" />
