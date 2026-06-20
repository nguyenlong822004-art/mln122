import { courseInfo, parentSection } from '../data/section112'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-shimmer" aria-hidden="true" />
      <div className="header-inner">
        <div className="logo-block">
          <span className="logo-icon logo-icon-pulse">☭</span>
          <div>
            <p className="logo-tag">{courseInfo}</p>
            <h1 className="logo-title">{parentSection}</h1>
          </div>
        </div>
        <p className="header-sub">
          <span className="header-sub-dot" />
          Mục 1.1.1 — 1.1.6 · Mục 1.2 — Giá trị thặng dư
        </p>
      </div>
    </header>
  )
}
