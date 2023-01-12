<script lang="ts">
  import { onMount } from "svelte";
  import tippy from "tippy.js";
  import "tippy.js/dist/tippy.css"; // optional for styling

  type User = {
    name: string;
    username: string;
    description?: string;
  };

  // TODO: Add more
  const users: User[] = [
    {
      name: "Eldad Fux",
      username: "eldadfux",
      description: "Appwrite's Founder",
    },
    {
      name: "Damodar Lohani",
      username: "lohanidamodar",
      description: "Software Engineer at Appwrite",
    },
    {
      name: "Torsten Dittmann",
      username: "TorstenDittmann",
      description: "Engineering Lead at Appwrite",
    },
    {
      name: "Christy Jacob",
      username: "christyjacob4",
      description: "Engineering Lead at Appwrite",
    },
    {
      name: "Thomas G. Lopes",
      username: "tglide",
      description: "Frontend Engineer at Appwrite",
    },
    {
      name: "Arman Nik",
      username: "ArmanNik",
      description: "Frontend Engineer at Appwrite",
    },
    {
      name: "Elad Shechter",
      username: "elad2412",
      description: "Web Developer at Appwrite",
    },
    {
      name: "Chen Parnasa",
      username: "chenparnasa",
      description: "Product Designer at Appwrite",
    },
    {
      name: "Carla",
      username: "heyCarla",
      description: "Product Designer at Appwrite",
    },
    {
      name: "Matej Bačo",
      username: "Meldiron",
      description: "Software Engineer at Appwrite",
    },
    {
      name: "Jake Barnby",
      username: "abnegate",
      description: "Engineering Lead at Appwrite",
    },
    {
      name: "Bradley Schofield",
      username: "PineappleIOnic",
      description: "Software Engineer at Appwrite",
    },
    {
      name: "Brandon",
      username: "kodumbeats",
    },
    {
      name: "Shmuel Fogel",
      username: "fogelito",
      description: "Software Engineer at Appwrite",
    },
    {
      name: "Shimon Newman",
      username: "shimonewman",
      description: "Full Stack Engineer at Appwrite",
    },
    {
      name: "Everly Precia Suresh",
      username: "everly-gif",
      description: "Software Engineer at Appwrite",
    },
    {
      name: "Vincent (Wen Yu) Ge",
      username: "gewenyu99",
      description: "DevRel Engineer at Appwrite",
    },
    {
      name: "Wess Cope",
      username: "wess",
      description: "Software Engineer at Appwrite",
    },
    {
      name: "Steven Nguyen",
      username: "stnguyen90",
      description: "Software Engineer at Appwrite",
    },
    {
      name: "Aditya Oberai",
      username: "adityaoberai",
      description: "Developer Advocate at Appwrite",
    },
  ];

  onMount(() => {
    users.forEach((_, i) => {
      const listItemSelector = `#join-community-users li:nth-child(${i + 1})`;
      const contentEl = document.querySelector(
        `${listItemSelector} .u-hide`
      ) as HTMLElement;
      tippy(`${listItemSelector} a`, {
        content: contentEl.innerHTML,
        allowHTML: true,
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
          <div class="card">
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
                <span class="user-profile-info is-only-desktop">
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
    background-color: transparent;
  }

  :global(.tippy-content) {
    position: relative;
    padding: 0;
    z-index: 1;
  }
</style>
