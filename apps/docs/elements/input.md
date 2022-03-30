Inputs enable the user to input text information.

# Text Field
Use when interactive and ready for input.

```html
<input type="text" class="input-text" placeholder="placeholder text">
```

# Textarea Field
Use when interactive and ready for input.

```html
<textarea class="input-text" placeholder="Type here...">
```

# Success
When text been approves (in some situations)

```html
<input type="text" class="input-text is-success" placeholder="placeholder text">
```
# Warning
When there are warning in filed (will come with helper ot other alert)

```html
<input type="text" class="input-text is-warning" placeholder="placeholder text">
```

# Error
When there's error in filed content (will come with helper ot other alert)

```html
<input type="text" class="input-text is-error" placeholder="placeholder text">
```

# Disabled
Use when not interactive. For example, when a user does not have permissions to edit the input.

```html
<input type="text" class="input-text" value="Appwrite" disabled>
```

# Readonly
Use when not interactive. For example, when a user does not have permissions to edit the input.

```html
<input type="text" class="input-text" value="Appwrite" readonly>
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
<button class="tooltip" aria-label="variables info">
    <span class="icon-info-circled" aria-hidden="true"></span>
    <span class="tooltip-popup" role="tooltip">Set variables or secret keys that will be passed as env vars to your function at runtime.</span>
</button>
<div class="input-text-wrapper">
    <input type="text" class="input-text" placeholder="placeholder text">
</div>
```
