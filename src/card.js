import { html, LitElement } from 'lit';
import styles from './card.styles';

export class ToggleCardLit extends LitElement {

    // private property
    _hass;

    // internal reactive states
    static get properties() {
        return {
            _header: { state: true },
            _entity: { state: true },
            _name: { state: true },
            _state: { state: true },
            _status: { state: true }
        };
    }

    // lifecycle interface
    setConfig(config) {
        this._header = config.header;
        this._entity = config.entity;
        // call set hass() to immediately adjust to a changed entity
        // while editing the entity in the card editor
        if (this._hass) {
            this.hass = this._hass
        }
    }

    set hass(hass) {
        this._hass = hass;
        this._state = hass.states[this._entity];
        if (this._state) {
            this._status = this._state.state;
            let fn = this._state.attributes.friendly_name;
            this._name = fn ? fn : this._entity;
        }
    }

    // declarative part
    static styles = styles;

    render() {
        console.log("RENDER");
        let content;
        if (!this._state) {
            content = html`
                <p class="error">
                    ${this._entity} is unavailable.
                </p>
            `;
        } else {
            content = html`
                <dl class="dl">
                    <dt class="dt">${this._name}</dt>
                    <dd class="dd" @click="${this.doToggle}">
                        <span class="toggle ${this._status}">
                            <span class="button"></span>
                        </span>
                        <span class="value">${this._status}</span>
                    </dd>
                </dl>
            `;
        }
        return html`
            <ha-card header="${this._header}">
                <div class="card-content">
                    ${content}
                </div>
            </ha-card>
        `;
    }

    // event handling
    doToggle(event) {
        this._hass.callService("input_boolean", "toggle", {
            entity_id: this._entity
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
