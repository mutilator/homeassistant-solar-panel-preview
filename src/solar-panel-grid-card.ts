import { LitElement, html, css } from 'lit';

interface SolarPanelConfig {
  entity: string;
  x: number;
  y: number;
  name?: string;              // optional display name (defaults to last 4 chars of entity_id)
  max_daily_production?: number; // kWh
  max_production?: number; // W
}

interface SolarPanelGridCardConfig {
  type: string;
  panels: SolarPanelConfig[];
  grid_size?: number; // pixels for snap-to-grid
  panel_width?: number;
  panel_height?: number;
}

// default values used throughout the card
const DEFAULT_GRID_SIZE = 10;
const DEFAULT_PANEL_WIDTH = 80;          // px, 1:1.8 aspect ratio
const DEFAULT_PANEL_HEIGHT = 144;        // px, 1:1.8 aspect ratio
const DEFAULT_CONTAINER_WIDTH = 1200;    // px workspace
const DEFAULT_CONTAINER_HEIGHT = 1200;   // px workspace

interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    unit_of_measurement?: string;
    friendly_name?: string;
    [key: string]: any;
  };
}

interface Hass {
  states: Record<string, HassEntity>;
  callService: (domain: string, service: string, data?: any) => Promise<void>;
}

// Helper function to convert HSL to RGB
function hslToRgb(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (h >= 300 && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const rr = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, '0');
  const gg = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, '0');
  const bb = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, '0');

  return `#${rr}${gg}${bb}`;
}

