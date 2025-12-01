import './FilterPanel.css'

const FilterPanel = ({ filters, setFilters }) => {
  return (
    <div className="filter-panel">
      <div className="filter-row">
        <div className="filter-group">
          <select className="filter-select" value={filters.market}>
            <option>Netherlands</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </div>

        <div className="filter-group">
          <select className="filter-select" value={filters.source}>
            <option>Epiphany</option>
            <option>Purespectrum</option>
            <option>Lucid</option>
          </select>
        </div>

        <div className="filter-group">
          <select className="filter-select" value={filters.sample}>
            <option>Main</option>
            <option>Client</option>
            <option>Test</option>
          </select>
        </div>

        <div className="filter-group">
          <select className="filter-select" value={filters.dateOption}>
            <option>ALL</option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Custom range</option>
          </select>
        </div>

        <div className="filter-group">
          <input
            type="text"
            className="filter-input date-input"
            placeholder="dd/mm/yy"
            value={filters.dateFrom}
          />
        </div>

        <div className="filter-group">
          <input
            type="text"
            className="filter-input date-input"
            placeholder="dd/mm/yy"
            value={filters.dateTo}
          />
        </div>

        <div className="filter-group wide">
          <button className="btn-generate">Generate guest link</button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
