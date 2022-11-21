# Font scale

We use a font scale to determine the size of the typography. The font sizes fit well with with the 4px grid. The sizes are not directly matched with HTML tags, in order to perserve semantics.

# Headings

```html
<h1 class="heading-level-1">Heading level 1</h1>
<h2 class="heading-level-2">Heading level 2</h2>
<h3 class="heading-level-3">Heading level 3</h3>
<h4 class="heading-level-4">Heading level 4</h4>
<h5 class="heading-level-5">Heading level 5</h5>
<h6 class="heading-level-6">Heading level 6</h6>
<h6 class="heading-level-7">Heading level 7</h6>
```

# Eyebrow Headings

```html
<h4 class="eyebrow-heading-1">EYEBROW HEADING level 1</h4>
<h5 class="eyebrow-heading-2">EYEBROW HEADING level 2</h5>
<h6 class="eyebrow-heading-3">EYEBROW HEADING level 3</h6>
```

# Default text

```html
<p>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum magni eveniet
  nemo ullam perspiciatis, dolor deleniti inventore aliquid, maiores culpa
  soluta accusantium aliquam consectetur quis beatae tempore quaerat eligendi
  quia.
</p>
```

# Bold text

Can be used with <b> or .u-bold class

```html
<p>
  Lorem ipsum <b>dolor</b> sit, <span class="u-bold">amet</span> consectetur
  adipisicing elit.
</p>
```

# Small text

Can be used with <small> or .u-small class

```html
<p>
  Lorem ipsum <small style="color:blue">dolor</small> sit,
  <span class="u-small" style="color:blue">amet</span> consectetur adipisicing
  elit.
</p>
```

# Code Text

Use it with the <code> element

```html
<code>.class { font-family: arial; color: red; }</code>
```

# Disabled

used with global utility class: u-disabled

```html
<p class="u-disabled">Disabled</p>
```

# Interactive

Used for text that needs to show it’s clickable.
used with global utility class: link (on link or button only!)

```html
<a href="#" class="link"><span class="text">Interactive</span></a>
```

# Warning

Used for text in warnings
used with global utility class: u-warning

```html
<p class="u-warning">Warning</p>
```

# Error

Used for text in errors
used with global utility class: u-error

```html
<p class="u-error">Error</p>
```

# Success

Used for text in success messages
used with global utility class: u-success

```html
<p class="u-success">Success</p>
```
