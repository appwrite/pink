<script lang="ts">
  import { onMount } from "svelte";
  import MiniSearch from "minisearch";

  let searchIndex: MiniSearch | null = null;

  onMount(async () => {
    const res = await fetch("/search.json");
    const json = JSON.stringify(await res.json());

    searchIndex = MiniSearch.loadJSON(json, {
      fields: ["title", "content"],
    });
  });

  let search = "";
</script>

aaa
<input type="text" bind:value={search} />

{#if searchIndex}
  {#each searchIndex.search(search) as result}
    <div>
      {result.id}
      {result.title}
    </div>
  {/each}
{/if}
