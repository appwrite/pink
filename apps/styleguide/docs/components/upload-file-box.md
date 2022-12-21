# Upload File Box
This partial is built on other partials, like: card, avatar, button, icon and utilities classes
```html
<div class="box is-border-dashed is-no-shadow">
    <div class="upload-file-box">
        <div class="upload-file-box-image">
            <span class="icon-upload" aria-hidden="true"></span>
        </div>
        <div class="u-min-width-0">
                <div class="">
                    <h5 class="upload-file-box-title heading-level-7 u-inline">Drag and drop files here to upload</h5>
                    <button class="tooltip u-margin-inline-start-4" aria-label="variables info">
                        <span class="icon-info" aria-hidden="true"></span>
                        <span class="tooltip-popup" role="tooltip">
                              Set variables or secret keys that will be passed as env vars to your function at runtime.
                        </span>
                    </button>
                </div>
                <p class="upload-file-box-info body-text-2 u-normal">Max file size: 10MB</p>
        </div>
        
        <ul class="upload-file-box-list u-min-width-0">
            <li class="u-flex u-cross-center u-min-width-0">
                <span class="icon-document" aria-hidden="true"></span>
                <span class="upload-file-box-name u-trim u-min-width-0">abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45</span>
                <span class="upload-file-box-name u-min-width-0 u-flex-shrink-0">.png</span>
                <span class="upload-file-box-size u-margin-inline-start-4 u-margin-inline-end-16">4MB</span>
                <button type="button" class="x-button u-margin-inline-start-16" aria-label="remove file" title="Remove file"><span class="icon-x" aria-hidden="true"></span></button>
            </li>
        </ul>
    </div>
</div>
<p class="helper u-error u-margin-block-start-8">
    <span class="icon-exclamation-circle" aria-hidden="true"></span>
    <span class="text">This is an error</span>
</p>
```

# Hover with File State
```html
<div class="box is-border-dashed is-hover-with-file">
    <div class="upload-file-box">
        <div class="upload-file-box-image">
            <span class="icon-upload" aria-hidden="true"></span>
        </div>
        <div class="u-min-width-0">
            <div class="">
                <h5 class="upload-file-box-title heading-level-7 u-inline">Drag and drop files here to upload</h5>
                <button class="tooltip u-margin-inline-start-4" aria-label="variables info">
                    <span class="icon-info" aria-hidden="true"></span>
                    <span class="tooltip-popup" role="tooltip">
                              Set variables or secret keys that will be passed as env vars to your function at runtime.
                        </span>
                </button>
            </div>
            <p class="upload-file-box-info body-text-2 u-normal">Max file size: 10MB</p>
        </div>

        <ul class="upload-file-box-list u-min-width-0">
            <li class="u-flex u-cross-center u-min-width-0">
                <span class="icon-document is-no-mobile" aria-hidden="true"></span>
                <span class="upload-file-box-name u-trim u-min-width-0">abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45</span>
                <span class="upload-file-box-name u-min-width-0 u-flex-shrink-0">.png</span>
                <span class="upload-file-box-size u-margin-inline-start-4 u-margin-inline-end-16">4MB</span>
                <button type="button" class="x-button u-margin-inline-start-16" aria-label="remove file" title="Remove file"><span class="icon-x" aria-hidden="true"></span></button>
            </li>
        </ul>
    </div>
</div>
```

# Bounce Animation on Upload
```html
<div class="box is-border-dashed is-no-shadow">
    <div class="upload-file-box">
        <div class="upload-file-box-image animation-bounce">
            <span class="icon-upload" aria-hidden="true"></span>
        </div>
        <div class="u-min-width-0">
            <div class="">
                <h5 class="upload-file-box-title heading-level-7 u-inline">Drag and drop files here to upload</h5>
                <button class="tooltip u-margin-inline-start-4" aria-label="variables info">
                    <span class="icon-info" aria-hidden="true"></span>
                    <span class="tooltip-popup" role="tooltip">
                              Set variables or secret keys that will be passed as env vars to your function at runtime.
                        </span>
                </button>
            </div>
            <p class="upload-file-box-info body-text-2 u-normal">Max file size: 10 MB</p>
        </div>

        <ul class="upload-file-box-list u-min-width-0">
            <li class="u-flex u-cross-center u-min-width-0">
                <span class="icon-document" aria-hidden="true"></span>
                <span class="upload-file-box-name u-trim u-min-width-0">abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45abcdefg123xyz45</span>
                <span class="upload-file-box-name u-min-width-0 u-flex-shrink-0">.png</span>
                <span class="upload-file-box-size u-margin-inline-start-4 u-margin-inline-end-16">4MB</span>
                <button type="button" class="x-button u-margin-inline-start-16" aria-label="remove file" title="Remove file"><span class="icon-x" aria-hidden="true"></span></button>
            </li>
        </ul>
    </div>
</div>
```