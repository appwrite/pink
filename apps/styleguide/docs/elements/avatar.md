# Avatar

```html
<div class="avatar">aa</div>
```

# Avatar Colors

We have 5 colors.

- Grey is the default
- for the other ones you just need to add is state class: is-color-pink / is-color-blue / is-color-green / is-color-range

```html
<div class="u-flex u-gap-12">
    <div class="avatar is-color-empty"></div>
    <div class="avatar">aa</div>
    <div class="avatar is-color-orange">aa</div>
    <div class="avatar is-color-green">aa</div>
    <div class="avatar is-color-blue">aa</div>
    <div class="avatar is-color-pink">aa</div>
    <div class="avatar is-color-red">aa</div>
</div>
```

# Avatar Sizes

We have 5 sizes.

- Medium is the default size
- For the other ones you just need to add is state class: is-size-x-small / is-size-small / is-large / is-x-large

```html
<div class="u-flex u-gap-12">
  <div class="avatar is-color-pink is-size-x-small">aa</div>
  <div class="avatar is-color-pink is-size-small">aa</div>
  <div class="avatar is-color-pink is-size-medium">aa</div>
  <div class="avatar is-color-pink is-size-large">aa</div>
  <div class="avatar is-color-pink is-size-x-large">aa</div>
</div>
<br><br>
<div class="u-flex u-gap-12">
    <div class="avatar is-color-pink is-size-x-small"><span class="icon-user"  aria-hidden="true"></span></div>
    <div class="avatar is-color-pink is-size-small"><span class="icon-user"  aria-hidden="true"></span></div>
    <div class="avatar is-color-pink is-size-medium"><span class="icon-user"  aria-hidden="true"></span></div>
    <div class="avatar is-color-pink is-size-large"><span class="icon-user"  aria-hidden="true"></span></div>
    <div class="avatar is-color-pink is-size-x-large"><span class="icon-user"  aria-hidden="true"></span></div>
</div>
```

# Avatar Image

```html
<img
  class="avatar"
  src="https://secure.gravatar.com/avatar/2e445033b9a319b860dc1b5c63d0f31a?s=250&r=pg&d=mm"
  alt=""
/>
```

# Avatars Group
```html
<ul class="avatars-group">
    <li class="avatars-group-item">
        <div class="avatar is-color-blue">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-color-orange">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-color-green">aa</div>
    <li class="avatars-group-item">
        <div class="avatar">+2</div>
    </li>
</ul>
```

Avatar Group Sizes Demo

```html
<ul class="avatars-group">
    <li class="avatars-group-item">
        <div class="avatar is-size-x-small is-color-blue">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-size-x-small is-color-orange">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-size-x-small is-color-green">aa</div>
    <li class="avatars-group-item">
        <div class="avatar is-size-x-small">+2</div>
    </li>
</ul>
<br>
<ul class="avatars-group">
    <li class="avatars-group-item">
        <div class="avatar is-size-small is-color-blue">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-size-small is-color-orange">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-size-small is-color-green">aa</div>
    <li class="avatars-group-item">
        <div class="avatar is-size-small">+2</div>
    </li>
</ul>
<br>
<ul class="avatars-group">
    <li class="avatars-group-item">
        <div class="avatar is-color-blue">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-color-orange">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-color-green">aa</div>
    <li class="avatars-group-item">
        <div class="avatar">+2</div>
    </li>
</ul>
<br>
<ul class="avatars-group">
    <li class="avatars-group-item">
        <div class="avatar is-size-large is-color-blue">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-size-large is-color-orange">aa</div>
    </li>
    <li class="avatars-group-item">
        <div class="avatar is-size-large is-color-green">aa</div>
    <li class="avatars-group-item">
        <div class="avatar is-size-large">+2</div>
    </li>
</ul>

```