# Table

Include: avatar, link - partials

Regular responsive tables for the columns we don't want in mobile the column need to get this class name "is-only-desktop"

```html
<table class="table is-selected-columns-mobile">
  <thead class="table-thead">
    <tr class="table-row">
        <th class="table-thead-col"><span class="eyebrow-heading-3">Filename</span></th>
        <th class="table-thead-col is-only-desktop" style="--p-col-width:140">
            <span class="eyebrow-heading-3">Type</span>
        </th>
        <th class="table-thead-col is-only-desktop" style="--p-col-width:100">
            <span class="eyebrow-heading-3">Size</span>
        </th>
        <th class="table-thead-col is-only-desktop" style="--p-col-width:120">
            <span class="eyebrow-heading-3">Created</span>
        </th>`
        <th class="table-thead-col" style="--p-col-width:40">
        </th>
    </tr>
  </thead>
  <tbody class="table-tbody">
    <tr class="table-row">
        <td class="table-col" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
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
            </div>
        </td>
        <td class="table-col is-only-desktop" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </td>
        <td class="table-col is-only-desktop" data-title="Size">
        <span class="text">336.6 kB</span>
        </td>
        <td class="table-col is-only-desktop" data-title="Created">
            <time class="text">11 Mar 2022</time>
        </td>
        <td class="table-col u-overflow-visible">
            <div class="u-flex">
                <button class="button is-text is-only-icon u-hide" aria-label="refresh">
                    <span class="icon-refresh" aria-hidden="true"></span>
                </button>
                <button class="button is-text is-only-icon u-hide" aria-label="delete item">
                    <span class="icon-trash" aria-hidden="true"></span>
                </button>

                <div class="drop-wrapper">
                    <button class="button is-text is-only-icon" aria-label="more options">
                        <span class="icon-dots-horizontal" aria-hidden="true"></span>
                    </button>
                    <div class="drop is-inline-end is-block-end is-no-arrow /u-hide/">
                        <section class="drop-section">
                            <ul class="drop-list">
                                <li class="drop-list-item">
                                    <button class="drop-button">
                                        <span class="text">Your Account</span>
                                        <span class="icon-plus u-margin-inline-start-auto" aria-hidden="true"></span>
                                    </button>
                                </li>
                                <li class="drop-list-item">
                                    <button class="drop-button">
                                        <span class="text">Search</span>
                                        <span class="icon-search u-margin-inline-start-auto" aria-hidden="true"></span>
                                    </button>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    <tr class="table-row">
        <td class="table-col" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
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
            </div>
        </td>
        <td class="table-col is-only-desktop" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </td>
        <td class="table-col is-only-desktop" data-title="Size">
        <span class="text">336.6 kB</span>
        </td>
        <td class="table-col is-only-desktop" data-title="Created">
            <time class="text">11 Mar 2022</time>
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
        <td class="table-col" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
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
            </div>
        </td>
        <td class="table-col is-only-desktop" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </td>
        <td class="table-col is-only-desktop" data-title="Size">
        <span class="text">336.6 kB</span>
        </td>
        <td class="table-col is-only-desktop" data-title="Created">
            <time class="text">11 Mar 2022</time>
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

