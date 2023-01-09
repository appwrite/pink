<script>
  import CodePreview from "./CodePreview.svelte";

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const options = ["card", "form", "alert"];

  let selected = "card";

  const codes = {
    card: `<article class="card u-text-center">
  <img
    class="avatar is-size-x-large u-margin-inline-auto"
    src="/images/kristin.png"
    alt="Kristin Watson"
  />
  <h5 class="body-text-2 u-margin-block-start-16">Kristin Watson</h5>
  <p class="u-margin-block-start-4 u-color-text-gray">
    kristin.watson@appwrite.io
  </p>
  <button class="button u-margin-inline-auto u-margin-block-start-24">
    <span class="text">Edit profile</span>
  </button>
</article>`,
    form: `<div class="card">
            <div class="u-flex u-main-space-between u-cross-center">
              <h6 class="heading-level-6">Edit Profile</h6>
              <button class="icon-x"></button>
            </div>
            <form class="form u-margin-block-start-24">
              <ul class="form-list">
                <li class="form-item">
                  <label class="label" for="name">Name</label>
                  <div class="input-text-wrapper">
                    <input
                      type="email"
                      class="input-text u-padding-inline-end-56"
                      placeholder="Kristin Watson"
                      name="name"
                    />
                  </div>
                </li>
                <li class="form-item">
                  <label class="label" for="email">Email</label>
                  <div class="input-text-wrapper">
                    <input
                      type="email"
                      class="input-text u-padding-inline-end-56"
                      placeholder="kristin@appwrite.io"
                      name="email"
                    />
                  </div>
                </li>
              </ul>
              <div class="form-footer">
                <div class="u-flex u-main-end u-gap-12">
                  <button class="button is-secondary" type="button">Cancel</button>
                  <button class="button" type="submit">Save changes</button>
                </div>
              </div>
            </form>
          </div>`,
    alert: "<div>Alert</div>",
  };
</script>

<section class="try-it-out-section u-margin-block-start-300">
  <h2 class="heading-level-4">Try It Out Yourself</h2>
  <div class="grid-1-1 u-margin-block-start-48">
    <div class="grid-1-1-col-1">
      <ul class="drop-tabs is-large">
        {#each options as option}
          <li class="drop-tabs-item">
            <button
              class="drop-tabs-button"
              on:click={() => (selected = option)}
              disabled={selected === option}
            >
              <span class="text">{capitalize(option)}</span>
            </button>
          </li>
        {/each}
      </ul>

      <div class="u-container-inline-size u-margin-block-start-8">
        <div class="card u-flex u-main-center u-cross-center" id="tryItCard">
          {@html codes[selected]}
        </div>
      </div>
    </div>
    <div class="grid-1-1-col-2">
      <section class="apple-window u-min-height-100-percents">
        <header class="u-flex u-gap-8">
          <div class="apple-window-button is-red" />
          <div class="apple-window-button is-yellow" />
          <div class="apple-window-button is-green" />
        </header>
        <div
          class="box u-overflow-hidden u-border-width-0 u-margin-block-start-12"
        >
          {#key selected}
            <CodePreview code={codes[selected]} language="html" lineNumbers />
          {/key}
        </div>
      </section>
    </div>
  </div>
</section>

<style lang="scss">
  @use "../../../../packages/ui/src/abstract" as *;

  .try-it-out-section {
    @media #{$break1} {
      .card {
        margin-block-end: pxToRem(24);
      }
    }
    @media #{$break2open} {
      .card {
        margin-block-end: pxToRem(48);
      }
      .apple-window {
        position: relative;
        margin-inline-start: pxToRem(-1);
        box-shadow: var(--shadow-large);
      }
    }
  }

  #tryItCard {
    --p-card-bg-color-default: var(--color-neutral-5);
    min-block-size: pxToRem(416);

    :global(#{$theme-dark}) & {
      --p-card-bg-color-default: var(--color-neutral-400);
    }
  }

  // @container (max-width: pxToRem(500)) {
  //   #tryItCard {
  //     min-block-size: pxToRem(304);
  //   }
  // }
</style>
