import './FilterPanel.css'

const FilterPanel = ({ filters, setFilters }) => {
  return (
    <div className="filter-panel">
      <div className="filter-row">
        <div className="filter-group">
          <div className="filter-select-wrapper">
            <span className="material-symbols-outlined filter-icon">public</span>
            <select className="filter-select with-icon" value={filters.market}>
              <option>Netherlands</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </select>
            <span className="material-symbols-outlined dropdown-icon">expand_more</span>
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-select-wrapper">
            <span className="material-symbols-outlined filter-icon">database</span>
            <select className="filter-select with-icon" value={filters.source}>
              <option>Epiphany</option>
              <option>Purespectrum</option>
              <option>Lucid</option>
            </select>
            <span className="material-symbols-outlined dropdown-icon">expand_more</span>
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-select-wrapper">
            <span className="material-symbols-outlined filter-icon">groups</span>
            <select className="filter-select with-icon" value={filters.sample}>
              <option>Main</option>
              <option>Client</option>
              <option>Test</option>
            </select>
            <span className="material-symbols-outlined dropdown-icon">expand_more</span>
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-select-wrapper">
            <span className="material-symbols-outlined filter-icon">schedule</span>
            <select className="filter-select with-icon" value={filters.dateOption}>
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
          <div className="filter-input-wrapper">
            <span className="material-symbols-outlined filter-icon">calendar_today</span>
            <input
              type="text"
              className="filter-input with-icon"
              placeholder="dd/mm/yy"
              value={filters.dateFrom}
            />
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-input-wrapper">
            <span className="material-symbols-outlined filter-icon">calendar_today</span>
            <input
              type="text"
              className="filter-input with-icon"
              placeholder="dd/mm/yy"
              value={filters.dateTo}
            />
          </div>
        </div>
      </div>

      <button className="btn-generate">
        <span className="material-symbols-outlined">link</span>
        Generate guest link
      </button>
    </div>
  )
}

export default FilterPanel
