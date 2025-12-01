import './CumulativeProgressChart.css'

const CumulativeProgressChart = () => {
  // Realistic cumulative data - starts slow, builds momentum, typical S-curve pattern
  const data = [
    { date: 'Oct 15', value: 12 },
    { date: 'Oct 18', value: 28 },
    { date: 'Oct 21', value: 45 },
    { date: 'Oct 24', value: 78 },
    { date: 'Oct 27', value: 112 },
    { date: 'Oct 30', value: 156 },
    { date: 'Nov 2', value: 198 },
    { date: 'Nov 5', value: 245 },
    { date: 'Nov 8', value: 289 },
    { date: 'Nov 11', value: 328 },
    { date: 'Nov 14', value: 365 },
    { date: 'Nov 17', value: 398 },
    { date: 'Nov 20', value: 420 },
    { date: 'Nov 23', value: 434 }
  ]

  const maxValue = 1000
  const startDate = data[0].date
  const endDate = data[data.length - 1].date

  // Calculate percentage heights for each point
  const getHeight = (value) => (value / maxValue) * 100

  // Generate SVG path for smooth curve
  const generatePath = () => {
    const width = 100
    const segmentWidth = width / (data.length - 1)

    let path = `M 0 ${100 - getHeight(data[0].value)}`

    for (let i = 0; i < data.length - 1; i++) {
      const x0 = i * segmentWidth
      const y0 = 100 - getHeight(data[i].value)
      const x1 = (i + 1) * segmentWidth
      const y1 = 100 - getHeight(data[i + 1].value)
      const cpx = (x0 + x1) / 2

      path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`
    }

    return path
  }

  return (
    <div className="cumulative-chart-card">
      <div className="chart-header">
        <h3 className="chart-title">
          Cumulative progress <span className="chart-subtitle">(Qualified Completes)</span>
        </h3>
      </div>
      <div className="chart-area">
        <div className="y-axis">
          <span>1000</span>
          <span>500</span>
          <span>0</span>
        </div>
        <div className="chart-content">
          <div className="grid-lines">
            <div className="grid-line" />
            <div className="grid-line" />
            <div className="grid-line" />
          </div>
          <svg
            className="line-chart"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d={generatePath()}
              fill="none"
              stroke="#2964FF"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
      <div className="x-axis">
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
    </div>
  )
}

export default CumulativeProgressChart
