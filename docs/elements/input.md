Inputs enable the user to input text information.

# Enabled
Use when interactive and ready for input.

```html
<input type="text" class="input-text" placeholder="placeholder text">
```

# Disabled
Use when not interactive. For example, when a user does not have permissions to edit the input.

```html
<input type="text" class="input-text" value="Appwrite" disabled>
```

# Action

```html
<div class="input-text-wrapper is-with-end-button">
    <input type="text" id="jason" class="input-text" value="63yb7b2852321746d6e9" disabled>
    <button class="input-button" aria-label="Click to copy.">
        <span class="icon-docs" aria-hidden="true"></span>
    </button>
</div>
```

# Input with Label

```html
<label class="label">Common label</label>
<div class="input-text-wrapper">
    <input type="text" class="input-text" placeholder="placeholder text">
</div>
```
