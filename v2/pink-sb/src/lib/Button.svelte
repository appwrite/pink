<script>
    /**
     * The type of button.
     * @type {'primary' | 'secondary' | 'text'}
     */
    export let variant = 'primary';
    /**
     * Whether the button is disabled.
     * @type {boolean}
     */
    export let disabled = false;
    /**
     * The content of the button.
     * @type {string}
     */
    export let content = '';
    /**
     * The aria-label attribute of the button.
     * @type {string}
     */
    export let ariaLabel = '';
    /**
     * The type of button.
     * @type {'button' | 'submit' | 'reset'}
     */
    export let type = 'button';
</script>

<button
    {type}
    {disabled}
    aria-label={ariaLabel || undefined}
    class:primary={variant === 'primary'}
    class:secondary={variant === 'secondary'}
    class:text={variant === 'text'}
    on:click
>
    {content}
</button>

<style lang="scss">
    @use '$scss/mixins/transitions';

    button {
        @include transitions.common;
        display: inline-flex;
        height: 40px;
        min-height: 40px;
        padding: 9px 14px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
        border-radius: 8px;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;

        &.primary {
            color: #fff;
            background: linear-gradient(94deg, #fd366e 0%, #fd366e 60.94%, #fe536d 100%);

            &:hover,
            &:active {
                box-shadow: 0px 0px 32px 0px rgba(253, 54, 110, 0.32);
            }

            &:focus {
                box-shadow: 0px 0px 0px 4px rgba(253, 54, 110, 0.24);
            }

            &:disabled {
                opacity: 0.4;
            }
        }

        &.secondary {
            color: var(--mid-neutrals-60, #6c6c71);
            border: 1px solid var(--light-neutrals-15, #d8d8db);
            background: var(--light-neutrals-5, #fafafb);

            &:hover {
                box-shadow: none;
                background: var(--light-neutrals-10, #ededf0);
            }

            &:focus {
                box-shadow:
                    0px 0px 0px 1px #00a7c3,
                    0px 0px 0px 4px rgba(0, 167, 195, 0.25);
            }

            &:active {
                background: var(--light-neutrals-15, #d8d8db);
            }

            &:disabled {
                background: var(--light-neutrals-5, #fafafb);
            }
        }

        &.text {
            color: var(--dark-neutrals-80, #414146);

            &:hover {
                color: var(--mid-neutrals-70, #56565c);
            }
            &:focus {
                background: var(--light-neutrals-5, #fafafb);
                box-shadow:
                    0px 0px 0px 1px #00a7c3,
                    0px 0px 0px 4px rgba(0, 167, 195, 0.25);
            }
            &:disabled {
                color: var(--light-neutrals-20, #c3c3c6);
            }
        }
    }
</style>
