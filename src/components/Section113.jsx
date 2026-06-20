import { useState, useMemo } from 'react'
import TwelveHourGame from '../games/TwelveHourGame'
import {
  section113Info,
  productionElements,
  yarnExample,
  surplusDefinition,
} from '../data/section113'

export default function Section113() {
  const [cotton, setCotton] = useState(yarnExample.costs[0].value)
  const [depreciation, setDepreciation] = useState(yarnExample.costs[1].value)
  const [wage, setWage] = useState(yarnExample.costs[2].value)
  const [hours, setHours] = useState(yarnExample.hours)
  const [valuePerHour, setValuePerHour] = useState(yarnExample.valuePerHour)

  const calc = useMemo(() => {
    const c = cotton + depreciation
    const v = wage
    const T = c + v
    const newValue = valuePerHour * hours
    const Tprime = c + newValue
    const m = Tprime - T
    const mRate = v > 0 ? ((m / v) * 100).toFixed(0) : 0
    return { c, v, T, newValue, Tprime, m, mRate }
  }, [cotton, depreciation, wage, hours, valuePerHour])

  return (
    <article className="section-page">
      <header className="section-hero">
        <span className="section-badge">{section113Info.course}</span>
        <p className="section-parent">{section113Info.parent}</p>
        <h2 className="section-title">
          {section113Info.section} — {section113Info.title}
        </h2>
        <p className="section-desc">
          Quá trình tiêu dùng sức lao động tạo ra giá trị thặng dư — minh họa qua ví dụ sản xuất 20kg sợi.
        </p>
      </header>

      {/* 1. Thành phần sản xuất */}
      <section className="section-block">
        <h3 className="block-heading">1️⃣ Các thành phần tham gia sản xuất</h3>
        <p className="block-intro">
          Để tạo ra giá trị thặng dư, quá trình <strong>tiêu dùng sức lao động</strong> kết hợp:
        </p>
        <div className="concept-grid">
          {productionElements.map((e) => (
            <div key={e.title} className="concept-card">
              <span className="concept-icon">{e.icon}</span>
              <h4>{e.title}</h4>
              <p>{e.desc}</p>
            </div>
          ))}
        </div>
        <div className="production-flow">
          <div className="pf-item">TSLĐ + TBCK</div>
          <span>+</span>
          <div className="pf-item">SLĐ công nhân</div>
          <span>→</span>
          <div className="pf-item highlight">Sản phẩm mới (W&apos;)</div>
        </div>
      </section>

      {/* 2. Ví dụ sợi */}
      <section className="section-block">
        <h3 className="block-heading">2️⃣ Ví dụ thực tế — {yarnExample.title}</h3>

        <div className="yarn-layout">
          <div className="yarn-table-section">
            <h4>Chi phí (NTB ứng trước — T)</h4>
            <table className="data-table">
              <tbody>
                <tr><td>Tiền mua bông</td><td>${cotton}</td></tr>
                <tr><td>Hao mòn máy móc</td><td>${depreciation}</td></tr>
                <tr><td>Tiền mua SLĐ (12h)</td><td>${wage}</td></tr>
                <tr className="total"><td><strong>Tổng T = c + v</strong></td><td><strong>${calc.T}</strong></td></tr>
              </tbody>
            </table>

            <h4>Giá trị sản phẩm thu về (T&apos;)</h4>
            <table className="data-table">
              <tbody>
                <tr><td>Giá trị bông vào sợi</td><td>${cotton}</td></tr>
                <tr><td>Giá trị máy móc vào sợi</td><td>${depreciation}</td></tr>
                <tr><td>Giá trị LĐ tạo ra ({hours}h × ${valuePerHour})</td><td>${calc.newValue}</td></tr>
                <tr className="total"><td><strong>Tổng T&apos; = c + giá trị mới</strong></td><td><strong>${calc.Tprime}</strong></td></tr>
              </tbody>
            </table>
          </div>

          <div className="yarn-interactive">
            <h4>🎛️ Tính toán tương tác</h4>
            <div className="control-group">
              <label>Tiền mua bông: <span className="control-value">${cotton}</span></label>
              <input type="range" min="5" max="50" value={cotton} onChange={(e) => setCotton(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Hao mòn máy móc: <span className="control-value">${depreciation}</span></label>
              <input type="range" min="1" max="20" value={depreciation} onChange={(e) => setDepreciation(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Tiền mua SLĐ (v): <span className="control-value">${wage}</span></label>
              <input type="range" min="1" max="15" value={wage} onChange={(e) => setWage(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Giờ lao động: <span className="control-value">{hours}h</span></label>
              <input type="range" min="4" max="16" value={hours} onChange={(e) => setHours(+e.target.value)} />
            </div>
            <div className="control-group">
              <label>Giá trị/giờ: <span className="control-value">${valuePerHour}</span></label>
              <input type="range" min="0.2" max="2" step="0.1" value={valuePerHour} onChange={(e) => setValuePerHour(+e.target.value)} />
            </div>

            <div className="result-box">
              <div className="result-row">
                <span>T&apos; − T</span>
                <span className="red">${calc.Tprime} − ${calc.T}</span>
              </div>
              <div className="result-row highlight">
                <span>Giá trị thặng dư (m)</span>
                <span className="red big">${calc.m}</span>
              </div>
              <div className="result-row">
                <span>m&apos; = m/v × 100%</span>
                <span>{calc.mRate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="result-summary">
          <div className="rs-item">
            <span className="rs-label">Thu về</span>
            <span className="rs-value">${calc.Tprime}</span>
          </div>
          <div className="rs-minus">−</div>
          <div className="rs-item">
            <span className="rs-label">Chi phí</span>
            <span className="rs-value">${calc.T}</span>
          </div>
          <div className="rs-equals">=</div>
          <div className="rs-item surplus">
            <span className="rs-label">m (giá trị thặng dư)</span>
            <span className="rs-value">${calc.m}</span>
          </div>
        </div>
      </section>

      {/* Trò chơi 12 giờ */}
      <section className="section-block th-game-block" id="twelve-hour-game">
        <h3 className="block-heading">🎮 Trò chơi — Thử Thách Sản Xuất 12 Giờ</h3>
        <p className="block-intro">
          Phân bổ thời gian lao động công nhân: 6 giờ tạo <strong>v</strong>, 6 giờ tạo <strong>m</strong>.
          Kéo dài ca hoặc tăng cường độ — cột thặng dư tăng, hài lòng giảm!
        </p>
        <TwelveHourGame />
      </section>

      {/* 3. Định nghĩa */}
      <section className="section-block">
        <h3 className="block-heading">3️⃣ Định nghĩa bản chất giá trị thặng dư</h3>
        <p className="block-intro">Từ ví dụ kinh tế trên, C. Mác rút ra:</p>
        <ul className="definition-list">
          {surplusDefinition.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <div className="formula-box">
          <code>{surplusDefinition.formula}</code>
          <code>{surplusDefinition.example}</code>
        </div>
        <blockquote className="section-quote">
          Giá trị thặng dư là <strong>lao động không công</strong> — phần lao động công nhân tạo ra vượt quá
          giá trị sức lao động (tiền công v) mà nhà tư bản chiếm đoạt.
        </blockquote>
      </section>
    </article>
  )
}
