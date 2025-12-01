import { useState } from 'react'
import './Sidebar.css'

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Monitor')

  const menuItems = [
    'Monitor',
    'Launch',
    'Quotas',
    'Translation',
    'Sampling',
    'Live links',
    'Data'
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item}
            className={`sidebar-item ${activeItem === item ? 'active' : ''}`}
            onClick={() => setActiveItem(item)}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
