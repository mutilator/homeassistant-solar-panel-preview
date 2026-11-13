# Solar Panel Grid Lovelace Card

A custom Home Assistant Lovelace card for displaying solar panels in an interactive grid layout with real-time production data visualization. This is especially useful for users with microinverters so you can monitor every panel individually.

## Features

- **Grid Layout**: Display multiple solar panels in a flexible grid with auto-sizing canvas
- **Drag & Drop**: Move panels freely around the canvas with smooth snapping (available in the card editor preview)
- **Snap-to-Grid**: Panels snap to a configurable grid for neat alignment
- **Live Data**: Real-time display of current production values from sensor entities
- **Power / Energy Toggle**: Switch between instantaneous power (W) and daily energy (kWh) views with a slide toggle — configure a secondary energy entity per panel
- **Dual Value Display**: Optional `show_secondary` setting shows both units per panel (primary + secondary) at the same time
- **Text Size Controls**: Configure primary value, secondary value, and unit font sizes for tighter layouts
- **Optional Name Badge**: Hide the panel name/entity suffix badge when space is limited
- **Historical Playback**: Select any date and time (minute resolution) to view a 24-hour snapshot of all panel values, with a quick "Now" action to return to current time
- **Per-Panel Rotation**: Rotate individual panels to match your physical roof layout
- **Canvas Rotation**: Rotate the entire grid to orient the installation according to compass direction
- **Background Image**: Overlay panels on a roof photo or plan for accurate positioning
- **Panel Naming**: Optional `name` property on each panel used for the label; falls back to the last 4 characters of the entity ID if unspecified
- **Color Visualization**: Background color gradient indicates production level
  - Black (0%) → Dark Blue (Hue 240°) → Light Blue (Hue 180°) at 100%
  - Automatically scales based on unit type (kWh for daily energy, W for instantaneous power)
- **Auto-Sizing Canvas**: In dashboard view the card fits tightly around your panels — no unnecessary scrollbars. In the editor preview the workspace stays large for layout building.
- **Responsive Scaling**: The card automatically scales down to fit narrow containers (e.g. mobile or sidebar columns) while keeping dragging accurate at any scale
- **Full-Width Canvas**: Automatically expands card to viewport width for maximum workspace
- **Collapsible Panel UI**: Configuration panel headers collapse/expand to manage 30+ panels efficiently
- **Card Picker**: Shows up in the Home Assistant "Add Card" dialog for easy discovery. If your array is large, consider using a full-width dashboard view for best results.
- **Configuration UI**: Drag-and-drop editor preview with schema-driven grid settings and panel-level configurations

## Preview

### Card View
<img src="https://raw.githubusercontent.com/mutilator/homeassistant-solar-panel-preview/refs/heads/main/card-preview.png" alt="Solar Panel Grid Card Preview" width="100%">

### Configuration Editor

> NOTE: While dragging only works when the dashboard is in edit mode (e.g. when the configuration dialog is open), clicking the titlebar of the dialog can still make the preview area easier to manipulate.

<img src="https://raw.githubusercontent.com/mutilator/homeassistant-solar-panel-preview/refs/heads/main/config-preview.png" alt="Configuration Editor Preview" width="100%">

## Installation

This card can be installed manually or through HACS (Home Assistant Community Store).

### 📦 Install with HACS
1. Add this repository to HACS as a **Plugin / Dashboard**.
2. Search for **Solar Panel Grid Card** in the HACS dashboard and install it.
3. Add the card to your dashboard using the UI editor or YAML (see configuration below).

### 🛠 Manual Installation
If you prefer not to use HACS, follow these steps:

#### Step 1: Build the Card

```bash
cd /path/to/homeassistant-solar-panels
npm install
npm run build
```

By default the build produces `dist/homeassistant-solar-panel-preview.js`.

#### Step 2: Copy to Home Assistant

Copy the built file and image to your Home Assistant configuration:

```bash
cp dist/homeassistant-solar-panel-preview.js /path/to/homeassistant/config/www/
```

