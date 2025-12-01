import './StatsCards.css'

const StatsCards = () => {
  const stats = [
    {
      label: 'Qualified Completes',
      value: 782,
      percentage: 9
    },
    {
      label: 'Terminates',
      value: 26,
      percentage: 9
    },
    {
      label: 'Dropouts',
      value: 26,
      percentage: 9
    }
  ]

  return (
    <div className="stats-cards-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <h3 className="stat-card-label">{stat.label}</h3>
          <div className="stat-card-values">
            <span className="stat-card-value">{stat.value.toLocaleString()}</span>
            <span className="stat-card-percentage">({stat.percentage}%)</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
