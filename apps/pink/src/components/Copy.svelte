<script lang="ts">
  export let value: string;
  async function securedCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return false;
    }

    return true;
  }

  function unsecuredCopy(value: string) {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let success = true;
    try {
      document.execCommand("copy");
    } catch {
      success = false;
    } finally {
      document.body.removeChild(textArea);
    }

    return success;
  }

  async function copy(value: string) {
    // securedCopy works only in HTTPS environment.
    // unsecuredCopy works in HTTP and only runs if securedCopy fails.
    const success = (await securedCopy(value)) || unsecuredCopy(value);
    return success;
  }
</script>

<div class="u-position-absolute u-inset-inline-end-8 u-inset-block-start-8">
  <button
    class="button is-small is-text is-only-icon copy"
    aria-label="Copy code"
    data-copy={value}
    on:click={() => copy(value)}
  >
    <span class="icon-duplicate" aria-hidden="true" />
  </button>
</div>