#### Step 3: Add Resource Reference

Add the following to your Home Assistant Lovelace resources (using UI or YAML):

**UI Method:**
1. Open Home Assistant
2. Go to Settings → Dashboards → Resources
3. Click "Create Resource"
4. URL: `/local/homeassistant-solar-panel-preview.js`
5. Resource type: `JavaScript Module`

**YAML Method:**
Add to your `ui-lovelace.yaml`:
```yaml
resources:
  - url: /local/homeassistant-solar-panel-preview.js
    type: module
```

## Configuration

### Basic Configuration Example

Add the card to a dashboard using the UI editor:

1. Click "+ Create New Card"
2. Search for "Solar Panel Grid"
3. Configure your solar panel sensors



### YAML Configuration

```yaml
type: custom:solar-panel-grid-card
grid_size: 10              # Grid snap size in pixels (default: 10)
panel_width: 80            # Panel width in pixels (default: 80)
panel_height: 144          # Panel height in pixels (default: 144, 1:1.8 aspect ratio)
canvas_rotation: -30       # Rotate the entire layout (degrees, clockwise)
canvas_width: 800          # Optional fixed canvas width (px)
canvas_height: 600         # Optional fixed canvas height (px)
background_image: /local/roof-plan.png   # Optional roof photo/plan
background_opacity: 0.4   # Background image opacity (0–1)
persist_view_state: true  # Optional: remember W/kWh toggle in browser localStorage
show_secondary: false     # Optional: show both primary and secondary values on each panel
show_name: true           # Optional: show/hide panel name badge (entity suffix/custom name)
font_size_primary: 14     # Optional: primary value font size in px
font_size_secondary: 12   # Optional: secondary value font size in px
font_size_unit: 10        # Optional: unit font size in px
power_decimals: 0         # Optional: decimal places for W values
energy_decimals: 2        # Optional: decimal places for kWh/Wh values
panels:
  - entity: sensor.solar_inverter_1
    entity_energy: sensor.solar_inverter_1_energy_today  # Optional energy entity
    name: "A1"            # optional display name (defaults to last 4 of entity if omitted)
    x: 0
    y: 0
    rotation: 90           # per-panel rotation (degrees, clockwise)
    max_daily_production: 5.5  # Maximum daily production in kWh
    max_production: 400        # Maximum instantaneous power in W
  - entity: sensor.solar_inverter_2
    entity_energy: sensor.solar_inverter_2_energy_today
    # no name specified, will fall back to entity suffix
    x: 85
    y: 0
    max_daily_production: 5.5
    max_production: 400
```

### Configuration Options

#### Card-Level Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | Required | `custom:solar-panel-grid-card` |
| `grid_size` | number | 10 | Snap-to-grid size in pixels |
| `panel_width` | number | 80 | Width of each panel in pixels |
| `panel_height` | number | 144 | Height of each panel in pixels (1:1.8 aspect ratio) |
| `canvas_rotation` | number | 0 | Rotate the entire grid layout in degrees (-180 to 180) |
| `canvas_width` | number | — | Fixed canvas width in pixels. When set (with `canvas_height`), overrides auto-sizing in both editor and dashboard |
| `canvas_height` | number | — | Fixed canvas height in pixels. When set (with `canvas_width`), overrides auto-sizing in both editor and dashboard |
| `background_image` | string | — | URL to a background image (e.g. `/local/roof-plan.png`). Anchored at top-left at natural size (not stretched) |
| `background_opacity` | number | 0.4 | Opacity of the background image (0–1) |
| `persist_view_state` | boolean | true | Remembers the W/kWh toggle state in browser localStorage; set `false` to disable |
| `panels` | array | Required | List of solar panel configurations |
| `show_secondary` | boolean | false | When `true`, each panel also shows the non-active unit (W in kWh view, kWh in W view) |
| `show_name` | boolean | true | When `false`, hides the panel name/entity suffix badge |
| `font_size_primary` | number | 14 | Primary value font size in px |
| `font_size_secondary` | number | 12 | Secondary value font size in px |
| `font_size_unit` | number | 10 | Unit label font size in px |
| `power_decimals` | number | 0 | Decimal places used for power values (`W`) |
| `energy_decimals` | number | 2 | Decimal places used for energy values (`kWh` / `Wh`) |

