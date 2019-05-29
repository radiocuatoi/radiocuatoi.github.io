import {customElement, html, LitElement, property} from "lit-element";

@customElement('test-component')
export default class TestComponent extends LitElement {
    @property()
    heading = "test";

    render() {
        return html`
<h2>${this.heading}</h2>
<mwc-button>Test</mwc-button>
`;
    }
}
document.body.innerHTML = `
<test-component heading="Hello world"></test-component>
`;