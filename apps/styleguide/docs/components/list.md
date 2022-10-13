# List

Include: (optional) link, icon

```html
<ul class="list">
  <li class="list-item">
    <span class="icon-arrow-circle-right" aria-hidden="true"></span>
    <span class="text">Just text</span>
  </li>
  <li class="list-item">
    <span class="icon-arrow-circle-right" aria-hidden="true"></span>
    <a href="#" class="link"
      ><span class="text">Appwrite (link functional)</span></a
    >
  </li>
  <li class="list-item">
    <span class="icon-arrow-circle-right" aria-hidden="true"></span>
    <button class="link">
      <span class="text">View as JSON (button functional)</span>
    </button>
  </li>
</ul>
```

# List with checked icon

```html
<ul class="list u-margin-block-start-40">
                    <li class="list-item">
                        <span class="icon-check" aria-hidden="true"></span>
                        <span class="text">Databases for storing, query and managing your data</span>
                    </li>
                    <li class="list-item">
                        <span class="icon-check" aria-hidden="true"></span>
                        <span class="text">Authentication for user logins and management</span>
                    </li>
                    <li class="list-item">
                        <span class="icon-check" aria-hidden="true"></span>
                        <span class="text">Storage for files with built in compression and encryption</span>
                    </li>
                    <li class="list-item">
                        <span class="icon-check" aria-hidden="true"></span>
                        <span class="text">Serverless functions for extending Appwrite’s functionality</span>
                    </li>
                </ul>
```

# Numeric List
```html
<ol class="numeric-list">
    <li class="numeric-list-item">
        <span class="text">
            Select File > Swift Packages > Add Package Dependency
        </span>
    </li>
    <li class="numeric-list-item">
        <span class="text">
            Search for the Appwrite SDK with the URL 
            <a class="link" href="https://github.com/appwrite/sdk-for-apple">https://github.com/appwrite/sdk-for-apple</a>
        </span>
    </li>
    <li class="numeric-list-item">
        <span class="text">
            Add version rules
        </span>
    </li>
    <li class="numeric-list-item">
        <span class="text">
            Select next and wait for package resolution to complete
        </span>
    </li>
    <li class="numeric-list-item">
        <span class="text">
            Make sure `Appwrite` is selected to add to your target and select finish
        </span>
    </li>
</ol>
```