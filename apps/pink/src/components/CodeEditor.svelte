<script lang="ts">
  import { formatHtml, highlight } from "src/helpers/code";
  import Copy from "./Copy.svelte";

  export let code: string;
  export let lineNumbers: undefined | boolean = undefined;
  export let maxLength: undefined | number = undefined;
  export let copy: string | undefined = undefined;

  let newCode = formatHtml(code, maxLength);
  $: parsedCode = (function () {
    return highlight(newCode, {
      language: "html",
      maxLength,
      format: false,
    });
  })();

  function onEdit(e: Event) {
    const target = e.target as HTMLDivElement;
    code = target.textContent ?? code;
  }
</script>

<div class="code-container">
  <Copy value={copy ? formatHtml(copy) : formatHtml(code)} />
  <code
    class="grid-code"
    contenteditable
    on:keydown={onEdit}
    on:keyup={onEdit}
    on:paste={onEdit}
    on:blur={onEdit}
    on:input={onEdit}
    on:change={onEdit}
  >
    {#each parsedCode.split(/[\n\r]/).filter(Boolean) as line}
      <div class={lineNumbers ? "grid-code-line-number" : ""} />
      <pre>{@html line}</pre>
    {/each}
  </code>
</div>

<style global lang="scss">
  .code-container {
    overflow-x: auto;
  }

  code,
  pre {
    font-size: clamp(0.6rem, 2vw, 0.75rem);
    &[class*="language-"] {
      color: #fcfcff;
      text-shadow: none;
      font-family: "Source Code Pro";

      &.line-numbers {
        padding-left: 2.5em;
      }
      body.theme-light & {
        color: #373b4d;
      }
    }
    ::selection,
    &::selection {
      text-shadow: none;
      background: #b3d4fc;
    }

    &.line-numbers .line-numbers-rows {
      border: none;

      > span::before {
        color: #868ea3;
      }
    }
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: hsl(var(--p-box-background-color));
    padding: 0;
    margin: 0;
  }
  .token {
    &.comment,
    &.prolog,
    &.doctype,
    &.cdata {
      color: #868ea3;
    }

    &.punctuation {
      color: #fcfcff;

      body.theme-light & {
        color: #373b4d;
      }
    }
    &.property,
    &.tag,
    &.boolean,
    &.number,
    &.constant,
    &.symbol,
    &.deleted,
    &.selector,
    &.attr-name,
    &.string,
    &.char,
    &.builtin,
    &.inserted {
      color: #fdc584;
      body.theme-light & {
        color: #b34700;
      }
    }
    &.operator,
    &.entity,
    &.url,
    .language-css &.string,
    .style &.string {
      color: #fcfcff;
      background: none;
      body.theme-light & {
        color: #373b4d;
      }
    }

    &.atrule,
    &.attr-value,
    &.keyword {
      color: #cbb1fc;
      body.theme-light & {
        color: #3535b6;
      }
    }
    &.function {
      color: #ffa1ce;
      body.theme-light & {
        color: #da1a5b;
      }
    }
    &.class-name {
      color: #a1c4ff;
      body.theme-light & {
        color: #62aed2;
      }
    }
    &.regex,
    &.important,
    &.variable {
      color: #a1c4ff;
      body.theme-light & {
        color: #007187;
      }
    }
  }
</style>
