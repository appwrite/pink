<script lang="ts">
    import { Icon, Sidebar } from '$lib/index.js';
    import { Button as LinkButton } from '$lib/link/index.js';
    import { Button } from '$lib/button/index.js';
    import {
        IconChartBar,
        IconChatBubble,
        IconCog,
        IconDatabase,
        IconFolder,
        IconGlobeAlt,
        IconLightningBolt,
        IconLogoutLeft,
        IconLogoutRight,
        IconUserGroup
    } from '@appwrite.io/pink-icons-svelte';
    import Stack from '$lib/layout/Stack.svelte';

    type $$Props = HTMLElement & {
        state?: 'closed' | 'open' | 'icons';
        organization?: { $id: string };
    };

    export let state: $$Props['state'] = 'closed';
    export let project: $$Props['organization'];

    const projectOptions = [
        { name: 'Overview', icon: IconChartBar, slug: '' },
        { name: 'Auth', icon: IconUserGroup, slug: 'auth' },
        { name: 'Databases', icon: IconDatabase, slug: 'databases' },
        { name: 'Functions', icon: IconLightningBolt, slug: 'functions' },
        { name: 'Messaging', icon: IconChatBubble, slug: 'messaging' },
        { name: 'Sites', icon: IconGlobeAlt, slug: 'sites' },
        { name: 'Storage', icon: IconFolder, slug: 'storage' },
        { name: 'Settings', icon: IconCog, slug: 'settings' }
    ];
</script>

<Sidebar.Base {...$$props} bind:state>
    <div slot="top">TOP</div>
    <div slot="middle">
        {#if project}<Stack direction="column" gap="s">
                {#each projectOptions as projectOption}
                    <a href={`/console/project-${project.$id}/${projectOption.slug}`} class="link"
                        ><span class="link-icon"
                            ><Icon icon={projectOption.icon} size="s" />
                        </span><span class:hidden={state === 'icons'} class="link-text"
                            >{projectOption.name}</span
                        ></a
                    >
                {/each}
            </Stack>
        {/if}
    </div>
    <div slot="bottom" class="bottom">
        <div class="only-desktop">
            <div class:hidden={state === 'icons'}>
                <LinkButton
                    variant="quiet-muted"
                    size="s"
                    on:click={() => {
                        state = 'icons';
                    }}
                    ><div class="link">
                        <span class="link-icon"><Icon icon={IconLogoutLeft} /> </span>
                    </div></LinkButton
                >
            </div>
            <div class:hidden={state === 'open'}>
                <LinkButton
                    variant="quiet-muted"
                    size="s"
                    on:click={() => {
                        state = 'open';
                    }}
                    ><div class="link">
                        <span class="link-icon">
                            <Icon icon={IconLogoutRight} />
                        </span>
                    </div></LinkButton
                >
            </div>
        </div>
        <div class="only-mobile">
            {#if project}
                <div class="action-buttons">
                    <Stack direction="column" gap="s">
                        <Button variant="secondary" size="s"><span>Feedback</span></Button>
                        <Button variant="secondary" size="s"><span>Support</span></Button>
                    </Stack>
                </div>
            {/if}
        </div>
    </div>
</Sidebar.Base>

<style lang="scss">
    .link {
        display: flex;
        height: 32px;
        padding: var(--space-4, 8px);
        align-items: center;
        gap: var(--gap-S, 8px);
        flex-shrink: 0;
        border-radius: var(--border-radius-s, 8px);

        .link-icon {
            height: 16px;
            color: var(--color-fgcolor-neutral-weak);
        }

        &:hover {
            background: var(--color-bgcolor-neutral-secondary, #f4f4f7);
            .link-icon {
                color: var(--color-fgcolor-neutral-tertiary);
            }
        }

        &:focus {
            background: rgba(255, 255, 255, 0);

            /* box-shadow/state/focus */
            box-shadow:
                var(--shadow-offsetx-0, 0px) var(--shadow-offsety-0, 0px) 0px 2px
                    var(--color-bgcolor-neutral-default, #fafafb),
                0px 0px 0px 4px var(--color-border-focus, #818186);
        }

        &:active {
            background: var(--color-bgColor-neutral-secondary, #f4f4f7);

            .link-icon {
                color: var(--color-fgcolor-neutral-primary);
            }
        }
    }

    .link-text {
        width: 128px;
    }

    .bottom .link .link-icon {
        color: var(--color-fgcolor-neutral-tertiary);
        height: 16px;
        width: 16px;
        display: flex;
        align-items: center;
    }

    .hidden {
        display: none;
    }

    .only-desktop {
        display: none;
    }
    .only-mobile {
        display: block;
    }

    @media (min-width: 768px) {
        .only-desktop {
            display: block;
        }
        .only-mobile {
            display: none;
        }
    }

    .action-buttons {
        span {
            width: 144px;
            text-align: center;
        }
    }
</style>
