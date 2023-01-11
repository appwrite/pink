<script lang="ts">
  import CodePreview from "../CodePreview.svelte";

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const options = ["card", "form", "alert"];

  const codes: Record<string, string | Array<{ name: string; code: string }>> =
    {
      card: `<article class="card u-text-center">
  <img
    class="avatar is-size-x-large u-margin-inline-auto"
    src="/images/kristin.png"
    alt="Kristin Watson"
    width="66"
    height="66"
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
                  <button class="button is-secondary" type="button">
          Cancel
        </button>
                  <button class="button" type="submit">
          Save changes
        </button>
                </div>
              </div>
            </form>
          </div>`,
      alert: [
        {
          name: "Default",
          code: `<section class="alert-sticky">
  <button class="x-button" aria-label="close alert">
    <span class="icon-x" aria-hidden="true" />
  </button>
  <div class="alert-sticky-image">
    <span class="icon-info" aria-hidden="true" />
  </div>
  <div class="alert-sticky-content">
    <h4 class="alert-sticky-title">Alert Sticky Title</h4>
    <p>Provide contextual feedback messages for typical user actions.</p>
  </div>
  <div class="buttons u-flex">
    <button class="button is-text is-small">
      <span class="text">Action 1</span>
    </button>
    <button class="button is-text is-small">
      <span class="text">Action 2</span>
    </button>
  </div>
</section>`,
        },
        {
          name: "Success",
          code: `<section class="alert-sticky is-success">
  <button class="x-button" aria-label="close alert">
    <span class="icon-x" aria-hidden="true" />
  </button>
  <div class="alert-sticky-image">
    <span class="icon-info" aria-hidden="true" />
  </div>
  <div class="alert-sticky-content">
    <h4 class="alert-sticky-title">Alert Sticky Title</h4>
    <p>Provide contextual feedback messages for typical user actions.</p>
  </div>
  <div class="buttons u-flex">
    <button class="button is-text is-small">
      <span class="text">Action 1</span>
    </button>
    <button class="button is-text is-small">
      <span class="text">Action 2</span>
    </button>
  </div>
</section>`,
        },
        {
          name: "Warning",
          code: `<section class="alert-sticky is-warning">
  <button class="x-button" aria-label="close alert">
    <span class="icon-x" aria-hidden="true" />
  </button>
  <div class="alert-sticky-image">
    <span class="icon-info" aria-hidden="true" />
  </div>
  <div class="alert-sticky-content">
    <h4 class="alert-sticky-title">Alert Sticky Title</h4>
    <p>Provide contextual feedback messages for typical user actions.</p>
  </div>
  <div class="buttons u-flex">
    <button class="button is-text is-small">
      <span class="text">Action 1</span>
    </button>
    <button class="button is-text is-small">
      <span class="text">Action 2</span>
    </button>
  </div>
</section>`,
        },
        {
          name: "Info",
          code: `<section class="alert-sticky is-info">
  <button class="x-button" aria-label="close alert">
    <span class="icon-x" aria-hidden="true" />
  </button>
  <div class="alert-sticky-image">
    <span class="icon-info" aria-hidden="true" />
  </div>
  <div class="alert-sticky-content">
    <h4 class="alert-sticky-title">Alert Sticky Title</h4>
    <p>Provide contextual feedback messages for typical user actions.</p>
  </div>
  <div class="buttons u-flex">
    <button class="button is-text is-small">
      <span class="text">Action 1</span>
    </button>
    <button class="button is-text is-small">
      <span class="text">Action 2</span>
    </button>
  </div>
</section>`,
        },
        {
          name: "Danger",
          code: `<section class="alert-sticky is-danger">
  <button class="x-button" aria-label="close alert">
    <span class="icon-x" aria-hidden="true" />
  </button>
  <div class="alert-sticky-image">
    <span class="icon-info" aria-hidden="true" />
  </div>
  <div class="alert-sticky-content">
    <h4 class="alert-sticky-title">Alert Sticky Title</h4>
    <p>Provide contextual feedback messages for typical user actions.</p>
  </div>
  <div class="buttons u-flex">
    <button class="button is-text is-small">
      <span class="text">Action 1</span>
    </button>
    <button class="button is-text is-small">
      <span class="text">Action 2</span>
    </button>
  </div>
</section>`,
        },
      ],
    };

  let codeKey = "card";
  let codeIdx = 0;

  $: code = (function getCode() {
    const selected = codes[codeKey];
    if (typeof selected === "string") return selected;
    return selected[codeIdx]?.code;
  })();

  $: codeExamples = (function getOptions() {
    const selected = codes[codeKey];
    if (typeof selected === "string") return null;
    return selected;
  })();
</script>

<section class="try-it-out-section u-margin-block-start-300">
  <h2 class="heading-level-4">Try It Out Yourself</h2>
  <div class="grid u-margin-block-start-48">
    <div>
      <ul class="drop-tabs is-large">
        {#each options as option}
          <li class="drop-tabs-item">
            <button
              class="drop-tabs-button"
              on:click={() => (codeKey = option)}
              disabled={codeKey === option}
            >
              <span class="text">{capitalize(option)}</span>
            </button>
          </li>
        {/each}
      </ul>

      <div class="u-container-inline-size u-margin-block-start-8">
        <div class="card u-flex u-main-center u-cross-center" id="tryItCard">
          {@html code}
        </div>
      </div>
      {#if codeExamples}
        <div class="button-grid">
          <button
            class="u-flex u-main-start  u-cross-center"
            on:click={() => codeIdx > 0 && codeIdx--}
          >
            {#if codeIdx > 0}
              <div class="icon-cheveron-left" />
              {codeExamples[codeIdx - 1].name}
            {/if}
          </button>
          <span />
          <button
            class="u-flex u-main-end u-cross-center"
            on:click={() => {
              codeExamples && codeIdx < codeExamples?.length - 1 && codeIdx++;
            }}
          >
            {#if codeIdx < codeExamples.length - 1}
              {codeExamples[codeIdx + 1].name}
              <div class="icon-cheveron-right" />
            {/if}
          </button>
        </div>
      {/if}
    </div>
    <div>
      <section class="apple-window u-min-height-100-percents">
        <header>
          <div class="u-flex u-gap-8">
            <div class="apple-window-button is-red" />
            <div class="apple-window-button is-yellow" />
            <div class="apple-window-button is-green" />
          </div>
          {#if codeExamples}
            <div class="tag">
              {codeExamples[codeIdx].name}
            </div>
          {/if}
        </header>
        <div
          class="box u-direction-ltr u-overflow-hidden u-border-width-0 u-margin-block-start-12"
        >
          {#key code}
            <CodePreview {code} language="html" lineNumbers maxLength={60} />
          {/key}
        </div>
      </section>
    </div>
  </div>
</section>

<style lang="scss">
  @use "../../../../../packages/ui/src/abstract" as *;

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

  .grid {
    display: grid;
    grid-template-columns: 45% 1fr;
  }

  #tryItCard {
    --p-card-bg-color-default: var(--color-neutral-5);
    min-block-size: pxToRem(416);
    margin-bottom: 12px;

    :global(#{$theme-dark}) & {
      --p-card-bg-color-default: var(--color-neutral-400);
    }
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    align-items: center;
    text-align: center;

    padding: 0 16px;
  }

  header {
    position: relative;
    padding-block: pxToRem(8);

    .tag {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
