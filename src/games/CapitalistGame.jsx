import { useState, useMemo } from 'react'
import { capitalTypes, yarnExample } from '../data/content'

const INITIAL_CAPITAL = 27
const ROUNDS = 5

function formatMoney(n) {
  return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 1 })
}

export default function CapitalistGame() {
  const [phase, setPhase] = useState('intro')
  const [round, setRound] = useState(1)
  const [capital, setCapital] = useState(INITIAL_CAPITAL)
  const [totalM, setTotalM] = useState(0)
  const [history, setHistory] = useState([])

  const [capitalType, setCapitalType] = useState('industrial')
  const [cotton, setCotton] = useState(yarnExample.cotton)
  const [depreciation, setDepreciation] = useState(yarnExample.depreciation)
  const [wage, setWage] = useState(yarnExample.wage)
  const [hours, setHours] = useState(yarnExample.hours)
  const [lastResult, setLastResult] = useState(null)

  const selected = capitalTypes.find((c) => c.id === capitalType)

  const preview = useMemo(() => {
    if (capitalType === 'industrial') {
      const c = cotton + depreciation
      const v = wage
      const cost = c + v
      if (cost > capital) return { valid: false, error: `Vốn không đủ! Cần ${formatMoney(cost)}, có ${formatMoney(capital)}` }

      const newValue = selected.valuePerHour * hours
      const Wprime = c + newValue
      const m = Wprime - cost
      const mRate = v > 0 ? ((m / v) * 100).toFixed(1) : 0
      const Tprime = Wprime
      const necessaryH = selected.valuePerHour > 0 ? (v / selected.valuePerHour).toFixed(1) : 0
      const surplusH = selected.valuePerHour > 0 ? (m / selected.valuePerHour).toFixed(1) : 0

      return {
        valid: true,
        formula: selected.formula,
        c, v, cost, newValue, Wprime, m, mRate, Tprime,
        necessaryH, surplusH,
        breakdown: { cotton, depreciation },
      }
    }

    if (capitalType === 'commercial') {
      const purchase = capital * selected.purchaseRatio
      const sellPrice = purchase * (1 + selected.markup)
      const m = sellPrice - capital
      const v = capital * 0.1
      const mRate = v > 0 ? ((m / v) * 100).toFixed(1) : 0
      return {
        valid: true,
        formula: selected.formula,
        c: purchase, v: 0, cost: capital, newValue: sellPrice, Wprime: sellPrice,
        m, mRate, Tprime: sellPrice,
      }
    }

    // loan
    const m = capital * selected.interestRate
    const Tprime = capital + m
    const v = 0
    const mRate = '—'
    return {
      valid: true,
      formula: selected.formula,
      c: 0, v, cost: capital, newValue: Tprime, Wprime: Tprime,
      m, mRate, Tprime,
    }
  }, [capitalType, cotton, depreciation, wage, hours, capital, selected])

  function startGame() {
    setPhase('playing')
    setRound(1)
    setCapital(INITIAL_CAPITAL * 10)
    setTotalM(0)
    setHistory([])
    resetInputs()
  }

  function resetInputs() {
    setCapitalType('industrial')
    setCotton(yarnExample.cotton)
    setDepreciation(yarnExample.depreciation)
    setWage(yarnExample.wage)
    setHours(yarnExample.hours)
  }

  function submitRound() {
    if (!preview.valid) return

    const entry = {
      round,
      type: selected.name,
      formula: preview.formula,
      c: preview.c,
      v: preview.v,
      m: preview.m,
      mRate: preview.mRate,
      Wprime: preview.Tprime,
      capitalBefore: capital,
    }

    setLastResult(entry)
    setHistory((h) => [...h, entry])
    setTotalM((t) => t + preview.m)
    setCapital(preview.Tprime)

    if (round >= ROUNDS) {
      setPhase('result')
    } else {
      setRound((r) => r + 1)
    }
  }

  if (phase === 'intro') {
    return (
      <section className="game-section">
        <div className="game-intro">
          <h2 className="section-title">💼 Thử tài làm Nhà tư bản</h2>
          <p className="section-desc">
            Mô phỏng theo <strong>ví dụ sản xuất sợi</strong> (Slide 22–24) và 3 loại tư bản từ slide.
            Tính toán c, v, m, m&apos; trong chu trình T → H → T&apos;.
          </p>

          <div className="yarn-example-card compact">
            <h4>📌 Ví dụ gốc từ slide</h4>
            <p>
              Bông ${yarnExample.cotton} + Hao mòn ${yarnExample.depreciation} + v=${yarnExample.wage}
              → Chi phí ${yarnExample.cost} → W&apos;=${yarnExample.Wprime} → <strong>m=${yarnExample.m}</strong>, m&apos;={yarnExample.mRate}%
            </p>
          </div>

          <div className="game-rules">
            <h3>Luật chơi</h3>
            <ul>
              <li>Chọn loại tư bản: <strong>Công nghiệp</strong> (T—H—H&apos;—T&apos;), Thương nghiệp, Cho vay</li>
              <li>Điều chỉnh nguyên liệu, hao mòn, tiền công, giờ lao động</li>
              <li>Tối ưu <strong>m&apos; = m/v × 100%</strong> — tỷ suất bóc lột</li>
              <li>Chơi {ROUNDS} vòng, vốn T&apos; trở thành T vòng sau</li>
            </ul>
          </div>
          <button className="btn btn-primary btn-lg" onClick={startGame}>
            Bắt đầu kinh doanh
          </button>
        </div>
      </section>
    )
  }

  if (phase === 'result') {
    const avgMRate =
      history.filter((h) => h.mRate !== '—').length > 0
        ? (
            history
              .filter((h) => h.mRate !== '—')
              .reduce((s, h) => s + parseFloat(h.mRate), 0) /
            history.filter((h) => h.mRate !== '—').length
          ).toFixed(1)
        : '—'

    return (
      <section className="game-section">
        <div className="game-result">
          <h2 className="section-title">🏆 Kết quả — {ROUNDS} chu kỳ tư bản</h2>
          <div className="result-stats">
            <div className="stat-card">
              <span className="stat-label">Vốn ban đầu (T)</span>
              <span className="stat-value">{formatMoney(INITIAL_CAPITAL * 10)}</span>
            </div>
            <div className="stat-card highlight">
              <span className="stat-label">Vốn cuối (T&apos;)</span>
              <span className="stat-value green">{formatMoney(capital)}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Tổng m thu được</span>
              <span className="stat-value red">{formatMoney(totalM)}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">m&apos; trung bình</span>
              <span className="stat-value">{avgMRate}{avgMRate !== '—' ? '%' : ''}</span>
            </div>
          </div>

          <div className="history-table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Vòng</th>
                  <th>Loại TB</th>
                  <th>Công thức</th>
                  <th>c</th>
                  <th>v</th>
                  <th>m</th>
                  <th>m&apos;</th>
                  <th>W&apos;</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.round}>
                    <td>{h.round}</td>
                    <td>{h.type}</td>
                    <td className="formula-cell">{h.formula}</td>
                    <td>{formatMoney(h.c)}</td>
                    <td>{formatMoney(h.v)}</td>
                    <td className="red">{formatMoney(h.m)}</td>
                    <td>{h.mRate}{h.mRate !== '—' ? '%' : ''}</td>
                    <td className="green">{formatMoney(h.Wprime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="result-insight">
            Bạn đã trải nghiệm <strong>m = W&apos; − (c + v)</strong> và các dạng tư bản: thương nghiệp
            (T—H—T&apos;), công nghiệp (T—H—H&apos;—T&apos;), cho vay (T—T&apos;).
          </p>
          <button className="btn btn-primary" onClick={startGame}>Chơi lại</button>
        </div>
      </section>
    )
  }

  return (
    <section className="game-section">
      <div className="game-header-bar">
        <h2 className="section-title">💼 Thử tài làm Nhà tư bản</h2>
        <div className="game-status">
          <span className="status-badge">Vòng {round}/{ROUNDS}</span>
          <span className="status-capital">T = {formatMoney(capital)}</span>
          <span className="status-badge">{selected.formula}</span>
        </div>
      </div>

      <div className="game-layout">
        <div className="game-panel">
          <h3>1. Chọn loại tư bản</h3>
          <div className="industry-grid">
            {capitalTypes.map((ct) => (
              <button
                key={ct.id}
                className={`industry-btn ${capitalType === ct.id ? 'selected' : ''}`}
                onClick={() => setCapitalType(ct.id)}
              >
                <span className="ind-icon">{ct.icon}</span>
                <span className="ind-name">{ct.name}</span>
                <span className="ind-formula">{ct.formula}</span>
                <span className="ind-desc">{ct.description}</span>
              </button>
            ))}
          </div>

          {capitalType === 'industrial' && (
            <>
              <h3>2. Phân bổ vốn (T → H) — Ví dụ sợi</h3>
              <div className="allocation-controls">
                <div className="control-group">
                  <label>Tiền mua bông: <strong>${cotton}</strong></label>
                  <input type="range" min="5" max={Math.min(80, capital - 10)} value={cotton} onChange={(e) => setCotton(+e.target.value)} />
                </div>
                <div className="control-group">
                  <label>Hao mòn máy móc (TBCĐ): <strong>${depreciation}</strong></label>
                  <input type="range" min="1" max="20" value={depreciation} onChange={(e) => setDepreciation(+e.target.value)} />
                </div>
                <div className="control-group">
                  <label>Tiền mua SLĐ (v): <strong>${wage}</strong></label>
                  <input type="range" min="1" max="15" value={wage} onChange={(e) => setWage(+e.target.value)} />
                </div>
                <div className="control-group">
                  <label>Thời gian lao động: <strong>{hours} giờ</strong></label>
                  <input type="range" min="4" max="16" value={hours} onChange={(e) => setHours(+e.target.value)} />
                </div>
              </div>
            </>
          )}

          {capitalType !== 'industrial' && (
            <p className="mode-hint">
              {capitalType === 'commercial'
                ? 'Thương nghiệp: dùng T mua H, bán lại với markup 15%. Không qua sản xuất trực tiếp.'
                : 'Cho vay: T → T\' trực tiếp với lãi suất 12%/chu kỳ. Không có c, v.'}
            </p>
          )}

          <button className="btn btn-primary btn-lg" onClick={submitRound} disabled={!preview.valid}>
            {capitalType === 'industrial' ? 'Sản xuất H\' → Bán → T\'' : 'Hoàn thành chu kỳ → T\''}
          </button>
          {!preview.valid && <p className="error-msg">{preview.error}</p>}
        </div>

        <div className="game-preview">
          <h3>📊 Chu trình {preview.valid ? preview.formula : selected.formula}</h3>
          {preview.valid ? (
            <>
              <div className="preview-flow">
                <div className="flow-step">
                  <span className="flow-label">T (vốn)</span>
                  <span className="flow-value">{formatMoney(capital)}</span>
                </div>
                <div className="flow-arrow">↓ T → H (Mua)</div>
                {capitalType === 'industrial' && (
                  <>
                    <div className="flow-step">
                      <span className="flow-label">c = bông + hao mòn</span>
                      <span className="flow-value">${preview.breakdown?.cotton} + ${preview.breakdown?.depreciation} = {formatMoney(preview.c)}</span>
                    </div>
                    <div className="flow-step">
                      <span className="flow-label">v — Tiền công</span>
                      <span className="flow-value">{formatMoney(preview.v)}</span>
                    </div>
                    <div className="flow-arrow">↓ SX → H&apos;</div>
                    <div className="flow-step">
                      <span className="flow-label">Giá trị LĐ tạo ra ({hours}h × $0.5)</span>
                      <span className="flow-value">{formatMoney(preview.newValue)}</span>
                    </div>
                    <div className="flow-step">
                      <span className="flow-label">LĐ tất yếu / thặng dư</span>
                      <span className="flow-value">{preview.necessaryH}h / {preview.surplusH}h</span>
                    </div>
                  </>
                )}
                <div className="flow-step surplus">
                  <span className="flow-label">m = W&apos; − (c+v)</span>
                  <span className="flow-value red">{formatMoney(preview.m)}</span>
                </div>
                <div className="flow-step">
                  <span className="flow-label">m&apos; = m/v × 100%</span>
                  <span className="flow-value">{preview.mRate}{preview.mRate !== '—' ? '%' : ''}</span>
                </div>
                <div className="flow-arrow">↓ H&apos; → T&apos;</div>
                <div className="flow-step highlight">
                  <span className="flow-label">W&apos; / T&apos;</span>
                  <span className="flow-value green">{formatMoney(preview.Tprime)}</span>
                </div>
              </div>
              {lastResult && (
                <p className="last-round">Vòng trước: m={formatMoney(lastResult.m)}, m&apos;={lastResult.mRate}{lastResult.mRate !== '—' ? '%' : ''}</p>
              )}
            </>
          ) : (
            <p className="error-msg">{preview.error}</p>
          )}
        </div>
      </div>
    </section>
  )
}
