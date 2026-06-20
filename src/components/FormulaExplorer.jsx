import { useState, useMemo } from 'react'
import { formulas, yarnExample } from '../data/content'
import MoneyMotionDiagram from './MoneyMotionDiagram'

export default function FormulaExplorer() {
  const [mode, setMode] = useState('capital') // capital | yarn | turnover

  // Yarn example sliders (based on slide 22-24)
  const [cotton, setCotton] = useState(yarnExample.cotton)
  const [depreciation, setDepreciation] = useState(yarnExample.depreciation)
  const [wage, setWage] = useState(yarnExample.wage)
  const [hours, setHours] = useState(yarnExample.hours)
  const [valuePerHour, setValuePerHour] = useState(yarnExample.valuePerHour)

  // Turnover
  const [prodTime, setProdTime] = useState(28)
  const [circTime, setCircTime] = useState(22)
  const [totalV, setTotalV] = useState(300)

  const yarnResults = useMemo(() => {
    const c = cotton + depreciation
    const v = wage
    const newValue = valuePerHour * hours
    const Wprime = c + newValue
    const cost = c + v
    const m = Wprime - cost
    const mRate = v > 0 ? ((m / v) * 100).toFixed(1) : '0'
    const M = ((parseFloat(mRate) / 100) * totalV).toFixed(0)
    const surplusHours = valuePerHour > 0 ? (m / valuePerHour).toFixed(1) : 0
    const necessaryHours = valuePerHour > 0 ? (v / valuePerHour).toFixed(1) : 0
    return { c, v, newValue, Wprime, cost, m, mRate, M, surplusHours, necessaryHours }
  }, [cotton, depreciation, wage, hours, valuePerHour, totalV])

  const turnoverResults = useMemo(() => {
    const ch = prodTime + circTime
    const N = ch > 0 ? (365 / ch).toFixed(2) : '0'
    return { ch, N, prodTime, circTime }
  }, [prodTime, circTime])

  return (
    <section className="explorer-section">
      <h2 className="section-title">🔄 Trình khám phá công thức</h2>
      <p className="section-desc">
        Tương tác với các công thức từ slide: m = W&apos;−(c+v), m&apos;, M, N = CH/ch và ví dụ sợi.
      </p>

      <div className="explorer-tabs">
        <button className={`tab-btn ${mode === 'yarn' ? 'active' : ''}`} onClick={() => setMode('yarn')}>
          🧵 Ví dụ sợi
        </button>
        <button className={`tab-btn ${mode === 'turnover' ? 'active' : ''}`} onClick={() => setMode('turnover')}>
          ⚡ Chu chuyển (N)
        </button>
        <button className={`tab-btn ${mode === 'capital' ? 'active' : ''}`} onClick={() => setMode('capital')}>
          📐 Công thức tư bản
        </button>
      </div>

      {mode === 'yarn' && (
        <div className="explorer-layout">
          <div className="explorer-controls">
            <div className="control-group">
              <label>Tiền mua bông (c₁) <span className="control-value">${cotton}</span></label>
              <input type="range" min="5" max="50" value={cotton} onChange={(e) => setCotton(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Hao mòn máy móc (c₂) <span className="control-value">${depreciation}</span></label>
              <input type="range" min="1" max="20" value={depreciation} onChange={(e) => setDepreciation(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Tiền mua SLĐ — v <span className="control-value">${wage}</span></label>
              <input type="range" min="1" max="15" value={wage} onChange={(e) => setWage(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Thời gian lao động (giờ) <span className="control-value">{hours}h</span></label>
              <input type="range" min="4" max="16" value={hours} onChange={(e) => setHours(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Giá trị tạo ra/giờ <span className="control-value">${valuePerHour}</span></label>
              <input type="range" min="0.2" max="2" step="0.1" value={valuePerHour} onChange={(e) => setValuePerHour(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Tổng TB khả biến V (triệu) <span className="control-value">{totalV}</span></label>
              <input type="range" min="50" max="1000" step="10" value={totalV} onChange={(e) => setTotalV(+e.target.value)} />
            </div>
          </div>

          <div className="explorer-visual">
            <div className="cycle-diagram">
              <div className="cycle-node" style={{ '--node-color': '#ffd700' }}>
                <span className="cycle-label">T — Chi phí (c + v)</span>
                <span className="cycle-value">${yarnResults.cost}</span>
              </div>
              <div className="cycle-node" style={{ '--node-color': '#6b7280' }}>
                <span className="cycle-label">c = bông + hao mòn</span>
                <span className="cycle-value">${yarnResults.c}</span>
              </div>
              <div className="cycle-node" style={{ '--node-color': '#3b82f6' }}>
                <span className="cycle-label">v — Tiền công</span>
                <span className="cycle-value">${yarnResults.v}</span>
              </div>
              <div className="cycle-node" style={{ '--node-color': '#a855f7' }}>
                <span className="cycle-label">Giá trị LĐ tạo ra</span>
                <span className="cycle-value">${yarnResults.newValue.toFixed(1)}</span>
              </div>
              <div className="cycle-node" style={{ '--node-color': '#22c55e' }}>
                <span className="cycle-label">W&apos; = c + giá trị mới</span>
                <span className="cycle-value">${yarnResults.Wprime.toFixed(1)}</span>
              </div>
            </div>

            <div className="results-panel">
              <div className="result-item highlight">
                <span className="result-label">Giá trị thặng dư m = W&apos;−(c+v)</span>
                <span className="result-value red">${yarnResults.m.toFixed(1)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Tỷ suất m&apos; = m/v × 100%</span>
                <span className="result-value">{yarnResults.mRate}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">LĐ tất yếu / thặng dư (giờ)</span>
                <span className="result-value">{yarnResults.necessaryHours}h / {yarnResults.surplusHours}h</span>
              </div>
              <div className="result-item">
                <span className="result-label">Khối lượng M = m&apos; × V</span>
                <span className="result-value green">{yarnResults.M} triệu</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === 'turnover' && (
        <div className="explorer-layout">
          <div className="explorer-controls">
            <div className="control-group">
              <label>Thời gian sản xuất (ts) <span className="control-value">{prodTime} ngày</span></label>
              <input type="range" min="5" max="90" value={prodTime} onChange={(e) => setProdTime(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Thời gian lưu thông (tl) <span className="control-value">{circTime} ngày</span></label>
              <input type="range" min="5" max="60" value={circTime} onChange={(e) => setCircTime(+e.target.value)} />
            </div>
          </div>
          <div className="explorer-visual">
            <div className="turnover-formula-box">
              <p className="formula-big">ch = ts + tl = {turnoverResults.ch} ngày</p>
              <p className="formula-big">N = CH / ch = 365 / {turnoverResults.ch} = <strong>{turnoverResults.N}</strong> vòng/năm</p>
            </div>
            <div className="time-bar-chart">
              <div className="time-bar production" style={{ width: `${(prodTime / turnoverResults.ch) * 100}%` }}>
                SX: {prodTime}d
              </div>
              <div className="time-bar circulation" style={{ width: `${(circTime / turnoverResults.ch) * 100}%` }}>
                LT: {circTime}d
              </div>
            </div>
            <p className="time-hint">
              Tư bản lưu động chuyển giá trị nhanh; tư bản cố định hao mòn dần trong thời gian sản xuất.
            </p>
          </div>
        </div>
      )}

      {mode === 'capital' && <MoneyMotionDiagram />}

      <div className="formula-cards">
        {formulas.map((f) => (
          <div key={f.symbol} className="formula-card">
            <span className="formula-symbol">{f.symbol}</span>
            <span className="formula-name">{f.name}</span>
            <code className="formula-expr">{f.formula}</code>
          </div>
        ))}
      </div>
    </section>
  )
}
