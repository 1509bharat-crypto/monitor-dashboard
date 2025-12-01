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
import CompletesDistribution from './components/CompletesDistribution'
import DataQualityDonut from './components/DataQualityDonut'
import QualityIssuesBreakdown from './components/QualityIssuesBreakdown'
import TerminatesTable from './components/TerminatesTable'
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

  return (
    <DataProvider>
      <div className="app">
        <Header />
        <Sidebar />
        <main className="main-content">
          {/* Filters Section */}
          <div className="dashboard-section">
            <FilterPanel filters={filters} setFilters={setFilters} />
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

          {/* Completes Distribution Section - HIDDEN (uncomment to show) */}
          {/* <div className="dashboard-section">
            <CompletesDistribution />
          </div> */}
        </main>
      </div>
    </DataProvider>
  )
}

export default App
