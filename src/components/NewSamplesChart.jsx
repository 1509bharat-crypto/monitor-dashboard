import './NewSamplesChart.css'

const NewSamplesChart = () => {
  // Sample data - daily new samples with dates
  const data = [
    { date: 'Oct 15', value: 45 },
    { date: 'Oct 18', value: 78 },
    { date: 'Oct 21', value: 120 },
    { date: 'Oct 24', value: 95 },
    { date: 'Oct 27', value: 150 },
    { date: 'Oct 30', value: 180 },
    { date: 'Nov 2', value: 165 },
    { date: 'Nov 5', value: 200 },
    { date: 'Nov 8', value: 175 },
    { date: 'Nov 11', value: 190 },
    { date: 'Nov 14', value: 220 },
    { date: 'Nov 17', value: 185 },
    { date: 'Nov 20', value: 140 },
    { date: 'Nov 23', value: 110 }
  ]

  const maxValue = Math.max(...data.map(d => d.value))
  const startDate = data[0].date
  const endDate = data[data.length - 1].date

  return (
    <div className="new-samples-chart-card">
      <div className="chart-header">
        <h3 className="chart-title">
          New samples <span className="chart-subtitle">(Qualified Completes)</span>
        </h3>
      </div>
      <div className="chart-area">
        <div className="y-axis">
          <span>200</span>
          <span>100</span>
          <span>0</span>
        </div>
        <div className="chart-content">
          <div className="grid-lines">
            <div className="grid-line" />
            <div className="grid-line" />
            <div className="grid-line" />
          </div>
          <div className="bars-container">
            {data.map((item, i) => (
              <div key={i} className="bar-wrapper">
                <div
                  className="bar"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="x-axis">
        <span>{startDate}</span>
        <span>{endDate}</span>
      </div>
    </div>
  )
}

export default NewSamplesChart
