# Upload Box Closed

```html
<section class="upload-box">
  <header class="upload-box-header">
    <h4 class="upload-box-title">
      <span class="text">Uploading files</span>
      <span class="amount">3</span>
    </h4>
    <button class="icon-button" aria-label="toggle upload box">
      <span class="icon-cheveron-down" aria-hidden="true"></span>
    </button>
    <button class="icon-button" aria-label="close upload box">
      <span class="icon-x" aria-hidden="true"></span>
    </button>
  </header>
  <div class="upload-box-content">
    <ul class="upload-box-list">
      <li class="upload-box-item">
        <div class="upload-image u-margin-inline-end-16">
          <div
            class="progress"
            style="--progress-value:20"
            role="progressbar"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <span class="icon">%</span>
        </div>
        <label for="file1" class="file-name">hello.mp4</label>
        <button class="icon-button" aria-label="Uploading">
          <span class="icon">&</span>
        </button>
      </li>
      <li class="upload-box-item">
        <div class="upload-image u-margin-inline-end-16">
          <div
            class="progress"
            style="--progress-value:70"
            role="progressbar"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <span class="icon">%</span>
        </div>
        <label for="file1" class="file-name">hello.mp4</label>
        <button class="icon-button" aria-label="Uploading">
          <span class="icon">&</span>
        </button>
      </li>
      <li class="upload-box-item">
        <div class="upload-image is-finished u-margin-inline-end-16">
          <div
            class="progress"
            style="--progress-value:100"
            role="progressbar"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <span class="icon">%</span>
        </div>
        <label for="file1" class="file-name">hello.mp4</label>
        <button class="icon-button" aria-label="Uploading">
          <span class="icon">&</span>
        </button>
      </li>
    </ul>
  </div>
</section>
```

# Upload Box Opened

```html
<section class="upload-box">
  <header class="upload-box-header">
    <h4 class="upload-box-title">
      <span class="text">Uploading files</span>
      <span class="amount">3</span>
    </h4>
      <button class="icon-button" aria-label="toggle upload box">
          <span class="icon-cheveron-down" aria-hidden="true"></span>
      </button>
      <button class="icon-button" aria-label="close upload box">
          <span class="icon-x" aria-hidden="true"></span>
      </button>
  </header>
  <div class="upload-box-content is-open">
    <ul class="upload-box-list">
      <li class="upload-box-item">
        <div class="upload-image u-margin-inline-end-16">
          <div
            class="progress"
            style="--progress-value:20"
            role="progressbar"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <span class="text">30%</span>
        </div>
        <label for="file1" class="file-name">hello.mp4</label>
          <div class="tag is-warning">pending</div>
          <button class="icon-button" aria-label="cancel upload">
              <span class="icon-x" aria-hidden="true"></span>
          </button>
      </li>
      <li class="upload-box-item">
        <div class="upload-image u-margin-inline-end-16">
          <div
            class="progress"
            style="--progress-value:70"
            role="progressbar"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <span class="text">60%</span>
        </div>
        <label for="file1" class="file-name">hello.mp4</label>
          <div class="tag is-danger">failed</div>
        <button class="icon-button" aria-label="cancel upload">
          <span class="icon-x" aria-hidden="true"></span>
        </button>
      </li>
      <li class="upload-box-item">
        <div class="upload-image is-finished u-margin-inline-end-16">
          <div
            class="progress"
            style="--progress-value:100"
            role="progressbar"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <span class="icon-document" aria-hidden="true"></span>
        </div>
        <label for="file1" class="file-name">hello.mp4</label>
        <button class="icon-button u-success" aria-label="Uploaded">
          <span class="icon-check" aria-hidden="true"></span>
        </button>
      </li>
    </ul>
  </div>
</section>
```
