import { useState, useMemo } from 'react'
import {
  section12Info,
  essenceIntro,
  mRateIndicator,
  mMassIndicator,
} from '../data/section12'

export default function Section12() {
  const [m, setM] = useState(mRateIndicator.yarnExample.m)
  const [v, setV] = useState(mRateIndicator.yarnExample.v)
  const [totalV, setTotalV] = useState(300)
  const [valuePerHour, setValuePerHour] = useState(0.5)

  const results = useMemo(() => {
    const mRate = v > 0 ? (m / v) * 100 : 0
    const M = (mRate / 100) * totalV
    const necessaryH = valuePerHour > 0 ? v / valuePerHour : 0
    const surplusH = valuePerHour > 0 ? m / valuePerHour : 0
    const mRateFromTime = necessaryH > 0 ? (surplusH / necessaryH) * 100 : 0
    return { mRate, M, necessaryH, surplusH, mRateFromTime }
  }, [m, v, totalV, valuePerHour])

  return (
    <article className="section-page">
      <header className="section-hero">
        <span className="section-badge">{section12Info.course}</span>
        <p className="section-parent">{section12Info.parent}</p>
        <h2 className="section-title">
          {section12Info.section} — {section12Info.title}
        </h2>
        <p className="section-desc">{essenceIntro}</p>
      </header>

      <section className="section-block">
        <div className="essence-banner">
          <span className="eb-icon">⚖️</span>
          <p>
            Quan hệ <strong>NTB — Công nhân làm thuê</strong>: m đo <em>trình độ</em> bóc lột (m&apos;),
            M đo <em>quy mô</em> bóc lột tổng thể.
          </p>
        </div>
      </section>

      {/* m' */}
      <section className="section-block">
        <h3 className="block-heading">
          1️⃣ Tỷ suất giá trị thặng dư (<span className="symbol-inline">m&apos;</span>)
        </h3>
        <div className="indicator-card rate">
          <p className="indicator-meaning">{mRateIndicator.meaning}</p>
          <div className="formula-list">
            {mRateIndicator.formulas.map((f) => (
              <div key={f.expr} className="formula-item">
                <code>{f.expr}</code>
                <span>{f.desc}</span>
              </div>
            ))}
          </div>
          <div className="var-chips">
            {mRateIndicator.vars.map((vr) => (
              <span key={vr.symbol} className="var-chip">
                <strong>{vr.symbol}</strong> — {vr.desc}
              </span>
            ))}
          </div>
        </div>

        <div className="calc-layout">
          <div className="calc-controls">
            <h4>🎛️ Tính m&apos; tương tác</h4>
            <div className="control-group">
              <label>Giá trị thặng dư (m): <span className="control-value">${m}</span></label>
              <input type="range" min="1" max="20" value={m} onChange={(e) => setM(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Tư bản khả biến (v): <span className="control-value">${v}</span></label>
              <input type="range" min="1" max="15" value={v} onChange={(e) => setV(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Giá trị LĐ/giờ: <span className="control-value">${valuePerHour}</span></label>
              <input type="range" min="0.2" max="2" step="0.1" value={valuePerHour} onChange={(e) => setValuePerHour(+e.target.value)} />
            </div>
          </div>
          <div className="calc-results">
            <div className="cr-main">
              <span className="cr-label">m&apos; = m/v × 100%</span>
              <span className="cr-value">{results.mRate.toFixed(1)}%</span>
              <span className="cr-detail">{m} / {v} × 100%</span>
            </div>
            <div className="cr-time">
              <p><strong>Cách tính qua thời gian LĐ:</strong></p>
              <p>LĐ tất yếu: {results.necessaryH.toFixed(1)}h · LĐ thặng dư: {results.surplusH.toFixed(1)}h</p>
              <p>m&apos; = {results.surplusH.toFixed(1)} / {results.necessaryH.toFixed(1)} × 100% = <strong>{results.mRateFromTime.toFixed(1)}%</strong></p>
            </div>
            <div className="cr-yarn">
              📌 Ví dụ sợi (Mục 1.1.3): m=$3, v=$3 → m&apos;=100%
            </div>
          </div>
        </div>
      </section>

      {/* M */}
      <section className="section-block">
        <h3 className="block-heading">
          2️⃣ Khối lượng giá trị thặng dư (<span className="symbol-inline">M</span>)
        </h3>
        <div className="indicator-card mass">
          <p className="indicator-meaning">{mMassIndicator.meaning}</p>
          <div className="formula-list">
            {mMassIndicator.formulas.map((f) => (
              <div key={f.expr} className="formula-item">
                <code>{f.expr}</code>
                <span>{f.desc}</span>
              </div>
            ))}
          </div>
          <div className="var-chips">
            {mMassIndicator.vars.map((vr) => (
              <span key={vr.symbol} className="var-chip">
                <strong>{vr.symbol}</strong> — {vr.desc}
              </span>
            ))}
          </div>
        </div>

        <div className="calc-layout">
          <div className="calc-controls">
            <h4>🎛️ Tính M tương tác</h4>
            <p className="calc-note">m&apos; hiện tại: <strong>{results.mRate.toFixed(1)}%</strong> (từ m, v ở trên)</p>
            <div className="control-group">
              <label>Tổng TB khả biến (V): <span className="control-value">{totalV} triệu</span></label>
              <input type="range" min="50" max="2000" step="10" value={totalV} onChange={(e) => setTotalV(+e.target.value)} />
            </div>
          </div>
          <div className="calc-results">
            <div className="cr-main mass">
              <span className="cr-label">M = m&apos; × V</span>
              <span className="cr-value">{results.M.toFixed(0)} triệu</span>
              <span className="cr-detail">({results.mRate.toFixed(1)}% / 100) × {totalV}</span>
            </div>
            <div className="cr-compare">
              <div className="cc-col">
                <span className="cc-title">m&apos; — Trình độ</span>
                <span className="cc-val">{results.mRate.toFixed(1)}%</span>
                <small>Mức bóc lột / công nhân</small>
              </div>
              <div className="cc-col">
                <span className="cc-title">M — Quy mô</span>
                <span className="cc-val">{results.M.toFixed(0)}</span>
                <small>Tổng m thu trên toàn xưởng</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h3 className="block-heading">🔗 Liên hệ các mục</h3>
        <div className="link-chain">
          <span className="lc-item">1.1.3 → m = $3</span>
          <span className="lc-arrow">→</span>
          <span className="lc-item">1.1.4 → v = $3</span>
          <span className="lc-arrow">→</span>
          <span className="lc-item highlight">1.2 → m&apos; = 100%</span>
          <span className="lc-arrow">→</span>
          <span className="lc-item">M = m&apos; × V</span>
        </div>
      </section>
    </article>
  )
}
