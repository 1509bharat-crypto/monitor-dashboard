import './FilterPanel.css'

const FilterPanel = ({ filters, setFilters, onCompareClick }) => {
  const lastUpdated = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Default filter values to check for active state
  const defaultFilters = { market: 'Netherlands', source: 'Epiphany', sample: 'Main', dateOption: 'ALL' }

  // Check if a filter is active (different from default)
  const isActive = (key) => filters[key] !== defaultFilters[key]

  return (
    <div className="filter-panel-container">
      {/* Top row: Timestamp + Compare button */}
      <div className="filter-top-row">
        <span className="last-updated">
          <span className="material-symbols-outlined">update</span>
          Updated {lastUpdated}
        </span>
        <button className="btn-compare" onClick={onCompareClick}>
          <span className="material-symbols-outlined">compare_arrows</span>
          Compare fieldworks
        </button>
      </div>

      {/* Main filters */}
      <div className="filter-panel">
        <div className="filter-row">
          <div className="filter-group">
            <div className={`filter-select-wrapper ${isActive('market') ? 'active' : ''}`}>
              <span className="material-symbols-outlined filter-icon">public</span>
              <select
                className="filter-select with-icon"
                value={filters.market}
                onChange={(e) => handleFilterChange('market', e.target.value)}
              >
                <option>Netherlands</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
              <span className="material-symbols-outlined dropdown-icon">expand_more</span>
            </div>
          </div>

          <div className="filter-group">
            <div className={`filter-select-wrapper ${isActive('source') ? 'active' : ''}`}>
              <span className="material-symbols-outlined filter-icon">database</span>
              <select
                className="filter-select with-icon"
                value={filters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
              >
                <option>Epiphany</option>
                <option>Purespectrum</option>
                <option>Lucid</option>
              </select>
              <span className="material-symbols-outlined dropdown-icon">expand_more</span>
            </div>
          </div>

          <div className="filter-group">
            <div className={`filter-select-wrapper ${isActive('sample') ? 'active' : ''}`}>
              <span className="material-symbols-outlined filter-icon">groups</span>
              <select
                className="filter-select with-icon"
                value={filters.sample}
                onChange={(e) => handleFilterChange('sample', e.target.value)}
              >
                <option>Main</option>
                <option>Client</option>
                <option>Test</option>
              </select>
              <span className="material-symbols-outlined dropdown-icon">expand_more</span>
            </div>
          </div>

          <div className="filter-group">
            <div className={`filter-select-wrapper ${isActive('dateOption') ? 'active' : ''}`}>
              <span className="material-symbols-outlined filter-icon">schedule</span>
              <select
                className="filter-select with-icon"
                value={filters.dateOption}
                onChange={(e) => handleFilterChange('dateOption', e.target.value)}
              >
                <option>ALL</option>
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Custom range</option>
              </select>
              <span className="material-symbols-outlined dropdown-icon">expand_more</span>
            </div>
          </div>

          <div className="filter-group">
            <div className={`filter-input-wrapper ${filters.dateFrom ? 'active' : ''}`}>
              <span className="material-symbols-outlined filter-icon">calendar_today</span>
              <input
                type="text"
                className="filter-input with-icon"
                placeholder="dd/mm/yy"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <div className={`filter-input-wrapper ${filters.dateTo ? 'active' : ''}`}>
              <span className="material-symbols-outlined filter-icon">calendar_today</span>
              <input
                type="text"
                className="filter-input with-icon"
                placeholder="dd/mm/yy"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>
        </div>

        <button className="btn-generate">
          <span className="material-symbols-outlined">link</span>
          Generate guest link
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
