# Upload File Box
This partial is built on other partials, like: card, avatar, button, icon and utilities classes
```html
<div class="card is-border-dashed is-no-shadow">
    <div class="u-flex u-main-center u-cross-center u-gap-32">
        <div class="avatar is-size-larg u-min-width-0">
            <span class="icon-upload" aria-hidden="true"></span>
        </div>
        <div class="u-grid u-gap-16 u-min-width-0">
            <p>Drag and drop files here to upload</p>
            <div class="u-flex u-gap-8 u-min-width-0">
                <button class="button is-secondary u-min-width-0">
                    <span class="icon-upload" aria-hidden="true"></span>
                    <span class="text">Choose File</span>
                </button>
                <div class="u-flex u-min-width-0">
                    <span class="u-trim u-min-width-0"></span>
                    <span class="u-min-width-0 u-flex-shrink-0"></span>
                </div>
            </div>
        </div>
    </div>
</div>
```

# Hover with File State
```html
<div class="card is-border-dashed is-no-shadow is-hover-with-file">
    <div class="u-flex u-main-center u-cross-center u-gap-32">
        <div class="avatar is-size-larg u-min-width-0">
            <span class="icon-upload" aria-hidden="true"></span>
        </div>
        <div class="u-grid u-gap-16 u-min-width-0">
            <p>Drag and drop files here to upload</p>
            <div class="u-flex u-gap-8 u-min-width-0">
                <button class="button is-secondary u-min-width-0">
                    <span class="icon-upload" aria-hidden="true"></span>
                    <span class="text">Choose File</span>
                </button>
                <div class="u-flex u-min-width-0">
                    <span class="u-trim u-min-width-0"></span>
                    <span class="u-min-width-0 u-flex-shrink-0"></span>
                </div>
            </div>
        </div>
    </div>
</div>
```

# After Upload File
```html
<div class="card is-border-dashed is-no-shadow">
    <div class="u-flex u-main-center u-cross-center u-gap-32">
        <div class="avatar is-size-larg u-min-width-0">
            <span class="icon-upload" aria-hidden="true"></span>
        </div>
        <div class="u-grid u-gap-16 u-min-width-0">
            <p>Drag and drop files here to upload</p>
            <div class="u-flex u-gap-8 u-min-width-0">
                <button class="button is-secondary u-min-width-0">
                    <span class="icon-upload" aria-hidden="true"></span>
                    <span class="text">Choose File</span>
                </button>     
                <div class="u-flex u-cross-center u-min-width-0">
                    <span class="u-trim u-min-width-0">abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45</span>
                    <span class="u-min-width-0 u-flex-shrink-0 u-margin-inline-end-16">.png</span>
                    <button type="button" class="x-button" aria-label="remove file" title="Remove file"><span class="icon-x" aria-hidden="true"></span></button>
                </div>
            </div>
        </div>
    </div>
</div>
```

# Bounce Animation on Upload
```html
<div class="card is-border-dashed is-no-shadow">
    <div class="u-flex u-main-center u-cross-center u-gap-32">
        <div class="avatar is-size-larg u-min-width-0 animation-bounce">
            <span class="icon-upload" aria-hidden="true"></span>
        </div>
        <div class="u-grid u-gap-16 u-min-width-0">
            <p>Drag and drop files here to upload</p>
            <div class="u-flex u-gap-8 u-min-width-0">
                <button class="button is-secondary u-min-width-0">
                    <span class="icon-upload" aria-hidden="true"></span>
                    <span class="text">Choose File</span>
                </button>
                <div class="u-flex u-cross-center u-min-width-0">
                    <span class="u-trim u-min-width-0">abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45</span>
                    <span class="u-min-width-0 u-flex-shrink-0 u-margin-inline-end-16">.png</span>
                    <button type="button" class="x-button" aria-label="remove file" title="Remove file"><span class="icon-x" aria-hidden="true"></span></button>
                </div>
            </div>
        </div>
    </div>
</div>
```