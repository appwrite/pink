# Table

Include: avatar, link - partials

```html
<table class="table is-vertical">
  <thead class="table-thead">
    <tr class="table-row">
        <th class="table-thead-col"><span class="eyebrow-heading-3">Filename</span></th>
        <th class="table-thead-col" style="--p-col-width:140">
        <span class="eyebrow-heading-3">Type</span>
        </th>
        <th class="table-thead-col" style="--p-col-width:100">
        <span class="eyebrow-heading-3">Size</span>
        </th>
        <th class="table-thead-col" style="--p-col-width:120">
        <span class="eyebrow-heading-3">Created</span>
        </th>`
        <th class="table-thead-col" style="--p-col-width:40">
        </th>
    </tr>
  </thead>
  <tbody class="table-tbody">
    <tr class="table-row">
        <td class="table-col is-main" data-title="Name">
            <span role="button" tabindex="0" class="link u-inline-flex u-cross-center u-gap-12">
                <span class="image">
                     <img
                          class="avatar"
                          width="32"
                          height="32"
                          src="https://secure.gravatar.com/avatar/2e445033b9a319b860dc1b5c63d0f31a?s=250&r=pg&d=mm"
                          alt=""
                    />
                </span>
                <span class="text u-break-word u-line-height-1-5">airport.jpg</span>
            </span>
        </td>
        <td class="table-col" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </td>
        <td class="table-col" data-title="Size">
        <span class="text">336.6 kB</span>
        </td>
        <td class="table-col" data-title="Created">
        <span class="text">11 Mar 2022</span>
        </td>
        <td class="table-col">
            <div class="u-flex">
                <button class="button is-text is-only-icon u-hide" aria-label="refresh">
                    <span class="icon-refresh" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon u-hide" aria-label="delete item">
                    <span class="icon-trash" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </div>
        </td>
    </tr>
    <tr class="table-row">
        <td class="table-col is-main" data-title="Name">
            <span role="button" tabindex="0" class="link u-inline-flex u-cross-center u-gap-12">
                <span class="image">
                     <img
                             class="avatar"
                             width="32"
                             height="32"
                             src="https://secure.gravatar.com/avatar/2e445033b9a319b860dc1b5c63d0f31a?s=250&r=pg&d=mm"
                             alt=""
                     />
                </span>
                <span class="text u-break-word u-line-height-1-5">Mobile illustration - dark.png</span>
            </span>
        </td>
        <td class="table-col" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </td>
        <td class="table-col" data-title="Size">
        <span class="text">336.6 kB</span>
        </td>
        <td class="table-col" data-title="Created">
        <span class="text">11 Mar 2022</span>
        </td>
        <td class="table-col">
            <div class="u-flex">
                <button class="button is-text is-only-icon u-hide" aria-label="refresh">
                    <span class="icon-refresh" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon u-hide" aria-label="delete item">
                    <span class="icon-trash" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </div>
        </td>
    </tr>
    <tr class="table-row">
        <td class="table-col is-main" data-title="Name">
            <span role="button" tabindex="0" class="link u-inline-flex u-cross-center u-gap-12">
                <span class="image">
                     <img
                             class="avatar"
                             width="32"
                             height="32"
                             src="https://secure.gravatar.com/avatar/2e445033b9a319b860dc1b5c63d0f31a?s=250&r=pg&d=mm"
                             alt=""
                     />
                </span>
                <span class="text u-break-word u-line-height-1-5">airport.jpg</span>
            </span>
        </td>
        <td class="table-col" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </td>
        <td class="table-col" data-title="Size">
        <span class="text">336.6 kB</span>
        </td>
        <td class="table-col" data-title="Created">
        <span class="text">11 Mar 2022</span>
        </td>
        <td class="table-col">
            <div class="u-flex">
                <button class="button is-text is-only-icon u-hide" aria-label="refresh">
                    <span class="icon-refresh" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon u-hide" aria-label="delete item">
                    <span class="icon-trash" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </div>
        </td>
    </tr>
  </tbody>
