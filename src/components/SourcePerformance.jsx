import './SourcePerformance.css'

const SourcePerformance = () => {
  const sources = [
    {
      name: 'PureSpectrum',
      completes: 156,
      ir: 12.4,
      loi: 24.5,
      cost: 2.50,
      status: 'good'
    },
    {
      name: 'Dynata',
      completes: 98,
      ir: 8.2,
      loi: 31.2,
      cost: 3.20,
      status: 'warning'
    },
    {
      name: 'Kantar',
      completes: 45,
      ir: 6.1,
      loi: 28.7,
      cost: 4.10,
      status: 'poor'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#66BB6A'
      case 'warning': return 'rgba(41, 100, 255, 0.6)'
      case 'poor': return '#EF5350'
      default: return '#757575'
    }
  }

  const maxCompletes = Math.max(...sources.map(s => s.completes))

  return (
    <div className="source-performance-card">
      <div className="card-header">
        <h3 className="card-title">Source Performance</h3>
        <span className="card-subtitle">Comparison by vendor</span>
      </div>

      <div className="source-table">
        <div className="table-header">
          <span className="col-source">Source</span>
          <span className="col-completes">Completes</span>
          <span className="col-ir">IR</span>
          <span className="col-loi">LOI</span>
          <span className="col-cost">CPI</span>
        </div>

        {sources.map((source) => (
          <div key={source.name} className="table-row" title={`${source.name}: ${source.completes} completes, ${source.ir}% IR, ${source.loi} min LOI`}>
            <span className="col-source">
              <span className="status-dot" style={{ backgroundColor: getStatusColor(source.status) }} />
              {source.name}
            </span>
            <span className="col-completes">
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{ width: `${(source.completes / maxCompletes) * 100}%` }}
                />
                <span className="bar-value">{source.completes}</span>
              </div>
            </span>
            <span className="col-ir">{source.ir}%</span>
            <span className="col-loi">{source.loi}m</span>
            <span className="col-cost">${source.cost.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SourcePerformance
