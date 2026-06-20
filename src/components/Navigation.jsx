const tabs = [
  { id: 'home', label: 'Trang chủ', icon: '🏠' },
  { id: 'section111', label: '1.1.1', icon: '📐' },
  { id: 'section112', label: '1.1.2', icon: '👷' },
  { id: 'section113', label: '1.1.3', icon: '🧵' },
  { id: 'section114', label: '1.1.4', icon: '⚙️' },
  { id: 'section115', label: '1.1.5', icon: '💵' },
  { id: 'section116', label: '1.1.6', icon: '🔁' },
  { id: 'section12', label: '1.2', icon: '📊' },
  { id: 'quiz11', label: 'Ôn tập', icon: '❓' },
]

export default function Navigation({ activeTab, onTabChange }) {
  return (
    <nav className="main-nav" aria-label="Điều hướng chính">
      <div className="nav-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''} ${tab.id === 'section12' || tab.id === 'quiz11' ? 'nav-section12' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