export class SolarPanelGridCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  hass!: Hass;
  config!: SolarPanelGridCardConfig;
  
  private panels: Map<
    string,
    { config: SolarPanelConfig; entity?: HassEntity }
  > = new Map();
  private draggedPanel: string | null = null;
  private dragOffset = { x: 0, y: 0 };
  private panelImage: string = '/local/solar-panel-frame.png?v=1';
  private containerWidth = DEFAULT_CONTAINER_WIDTH;
  private containerHeight = DEFAULT_CONTAINER_HEIGHT;
  private gridSize = DEFAULT_GRID_SIZE;
  private panelWidth = DEFAULT_PANEL_WIDTH;
  private panelHeight = DEFAULT_PANEL_HEIGHT;

  // Determine whether this card is being rendered inside the editor's
  // preview pane (i.e. the configuration dialog).  The preview wrapper
  // may provide either a `preview` attribute or the `element-preview`
  // CSS class on one of the ancestors, which can be inside a shadow root.
  private get isEditorPreview(): boolean {
    let node: any = this;
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.hasAttribute('preview') || el.classList.contains('element-preview')) {
          return true;
        }
      }
      if (node instanceof ShadowRoot) {
        node = node.host;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }


  // Calculate background color based on production
  private getProductionColor(value: number, max: number): string {
    if (!max || max === 0) return '#000000'; // black for 0%

    const percentage = Math.min(Math.max(value / max, 0), 1);

    // Hue range: 240 (dark blue) to 180 (light blue)
    // As percentage increases, we go from dark blue (high saturation, low lightness)
    // to light blue (medium saturation, high lightness)
    const hue = 240 - percentage * 60; // 240 to 180
    const saturation = 0.6 + percentage * 0.4; // 60% to 100%
    const lightness = 0.2 + percentage * 0.5; // 20% to 70%

    return hslToRgb(hue, saturation, lightness);
  }

  static getConfigElement() {
    return document.createElement('solar-panel-grid-card-editor');
  }

  static getConfigForm() {
    // Providing both for compatibility, but getConfigElement takes precedence
    return null;
  }

  static getStubConfig() {
    return {
      type: 'custom:solar-panel-grid-card',
      grid_size: DEFAULT_GRID_SIZE,
      panel_width: DEFAULT_PANEL_WIDTH,
      panel_height: DEFAULT_PANEL_HEIGHT,
      panels: [
        {
          entity: 'sensor.solar_panel_1',
          name: 'Pnl1',
          x: 0,
          y: 0,
          max_daily_production: 5.5,
          max_production: 400,
        },
      ],
    };
  }

  setConfig(config: SolarPanelGridCardConfig) {
    // Initialize with defaults if panels aren't configured
    if (!config.panels || !Array.isArray(config.panels)) {
      config.panels = [];
    }

    this.config = config;
    this.gridSize = config.grid_size || DEFAULT_GRID_SIZE;
    this.panelWidth = config.panel_width || DEFAULT_PANEL_WIDTH;
    this.panelHeight = config.panel_height || DEFAULT_PANEL_HEIGHT;

    this.panels.clear();
    config.panels.forEach((panelConfig) => {
      this.panels.set(panelConfig.entity, {
        config: panelConfig,
        entity: undefined,
      });
    });
  }

  update(changedProperties: Map<string | number | symbol, unknown>) {
    super.update(changedProperties);

    if (changedProperties.has('config')) {
      // rebuild panels map whenever config changes
      this.panels.clear();
      if (this.config?.panels) {
        this.config.panels.forEach((panelConfig) => {
          this.panels.set(panelConfig.entity, {
            config: panelConfig,
            entity: this.hass?.states[panelConfig.entity],
          });
        });
      }
    }

    if (changedProperties.has('hass') && this.hass) {
      // Update just the entity references when hass updates
      this.panels.forEach((panel, entity) => {
        panel.entity = this.hass.states[entity];
      });
    }
  }

  private getProductionValue(entity: HassEntity | undefined): number {
    if (!entity) return 0;

    const value = parseFloat(entity.state);
    return isNaN(value) ? 0 : value;
  }

  private getMaxValue(panelConfig: SolarPanelConfig, unit: string): number {
    if (unit === 'kWh' || unit === 'Wh') {
      const maxDaily = panelConfig.max_daily_production || 5.5;
      // If unit is Wh, convert max_daily_production from kWh to Wh
      return unit === 'Wh' ? maxDaily * 1000 : maxDaily;
    }
    return panelConfig.max_production || 400;
  }

  private snapToGrid(value: number): number {
    if (this.gridSize <= 0) return value;
    return Math.round(value / this.gridSize) * this.gridSize;
  }



  private onPanelMouseDown(e: MouseEvent, entityId: string) {
    // only allow dragging inside the editor preview
    if (!this.isEditorPreview) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    this.draggedPanel = entityId;

    const panel = this.panels.get(entityId);
    if (!panel) return;

    const container = this.shadowRoot?.querySelector('.solar-grid-container') as HTMLElement;
    if (!container) return;


    const containerRect = container.getBoundingClientRect();

    // Calculate offset from mouse position to panel's top-left corner
    this.dragOffset = {
      x: e.clientX - (containerRect.left + panel.config.x),
      y: e.clientY - (containerRect.top + panel.config.y),
    };

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onPanelClick(e: MouseEvent, entityId: string) {
    e.preventDefault();
    e.stopPropagation();

    // ignore event if panel is being dragged
    if (this.draggedPanel === entityId) {
      return;
    }

    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  private onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.draggedPanel) return;

    const panel = this.panels.get(this.draggedPanel);
    if (!panel) return;

    const container = this.shadowRoot?.querySelector('.solar-grid-container') as HTMLElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left - this.dragOffset.x;
    let y = e.clientY - rect.top - this.dragOffset.y;

    // Clamp to container bounds
    x = Math.max(0, Math.min(x, this.containerWidth - this.panelWidth));
    y = Math.max(0, Math.min(y, this.containerHeight - this.panelHeight));

    // Snap to grid
    x = this.snapToGrid(x);
    y = this.snapToGrid(y);

    const oldX = panel.config.x;
    const oldY = panel.config.y;

    // Update panel position by creating a new config object
    panel.config = { ...panel.config, x, y };

    this.requestUpdate();

  };

  private onMouseUp = () => {
    this.draggedPanel = null;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    // Update config with current panel positions
    const updatedPanels = Array.from(this.panels.values()).map((p) => p.config);
    const updatedConfig = {
      ...this.config,
      panels: updatedPanels,
    };

    this.config = updatedConfig;

    // Build positions map
    const positions: Record<string, { x: number; y: number }> = {};
    this.panels.forEach((panel, entityId) => {
      positions[entityId] = {
        x: panel.config.x,
        y: panel.config.y,
      };
    });

    // Dispatch a custom event to notify the editor of position changes
    window.dispatchEvent(
      new CustomEvent('solar-panel-positions-changed', {
        detail: { positions },
      })
    );

    // Dispatch config-changed event for Home Assistant to persist
    const event = new CustomEvent('config-changed', {
      detail: { config: updatedConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };


  /**
   * Get current panel positions
   * Returns a map of entity_id -> {x, y} coordinates
   */
  public getCurrentPanelPositions(): Record<string, { x: number; y: number }> {
    const positions: Record<string, { x: number; y: number }> = {};
    this.panels.forEach((panel, entityId) => {
      positions[entityId] = {
        x: panel.config.x,
        y: panel.config.y,
      };
    });
    return positions;
  }

  connectedCallback() {
    super.connectedCallback();
    // Inject CSS into document to override dashboard width constraints
    this.injectCSSOverrides();
    // Use ResizeObserver to actively enforce the width override
    this.enforceFullWidth();
    // panels map will be populated in update() when config changes
  }

  private enforceFullWidth() {
    // Use setInterval to actively enforce width on parent elements
    const enforcer = setInterval(() => {
      try {
        let parent = this.parentElement;
        let foundHuiCard = false;
        
        while (parent) {
          if (parent.tagName === 'HUI-CARD') {
            const width = parent.offsetWidth;
            const viewportWidth = window.innerWidth;
            
            // If the card is narrower than viewport, force it wider
            if (width < viewportWidth * 0.9) {
              parent.style.cssText = 'max-width: none !important; width: 100% !important; box-sizing: border-box !important;';
              // width enforcement applied
              foundHuiCard = true;
            }
            break;
          }
          parent = parent.parentElement;
        }
        
        // If we found and fixed constraints, we can stop the interval
        if (foundHuiCard) {
          setTimeout(() => clearInterval(enforcer), 500);
        }
      } catch (e) {
        console.error('[SolarPanelGridCard] Error enforcing width:', e);
      }
    }, 100);
    
    // Stop trying after 10 seconds
    setTimeout(() => clearInterval(enforcer), 10000);
  }

  private injectCSSOverrides() {
    // Check if we've already injected the styles
    if (document.getElementById('solar-panel-grid-card-overrides')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'solar-panel-grid-card-overrides';
    style.textContent = `
      /* Override the dashboard's media query constraint */
      @media (min-width: 1000px) {
        .content hui-card {
          max-width: none !important;
          width: 100% !important;
        }
      }
      
      /* Target parent containers */
      hui-card[preview] {
        max-width: none !important;
        width: 100% !important;
      }
      
      .element-preview {
        max-width: none !important;
        width: 100% !important;
      }
      
      .content {
        max-width: none !important;
        width: 100% !important;
      }
      
      /* Target the card element directly */
      solar-panel-grid-card {
        max-width: none !important;
        width: 100% !important;
        display: block !important;
      }
      
      /* Override ha-card constraints */
      solar-panel-grid-card ha-card {
        width: 100% !important;
        max-width: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Also try to directly modify the nearest hui-card element
    try {
      let parent = this.parentElement;
      while (parent) {
        if (parent.tagName === 'HUI-CARD') {
          parent.style.cssText = 'max-width: none !important; width: 100% !important;';
          // modified hui-card parent styles
          break;
        }
        parent = parent.parentElement;
      }
      
      // Also try to modify .content if found
      const contentEl = document.querySelector('.content');
      if (contentEl) {
        // TypeScript doesn’t know this is an HTMLElement
        (contentEl as HTMLElement).style.cssText = 'max-width: none !important; width: 100% !important;';
        // modified .content styles
      }
    } catch (e) {
      console.error('[SolarPanelGridCard] Error modifying parent styles:', e);
    }
    
    // CSS overrides injected
  }

  private getPanelDisplayName(entityId: string, panelConfig: SolarPanelConfig): string {
    // prefer user-specified name, fallback to last 4 chars of the entity id
    return panelConfig.name ? panelConfig.name : entityId.slice(-4);
  }

  render() {
    return html`
      <ha-card>
        <div class="card-content">
          <div class="solar-grid-container">
            ${Array.from(this.panels.entries()).map(
              ([entityId, panel]) => html`
                <div
                  class="solar-panel"
                  style="left: ${panel.config.x}px; top: ${panel.config.y}px; width: ${this.panelWidth}px; height: ${this.panelHeight}px;"
                  @click="${(e: MouseEvent) => this.onPanelClick(e, entityId)}"
                  @mousedown="${(e: MouseEvent) => this.onPanelMouseDown(e, entityId)}"
                >
                  <div
                    class="panel-background"
                    style="background-color: ${this.getProductionColor(
                      this.getProductionValue(panel.entity),
                      this.getMaxValue(
                        panel.config,
                        panel.entity?.attributes.unit_of_measurement || 'W'
                      )
                    )}"
                  ></div>
                  <img src="${this.panelImage}" alt="Solar Panel" class="panel-image" />
                  <div class="panel-overlay">
                    <div class="panel-value">
                      ${panel.entity
                        ? html`
                            <span class="value">${this.getProductionValue(panel.entity).toFixed(1)}</span>
                            <span class="unit">${panel.entity.attributes.unit_of_measurement || ''}</span>
                          `
                        : html`<span class="error">N/A</span>`}
                    </div>
                    <div class="entity-id-suffix">${this.getPanelDisplayName(entityId, panel.config)}</div>
                  </div>
                </div>
              `
            )}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      height: 100%;
      width: 100%;
    }

    .card-content {
      padding: 16px;
      overflow: auto;
      height: 900px;
    }

    .solar-grid-container {
      position: relative;
      width: 1400px;
      height: 1400px;
      background: transparent;
      border: 1px solid var(--divider-color);
      cursor: default;
      user-select: none;
    }

    /* show grab cursor when inside editor preview */
    

    .solar-panel {
      position: absolute;
      cursor: pointer;
      transition: box-shadow 0.2s;
      border-radius: 0;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      pointer-events: auto;
    }

    

    .solar-panel:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .panel-background {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
      transition: background-color 0.3s ease;
    }

    .panel-image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      z-index: 1;
      opacity: 0.9;
    }

    .panel-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    .panel-value {
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .value {
      font-size: 14px;
    }

    .unit {
      font-size: 10px;
      opacity: 0.8;
    }

    .entity-id-suffix {
      position: absolute;
      bottom: 4px;
      right: 4px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      font-size: 9px;
      padding: 2px 6px;
      border-radius: 3px;
    }

    .error {
      color: #ff6b6b;
    }
  `;
}

// Register the custom element
customElements.define('solar-panel-grid-card', SolarPanelGridCard);

declare global {
  interface HTMLElementTagNameMap {
    'solar-panel-grid-card': SolarPanelGridCard;
  }
}
