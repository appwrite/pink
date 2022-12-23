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
            <table class="table">
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

# Table with Inner Scroll - is with sticky scroll
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
            <div class="table-col" role="cell" date-title="Options">
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
            <div class="table-col" role="cell" date-title="Options">
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
            <div class="table-col" role="cell" date-title="Options">
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

# Un-Semantic Table - with Inner Scroll

```html
<div class="table is-sticky-scroll" role="table">
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
            <div class="table-col" role="cell" date-title="Options">
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
            <div class="table-col" role="cell" date-title="Options">
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
            <div class="table-col" role="cell" date-title="Options">
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

# Table without the wrapper style
```html
<section class="card">
    <table class="table is-remove-outer-styles">
        <thead class="table-thead">
        <tr class="table-row">
            <th class="table-thead-col">
                <span class="eyebrow-heading-3">Name</span>
            </th>
            <th class="table-thead-col">
                <span class="eyebrow-heading-3">Value</span>
            </th>
            <th class="table-thead-col" style="--p-col-width:40">
            </th>
        </tr>
        </thead>
        <tbody class="table-tbody">
        <tr class="table-row">
            <td class="table-col" data-title="Name">
                <span class="text">blahblahkey</span>
            </td>
            <td class="table-col u-overflow-visible" data-title="value">
                <div class="interactive-text-output">
                    <span class="text">abcdef</span>
                    <div class="u-flex u-cross-child-start u-gap-8">
                        <button class="interactive-text-output-button" aria-label="show hidden text">
                            <span class="icon-eye-off" aria-hidden="true"></span>
                        </button>
                        <button class="interactive-text-output-button" aria-label="copy text">
                            <span class="icon-duplicate" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </td>
            <td class="table-col u-overflow-visible" data-title="options">
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </td>
        </tr>
        <tr class="table-row">
            <td class="table-col" data-title="Name">
                <span class="text">blahblahkey</span>
            </td>
            <td class="table-col u-overflow-visible" data-title="value">
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
            </td>
            <td class="table-col u-overflow-visible" data-title="options">
                <button class="button is-text is-only-icon" aria-label="more options">
                    <span class="icon-dots-horizontal" aria-hidden="true"></span>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="u-flex u-margin-block-start-16">
        <button class="button is-text u-padding-inline-0" type="button">
            <span class="icon-plus" aria-hidden="true"></span>
            <span class="text">Create variable</span>
        </button>
    </div>
</section>
```

## Permission Table (Table in a Card)
```html
<section class="card">
    <div class="table-with-scroll">
        <div class="table-wrapper">
            <table class="table is-table-layout-auto is-remove-outer-styles">
                <thead class="table-thead">
                <tr class="table-row">
                    <th class="table-thead-col">
                        <span class="eyebrow-heading-3">Role</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:70">
                        <span class="eyebrow-heading-3">Create</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:70">
                        <span class="eyebrow-heading-3">Read</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:70">
                        <span class="eyebrow-heading-3">Update</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:70">
                        <span class="eyebrow-heading-3">Delete</span>
                    </th>
                    <th class="table-thead-col" style="--p-col-width:40">
                    </th>
                </tr>
                </thead>
                <tbody class="table-tbody">
                <tr class="table-row">
                    <td class="table-col" data-title="Role">
                        <div class="u-flex u-cross-center u-gap-8">
                            <div class="avatar is-size-small">
                                <span class="icon-user-group" aria-hidden="true"></span>
                            </div>
                            <div>
                                <div>Any</div>
                            </div>
                        </div>
                    </td>
                    <td class="table-col" data-title="Create">
                        <input type="checkbox" aria-label="Create">
                    </td>
                    <td class="table-col" data-title="Read">
                        <input type="checkbox" aria-label="Read">
                    </td>
                    <td class="table-col" data-title="Update">
                        <input type="checkbox" aria-label="Update">
                    </td>
                    <td class="table-col" data-title="Delete">
                        <input type="checkbox" aria-label="Delete">
                    </td>
                    <td class="table-col u-overflow-visible">
                        <div class="u-flex">
                            <button class="button is-text is-only-icon" type="button" aria-label="delete">
                                <span class="icon-x" aria-hidden="true"></span>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr class="table-row">
                    <td class="table-col" data-title="Role">
                        <div class="u-flex u-cross-center u-gap-8">
                            <div class="avatar is-size-small is-color-orange">
                                <span class="text" aria-hidden="true">ch</span>
                            </div>
                            <div class="u-line-height-1-5">
                                <div class="body-text-2">Courtney Henry</div>
                                <div class="u-x-small">62f8b5b6b442582f33ad</div>
                            </div>
                        </div>
                    </td>
                    <td class="table-col" data-title="Create">
                        <input type="checkbox" aria-label="Create">
                    </td>
                    <td class="table-col" data-title="Read">
                        <input type="checkbox" aria-label="Read">
                    </td>
                    <td class="table-col" data-title="Update">
                        <input type="checkbox" aria-label="Update">
                    </td>
                    <td class="table-col" data-title="Delete">
                        <input type="checkbox" aria-label="Delete">
                    </td>
                    <td class="table-col u-overflow-visible">
                        <div class="u-flex">
                            <button class="button is-text is-only-icon" type="button" aria-label="delete">
                                <span class="icon-x" aria-hidden="true"></span>
                            </button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="u-flex u-margin-block-start-16">
        <button class="button is-text u-padding-inline-0" type="button">
            <span class="icon-plus" aria-hidden="true"></span>
            <span class="text">Add role</span>
        </button>
    </div>
