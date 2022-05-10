---
layout: "../layouts/mainLayout.astro"
setup: import DisplayComponent from "../components/displayComponent.svelte";
---


Buttons allow an application to communicate action and direct user intent.

# Primary

A primary color provides consistency across an application. It trains the user to look for that color when trying to find an action.

<DisplayComponent client:only>
<button class="button"><span class="text">Hello world</span></button>
</DisplayComponent>

#  Icon with text

<DisplayComponent client:only>
<div class="u-flex u-gap-10">
    <button class="button"><span class="icon-arrow-narrow-left" aria-hidden="true"></span><span class="text">Hello world</span></button>
    <button class="button"><span class="text">Hello world</span><span class="icon-arrow-narrow-right" aria-hidden="true"></span></button>   
</div>
</DisplayComponent>

## Disabled

<DisplayComponent client:only>
<button class="button" disabled><span class="text">Hello world</span></button>
</DisplayComponent>

# Secondary

For secondary actions on each page. Secondary buttons can only be used in conjunction with a primary button.

As part of a pair, the secondary button’s function is to perform the negative action of the set, such as “Cancel” or “Back”.

<DisplayComponent client:only>
<button class="button is-secondary"><span class="text">Hello world</span></button>
</DisplayComponent>

## Disabled

<DisplayComponent client:only>
<button class="button is-secondary" disabled><span class="text">Hello world</span></button>
</DisplayComponent>

# Tertiary

Tertiary button

<DisplayComponent client:only>
<button class="button is-tertiary"><span class="text">Hello world</span></button>
</DisplayComponent>

## Disabled

<DisplayComponent client:only>
<button class="button is-tertiary" disabled><span class="text">Hello world</span></button>
</DisplayComponent>

# Text Button

Text button

<DisplayComponent client:only>
<button class="button is-text"><span class="text">Hello world</span></button>
</DisplayComponent>

## Disabled

<DisplayComponent client:only>
<button class="button is-text" disabled><span class="text">Hello world</span></button>
</DisplayComponent>

## Danger

used in case of dangerous changing (TODO: missing: hover/focus state)

<DisplayComponent client:only>
<button class="button is-danger"><span class="text">Delete</span></button>
</DisplayComponent>

# Icon 
Circle button use for icon buttons

<DisplayComponent client:only>
<button class="button is-only-icon" aria-label="Add new item"><span class="icon-plus" aria-hidden="true"></span></button>
</DisplayComponent>

# Sizes

three sizes buttons

### big size

<DisplayComponent client:only>
<button class="button is-big"><span class="text">Hello world</span></button>
</DisplayComponent>

### default

<DisplayComponent client:only>
<button class="button"><span class="text">Hello world</span></button>
</DisplayComponent>

### small size

<DisplayComponent client:only>
<button class="button is-small"><span class="text">Hello world</span></button>
</DisplayComponent>