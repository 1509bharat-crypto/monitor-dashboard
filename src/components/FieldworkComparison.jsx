import './FieldworkComparison.css'

const FieldworkComparison = ({ config, onExit, onEdit }) => {
  // Color assignments for markets
  const marketColors = ['#2964FF', '#66BB6A', '#EF5350']

  // Mock data for all markets
  const allMarketData = {
    NL: {
      code: 'NL',
      name: 'Netherlands',
      completes: { current: 847, target: 1200, percentage: 70.6 },
      cumulativeData: [12, 45, 89, 156, 234, 312, 398, 487, 567, 634, 712, 789, 847],
      newSamples: [45, 52, 38, 61, 44, 55, 48, 62, 39, 51, 47, 58],
      sampleProgress: { started: 2341, completed: 847, terminated: 892, qualified: 602 },
      irLoi: { ir: 9.81, loiAvg: 29.3, loiMedian: 21.13 },
      dataQuality: { good: 78, issues: 22 }
    },
    UK: {
      code: 'UK',
      name: 'United Kingdom',
      completes: { current: 623, target: 1000, percentage: 62.3 },
      cumulativeData: [8, 32, 67, 112, 178, 234, 298, 367, 423, 489, 556, 598, 623],
      newSamples: [32, 41, 29, 48, 38, 42, 51, 37, 44, 39, 45, 38],
      sampleProgress: { started: 1892, completed: 623, terminated: 734, qualified: 535 },
      irLoi: { ir: 11.2, loiAvg: 26.8, loiMedian: 19.5 },
      dataQuality: { good: 82, issues: 18 }
    },
    DE: {
      code: 'DE',
      name: 'Germany',
      completes: { current: 512, target: 800, percentage: 64.0 },
      cumulativeData: [5, 24, 52, 89, 134, 178, 223, 278, 334, 389, 445, 489, 512],
      newSamples: [24, 31, 26, 39, 33, 37, 42, 29, 38, 34, 40, 32],
      sampleProgress: { started: 1456, completed: 512, terminated: 567, qualified: 377 },
      irLoi: { ir: 8.9, loiAvg: 31.2, loiMedian: 23.4 },
      dataQuality: { good: 75, issues: 25 }
    },
    US: {
      code: 'US',
      name: 'United States',
      completes: { current: 1234, target: 2000, percentage: 61.7 },
      cumulativeData: [20, 65, 134, 245, 378, 489, 623, 789, 912, 1045, 1134, 1189, 1234],
      newSamples: [65, 78, 52, 89, 67, 74, 82, 56, 71, 63, 78, 55],
      sampleProgress: { started: 3456, completed: 1234, terminated: 1456, qualified: 766 },
      irLoi: { ir: 10.5, loiAvg: 28.1, loiMedian: 20.8 },
      dataQuality: { good: 80, issues: 20 }
    },
    CA: {
      code: 'CA',
      name: 'Canada',
      completes: { current: 389, target: 600, percentage: 64.8 },
      cumulativeData: [8, 28, 56, 98, 145, 189, 234, 278, 312, 345, 367, 378, 389],
      newSamples: [28, 34, 22, 41, 31, 38, 35, 27, 33, 29, 36, 24],
      sampleProgress: { started: 1123, completed: 389, terminated: 423, qualified: 311 },
      irLoi: { ir: 12.1, loiAvg: 25.4, loiMedian: 18.9 },
      dataQuality: { good: 84, issues: 16 }
    },
    FR: {
      code: 'FR',
      name: 'France',
      completes: { current: 456, target: 700, percentage: 65.1 },
      cumulativeData: [10, 35, 72, 118, 167, 212, 267, 312, 356, 398, 428, 445, 456],
      newSamples: [35, 42, 28, 52, 39, 45, 41, 32, 42, 36, 43, 30],
      sampleProgress: { started: 1345, completed: 456, terminated: 512, qualified: 377 },
      irLoi: { ir: 9.3, loiAvg: 30.1, loiMedian: 22.6 },
      dataQuality: { good: 77, issues: 23 }
    }
  }

  // Get selected markets from config with colors assigned
  const selectedMarkets = config?.countries?.map((country, index) => ({
    ...allMarketData[country.code],
    color: marketColors[index]
  })) || []

  const selectedMetrics = config?.metrics || ['qualifiedCompletes', 'cumulativeProgress', 'sampleProgress']

  // Mini line chart for cumulative progress
  const MiniLineChart = ({ data, color, maxValue }) => {
    const width = 300
    const height = 80
    const padding = 8
    const max = maxValue || Math.max(...data)

    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2)
      const y = height - padding - (value / max) * (height - padding * 2)
      return `${x},${y}`
    }).join(' ')

    // Create area fill path
    const areaPath = `M ${padding},${height - padding} ` +
      data.map((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - padding * 2)
        const y = height - padding - (value / max) * (height - padding * 2)
        return `L ${x},${y}`
      }).join(' ') +
      ` L ${width - padding},${height - padding} Z`

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="mini-chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          d={areaPath}
          fill={`url(#gradient-${color.replace('#', '')})`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    )
  }

  // Mini bar chart for new samples
  const MiniBarChart = ({ data, color }) => {
    const width = 300
    const height = 80
    const padding = 8
    const gap = 4
    const barWidth = (width - padding * 2 - gap * (data.length - 1)) / data.length
    const max = Math.max(...data)

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="mini-chart" preserveAspectRatio="none">
        {data.map((value, index) => {
          const barHeight = (value / max) * (height - padding * 2)
          const x = padding + index * (barWidth + gap)
          const y = height - padding - barHeight
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              opacity={0.85}
              rx={3}
            />
          )
        })}
      </svg>
    )
  }

  // Get max target for consistent chart scaling
  const maxTarget = Math.max(...selectedMarkets.map(m => m.completes.target))

  return (
    <div className="fieldwork-comparison">
      {/* Comparison Header */}
      <div className="comparison-header">
        <div className="comparison-info">
          <h2>Fieldwork Comparison</h2>
          <div className="comparison-tags">
            {selectedMarkets.map(market => (
              <span key={market.code} className="market-tag" style={{ backgroundColor: market.color }}>
                {market.code}
              </span>
            ))}
            <span className="date-tag">
              <span className="material-symbols-outlined">schedule</span>
              {config?.dateRange || 'ALL'}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-edit" onClick={onEdit}>
            <span className="material-symbols-outlined">edit</span>
            Edit
          </button>
          <button className="btn-exit" onClick={onExit}>
            <span className="material-symbols-outlined">close</span>
            Exit
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="comparison-grid" style={{ gridTemplateColumns: `repeat(${selectedMarkets.length}, 1fr)` }}>
        {selectedMarkets.map((market) => (
          <div key={market.code} className="market-column">
            {/* Market Header */}
            <div className="market-header" style={{ borderColor: market.color }}>
              <span className="market-code" style={{ backgroundColor: market.color }}>
                {market.code}
              </span>
              <span className="market-name">{market.name}</span>
            </div>

            {/* Qualified Completes */}
            {selectedMetrics.includes('qualifiedCompletes') && (
              <div className="comparison-card">
                <div className="card-title">Qualified Completes</div>
                <div className="completes-value">
                  <span className="current" style={{ color: market.color }}>
                    {market.completes.current.toLocaleString()}
                  </span>
                  <span className="separator">/</span>
                  <span className="target">{market.completes.target.toLocaleString()}</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${market.completes.percentage}%`,
                      backgroundColor: market.color
                    }}
                  />
                </div>
                <div className="percentage">{market.completes.percentage}%</div>
              </div>
            )}

            {/* Cumulative Progress */}
            {selectedMetrics.includes('cumulativeProgress') && (
              <div className="comparison-card">
                <div className="card-title">Cumulative Progress</div>
                <MiniLineChart
                  data={market.cumulativeData}
                  color={market.color}
                  maxValue={maxTarget}
                />
              </div>
            )}

            {/* New Samples */}
            {selectedMetrics.includes('newSamples') && (
              <div className="comparison-card">
                <div className="card-title">New Samples</div>
                <MiniBarChart data={market.newSamples} color={market.color} />
              </div>
            )}

            {/* Sample Progress */}
            {selectedMetrics.includes('sampleProgress') && (
              <div className="comparison-card">
                <div className="card-title">Sample Progress</div>
                <div className="sample-stats">
                  <div className="stat-row">
                    <span className="stat-label">Started</span>
                    <span className="stat-value">{market.sampleProgress.started.toLocaleString()}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Completed</span>
                    <span className="stat-value" style={{ color: market.color }}>
                      {market.sampleProgress.completed.toLocaleString()}
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Terminated</span>
                    <span className="stat-value">{market.sampleProgress.terminated.toLocaleString()}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Qualified</span>
                    <span className="stat-value">{market.sampleProgress.qualified.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* IR & LOI */}
            {selectedMetrics.includes('irLoi') && (
              <div className="comparison-card">
                <div className="card-title">IR & LOI</div>
                <div className="sample-stats">
                  <div className="stat-row">
                    <span className="stat-label">IR (Overall)</span>
                    <span className="stat-value" style={{ color: market.color }}>{market.irLoi.ir}%</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">LOI (Average)</span>
                    <span className="stat-value">{market.irLoi.loiAvg} min</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">LOI (Median)</span>
                    <span className="stat-value">{market.irLoi.loiMedian} min</span>
                  </div>
                </div>
              </div>
            )}

            {/* Data Quality */}
            {selectedMetrics.includes('dataQuality') && (
              <div className="comparison-card">
                <div className="card-title">Data Quality</div>
                <div className="quality-stacked-bar">
                  <div
                    className="quality-segment qualified"
                    style={{ width: `${market.dataQuality.good}%`, backgroundColor: market.color }}
                  />
                  <div
                    className="quality-segment insufficient"
                    style={{ width: `${market.dataQuality.issues}%` }}
                  />
                </div>
                <div className="quality-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: market.color }} />
                    <span className="legend-label">Qualified</span>
                    <span className="legend-value" style={{ color: market.color }}>{market.dataQuality.good}%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot insufficient" />
                    <span className="legend-label">Insufficient</span>
                    <span className="legend-value">{market.dataQuality.issues}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FieldworkComparison
