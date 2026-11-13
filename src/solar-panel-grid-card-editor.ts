import { LitElement, css, unsafeCSS } from 'lit';
import { htmlFromTpl } from './template-utils';
import editorStyles from './templates/solar-panel-grid-card-editor.css';
import editorLoadingTpl from './templates/solar-panel-grid-card-editor-loading.tpl';
import editorRenderTpl from './templates/solar-panel-grid-card-editor-render.tpl';
import editorPanelsFormTpl from './templates/solar-panel-grid-card-editor-panels-form.tpl';
import editorNoPanelsTpl from './templates/solar-panel-grid-card-editor-no-panels.tpl';
import editorPanelItemTpl from './templates/solar-panel-grid-card-editor-panel-item.tpl';
import editorPanelContentTpl from './templates/solar-panel-grid-card-editor-panel-content.tpl';
import editorEntityOptionTpl from './templates/solar-panel-grid-card-editor-entity-option.tpl';
import editorPositionsSummaryTpl from './templates/solar-panel-grid-card-editor-positions-summary.tpl';
import editorPositionItemTpl from './templates/solar-panel-grid-card-editor-position-item.tpl';
import editorPositionsEmptyTpl from './templates/solar-panel-grid-card-editor-positions-empty.tpl';

interface SolarPanelConfig {
  entity: string;
  entity_energy?: string;
  x: number;
  y: number;
  name?: string;
  rotation?: number;
  max_daily_production?: number;
  max_production?: number;
}

interface SolarPanelGridCardConfig {
  type: string;
  panels: SolarPanelConfig[];
  grid_size?: number;
  panel_width?: number;
  panel_height?: number;
  canvas_width?: number;
  canvas_height?: number;
  canvas_rotation?: number;
  background_image?: string;
  background_opacity?: number;
  persist_view_state?: boolean;
  show_secondary?: boolean;
  show_name?: boolean;
  font_size_primary?: number;
  font_size_secondary?: number;
  font_size_unit?: number;
  power_decimals?: number;
  energy_decimals?: number;
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
      persist_view_state: true,
      show_secondary: false,
      show_name: true,
      font_size_primary: 14,
      font_size_secondary: 12,
      font_size_unit: 10,
      power_decimals: 0,
      energy_decimals: 2,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for position update events from the card (preview only)
    window.addEventListener('solar-panel-positions-changed', this._onPositionsChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('solar-panel-positions-changed', this._onPositionsChanged);
  }

  private _onPositionsChanged = (e: any) => {
    // Auto-sync when the card dispatches position change event (preview)
    const positions = e.detail?.positions;
    if (positions) {
      this._syncPositionsFromData(positions);
    }
  }


  protected render() {
    if (!this.hass || !this.config) {
      return htmlFromTpl(editorLoadingTpl);
    }

    return htmlFromTpl(
      editorRenderTpl,
      this.hass,
      this.config,
      this._getGridSchema(),
      this._computeLabel,
      this._onGridConfigChanged,
      this._renderPanelEntitiesSection(),
      this._addPanel,
      this._renderPositionsSummary()
    );
  }

  private _renderPanelEntitiesSection() {
    if (!this.config.panels || this.config.panels.length === 0) {
      return htmlFromTpl(editorNoPanelsTpl);
    }

    const panelItems = this.config.panels.map((panel: SolarPanelConfig, idx: number) =>
      this._renderPanelConfigItem(panel, idx)
    );
    return htmlFromTpl(editorPanelsFormTpl, panelItems);
  }

  private _renderPanelConfigItem(panel: SolarPanelConfig, idx: number) {
    const isExpanded = this._expandedPanels.has(idx);
    const expandedContent = isExpanded ? this._renderPanelConfigContent(panel, idx) : '';
    return htmlFromTpl(
      editorPanelItemTpl,
      `panel-config-item ${isExpanded ? 'expanded' : ''}`.trim(),
      () => this._togglePanelExpanded(idx),
      isExpanded ? '▼' : '▶',
      panel.name || panel.entity || 'Unnamed Panel',
      expandedContent
    );
  }

  private _renderPanelConfigContent(panel: SolarPanelConfig, idx: number) {
    const powerOptions = this._getPowerSensorEntities().map((entityId: string) =>
      htmlFromTpl(editorEntityOptionTpl, entityId, entityId === panel.entity, entityId)
    );
    const energyOptions = this._getEnergySensorEntities().map((entityId: string) =>
      htmlFromTpl(editorEntityOptionTpl, entityId, entityId === panel.entity_energy, entityId)
    );

    return htmlFromTpl(
      editorPanelContentTpl,
      panel.name || '',
      String(idx),
      this._onPanelPropertyChanged,
      `entity-${idx}`,
      panel.entity || '',
      this._onPanelEntityChanged,
      powerOptions,
      `entity-energy-${idx}`,
      panel.entity_energy || '',
      energyOptions,
      String(panel.rotation || 0),
      panel.rotation || 0,
      panel.max_production || 400,
      panel.max_daily_production || 5.5,
      () => this._removePanel(idx)
    );
  }

