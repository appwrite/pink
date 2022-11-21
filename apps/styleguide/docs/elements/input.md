Inputs enable the user to input text information.

# Text Field

Use when interactive and ready for input.

```html
<input type="text" class="input-text" placeholder="placeholder text" />
```

# Textarea Field

Use when interactive and ready for input.

```html
<textarea class="input-text" placeholder="Type here...">
```

# Success

When text been approves (in some situations)

```html
<input
  type="text"
  class="input-text is-success"
  placeholder="placeholder text"
/>
```

# Warning

When there are warning in filed (will come with helper ot other alert)

```html
<input
  type="text"
  class="input-text is-warning"
  placeholder="placeholder text"
/>
```

# Error

When there's error in filed content (will come with helper ot other alert)

```html
<input type="text" class="input-text is-error" placeholder="placeholder text" />
```

# Disabled

Use when not interactive. For example, when a user does not have permissions to edit the input.

```html
<input type="text" class="input-text" value="Appwrite" disabled />
```

# Readonly

Use when not interactive. For example, when a user does not have permissions to edit the input.

```html
<input type="text" class="input-text" value="Appwrite" readonly />
```

# Input with all the options

```html
<label class="label is-required">Common label</label>
<span class="optional">(optional)</span>
<button class="tooltip" aria-label="variables info">
  <span class="icon-info" aria-hidden="true"></span>
  <span class="tooltip-popup" role="tooltip"
    >Set variables or secret keys that will be passed as env vars to your
    function at runtime.</span
  >
</button>
<div class="input-text-wrapper">
  <input
    type="text"
    class="input-text is-warning"
    placeholder="placeholder text"
  />
</div>
<p class="helper u-warning u-margin-block-start-8">
    <span class="icon-exclamation" aria-hidden="true"></span>
    <span class="text">This is a warning</span>
</p>
```
