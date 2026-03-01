import { LitElement, html, css } from 'lit';

interface SolarPanelConfig {
  entity: string;
  x: number;
  y: number;
  max_daily_production?: number;
  max_production?: number;
}

interface SolarPanelGridCardConfig {
  type: string;
  panels: SolarPanelConfig[];
  grid_size?: number;
  panel_width?: number;
  panel_height?: number;
}

/**
 * Custom editor component for Solar Panel Grid Card
 * Provides schema-driven UI for configuration and handles position updates from card preview
 */
export class SolarPanelGridCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  hass: any;
  config!: SolarPanelGridCardConfig;
  private _expandedPanels: Set<number> = new Set();

  setConfig(config: SolarPanelGridCardConfig) {
    this.config = config || {
      type: 'custom:solar-panel-grid-card',
      panels: [],
      grid_size: 10,
      panel_width: 80,
      panel_height: 144,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for position update events from the card
    window.addEventListener('solar-panel-positions-changed', this._onPositionsChanged);
    console.log('[SolarPanelGridCardEditor] Listening for position updates from card');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('solar-panel-positions-changed', this._onPositionsChanged);
    console.log('[SolarPanelGridCardEditor] Stopped listening for position updates');
  }

  private _onPositionsChanged = (e: any) => {
    // Auto-sync when the card dispatches position change event
    const positions = e.detail?.positions;
    if (positions) {
      console.log('[SolarPanelGridCardEditor] Detected position update from card, auto-syncing...', positions);
      this._syncPositionsFromData(positions);
    }
  }

  protected render() {
    if (!this.hass || !this.config) {
      return html`<p>Loading...</p>`;
    }

    return html`
      <div class="card-config">
        <h2>Grid Settings</h2>
        <ha-form
          .hass="${this.hass}"
          .data="${this.config}"
          .schema="${this._getGridSchema()}"
          .computeLabel="${this._computeLabel}"
          @value-changed="${this._onGridConfigChanged}"
        ></ha-form>
        
        <h2>Panel Entities</h2>
        <div class="panels-config">
          <p>Configure sensor entities for each panel:</p>
          ${this.config.panels && this.config.panels.length > 0
            ? html`
                <div class="panels-form">
                  ${this.config.panels.map((panel: any, idx: number) => {
                    const isExpanded = this._expandedPanels.has(idx);
                    return html`
                      <div class="panel-config-item ${isExpanded ? 'expanded' : ''}">
                        <div class="panel-header" @click="${() => this._togglePanelExpanded(idx)}">
                          <div class="panel-header-content">
                            <span class="panel-toggle-icon">${isExpanded ? '▼' : '▶'}</span>
                            <span class="panel-entity-name">${panel.entity || 'Unnamed Panel'}</span>
                          </div>
                        </div>
                        ${isExpanded ? html`
                          <div class="panel-content">
                            <div class="config-row">
                              <label for="entity-${idx}">Entity:</label>
                              <select
                                id="entity-${idx}"
                                .value="${panel.entity || ''}"
                                data-config-value="entity"
                                data-index="${idx}"
                                @change="${this._onPanelEntityChanged}"
                                class="entity-select"
                              >
                                <option value="">Select a sensor...</option>
                                ${this._getPowerSensorEntities().map((entityId: string) =>
                                  html`<option value="${entityId}">${entityId}</option>`
                                )}
                              </select>
                            </div>
                            <div class="config-row">
                              <label>Max Production (W):</label>
                              <ha-textfield
                                type="number"
                                .value="${panel.max_production || 400}"
                                data-config-value="max_production"
                                data-index="${idx}"
                                @input="${this._onPanelPropertyChanged}"
                              ></ha-textfield>
                            </div>
                            <div class="config-row">
                              <label>Max Daily Production (kWh):</label>
                              <ha-textfield
                                type="number"
                                .value="${panel.max_daily_production || 5.5}"
                                data-config-value="max_daily_production"
                                data-index="${idx}"
                                @input="${this._onPanelPropertyChanged}"
                              ></ha-textfield>
                            </div>
                            <div class="config-row">
                              <ha-button @click="${() => this._removePanel(idx)}" class="delete-btn">
                                Delete Panel
                              </ha-button>
                            </div>
                          </div>
                        ` : ''}
                      </div>
                    `;
                  })}
                </div>
              `
            : html`<p class="no-panels">No panels configured. Edit the YAML to add panels.</p>`}
        </div>

        <h2>Add Panel</h2>
        <div class="panels-config">
          <ha-button @click="${this._addPanel}">Add Panel</ha-button>
        </div>

        <h2>Panel Positions</h2>
        <div class="panels-info">
          <p>Drag panels in the card preview - positions update automatically!</p>
          <div class="panels-list">
            <p><strong>Current panels (${this.config.panels?.length || 0}):</strong></p>
            ${this.config.panels && this.config.panels.length > 0
              ? this.config.panels.map((panel: any) => html`
                  <div class="panel-item">
                    <span>${panel.entity}</span>
                    <span class="position"> @ (${panel.x}, ${panel.y})</span>
                  </div>
                `)
              : html`<p class="no-panels">No panels configured</p>`}
          </div>
          <p class="yaml-note">Positions sync automatically as you drag in the preview!</p>
        </div>
      </div>
    `;
  }

  private _getGridSchema() {
    return [
      {
        name: 'grid_size',
        required: false,
        selector: {
          number: {
            min: 1,
            max: 50,
            step: 1,
            unit_of_measurement: 'px',
          },
        },
      },
      {
        name: 'panel_width',
        required: false,
        selector: {
          number: {
            min: 50,
            max: 300,
            step: 1,
            unit_of_measurement: 'px',
          },
        },
      },
      {
        name: 'panel_height',
        required: false,
        selector: {
          number: {
            min: 50,
            max: 300,
            step: 1,
            unit_of_measurement: 'px',
          },
        },
      },
    ];
  }

  private _getPanelSchema() {
    return [];
  }

  private _computeLabel = (schema: any) => {
    const labels: Record<string, string> = {
      grid_size: 'Grid Size (px)',
      panel_width: 'Panel Width (px)',
      panel_height: 'Panel Height (px)',
    };
    return labels[schema.name] || schema.name;
  }

  private _onGridConfigChanged = (e: any) => {
    const newConfig = { ...this.config, ...e.detail.value };
    this.config = newConfig;
    
    console.log('[SolarPanelGridCardEditor] Grid config changed:', newConfig);

    // Fire config-changed event that Home Assistant listens for
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onPanelConfigChanged = (e: any) => {
    const newConfig = { ...this.config, ...e.detail.value };
    this.config = newConfig;
    
    console.log('[SolarPanelGridCardEditor] Panel config changed:', newConfig);

    // Fire config-changed event that Home Assistant listens for
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _syncPositionsFromData = (positionsData: Record<string, { x: number; y: number }>) => {
    try {
      console.log('[SolarPanelGridCardEditor] Syncing positions from data:', positionsData);

      // Update config with new positions
      const updatedPanels = this.config.panels?.map((panel: any) => {
        const newPos = positionsData[panel.entity];
        return {
          ...panel,
          x: newPos?.x ?? panel.x,
          y: newPos?.y ?? panel.y,
        };
      }) || [];

      const newConfig = { ...this.config, panels: updatedPanels };
      this.config = newConfig;

      // Fire config-changed event to persist to dashboard
      this.dispatchEvent(
        new CustomEvent('config-changed', {
          detail: { config: newConfig },
          bubbles: true,
          composed: true,
        })
      );

      console.log('[SolarPanelGridCardEditor] Positions synced and saved:', newConfig);
    } catch (err) {
      console.error('[SolarPanelGridCardEditor] Error syncing positions:', err);
    }
  }

  private _removePanel = (index: number) => {
    if (!this.config.panels) return;
    
    const updatedPanels = this.config.panels.filter((_: any, i: number) => i !== index);
    const newConfig = { ...this.config, panels: updatedPanels };
    this.config = newConfig;

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );

    console.log('[SolarPanelGridCardEditor] Panel removed:', newConfig);
  }

  private _onPanelEntityChanged = (e: any) => {
    const panelIndex = parseInt((e.target as HTMLElement).getAttribute('data-index') || '0', 10);
    const newEntity = e.target.value;

    if (!this.config.panels || panelIndex === undefined) return;

    const updatedPanels = this.config.panels.map((panel: any, idx: number) => {
      if (idx === panelIndex) {
        return { ...panel, entity: newEntity };
      }
      return panel;
    });

    const newConfig = { ...this.config, panels: updatedPanels };
    this.config = newConfig;

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );

    console.log('[SolarPanelGridCardEditor] Panel entity changed at index', panelIndex, 'to', newEntity);
  }

  private _onPanelPropertyChanged = (e: any) => {
    const panelIndex = parseInt((e.target as HTMLElement).getAttribute('data-index') || '0', 10);
    const configValue = (e.target as HTMLElement).getAttribute('data-config-value');
    const newValue = e.target.value ? parseFloat(e.target.value) : e.target.value;

    if (!this.config.panels || panelIndex === undefined || !configValue) return;

    const updatedPanels = this.config.panels.map((panel: any, idx: number) => {
      if (idx === panelIndex) {
        return { ...panel, [configValue]: newValue };
      }
      return panel;
    });

    const newConfig = { ...this.config, panels: updatedPanels };
    this.config = newConfig;

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );

    console.log('[SolarPanelGridCardEditor] Panel property changed:', configValue, '=', newValue);
  }

  private _togglePanelExpanded = (index: number) => {
    if (this._expandedPanels.has(index)) {
      this._expandedPanels.delete(index);
    } else {
      this._expandedPanels.add(index);
    }
    this.requestUpdate();
  }

  private _getPowerSensorEntities = () => {
    if (!this.hass) return [];
    
    return Object.keys(this.hass.states)
      .filter((entityId: string) => {
        // Only include sensor entities
        if (!entityId.startsWith('sensor.')) return false;
        
        const entity = this.hass.states[entityId];
        // Check if device_class is 'power' or 'energy'
        const deviceClass = entity?.attributes?.device_class;
        return deviceClass === 'power' || deviceClass === 'energy';
      })
      .sort();
  }

  private _addPanel = () => {
    const newPanel = {
      entity: 'sensor.',
      x: 0,
      y: 0,
      max_production: 400,
      max_daily_production: 5.5,
    };

    const updatedPanels = [...(this.config.panels || []), newPanel];
    const newConfig = { ...this.config, panels: updatedPanels };
    this.config = newConfig;

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );

    console.log('[SolarPanelGridCardEditor] Panel added, total:', updatedPanels.length);
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .card-config {
        padding: 16px;
      }
      h2 {
        margin: 16px 0 8px 0;
        font-size: 16px;
        font-weight: 500;
      }
      .panels-info {
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      }
      .panels-info p {
        margin: 8px 0;
        font-size: 14px;
      }
      .panels-config {
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
        margin-top: 8px;
      }
      .panels-config p {
        margin: 8px 0;
        font-size: 13px;
      }
      .panels-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 12px;
      }
      .panel-config-item {
        background: var(--primary-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        overflow: hidden;
      }
      .panel-header {
        padding: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-left: 3px solid var(--primary-color);
        user-select: none;
        transition: background-color 0.2s;
      }
      .panel-header:hover {
        background-color: var(--secondary-background-color);
      }
      .panel-header-content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }
      .panel-toggle-icon {
        font-size: 14px;
        width: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
      }
      .panel-entity-name {
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .panel-content {
        padding: 12px;
        border-top: 1px solid var(--divider-color);
        background-color: var(--secondary-background-color);
      }
      .config-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 8px 0;
      }
      .config-row label {
        min-width: 150px;
        font-size: 13px;
        font-weight: 500;
      }
      .config-row ha-entity-picker {
        flex: 1;
      }
      .config-row ha-textfield {
        flex: 1;
        max-width: 150px;
      }
      .entity-select {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background-color: var(--primary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        font-family: inherit;
        cursor: pointer;
      }
      .entity-select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);
      }
      .entity-select option {
        background-color: var(--secondary-background-color);
        color: var(--primary-text-color);
      }
      .delete-btn {
        margin-top: 8px;
      }
      ha-button {
        display: block;
        margin: 12px 0;
      }
      .yaml-note {
        margin-top: 12px;
        font-size: 12px;
        font-style: italic;
        color: var(--secondary-text-color);
      }
      .panels-list {
        margin-top: 12px;
        padding: 8px 0;
      }
      .panels-list > p {
        margin: 8px 0;
        font-size: 13px;
      }
      .panel-item {
        padding: 8px 8px;
        margin: 4px 0;
        font-size: 12px;
        background: var(--primary-background-color);
        border-left: 2px solid var(--primary-color);
        border-radius: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .position {
        color: var(--secondary-text-color);
        font-size: 11px;
        margin-left: 8px;
      }
      .no-panels {
        font-style: italic;
        color: var(--secondary-text-color);
      }
    `;
  }
}

// Register the custom element
customElements.define('solar-panel-grid-card-editor', SolarPanelGridCardEditor);

declare global {
  interface HTMLElementTagNameMap {
    'solar-panel-grid-card-editor': SolarPanelGridCardEditor;
  }
}
