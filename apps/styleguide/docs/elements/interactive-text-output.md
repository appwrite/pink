# Interactive Text Output

## Visible Text
```html
<div class="interactive-text-output">
    <span class="text u-break-word">visible text</span>
    
    <div class="u-flex u-cross-child-start u-gap-8">
        <button class="interactive-text-output-button is-hidden" aria-label="copy text">
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>     
    </div>
</div>
```

## Hidden Text
```html
<div class="interactive-text-output">
    <span class="text">••••••</span>
    <div class="u-flex u-cross-child-start u-gap-8">
        <button class="interactive-text-output-button" aria-label="show hidden text">
            <span class="icon-eye" aria-hidden="true"></span>
        </button>
        <button class="interactive-text-output-button" aria-label="copy text">
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>
    </div>
</div>
```

## Hidden Text - Visible state
```html
<div class="interactive-text-output">
    <span class="text u-break-word"">abcdef</span>
    <div class="u-flex u-cross-child-start u-gap-8">
        <button class="interactive-text-output-button" aria-label="show hidden text">
            <span class="icon-eye-off" aria-hidden="true"></span>
        </button>
        <button class="interactive-text-output-button" aria-label="copy text">
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>
    </div>
</div>
```

## Visible Text - Textarea
```html
<div class="interactive-text-output is-textarea">
    <span class="text u-line-height-1-5 u-break-word">13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73
c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi
13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi13g73c9ge4e2u5wi</span>
    
    <div class="u-flex u-cross-child-start u-gap-8">
        <button class="interactive-text-output-button" aria-label="copy text">
            <span class="icon-duplicate" aria-hidden="true"></span>
        </button>     
    </div>
</div>
```