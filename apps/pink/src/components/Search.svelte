<script lang="ts">
  import { onMount } from "svelte";
  import MiniSearch from "minisearch";

  type Page = {
    title: string;
    url: string;
  };
  let pages: Page[] = [];

  let searchIndex: MiniSearch | null = null;
  let search = "";
  $: searchResults = searchIndex
    ? searchIndex.search(search, { prefix: true })
    : [];

  let selectedResult = -1;
  $: {
    // Reset selected result when results change
    searchResults;
    selectedResult = -1;
  }

  $: (function keepSelectedInView() {
    if (selectedResult < 0) {
      resultsEl?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    // Scroll to selected result
    const selectedEl = resultsEl.querySelector(
      `a:nth-child(${selectedResult + 1})`
    ) as HTMLDivElement;
    if (selectedEl) {
      // if not in view, scroll to it
      const inView =
        selectedEl.offsetTop >= resultsEl.scrollTop &&
        selectedEl.offsetTop + selectedEl.offsetHeight <=
          resultsEl.scrollTop + resultsEl.offsetHeight;

      if (inView) return;
      resultsEl.scrollTo({
        top: selectedEl.offsetTop - resultsEl.offsetHeight / 2,
        behavior: "smooth",
      });
    }
  })();

  let resultsEl: HTMLDivElement;

  onMount(async () => {
    const res = await fetch("/search.json");
    const json = JSON.stringify(await res.json());

    pages = Object.values(JSON.parse(json).storedFields) as Page[];
    pages = pages.sort((a, b) => {
      if (a.title.includes("home")) return -1;
      if (b.title.includes("home")) return 1;
      return a.title.localeCompare(b.title);
    });

    searchIndex = MiniSearch.loadJSON(json, {
      fields: ["title", "content"],
      storeFields: ["title", "content"],
    });
  });

  const capitalize = (str: string) => {
    // capitalize all words
    return str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  function getMatchSnippet(content: string, match: string, maxLength = 60) {
    const matchIndex = content.toLowerCase().indexOf(match.toLowerCase());
    if (matchIndex === -1 || match.length > maxLength) return null;

    const availableLength = maxLength - match.length;

    const start = Math.max(0, matchIndex - availableLength / 2);
    const end = Math.min(
      content.length,
      matchIndex + match.length + availableLength / 2
    );

    const left = content.slice(start, matchIndex);
    const middle = content.slice(matchIndex, matchIndex + match.length);
    const right = content.slice(matchIndex + match.length, end);

    return [left, middle, right];
  }

  function onKeyDown(e: KeyboardEvent) {
    const dialog = document.getElementById("search");
    if (!dialog || !dialog.hasAttribute("open")) return;

    const results = searchResults.length ? searchResults : pages;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedResult = Math.min(selectedResult + 1, results.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedResult = Math.max(selectedResult - 1, -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const result = results[selectedResult];
      if (!result) return;
      window.location.href = result.url;
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="card wrapper">
  <div class="input-text-wrapper is-with-end-button">
    <input type="search" placeholder="Search" bind:value={search} />
    <div class="icon-search" aria-hidden="true" />

    <button
      class="button is-text is-only-icon"
      aria-label="Clear search"
      disabled={!search}
      on:click={() => (search = "")}
      style="--button-size:1.5rem;"
    >
      <span class="icon-x" aria-hidden="true" />
    </button>
  </div>

  <div class="box dark-box results" bind:this={resultsEl}>
    {#if search}
      {#if !searchResults.length}
        <p>No results found</p>
      {/if}
      {#each searchResults as result, idx}
        {@const snippet = getMatchSnippet(result.content, search)}
        <a class:selected={selectedResult === idx} href={result.url}>
          <span>{capitalize(result.title)}</span>

          {#if snippet}
            <p class="content">
              <span>...{snippet[0]}</span>
              <b>{snippet[1]}</b>
              <span>{snippet[2]}...</span>
            </p>
          {/if}
        </a>
      {/each}
    {:else}
      {#each pages as page, idx}
        <a class:selected={selectedResult === idx} href={page.url}>
          <span>{capitalize(page.title)}</span>
        </a>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;

    width: 600px;
    max-width: calc(100% - 2rem);
    height: 400px;
    max-height: calc(100% - 2rem);

    overflow: hidden;

    display: flex;
    flex-direction: column;
  }

  .input-text-wrapper .icon-search {
    inset-block-start: 50%;
    translate: 0 -50%;
  }

  .results {
    display: flex;
    flex-direction: column;
    gap: 16px;

    overflow: auto;
    max-height: 100%;
    margin-top: 16px;

    :global(.theme-light) & {
      background-color: transparent;
    }

    a {
      display: flex;
      flex-direction: column;

      border-radius: var(--border-radius-small);
      padding: 8px 12px;

      > :nth-child(1) {
        font-weight: bold;
      }

      &:hover,
      &.selected {
        background-color: hsl(var(--color-neutral-200));

        :global(.theme-light) & {
          background-color: hsl(var(--color-neutral-10));
        }
      }

      .content {
        display: flex;
        white-space: pre;

        span {
          opacity: 0.5;
        }

        b {
          opacity: 0.75;
        }
      }
    }
  }
</style>
