import './HorizontalBreakdown.css'

const clampPercentage = (percentage) => {
  if (percentage === undefined || percentage === null || Number.isNaN(percentage)) {
    return 0
  }
  return Math.min(100, Math.max(0, percentage))
}

const HorizontalBreakdown = ({
  title,
  subtitle,
  segments,
  className = '',
  itemClassName = ''
}) => {
  const containerClasses = ['quality-chart', className].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      {(title || subtitle) && (
        <div className="chart-header">
          <div>
            {title && <h3 className="chart-title">{title}</h3>}
            {subtitle && <p className="chart-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="horizontal-bars">
        {segments.map((segment, index) => {
          const key = `${segment.label}-${index}`
          const barWidth = `${clampPercentage(segment.percentage)}%`
          const valueLabel = segment.displayValue ?? segment.value
          const percentageLabel =
            segment.displayPercentage ??
            (segment.percentage !== undefined && segment.percentage !== null
              ? `${segment.percentage}%`
              : null)
          const hasPercentage = Boolean(percentageLabel)

          const hideBar = segment.showBar === false
          const shouldHoverPercentage = hasPercentage && segment.showPercentageOnHover !== false
          const percentageClass = shouldHoverPercentage ? 'bar-percentage-hover' : 'bar-percentage-static'
          const containerClassNames = ['bar-container-overlay']

          if (hideBar) {
            containerClassNames.push('bar-container-no-fill')
          }
          if (shouldHoverPercentage) {
            containerClassNames.push('bar-container-hoverable')
          }

          return (
            <div
              key={key}
              className={['horizontal-bar-item-overlay', hideBar ? 'horizontal-bar-item-stat' : '', itemClassName]
                .filter(Boolean)
                .join(' ')}
            >
              <div className={containerClassNames.join(' ')}>
                {!hideBar && (
                  <div
                    className="bar-fill-overlay"
                    style={{
                      width: barWidth,
                      backgroundColor: segment.color ?? '#4a4a4a'
                    }}
                  ></div>
                )}
                <div className="bar-overlay-content">
                  <span className="bar-label-overlay">{segment.label}</span>
                  <span className="bar-value-overlay">
                    <span className="bar-count">{valueLabel}</span>
                    {hasPercentage && (
                      <span className={percentageClass}>{percentageLabel}</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HorizontalBreakdown
