<script>
  let data;

  function cleanCode(code) {
    return code
      .trim()
      .replace("<astro-fragment>", "")
      .replace("</astro-fragment>", "")
      .trim();
  }
</script>

<div bind:this={data}>
  <slot />
  {#if data?.innerHTML}
    <pre class="pre">
        <code class="code">
        {cleanCode(data.innerHTML)}
    </code>
    </pre>
  {/if}
</div>

<style>
  .pre {
    font-style: normal;
    font-weight: 400;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    letter-spacing: normal;
    color: rgb(0, 38, 62);
    font-family: Roboto, sans-serif;
    font-size: 0.912871rem;
    line-height: 1.44;
    background: rgb(255, 255, 255);
    border: none;
    box-sizing: border-box;
    display: block;
    height: auto;
    margin: 0px;
    overflow: auto;
    padding: 20px;
    width: 100%;
  }

  .code {
    font-family: "Roboto Mono", monospace;
    font-weight: 400;
  }
</style>
