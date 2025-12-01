# Monitoring Dashboard

A modern monitoring dashboard interface with dark theme, built with React and Vite.

## Features

- **Sidebar Navigation**: Navigate between Sampling, Launch Links, Links, Quotas, Monitor, Data Download, and Translations
- **Filter Controls**: Filter by Market, Source, Sample, and Date range
- **Overview Statistics**: Display key metrics including In Progress, Dropouts, Terminates, and Qualified Completes
- **Metrics Display**: Show IR, Dropout rates, and LOI (average/median)
- **Dark Theme**: Modern dark UI matching the screenshot design

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   ├── Sidebar.css
│   │   ├── FilterPanel.jsx      # Filter controls
│   │   ├── FilterPanel.css
│   │   ├── OverviewTable.jsx    # Statistics overview
│   │   ├── OverviewTable.css
│   │   ├── MetricsTable.jsx     # Metrics display
│   │   └── MetricsTable.css
│   ├── App.jsx                   # Main app component
│   ├── App.css
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## Customization

### Adding New Menu Items

Edit [src/components/Sidebar.jsx](src/components/Sidebar.jsx) and add items to the `menuItems` array.

### Modifying Metrics

Update the data in [src/components/OverviewTable.jsx](src/components/OverviewTable.jsx) and [src/components/MetricsTable.jsx](src/components/MetricsTable.jsx).

### Styling

All component styles are in their respective CSS files. Main colors:
- Background: `#000` (black)
- Card background: `#0d0d0d`
- Sidebar: `#1a1a1a`
- Active state: `#4c7ce5` (blue)
- Text: `#e0e0e0`

## Next Steps

This is a foundational clone. You can now build on top of it by:
- Adding real data integration
- Implementing filter functionality
- Adding more interactive features
- Connecting to a backend API
- Adding charts and visualizations
