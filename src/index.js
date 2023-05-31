import { ToggleCardLit } from "./card";
import { ToggleCardLitEditor } from "./editor";

customElements.define(
    "toggle-card-lit",
    ToggleCardLit
);
customElements.define(
    "toggle-card-lit-editor",
    ToggleCardLitEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "toggle-card-lit",
    name: "toggle card based on LitElement",
    description: "Turn an entity on and off",
});
