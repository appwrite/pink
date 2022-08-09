# Input With Options Buttons
For the input to keep padding on the right side for the buttons, 
on the style element it needs to be mention via CSS variable hot many buttons there are.

Example: --amount-of-buttons:2

```html
<div class="input-text-wrapper" style="--amount-of-buttons:2">
    <input type="text" placeholder="Place Holder text">
    <div class="options-list">
        <button class="options-list-button" aria-label="show password / hide password">
            <span class="icon-eye" aria-hidden="true"></span>
        </button>
        <button class="options-list-button" aria-label="copy text">
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>
    </div>
</div>
```

Example: --amount-of-buttons:1

```html
<div class="input-text-wrapper" style="--amount-of-buttons:1">
    <input type="text" placeholder="Place Holder text">
    <div class="options-list">
        <button class="options-list-button" aria-label="show password / hide password">
            <span class="icon-eye" aria-hidden="true"></span>
        </button>
    </div>
</div>
```

# disable state of Buttons

```html
<div class="input-text-wrapper" style="--amount-of-buttons:2">
    <input type="text" placeholder="Place Holder text">
    <div class="options-list">
        <button class="options-list-button" aria-label="show password / hide password" disabled>
            <span class="icon-eye" aria-hidden="true"></span>
        </button>
        <button class="options-list-button" aria-label="copy text" disabled>
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>
    </div>
</div>
```

# Textarea behavior with auto height (according to content)

```html
<div class="input-text-wrapper" style="--amount-of-buttons:2">
    <div class="input-text" contenteditable="true" data-text="Place Holder Text"></div>
    <div class="options-list">
        <button class="options-list-button" aria-label="show password / hide password" disabled>
            <span class="icon-eye" aria-hidden="true"></span>
        </button>
        <button class="options-list-button" aria-label="copy text" disabled>
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>
    </div>
</div>
```