<script lang="ts">
  import { onMount } from "svelte";
  import MiniSearch from "minisearch";

  let searchIndex: MiniSearch | null = null;

  onMount(async () => {
    const res = await fetch("/search.json");
    const json = JSON.stringify(await res.json());

    searchIndex = MiniSearch.loadJSON(json, {
      fields: ["title", "content"],
      storeFields: ["title", "content"],
    });
  });

  let search = "";
  $: searchResults = searchIndex
    ? searchIndex.search(search, { prefix: true })
    : [];

  $: console.log(searchResults);
</script>

<div class="wrapper">
  <div class="input-text-wrapper is-with-end-button">
    <input type="search" placeholder="Search" bind:value={search} />
    <div class="icon-search" aria-hidden="true" />

    <button
      class="x-button"
      aria-label="Clear search"
      disabled={!search}
      on:click={() => (search = "")}
    >
      <span class="icon-x" aria-hidden="true" />
    </button>
  </div>
  {#if searchIndex}
    <div class="results">
      {#each searchResults as result}
        <div>
          {result.id}
          {result.title}
          {JSON.stringify(result)}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border: 1px solid red;

    width: 600px;
    max-width: calc(100% - 2rem);
    height: 400px;
    max-height: calc(100% - 2rem);

    overflow: hidden;
  }

  .input-text-wrapper .icon-search {
    inset-block-start: 50%;
    translate: 0 -50%;
  }

  .results {
    overflow: auto;
    max-height: 100%;
  }
</style>
