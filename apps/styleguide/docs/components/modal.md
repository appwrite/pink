# Modal

Include: button, x-button, heading and some "utilities classes"

## Dialogues
```html

<div class="modal-curtain" style="position:relative">
    <section class="modal">
        <header class="modal-header">
            <div class="avatar is-color-orange is-medium"><span class="icon-exclamation" aria-hidden="true"></span></div>
            <h4 class="modal-title heading-level-5">Modal title</h4>
            <button class="x-button" aria-label="Close modal">
                <span class="icon-x" aria-hidden="true"></span>
            </button>
        </header>
        <div class="modal-content u-small">Modal label text.</div>
        <div class="modal-footer">
            <div class="u-flex u-main-end u-gap-16">
                <button class="button is-text">
                    <span class="text">Cancel</span>
                </button>
                <button class="button is-secondary"><span class="text">Create</span></button>
            </div>
        </div>
    </section>
</div>
```

## Secondary Modal

```html

<div class="modal-curtain" style="position:relative">
    <section class="modal is-secondary">
        <header class="modal-header">
            <h4 class="modal-title body-text-1 u-cross-child-center">Modal title</h4>
            <button class="x-button" aria-label="Close modal">
                <span class="icon-x" aria-hidden="true"></span>
            </button>
        </header>
        <div class="modal-content u-small">Modal label text.</div>
        <div class="modal-footer">
            <form class="form">
                <ul class="form-list">
                    <li class="form-item">
                        <input type="text" placeholder="Label-ID" aria-label="Label ID">
                    </li>
                </ul>
            </form>
            <div class="u-flex u-main-end u-gap-12">
                <button class="button is-secondary">
                    <span class="text">Cancel</span>
                </button>
                <button class="button"><span class="text">Create</span></button>
            </div>
        </div>
    </section>
</div>
```

## Generic Form Modal
```html

<div class="modal-curtain" style="position:relative">
    <section class="modal">
        <header class="modal-header">
            <h4 class="modal-title heading-level-5">Modal title</h4>
            <button class="x-button" aria-label="Close modal">
                <span class="icon-x" aria-hidden="true"></span>
            </button>
        </header>
        <div class="modal-content">
            <p>Provide contextual feedback messages for complex modals.</p>
            <form class="form">
                <ul class="form-list">
                    <li class="form-item">
                        <label class="choice-item">
                            <input type="checkbox" class="switch">
                            <div class="choice-item-content">
                                <div class="choice-item-title">Choice selector heading</div>
                            </div>
                        </label>
                    </li>
                    <li class="form-item">
                        <label for="text1" class="label">Text Field</label>
                        <div class="input-text-wrapper">
                            <input id="text1" type="text" class="input-text" placeholder="placeholder text">
                        </div>
                    </li>
                    <li class="form-item">
                        <label for="text2" class="label">Text Field</label>
                        <div class="input-text-wrapper">
                            <input id="text2" type="text" class="input-text" placeholder="placeholder text">
                        </div>
                    </li>
                    <li class="form-item">
                        <label for="text3" class="label">Text Field</label>
                        <div class="input-text-wrapper">
                            <input id="text3" type="text" class="input-text" placeholder="placeholder text">
                        </div>
                    </li>
                    <li class="form-item">
                        <button class="tag"><span class="icon-pencil" aria-hidden="true"></span><span class="text">Object ID</span></button>
                        <section class="alert u-margin-block-start-24">
                            <div class="alert-grid">
                                <button class="x-button" aria-label="close alert box">
                                    <span class="icon-x" aria-hidden="true"></span>
                                </button>
                                <span class="icon-info" aria-hidden="true"></span>
                                <div class="content">
                                    <h6 class="title">This is a default alert</h6>
                                    <p class="message">Some description about the alert sent to the user.</p>
                                    <div class="buttons u-flex">
                                        <button class="button is-text">
                                            <span class="text">Action 1</span>
                                        </button>
                                        <button class="button is-text">
                                            <span class="text">Action 2</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </li>
                    <li class="form-item">
                        <label for="text4" class="label">Text Field</label>
                        <div class="input-text-wrapper">
                            <input id="text4" type="text" class="input-text" placeholder="placeholder text">
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        <div class="modal-footer">
            <div class="u-flex u-main-end u-gap-16">
                <button class="button is-secondary">
                    <span class="text">Cancel</span>
                </button>
                <button class="button"><span class="text">Create</span></button>
            </div>
        </div>
    </section>
</div>
```

