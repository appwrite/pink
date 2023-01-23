<script lang="ts">
  import { onMount } from "svelte";
  import { User, users as usersData } from "./JoinCommunity";
  import tippy, { roundArrow } from "tippy.js";
  import "tippy.js/dist/tippy.css"; // optional for styling
  import "tippy.js/dist/svg-arrow.css";

  const users = shuffle(usersData).slice(0, 24);

  onMount(() => {
    users.forEach((_, i) => {
      const listItemSelector = `#join-community-users li:nth-child(${i + 1})`;
      const contentEl = document.querySelector(
        `${listItemSelector} .u-hide`
      ) as HTMLElement;
      tippy(`${listItemSelector} a`, {
        content: contentEl.innerHTML,
        allowHTML: true,
        arrow: roundArrow,
      });
    });
  });

  function getAvatar(user: User) {
    return `https://github.com/${user.username}.png`;
  }

  function getUrl(user: User) {
    return `https://github.com/${user.username}`;
  }

  function getInitials(user: User) {
    const allInitials = user.name.split(" ").map((word) => word[0]);

    return allInitials.length > 1
      ? allInitials[0] + allInitials[allInitials.length - 1]
      : allInitials[0];
  }

  function shuffle<T>(arr: T[]) {
    const newArr = [...arr];
    let currentIndex = newArr.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = newArr[currentIndex];
      newArr[currentIndex] = newArr[randomIndex];
      newArr[randomIndex] = temporaryValue;
    }

    return newArr;
  }
</script>

<ul id="join-community-users" class="u-margin-block-start-48">
  {#each shuffle(users) as user}
    <li>
      <a href={getUrl(user)} target="_blank" rel="noreferrer">
        <img
          class="avatar is-size-large u-drop-shadow-large"
          src={getAvatar(user)}
          alt={getInitials(user)}
        />
        <div class="u-hide">
          <div class="card" style="color: initial;">
            <div class="user-profile">
              <img
                class="avatar"
                src={getAvatar(user)}
                alt={getInitials(user)}
              />

              <span class="user-profile-info is-only-desktop">
                <span class="name">{user.name}</span>

                <div class="interactive-text-output u-padding-inline-0">
                  <span class="text">{`@${user.username}`}</span>
                </div>
              </span>

              {#if user.description}
                <span class="user-profile-sep" />
                <span class="user-profile-empty-column" />
                <span class="desc user-profile-info is-only-desktop">
                  <span class="text">{user.description}</span>
                </span>
              {/if}
            </div>
          </div>
        </div>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  @use "../../../../packages/ui/src/abstract" as *;

  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: pxToRem(8);
    row-gap: pxToRem(16);
    overflow: hidden;
  }

  :global(.tippy-box) {
    background-color: transparent !important;
  }

  :global(.tippy-content) {
    position: relative;
    padding: 0;
    z-index: 1;
  }

  :global(.tippy-svg-arrow) {
    fill: white;
    z-index: 99999999999;
    translate: 0px -1px;

    :global(.theme-dark) & {
      fill: #1b1b27;
    }
  }

  .user-profile-info {
    color: hsl(var(--color-neutral-100));

    :global(.theme-dark) & {
      // color: rgb(250, 250, 255);
      color: hsl(var(--color-neutral-0));
    }
  }

  .card {
    padding: 12px;
  }
</style>
