<script context="module" lang="ts">
    type BaseCommand = {
        callback: () => void;
        label: string;
        disabled?: boolean;
        forceEnable?: boolean;
        group?: string;
        icon?: string;
        image?: string;
        rank?: number;
        nested?: boolean;
        keepOpen?: boolean;
    };

    type KeyedCommand = BaseCommand & {
        keys: string[];
        /* Ctrl on Windows/Linux, Meta on Mac */
        ctrl?: boolean;
        shift?: boolean;
        /* Alt on Windows/Linux, Option on Mac */
        alt?: boolean;
    };

    export function isKeyedCommand(command: Command): command is KeyedCommand {
        return 'keys' in command && Array.isArray((command as KeyedCommand).keys);
    }

    export type Command = KeyedCommand | BaseCommand;

    export type GroupCommand = {
        name: string;
        commands: Command[];
    };
</script>

<script lang="ts">
    import Stack from '$lib/layout/Stack.svelte';
    import Keyboard from '../Keyboard.svelte';

    export let open = false;
    export let grouppedCommands: GroupCommand[] = [];

    let dialog: HTMLDialogElement;

    function handleBLur(event: MouseEvent) {
        if (event.target === dialog) {
            dialog.close();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            event.preventDefault();
            dialog.close();
        }
    }

    $: if (dialog) {
        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }

    let search = '';

    $: filteredCommands = grouppedCommands
        .map((group) => {
            return {
                ...group,
                commands: group.commands.filter((command) => {
                    if (isKeyedCommand(command)) {
                        return command.keys.some((key) => key.includes(search));
                    }
                    return command.label.toLocaleLowerCase().includes(search);
                })
            };
        })
        .filter((group) => group.commands.length > 0);
</script>

<svelte:window on:mousedown={handleBLur} on:keydown={handleKeydown} />

<dialog bind:this={dialog} on:close={() => (open = false)}>
    <section>
        {#if open}
            <header>
                <!--  svelte-ignore a11y-autofocus -->
                <input type="text" placeholder="Search..." autofocus bind:value={search} />
            </header>
            <Stack direction="column" gap="s" justifyContent="flex-end">
                <ul class="options">
                    {#if filteredCommands?.length}
                        {#each filteredCommands as group, i}
                            <li class="group eyebrow-heading-3">
                                {group.name}
                            </li>
                            {#each group.commands as command, i}
                                <li class="result">
                                    <button class="option">
                                        <div class="u-flex u-gap-8 u-cross-center">
                                            <i class="icon-{command.icon ?? 'arrow-sm-right'}" />
                                            <span>
                                                {command.label}
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            {/each}
                        {/each}
                    {:else}
                        <li class="result">
                            <slot name="no-options">
                                <span class="text">No options found</span>
                            </slot>
                        </li>
                    {/if}
                </ul>
            </Stack>
            <footer>
                <Stack direction="row" gap="s" justifyContent="space-between">
                    <p>
                        <Keyboard key="Enter"></Keyboard>
                        <span>to select</span>
                    </p>
                    <p>
                        <Keyboard key="Esc"></Keyboard>
                        <span>to close</span>
                    </p>
                </Stack>
            </footer>
        {/if}
    </section>
</dialog>

<style lang="scss">
    dialog {
        padding: 0;
        border: none;
        background: none;
        overflow: visible;
        color: var(--color-fgcolor-neutral-secondary);

        section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            width: 640px;
            border-radius: var(--border-radius-l);
            border: var(--border-width-s) solid var(--color-border-neutral);
            background: var(--color-bgcolor-neutral-primary);

            /* box-shadow/neutral/XL */
            box-shadow:
                0px 56px 32px 0px rgba(0, 0, 0, 0.02),
                0px 6px 14px 0px rgba(0, 0, 0, 0.04),
                0px 24px 25px 0px rgba(0, 0, 0, 0.03);

            header {
                display: flex;
                gap: 0.25rem;
                align-items: center;
                width: 100%;

                border-bottom: 1px solid hsl(var(--color-border));
                font-size: 16px;
                padding: 1rem;
                border-bottom: var(--border-width-s) solid var(--color-border-neutral);
                background: var(--color-bgcolor-neutral-primary);

                input {
                    width: 100%;
                    margin: -1rem;
                    padding: var(--space-6) var(--space-7);
                    border: none;
                    background-color: transparent;
                    &::placeholder {
                        color: var(--color-fgcolor-neutral-tertiary);
                    }

                    /* Desktop/Body L 400 */
                    font-family: var(--font-family-sansSerif, Inter);
                    font-size: var(--font-size-M, 16px);
                    font-style: normal;
                    font-weight: 400;
                    line-height: 140%; /* 22.4px */
                    letter-spacing: -0.16px;
                }
            }
        }
        footer {
            width: 100%;
            padding: var(--space-6) var(--space-7);
            border-top: var(--border-width-s) solid var(--color-border-neutral);

            p {
                display: inline-flex;
                gap: var(--gap-s);
                align-items: center;
                span {
                    color: var(--color-fgcolor-neutral-tertiary);
                }
            }
        }
    }
</style>
