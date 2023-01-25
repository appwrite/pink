<script lang="ts">
  import { html } from "@codemirror/lang-html";
  import CodeMirror from "svelte-codemirror-editor";

  import { formatHtml } from "src/helpers/code";
  import Copy from "./Copy.svelte";
  import { onMount } from "svelte";

  export let code: string;
  export let maxLength: undefined | number = undefined;
  export let copy: string | undefined = undefined;
  let mounted = false;

  onMount(() => {
    code = formatHtml(code, maxLength);
    mounted = true;
  });
</script>

<div class="code-container">
  <Copy value={copy ? formatHtml(copy) : formatHtml(code)} />
  {#if mounted}
    <CodeMirror bind:value={code} lang={html()} />
  {/if}
</div>

<style global lang="scss">
  .cm-editor,
  .codemirror-wrapper {
    height: 100%;
  }

  .cm-content {
    font-family: "Source Code Pro";
    outline: none !important;
    box-shadow: none !important;

    body.theme-light & {
      color: #373b4d;
    }
  }

  body.theme-dark .cm-gutterElement {
    color: #868ea3 !important;
  }

  .cm-gutters,
  .cm-activeLineGutter,
  .cm-activeLine {
    background: transparent !important;
    border-right: none !important;
  }

  .cm-cursor {
    border-left-color: white !important;
    body.theme-light & {
      border-left-color: #373b4d !important;
    }
  }

  .ͼi {
    color: #fdc584;
    body.theme-light & {
      color: #b34700;
    }
  }

  .ͼe,
  .ͼd,
  .ͼb {
    color: #cbb1fc;
    body.theme-light & {
      color: #3535b6;
    }
  }

  .cm-selectionBackground {
    background: hsl(var(--color-neutral-100)) !important;

    body.theme-light & {
      background: hsl(var(--color-neutral-50)) !important;
    }
  }
</style>