## Modal Sizes
Can get is-small/is-big will keep small or big size according the class.

If it isn't get this class it will fit according the content.

### Small Modal
```html
<div class="modal-curtain" style="position:relative">
    <section class="modal is-small">
        <header class="modal-header">
            <h4 class="modal-title heading-level-5">Modal title</h4>
            <button class="x-button" aria-label="Close modal">
                <span class="icon-x" aria-hidden="true"></span>
            </button>
        </header>
        <div class="modal-content u-small">Modal label text.</div>
        <div class="modal-footer">
            <div class="u-flex u-main-end u-gap-16">
                <button class="button is-text">
                    <span class="text">Cancel</span>
                </button>
                <button class="button is-secondary"><span class="text">Create</span></button>
            </div>
        </div>
    </section>
</div>
```

### Big Modal
```html
<div class="modal-curtain" style="position:relative">
    <section class="modal is-big">
        <header class="modal-header">
            <h4 class="modal-title heading-level-5">Modal title</h4>
            <button class="x-button" aria-label="Close modal">
                <span class="icon-x" aria-hidden="true"></span>
            </button>
        </header>
        <div class="modal-content u-small">Modal label text.</div>
        <div class="modal-footer">
            <div class="u-flex u-main-end u-gap-16">
                <button class="button is-text">
                    <span class="text">Cancel</span>
                </button>
                <button class="button is-secondary"><span class="text">Create</span></button>
            </div>
        </div>
    </section>
</div>
```

## Modal in Modal (Inner-modal)

```html
<div class="modal-curtain" style="position:relative">
    <section class="modal is-big">
        <header class="modal-header">
            <h4 class="modal-title heading-level-5">Modal title</h4>
            <button class="x-button" aria-label="Close modal">
                <span class="icon-x" aria-hidden="true"></span>
            </button>
        </header>
        <div class="modal-content u-small">
            <p>Some content</p>
            <button class="tag">
                <span class="icon-pencil" aria-hidden="true"></span>
                <span class="text">Object ID</span>
            </button>
            
            <section class="modal is-inner-modal">
                <header class="modal-header u-flex-wrap">
                    <h4 class="modal-title body-text-1">Object ID</h4>
                    <button class="x-button" aria-label="Close modal">
                        <span class="icon-x" aria-hidden="true"></span>
                    </button>
                    <p class="u-flex-basis-100-percent u-line-height-1-5">Enter a custom object ID. Leave blank for a randomly generated one.</p>
                </header>
                <div class="modal-content">
                    <div class="form">
                        <div class="form-item">
                            <input type="text" placeholder="Label-ID" aria-label="Label-ID">
                            <div class="u-flex u-gap-4 u-margin-block-start-8 u-small">
                                <span class="icon-info u-cross-center u-margin-block-start-2 u-line-height-1 u-icon-small" aria-hidden="true"></span>
                                <span class="text u-line-height-1-5">Allowed characters: alphanumeric, hyphen, non-leading underscore, period</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            
            <p>Some content</p>
        </div>
        <div class="modal-footer">
            <div class="u-flex u-main-end u-gap-16">
                <button class="button is-text">
                    <span class="text">Cancel</span>
                </button>
                <button class="button is-secondary"><span class="text">Create</span></button>
            </div>
        </div>
    </section>
</div>
```