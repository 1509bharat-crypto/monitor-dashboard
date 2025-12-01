import { useData } from '../contexts/DataContext'
import './CompletesDistribution.css'

const CompletesDistribution = () => {
  const { completesDistribution } = useData()

  if (!completesDistribution || completesDistribution.length === 0) {
    return null
  }

  // Find the maximum value for scaling (include target for proper scaling)
  const maxValue = Math.max(...completesDistribution.map(day =>
    Math.max(day.PureSpectrum + day.Dynata + day.Kantar, day.Target)
  ))

  return (
    <div className="completes-distribution-section">
      <div className="section-header">
        <h2 className="section-title">Completes Distribution</h2>
      </div>

      <div className="chart-container">
        <div className="stacked-bar-chart">
          {completesDistribution.map((day, index) => {
            const total = day.PureSpectrum + day.Dynata + day.Kantar
            const pureSpectrumPercent = (day.PureSpectrum / total) * 100
            const dynataPercent = (day.Dynata / total) * 100
            const kantarPercent = (day.Kantar / total) * 100

            return (
              <div key={index} className="bar-column">
                <div className="bar-wrapper">
                  {/* Target background bar */}
                  {day.Target > 0 && (
                    <div
                      className="target-background"
                      style={{ height: `${(day.Target / maxValue) * 100}%` }}
                      title={`Target: ${day.Target}`}
                    >
                      <div className="target-icon">⊙</div>
                    </div>
                  )}

                  {/* Actual completes stacked bar */}
                  <div className="bar-stack" style={{ height: `${(total / maxValue) * 100}%` }}>
                    {day.PureSpectrum > 0 && (
                      <div
                        className="bar-segment pure-spectrum"
                        style={{ height: `${pureSpectrumPercent}%` }}
                        title={`PureSpectrum: ${day.PureSpectrum}`}
                      >
                        {day.PureSpectrum > 20 && <span className="bar-value">{day.PureSpectrum}</span>}
                      </div>
                    )}
                    {day.Dynata > 0 && (
                      <div
                        className="bar-segment dynata"
                        style={{ height: `${dynataPercent}%` }}
                        title={`Dynata: ${day.Dynata}`}
                      >
                        {day.Dynata > 20 && <span className="bar-value">{day.Dynata}</span>}
                      </div>
                    )}
                    {day.Kantar > 0 && (
                      <div
                        className="bar-segment kantar"
                        style={{ height: `${kantarPercent}%` }}
                        title={`Kantar: ${day.Kantar}`}
                      >
                        {day.Kantar > 20 && <span className="bar-value">{day.Kantar}</span>}
                      </div>
                    )}
                    <div className="total-label">{total}</div>
                  </div>
                </div>
                <div className="bar-date">{day.date}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#2964FF' }}></div>
          <span className="legend-label">PureSpectrum</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: 'rgba(41, 100, 255, 0.6)' }}></div>
          <span className="legend-label">Dynata</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: 'rgba(41, 100, 255, 0.35)' }}></div>
          <span className="legend-label">Kantar</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#757575' }}></div>
          <span className="legend-label">Target</span>
        </div>
      </div>
    </div>
  )
}

export default CompletesDistribution