</section>
```

## Table as a List (<ul>)
This table with semantic of list, using the table class names
```html
<section class="card">
    <div class="table-with-scroll">
        <div class="table-wrapper">
            <div class="table is-remove-outer-styles">
                <ul class="table-thead">
                    <li class="table-row">
                        <div class="table-col" data-title="Name">
                            <span class="text">blahblahkey</span>
                        </div>
                        <div class="table-col u-overflow-visible" data-title="options" style="--p-col-width:40">
                            <button class="button is-text is-only-icon" aria-label="delete item">
                                <span class="icon-trash" aria-hidden="true"></span>
                            </button>
                        </div>
                    </li>
                    <li class="table-row">
                        <div class="table-col" data-title="Name">
                            <span class="text u-trim">blahb fgf fggf fg fgfg fgff gffgf gfgfgfgfglahkey</span>
                        </div>
                        <div class="table-col u-overflow-visible" data-title="options" style="--p-col-width:40">
                            <button class="button is-text is-only-icon" aria-label="delete item">
                                <span class="icon-trash" aria-hidden="true"></span>
                            </button>
                        </div>
                    </li>
                    <li class="table-row">
                        <div class="table-col" data-title="Name">
                            <span class="text">blahblahkey</span>
                        </div>
                        <div class="table-col u-overflow-visible" data-title="options" style="--p-col-width:40">
                            <button class="button is-text is-only-icon" aria-label="delete item">
                                <span class="icon-trash" aria-hidden="true"></span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="u-flex u-margin-block-start-16">
                <button class="button is-text u-padding-inline-0" type="button">
                    <span class="icon-plus" aria-hidden="true"></span>
                    <span class="text">Create variable</span>
                </button>
            </div>
        </div>
    </div>
</section>
```

## Demo with text of like break
```html
<section class="card">
    <table class="table is-remove-outer-styles">
        <thead class="table-thead">
        <tr class="table-row">
            <th class="table-thead-col">
                <span class="eyebrow-heading-3">Type</span>
            </th>
            <th class="table-thead-col">
                <span class="eyebrow-heading-3">Name</span>
            </th>
            <th class="table-thead-col">
                <span class="eyebrow-heading-3">Value</span>
            </th>
            <th class="table-thead-col" style="--p-col-width:40">
            </th>
        </tr>
        </thead>
        <tbody class="table-tbody">
        <tr class="table-row">
            <td class="table-col" data-title="Type">
                <span class="text">CNAME</span>
            </td>
            <td class="table-col u-overflow-visible" data-title="Name">
                <span class="text">appwrite</span>
            </td>
            <td class="table-col u-overflow-visible" data-title="Value">
                <span class="text u-block u-line-height-1-5 u-break-word">appwrite.mycompany.com</span>
            </td>
            <td class="table-col u-overflow-visible" data-title="options">
                <button class="button is-text is-only-icon" aria-label="copy">
                    <span class="icon-duplicate" aria-hidden="true"></span>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="u-flex u-margin-block-start-16">
        <button class="button is-text u-padding-inline-0" type="button">
            <span class="icon-plus" aria-hidden="true"></span>
            <span class="text">Create variable</span>
        </button>
    </div>
</section>
```