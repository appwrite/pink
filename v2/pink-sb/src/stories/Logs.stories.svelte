<script context="module" lang="ts">
    import { Logs } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Logs',
        component: Logs,
        args: {
            logs: `2021-09-01 12:00:00 INFO: This is an info message
2021-09-01 12:00:01 ERROR: This is an error message
2021-09-01 12:00:02 WARNING: This is a warning message
2021-09-01 12:00:03 DEBUG: This is a debug message
2021-09-01 12:00:04 INFO: This is an info message
2021-09-01 12:00:05 ERROR: This is an error message
2021-09-01 12:00:06 WARNING: This is a warning message
2021-09-01 12:00:07 DEBUG: This is a debug message
2021-09-01 12:00:08 INFO: This is an info message
2021-09-01 12:00:09 ERROR: This is an error message
2021-09-01 12:00:10 WARNING: This is a warning message
2021-09-01 12:00:11 DEBUG: This is a debug message
2021-09-01 12:00:12 INFO: This is an info message
2021-09-01 12:00:13 ERROR: This is an error message
2021-09-01 12:00:14 WARNING: This is a warning message
2021-09-01 12:00:15 DEBUG: This is a debug message
2021-09-01 12:00:16 INFO: This is an info message
2021-09-01 12:00:17 ERROR: This is an error message
2021-09-01 12:00:18 WARNING: This is a warning message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:19 DEBUG: This is a debug message
2021-09-01 12:00:20 INFO: This is an info message
2021-09-01 12:00:21 ERROR: This is an error message
2021-09-01 12:00:22 WARNING:`
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default" let:args>
    <div style:width="1200px">
        <Logs {...args} />
    </div>
</Story>
