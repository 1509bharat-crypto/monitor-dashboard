import { useState } from 'react'
import { DataProvider } from './contexts/DataContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import FilterPanel from './components/FilterPanel'
import QualifiedCompletesBar from './components/QualifiedCompletesBar'
import CumulativeProgressChart from './components/CumulativeProgressChart'
import NewSamplesChart from './components/NewSamplesChart'
import AllMetricsCards from './components/AllMetricsCards'
import SampleProgressBar from './components/SampleProgressBar'
import DataQualityDonut from './components/DataQualityDonut'
import QualityIssuesBreakdown from './components/QualityIssuesBreakdown'
import TerminatesTable from './components/TerminatesTable'
import QuotaTracking from './components/QuotaTracking'
import FieldworkComparison from './components/FieldworkComparison'
import CompareModal from './components/CompareModal'
import './App.css'

function App() {
  const [filters, setFilters] = useState({
    market: 'Netherlands',
    source: 'Epiphany',
    sample: 'Main',
    dateOption: 'ALL',
    dateFrom: '',
    dateTo: ''
  })

  const [compareMode, setCompareMode] = useState(false)
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [compareConfig, setCompareConfig] = useState(null)

  const handleCompareConfirm = (config) => {
    setCompareConfig(config)
    setCompareMode(true)
    setShowCompareModal(false)
  }

  const handleExitCompare = () => {
    setCompareMode(false)
    setCompareConfig(null)
  }

  return (
    <DataProvider>
      <div className="app">
        <Header />
        <Sidebar />
        <main className="main-content">
          {compareMode ? (
            /* Fieldwork Comparison Mode */
            <FieldworkComparison
              config={compareConfig}
              onExit={handleExitCompare}
              onEdit={() => setShowCompareModal(true)}
            />
          ) : (
            <>
              {/* Filters Section */}
              <div className="dashboard-section">
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  onCompareClick={() => setShowCompareModal(true)}
                />
              </div>

              {/* Row 0: Qualified Completes Progress Bar */}
              <div className="dashboard-section">
                <QualifiedCompletesBar />
              </div>

              {/* Row 0.5: Charts Row - Cumulative Progress | New Samples */}
              <div className="row-charts-two-columns">
                <CumulativeProgressChart />
                <NewSamplesChart />
              </div>

              {/* Row 1: Sample Progress | Data Quality Donut | Metrics (3 columns) */}
              <div className="row-1-three-columns">
                <SampleProgressBar />
                <DataQualityDonut />
                <AllMetricsCards />
              </div>

              {/* Row 2: Termination Breakdown | Quality Issues Breakdown (2 columns) */}
              <div className="row-2-two-columns">
                <TerminatesTable />
                <QualityIssuesBreakdown />
              </div>

              {/* Row 3: Quota Tracking (full width) */}
              <div className="dashboard-section">
                <QuotaTracking />
              </div>
            </>
          )}
        </main>

        <CompareModal
          isOpen={showCompareModal}
          onClose={() => setShowCompareModal(false)}
          onConfirm={handleCompareConfirm}
          currentMarket={filters.market}
          initialConfig={compareConfig}
        />
      </div>
    </DataProvider>
  )
}

export default App
