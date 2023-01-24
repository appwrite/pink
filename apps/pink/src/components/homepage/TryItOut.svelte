<script lang="ts">
  import CodeEditor from "@components/CodeEditor.svelte";
  import CodePreview from "../CodePreview.svelte";

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const options = ["card", "form", "alert"];

  function getAlertCode(alertClass = "") {
    return `<section class="alert-sticky ${alertClass}">
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
  <div class="alert-sticky-buttons u-flex">
    <button class="button is-text is-small">
      <span class="text">Action 1</span>
    </button>
    <button class="button is-text is-small">
      <span class="text">Action 2</span>
    </button>
  </div>
</section>`;
  }

  const codes: Record<string, string | Array<{ name: string; code: string }>> =
    {
      card: `<article class="card u-text-center"><img class="avatar is-size-x-large u-margin-inline-auto" src="https://source.unsplash.com/LaK153ghdig/132x132" alt="Kristin Watson" width="66" height="66" />  <h5 class="body-text-2 u-margin-block-start-16">Kristin Watson</h5>  <p class="u-margin-block-start-4 u-color-text-gray">    kristin.watson@appwrite.io  </p>  <button class="button u-margin-inline-auto u-margin-block-start-24">    <span class="text">Edit profile</span>  </button></article>`,
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
                    <input type="email" class="input-text u-padding-inline-end-56" placeholder="Kristin Watson" name="name"/>
                  </div>
                </li>
                <li class="form-item">
                  <label class="label" for="email">Email</label>
                  <div class="input-text-wrapper">
                    <input type="email" class="input-text u-padding-inline-end-56" placeholder="kristin@appwrite.io" name="email"/>
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
      alert: [
        {
          name: "Default",
          code: getAlertCode(),
        },
        {
          name: "Success",
          code: getAlertCode("is-success"),
        },
        {
          name: "Warning",
          code: getAlertCode("is-warning"),
        },
        {
          name: "Info",
          code: getAlertCode("is-info"),
        },
        {
          name: "Danger",
          code: getAlertCode("is-danger"),
        },
      ],
    };

  let codeKey = "card";
  let codeIdx = 0;
  let code = codes[0] as string;

  $: {
    const selected = codes[codeKey];
    if (typeof selected === "string") {
      code = selected;
    } else {
      code = selected[codeIdx]?.code;
    }
  }

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
      <ul class="secondary-tabs is-large">
        {#each options as option}
          <li class="secondary-tabs-item">
            <button
              class="secondary-tabs-button"
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
        <div class="u-flex u-gap-16 u-main-space-between u-padding-block-12">
          <button
            class="button is-text"
            on:click={() => codeIdx > 0 && codeIdx--}
          >
            {#if codeIdx > 0}
              <span class="icon-cheveron-left" aria-hidden="true" />
              Previous
            {/if}
          </button>

          <button
            class="button is-text"
            on:click={() => {
              codeExamples && codeIdx < codeExamples?.length - 1 && codeIdx++;
            }}
          >
            {#if codeIdx < codeExamples.length - 1}
              Next
              <div class="icon-cheveron-right" aria-hidden="true" />
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
          {#key `${codeKey}-${codeIdx}`}
            <CodePreview bind:code language="html" lineNumbers maxLength={60} />
          {/key}
        </div>
      </section>
    </div>
  </div>
</section>

<style lang="scss">
  @use "../../../../../packages/ui/src/abstract" as *;

  .try-it-out-section {
    @media #{$break2open} {
      .apple-window {
        position: relative;
        margin-inline-start: pxToRem(-1);
        box-shadow: var(--shadow-large);
      }
    }
  }

  .apple-window .box {
    display: flex;
    overflow: auto !important;
    max-inline-size: 100%;

    @media #{$break2open} {
      min-block-size: 500px;
      max-block-size: 500px;
    }

    > :global(*) {
      inline-size: 100%;
    }
  }

  .grid {
    @media #{$break2open} {
      display: grid;
      grid-template-columns: 45% 55%;

      max-inline-size: 100%;
    }
  }

  #tryItCard {
    --p-card-bg-color-default: var(--color-neutral-5);
    min-block-size: pxToRem(416);

    @media #{$break2open} {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }

    :global(#{$theme-dark}) & {
      --p-card-bg-color-default: var(--color-neutral-400);
    }
  }

  header {
    position: relative;
    padding-block: pxToRem(8);

    .tag {
      position: absolute;
      inset-block-start: 50%;
      inset-inline-start: 50%;
      transform: translate(calc(var(--transform-direction) * -50%), -50%);
    }
  }
</style>