# Table with Inner Scroll
```html
<div class="table-with-scroll">
    <div class="table-wrapper">
            <table class="table is-sticky-scroll">
                <thead class="table-thead">
                <tr class="table-row">
                    <th class="table-thead-col" style="--p-col-width:230">
                        <span class="eyebrow-heading-3">Document ID</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:185">
                        <span class="eyebrow-heading-3">Name</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:185">
                        <span class="eyebrow-heading-3">Year</span>
                    </th>`
                    <th class="table-thead-col" style="--p-col-width:185">
                        <span class="eyebrow-heading-3">Staers[]</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:185">
                        <span class="eyebrow-heading-3">Directions[]</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:185">
                        <span class="eyebrow-heading-3">Duration[]</span>
                    </th>
                </tr>
                </thead>
                <tbody class="table-tbody">
                <tr class="table-row">
                    <td class="table-col" data-title="Document ID">
                        <button class="tag">
                            <span class="icon-duplicate" aria-hidden="true"></span>
                            <span class="text">...y-first-collection</span>
                        </button>
                    </td>
                    <td class="table-col" data-title="Name">
                        <span class="text">Hustle</span>
                    </td>
                    <td class="table-col" data-title="Year">
                        <span class="text">2022</span>
                    </td>
                    <td class="table-col" data-title="Stars[]">
                        <span class="text">Adam Sandler</span>
                    </td>
                    <td class="table-col" data-title="Directors[]">
                        <span class="text">Jeremiah Zagar</span>
                    </td>
                    <td class="table-col" data-title="Duration[]">
                        <span class="text">1.57</span>
                    </td>
                </tr>
                <tr class="table-row">
                    <td class="table-col" data-title="Document ID">
                        <button class="tag">
                            <span class="icon-duplicate" aria-hidden="true"></span>
                            <span class="text">...y-first-collection</span>
                        </button>
                    </td>
                    <td class="table-col" data-title="Name">
                        <span class="text">Hustle</span>
                    </td>
                    <td class="table-col" data-title="Year">
                        <span class="text">2022</span>
                    </td>
                    <td class="table-col" data-title="Stars[]">
                        <span class="text">Adam Sandler</span>
                    </td>
                    <td class="table-col" data-title="Directors[]">
                        <span class="text">Jeremiah Zagar</span>
                    </td>
                    <td class="table-col" data-title="Duration[]">
                        <span class="text">1.57</span>
                    </td>
                </tr>
                <tr class="table-row">
                    <td class="table-col" data-title="Document ID">
                        <button class="tag">
                            <span class="icon-duplicate" aria-hidden="true"></span>
                            <span class="text">...y-first-collection</span>
                        </button>
                    </td>
                    <td class="table-col" data-title="Name">
                        <span class="text">Hustle</span>
                    </td>
                    <td class="table-col" data-title="Year">
                        <span class="text">2022</span>
                    </td>
                    <td class="table-col" data-title="Stars[]">
                        <span class="text">Adam Sandler</span>
                    </td>
                    <td class="table-col" data-title="Directors[]">
                        <span class="text">Jeremiah Zagar</span>
                    </td>
                    <td class="table-col" data-title="Duration[]">
                        <span class="text">1.57</span>
                    </td>
                </tr>
                </tbody>
            </table>
    </div>
</div>
```


# Un-Semantic Table 

```html
<div class="table" role="table">
  <div class="table-thead" role="rowheader">
    <div class="table-row" role="row">
        <div class="table-thead-col" role="columnheader"><span class="eyebrow-heading-3">Filename</span></div>
        <div class="table-thead-col is-only-desktop" role="columnheader" style="--p-col-width:140">
            <span class="eyebrow-heading-3">Type</span>
        </div>
        <div class="table-thead-col is-only-desktop" role="columnheader" style="--p-col-width:100">
            <span class="eyebrow-heading-3">Size</span>
        </div>
        <div class="table-thead-col is-only-desktop" role="columnheader" style="--p-col-width:120">
            <span class="eyebrow-heading-3">Created</span>
        </div>
        <div class="table-thead-col" role="columnheader" style="--p-col-width:40"></div>
    </div>
  </div>
  <div class="table-tbody" role="rowgroup">
    <a class="table-row" role="row" href="#">
        <div class="table-col" role="cell" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
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
        </div>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Type">
          <div class="tag"><span class="text">image/jpeg</span></div>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Size">
            <span class="text">336.6 kB</span>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Created">
            <time class="text">11 Mar 2022</time>
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
    </a>
    <a class="table-row" role="row" href="#">
        <div class="table-col" role="cell"  data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
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
            </div>
        </div>
        <div class="table-col is-only-desktop" role="cell"  data-title="Type">
            <div class="tag"><span class="text">image/jpeg</span></div>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Size">
            <span class="text">336.6 kB</span>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Created">
            <time class="text">11 Mar 2022</time>
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
    </a>
    <a class="table-row" role="row" href="#">
        <div class="table-col" role="cell" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
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
        </div>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Type">
            <div class="tag"><span class="text">image/jpeg</span></div>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Size">
            <span class="text">336.6 kB</span>
        </div>
        <div class="table-col is-only-desktop" role="cell" data-title="Created">
            <time class="text">11 Mar 2022</time>
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
    </a>
  </div>
</div>
```