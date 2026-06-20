import { useState, useMemo } from 'react'
import CapitalFlowGame from '../games/CapitalFlowGame'
import {
  section116Info,
  circulation,
  circulationStages,
  turnoverFormulas,
  capitalByTransfer,
} from '../data/section116'

export default function Section116() {
  const [activeStage, setActiveStage] = useState(0)
  const [prodTime, setProdTime] = useState(28)
  const [circTime, setCircTime] = useState(22)

  const turnover = useMemo(() => {
    const ch = prodTime + circTime
    const N = ch > 0 ? (365 / ch).toFixed(2) : '0'
    return { ch, N }
  }, [prodTime, circTime])

  return (
    <article className="section-page">
      <header className="section-hero">
        <span className="section-badge">{section116Info.course}</span>
        <p className="section-parent">{section116Info.parent}</p>
        <h2 className="section-title">
          {section116Info.section} — {section116Info.title}
        </h2>
        <p className="section-desc">
          Vòng đời và tốc độ vận động của dòng vốn — tuần hoàn, chu chuyển, tư bản cố định và lưu động.
        </p>
      </header>

      {/* Tuần hoàn */}
      <section className="section-block">
        <h3 className="block-heading">🔄 Tuần hoàn của tư bản</h3>
        <p className="block-intro">{circulation.definition}</p>
        <div className="circulation-diagram-text">{circulation.diagram}</div>

        <div className="circulation-track">
          {circulationStages.map((stage, i) => (
            <button
              key={stage.id}
              className={`circ-stage ${i <= activeStage ? 'done' : ''} ${i === activeStage ? 'current' : ''}`}
              onClick={() => setActiveStage(i)}
            >
              <span className="cs-icon">{stage.icon}</span>
              <span className="cs-name">{stage.name}</span>
            </button>
          ))}
        </div>
        <div className="circ-stage-detail">
          <strong>{circulationStages[activeStage].name}</strong>
          <p>{circulationStages[activeStage].desc}</p>
        </div>
      </section>

      {/* Chu chuyển */}
      <section className="section-block">
        <h3 className="block-heading">⚡ Chu chuyển tư bản</h3>
        <p className="block-intro">{circulation.turnover}</p>

        <div className="turnover-calc">
          <div className="turnover-controls">
            <div className="control-group">
              <label>Thời gian sản xuất (ts): <span className="control-value">{prodTime} ngày</span></label>
              <input type="range" min="5" max="90" value={prodTime} onChange={(e) => setProdTime(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Thời gian lưu thông (tl): <span className="control-value">{circTime} ngày</span></label>
              <input type="range" min="5" max="60" value={circTime} onChange={(e) => setCircTime(+e.target.value)} />
            </div>
          </div>
          <div className="turnover-results">
            <div className="tr-formula">ch = ts + tl = <strong>{turnover.ch}</strong> ngày</div>
            <div className="tr-formula big">N = CH / ch = 365 / {turnover.ch} = <strong>{turnover.N}</strong> vòng/năm</div>
            <p className="tr-hint">Vốn quay càng nhanh (N càng lớn) → nhà tư bản thu lợi nhuận nhiều lần hơn trong năm.</p>
            <div className="time-bar-chart">
              <div className="time-bar production" style={{ width: `${(prodTime / turnover.ch) * 100}%` }}>ts: {prodTime}d</div>
              <div className="time-bar circulation" style={{ width: `${(circTime / turnover.ch) * 100}%` }}>tl: {circTime}d</div>
            </div>
          </div>
        </div>

        <div className="formula-cards-row">
          {turnoverFormulas.map((f) => (
            <div key={f.label} className="formula-mini-card">
              <span className="fmc-label">{f.label}</span>
              <code>{f.formula}</code>
            </div>
          ))}
        </div>
      </section>

      {/* TBCĐ vs TBLĐ */}
      <section className="section-block">
        <h3 className="block-heading">🏗️ Phân loại tư bản theo cách chuyển giá trị</h3>
        <div className="capital-transfer-grid">
          {capitalByTransfer.map((c) => (
            <div key={c.name} className={`transfer-card ${c.type}`}>
              <span className="transfer-icon">{c.icon}</span>
              <h4>{c.name}</h4>
              <p>{c.desc}</p>
              <div className="transfer-trait">{c.trait}</div>
              <div className="transfer-example"><em>VD:</em> {c.example}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trò chơi Dòng vốn */}
      <section className="section-block cfg-game-block" id="capital-flow-game">
        <h3 className="block-heading">🏁 Trò chơi — Đường đua Dòng vốn</h3>
        <p className="block-intro">
          Trải nghiệm 2 chặng sản xuất &amp; lưu thông, vượt chướng ngại hao mòn TBCĐ và hàng tồn kho
          để tối ưu ch và N.
        </p>
        <CapitalFlowGame />
      </section>
    </article>
  )
}