#### Panel-Level Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | Required | Power sensor entity ID. Editor dropdown shows entities with `device_class: power` |
| `entity_energy` | string | — | Energy sensor entity ID for dual-view (kWh toggle). Editor dropdown shows entities with `device_class: energy` |
| `x` | number | 0 | Horizontal position in pixels |
| `y` | number | 0 | Vertical position in pixels |
| `rotation` | number | 0 | Panel rotation in degrees (-180 to 180, clockwise) |
| `name` | string | (last 4 of entity) | Optional panel display name; defaults to the last four characters of the entity ID |
| `max_daily_production` | number | 5.5 | Maximum daily production in kWh (used for `kWh` and `Wh` units) |
| `max_production` | number | 400 | Maximum instantaneous power in W (used for `W` units) |

## How It Works

### Data Display

Each panel displays:
- **Background Color**: Indicates production level based on current vs. maximum value
- **Panel Image**: Visual representation of the solar panel
- **Production Value**: Current production displayed in center with unit of measurement
- **Entity ID Suffix**: Last 4 characters of entity ID (or custom `name`) at bottom-right corner for quick identification
- **W / kWh Toggle**: When energy entities are configured, a slide toggle in the top-right corner switches the entire card between power and energy views
- **Dual Value Display**: When `show_secondary: true` and `entity_energy` is configured, each panel shows both units (primary and secondary)
- **Panel Name Badge**: Shows custom panel `name` (or entity suffix) when `show_name` is enabled
- **Date + Time Snapshot Controls**: A date picker and 24-hour slider at the top fetch history and render all panels at that selected timestamp

### Color Gradient

The background color changes based on the current production value:

```
Percentage = Current Value / Max Value (based on unit_of_measurement)

0%  : #000000 (Black)
25% : #1a3a50 (Dark Blue)
50% : #2060a0 (Medium Blue)
75% : #4080d0 (Light Blue)
100%: #6ca0ff (Very Light Blue)
```

### Unit of Measurement Handling

- If sensor has `unit_of_measurement: "kWh"` → Uses `max_daily_production` for color scaling
- If sensor has `unit_of_measurement: "Wh"` → Converts `max_daily_production` (kWh) to Wh, then scales
- If sensor has `unit_of_measurement: "W"` → Uses `max_production` for color scaling
- Otherwise → Defaults to `max_production`

### Positioning

Panels snap smoothly to the configured grid size while dragging. This provides clean, aligned layouts without the complexity of panel-to-panel snapping.

## Troubleshooting

### Card Not Showing

1. Check browser console for JavaScript errors (F12)
2. Verify resource path is correct: `/local/homeassistant-solar-panel-preview.js` must exist
3. Clear browser cache and reload Home Assistant

### Data Not Updating

1. Check that sensor entities exist in Home Assistant (Developer Tools → States)
2. Verify entity IDs in card configuration match exactly
3. Check sensor has valid `state` value (not `unknown` or `unavailable`)

### Incorrect Colors

1. Verify `max_daily_production` and `max_production` values are set correctly
2. Check sensor's `unit_of_measurement` attribute in Developer Tools
3. Ensure sensor values are numeric (not strings)

## Development

### Build Commands

```bash
npm run build      # Build once
npm run dev        # Build with watch mode
npm run type-check # Run TypeScript type checking
npm run lint       # Run ESLint
```

### Project Structure

```
src/
  ├── solar-panel-grid-card.ts       # Main card component
  ├── solar-panel-grid-card-editor.ts # Configuration UI
  ├── panel-image.ts                  # Embedded panel image data URI
  └── index.ts                        # Entry point
dist/
  ├── homeassistant-solar-panel-preview.js      # Built & bundled output
  └── solar-panel-frame.png                     # Solar panel image
```

## License

MIT
