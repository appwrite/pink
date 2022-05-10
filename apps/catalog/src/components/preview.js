import { html, css, LitElement } from "lit";

export class preview extends LitElement {
  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = "Somebody";
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector("slot");
    console.log("test");
    console.log(slot);
    return slot.assignedElements({ flatten: true });
  }

  render() {
    return html` <div class="preview">${this.name}</div>`;
  }
}
customElements.define("html-preview", preview);
