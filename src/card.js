import { css, html, LitElement } from 'lit';
import styles from './card.styles';

export class ToggleCardLit extends LitElement {

    // reactive properties
    static get properties() {
        return {
            header: { type: String },
            entity: { type: String },
            name: { type: String },
            state: { type: Object },
            status: { type: String }
        };
    }

    // private property
    _hass;

    // lifecycle
    setConfig(config) {
        this.header = config.header;
        this.entity = config.entity;
        // call set hass() to immediately adjust to a changed entity
        // while editing the entity in the card editor
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass) {
        this._hass = hass;
        this.state = hass.states[this.entity];
        if (this.state) {
            this.status = this.state.state;
            let fn = this.state.attributes.friendly_name;
            this.name = fn ? fn : this.entity;
        }
    }

    // declarative part
    static styles = styles;

    render() {
        let content;
        if (!this.state) {
            content = html`
                <p class="error">
                    ${this.entity} is unavailable.
                </p>
            `;
        } else {
            content = html`
                <dl class="dl">
                    <dt class="dt">${this.name}</dt>
                    <dd class="dd" @click="${this.doToggle}">
                        <span class="toggle ${this.status}">
                            <span class="button"></span>
                        </span>
                        <span class="value">${this.status}</span>
                    </dd>
                </dl>
            `;
        }
        return html`
            <ha-card header="${this.header}">
                <div class="card-content">
                    ${content}
                </div>
            </ha-card>
        `;
    }

    // event handling

    doToggle(event) {
        this._hass.callService("input_boolean", "toggle", {
            entity_id: this.entity
        });
    }

    // card configuration
    static getConfigElement() {
        return document.createElement("toggle-card-lit-editor");
    }

    static getStubConfig() {
        return {
            entity: "input_boolean.tcl",
            header: "",
        };
    }
}