  private _renderPositionsSummary() {
    if (!this.config.panels || this.config.panels.length === 0) {
      return htmlFromTpl(editorPositionsEmptyTpl);
    }

    const positions = this.config.panels.map((panel: SolarPanelConfig) => {
      const positionText = ` @ (${panel.x}, ${panel.y})${panel.rotation ? ` ↻${panel.rotation}°` : ''}`;
      return htmlFromTpl(editorPositionItemTpl, panel.name || panel.entity, positionText);
    });

    return htmlFromTpl(editorPositionsSummaryTpl, this.config.panels.length, positions);
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
      {
        name: 'canvas_width',
        required: false,
        selector: {
          number: {
            min: 100,
            max: 4000,
            step: 10,
            unit_of_measurement: 'px',
          },
        },
      },
      {
        name: 'canvas_height',
        required: false,
        selector: {
          number: {
            min: 100,
            max: 4000,
            step: 10,
            unit_of_measurement: 'px',
          },
        },
      },
      {
        name: 'canvas_rotation',
        required: false,
        selector: {
          number: {
            min: -180,
            max: 180,
            step: 1,
            unit_of_measurement: '°',
          },
        },
      },
      {
        name: 'persist_view_state',
        required: false,
        selector: {
          boolean: {},
        },
      },
      {
        name: 'show_secondary',
        required: false,
        selector: {
          boolean: {},
        },
      },
      {
        name: 'show_name',
        required: false,
        selector: {
          boolean: {},
        },
      },
      {
        name: 'font_size_primary',
        required: false,
        selector: {
          number: {
            min: 8,
            max: 48,
            step: 1,
            unit_of_measurement: 'px',
          },
        },
      },
      {
        name: 'font_size_secondary',
        required: false,
        selector: {
          number: {
            min: 8,
            max: 48,
            step: 1,
            unit_of_measurement: 'px',
          },
        },
      },
      {
        name: 'font_size_unit',
        required: false,
        selector: {
          number: {
            min: 8,
            max: 32,
            step: 1,
            unit_of_measurement: 'px',
          },
        },
      },
      {
        name: 'power_decimals',
        required: false,
        selector: {
          number: {
            min: 0,
            max: 6,
            step: 1,
          },
        },
      },
      {
        name: 'energy_decimals',
        required: false,
        selector: {
          number: {
            min: 0,
            max: 6,
            step: 1,
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
      canvas_width: 'Canvas Width (px)',
      canvas_height: 'Canvas Height (px)',
      canvas_rotation: 'Canvas Rotation (°)',
      persist_view_state: 'Remember W / kWh Toggle State',
      show_secondary: 'Show Secondary Value (W + kWh)',
      show_name: 'Show Panel Name Badge',
      font_size_primary: 'Primary Value Font Size (px)',
      font_size_secondary: 'Secondary Value Font Size (px)',
      font_size_unit: 'Unit Font Size (px)',
      power_decimals: 'Power Decimals (W)',
      energy_decimals: 'Energy Decimals (kWh/Wh)',
    };
    return labels[schema.name] || schema.name;
  }

  private _onGridConfigChanged = (e: any) => {
    const newConfig = { ...this.config, ...e.detail.value };
    this.config = newConfig;
    
    // grid config changed

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
    
    // panel config changed

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

    // panel removed
  }

  private _onPanelEntityChanged = (e: any) => {
    const panelIndex = parseInt((e.target as HTMLElement).getAttribute('data-index') || '0', 10);
    const configValue = (e.target as HTMLElement).getAttribute('data-config-value') || 'entity';
    const newEntity = e.target.value;

    if (!this.config.panels || panelIndex === undefined) return;

    const updatedPanels = this.config.panels.map((panel: any, idx: number) => {
      if (idx === panelIndex) {
        return { ...panel, [configValue]: newEntity };
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

    // panel entity changed at index
  }

  private _onPanelPropertyChanged = (e: any) => {
    const panelIndex = parseInt((e.target as HTMLElement).getAttribute('data-index') || '0', 10);
    const configValue = (e.target as HTMLElement).getAttribute('data-config-value');
    const raw = (e.target as any).value;
    let newValue: any;
    if (configValue === 'name') {
      newValue = raw;
    } else {
      newValue = raw ? parseFloat(raw) : raw;
    }

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

    // panel property changed
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
        if (!entityId.startsWith('sensor.')) return false;
        const entity = this.hass.states[entityId];
        const deviceClass = entity?.attributes?.device_class;
        return deviceClass === 'power';
      })
      .sort();
  }

  private _getEnergySensorEntities = () => {
    if (!this.hass) return [];
    
    return Object.keys(this.hass.states)
      .filter((entityId: string) => {
        if (!entityId.startsWith('sensor.')) return false;
        const entity = this.hass.states[entityId];
        const deviceClass = entity?.attributes?.device_class;
        return deviceClass === 'energy';
      })
      .sort();
  }

  private _addPanel = () => {
    const newPanel = {
      entity: 'sensor.',
      entity_energy: '',
      name: '',
      x: 0,
      y: 0,
      rotation: 0,
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

    // panel added (debug removed)
  }

  static styles = css`${unsafeCSS(editorStyles)}`;
}

// Register the custom element
customElements.define('solar-panel-grid-card-editor', SolarPanelGridCardEditor);

declare global {
  interface HTMLElementTagNameMap {
    'solar-panel-grid-card-editor': SolarPanelGridCardEditor;
  }
}
