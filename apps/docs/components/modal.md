# Modal
Include: button, x-button and some "utilities classes"
```html
<div class="modal-curtain" style="position:relative">
    <section class="modal">
        <header class="modal-header">
           <h4 class="modal-title">Modal title</h4>
            <button class="x-button" aria-label="Close modal">
                <span class="icon-cancel" aria-hidden="true"></span>
            </button>
        </header>
        <div class="modal-content">
            CONTENT HERE
        </div>
        <div class="modal-footer">
            <div class="u-flex u-gap-10">
                <button class="button"><span class="text">Create</span></button>
                <button class="button is-secondary"><span class="text">Cancel</span></button>              
            </div>
        </div>
    </section>  
</div>
```