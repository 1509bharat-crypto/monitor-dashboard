import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">⚙</span>
          <span className="logo-text">Asics purchase tracker</span>
        </div>
        <nav className="header-nav">
          <button className="nav-link">Builder</button>
          <button className="nav-link">Domain</button>
          <button className="nav-link active">Visualizer</button>
        </nav>
      </div>
      <div className="gradient-bar"></div>
    </header>
  )
}

export default Header
