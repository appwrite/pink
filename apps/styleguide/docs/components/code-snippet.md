# Code Snippets
Built using box partial, grid-code, button, tag, icons, some utility classes
```html
<section class="box u-overflow-hidden u-min-height-100 u-max-height-200">
    
    <div class="u-position-absolute u-inset-inline-end-8 u-inset-block-start-8 u-flex u-gap-8">
        <div class="tag">
            <span class="icon-code" aria-hidden="true"></span>
            <span class="text">Web SDK</span>
        </div>
        <button class="button is-small is-text is-only-icon" aria-label="copy code">
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>
    </div>
    
    <code class="grid-code">
        <div class="grid-code-line-number"></div>
        <pre>blahFunction = {</pre>

        <div class="grid-code-line-number"></div>
        <pre>    firstName: "hello"</pre>

        <div class="grid-code-line-number"></div>
        <pre>}</pre>

        <div class="grid-code-line-number"></div>
        <pre>blahFunction = {</pre>

        <div class="grid-code-line-number"></div>
        <pre>    firstName: "hello"</pre>

        <div class="grid-code-line-number"></div>
        <pre>}</pre>

        <div class="grid-code-line-number"></div>
        <pre>blahFunction = {</pre>

        <div class="grid-code-line-number"></div>
        <pre>    firstName: "hello"</pre>

        <div class="grid-code-line-number"></div>
        <pre>}</pre>
        
    </code>
    <button class="box-footer-button eyebrow-heading-3">
        <span class="text">Show more</span>
    </button>
</section>
```

## Tag Code Types
```html
<div class="u-grid u-gap-16">
    <div class="tag">
        <span class="icon-code" aria-hidden="true"></span>
        <span class="text">Web SDK</span>
    </div>

    <div class="tag">
        <span class="icon-android" aria-hidden="true"></span>
        <span class="text">Android SDK</span>
    </div>

    <div class="tag">
        <span class="icon-flutter" aria-hidden="true"></span>
        <span class="text">Flutter SDK</span>
    </div>
    
    <div class="tag">
        <span class="icon-apple" aria-hidden="true"></span>
        <span class="text">Apple SDK</span>
    </div>
</div>
```