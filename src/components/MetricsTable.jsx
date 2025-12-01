import './MetricsTable.css'

const MetricsTable = () => {
  const metrics = [
    { label: 'IR (overall)', value: '9.81 %' },
    { label: 'Dropouts (overall)', value: '23.31 %' },
    { label: 'LOI (average)', value: '29.93 minutes' },
    { label: 'LOI (median)', value: '21.13 minutes' }
  ]

  return (
    <div className="metrics-section">
      <div className="table-container">
        <table className="metrics-table">
          <tbody>
            {metrics.map((metric, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{metric.label}</td>
                <td className="table-cell right-align">{metric.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MetricsTable
