import { css, html, LitElement } from 'lit';


export class ToggleCardLitEditor extends LitElement {
    static get properties() {
        return {
            // hass: { type: Object },
            config: { type: Object },
        };
    }

    setConfig(config) {
        this.config = config;
    }

    static styles = css`
            .table {
                display: table;
            }
            .row {
                display: table-row;
            }
            .cell {
                display: table-cell;
                padding: 0.5em;
            }
        `;

    render() {
        return html`
            <form class="table">
                <div class="row">
                    <label class="label cell" for="header">Header:</label>
                    <input
                        @change="${this.handleChangedEvent}"
                        class="value cell" id="header" value="${this.config.header}"></input>
                </div>
                <div class="row">
                    <label class="label cell" for="entity">Entity:</label>
                    <input
                        @change="${this.handleChangedEvent}"
                        class="value cell" id="entity" value="${this.config.entity}"></input>
                </div>
            </form>
        `;
    }

    handleChangedEvent(changedEvent) {
        // this.config is readonly, copy needed
        var newConfig = Object.assign({}, this.config);
        if (changedEvent.target.id == "header") {
            newConfig.header = changedEvent.target.value;
        } else if (changedEvent.target.id == "entity") {
            newConfig.entity = changedEvent.target.value;
        }
        const messageEvent = new CustomEvent("config-changed", {
            detail: { config: newConfig },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
}