</table>
```

# Un-Semantic Table 

```html
<div class="table is-vertical" role="table">
  <div class="table-thead" role="rowheader">
    <div class="table-row" role="row">
        <div class="table-thead-col" role="columnheader"><span class="eyebrow-heading-3">Filename</span></div>
        <div class="table-thead-col" role="columnheader" style="--p-col-width:140">
            <span class="eyebrow-heading-3">Type</span>
        </div>
        <div class="table-thead-col" role="columnheader" style="--p-col-width:100">
            <span class="eyebrow-heading-3">Size</span>
        </div>
        <div class="table-thead-col" role="columnheader" style="--p-col-width:120">
            <span class="eyebrow-heading-3">Created</span>
        </div>
        <div class="table-thead-col" role="columnheader" style="--p-col-width:40"></div>
    </div>
  </div>
  <div class="table-tbody" role="rowgroup">
    <div class="table-row" role="row">
        <div class="table-col is-main" role="cell" data-title="Name">
        <span role="button" tabindex="0" class="link u-inline-flex u-cross-center u-gap-12">
            <span class="image">
                 <img
                      class="avatar"
                      width="32"
                      height="32"
                      src="https://secure.gravatar.com/avatar/2e445033b9a319b860dc1b5c63d0f31a?s=250&r=pg&d=mm"
                      alt=""
                />
            </span>
            <span class="text u-break-word u-line-height-1-5">airport.jpg</span>
        </span>
        </div>
        <div class="table-col" role="cell" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </div>
        <div class="table-col" role="cell" data-title="Size">
            <span class="text">336.6 kB</span>
        </div>
        <div class="table-col" role="cell" data-title="Created">
            <span class="text">11 Mar 2022</span>
        </div>
        <div class="table-col" role="cell" date-titme="Options">
            <div class="u-flex">
                <button class="button is-text is-only-icon u-hide" aria-label="refresh">
                    <span class="icon-refresh" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon u-hide" aria-label="delete item">
                    <span class="icon-trash" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </div>
    <div class="table-row" role="row">
        <div class="table-col is-main" role="cell"  data-title="Name">
            <span role="button" tabindex="0" class="link u-inline-flex u-cross-center u-gap-12">
                <span class="image">
                     <img
                             class="avatar"
                             width="32"
                             height="32"
                             src="https://secure.gravatar.com/avatar/2e445033b9a319b860dc1b5c63d0f31a?s=250&r=pg&d=mm"
                             alt=""
                     />
                </span>
                <span class="text u-break-word u-line-height-1-5">Mobile illustration - dark.png</span>
            </span>
        </div>
        <div class="table-col" role="cell"  data-title="Type">
            <div class="tag"><span class="text">image/jpeg</span></div>
        </div>
        <div class="table-col" role="cell" data-title="Size">
            <span class="text">336.6 kB</span>
        </div>
        <div class="table-col" role="cell" data-title="Created">
            <span class="text">11 Mar 2022</span>
        </div>
        <div class="table-col" role="cell" date-titme="Options">
            <div class="u-flex">
                <button class="button is-text is-only-icon u-hide" aria-label="refresh">
                    <span class="icon-refresh" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon u-hide" aria-label="delete item">
                    <span class="icon-trash" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </div>
    <div class="table-row" role="row">
        <div class="table-col is-main" role="cell" data-title="Name">
            <span role="button" tabindex="0" class="link u-inline-flex u-cross-center u-gap-12">
            <span class="image">
                 <img
                         class="avatar"
                         width="32"
                         height="32"
                         src="https://secure.gravatar.com/avatar/2e445033b9a319b860dc1b5c63d0f31a?s=250&r=pg&d=mm"
                         alt=""
                 />
            </span>
            <span class="text u-break-word u-line-height-1-5">airport.jpg</span>
        </span>
        </div>
        <div class="table-col" role="cell" data-title="Type">
            <div class="tag"><span class="text">image/jpeg</span></div>
        </div>
        <div class="table-col" role="cell" data-title="Size">
            <span class="text">336.6 kB</span>
        </div>
        <div class="table-col" role="cell" data-title="Created">
            <span class="text">11 Mar 2022</span>
        </div>
        <div class="table-col" role="cell" date-titme="Options">
            <div class="u-flex">
                <button class="button is-text is-only-icon u-hide" aria-label="refresh">
                    <span class="icon-refresh" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon u-hide" aria-label="delete item">
                    <span class="icon-trash" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </div>
  </div>
</div>
```