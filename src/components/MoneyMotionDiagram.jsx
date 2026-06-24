import { useState, useEffect } from 'react'
import { clothingExample } from '../data/section111'
import HTHVisualDiagram from './diagram/HTHVisualDiagram'
import THTVisualDiagram from './diagram/THTVisualDiagram'

const { capital, revenue, surplus, fabric, depreciation, wage, product } = clothingExample

const STEPS_HTH = [
  { node: 0, action: 'sell', label: 'Bán hàng (H → T)', desc: 'Người nông dân/thợ thủ công bán sản phẩm (tấm vải) lấy tiền' },
  { node: 1, action: 'hold', label: 'Nắm giữ tiền (T)', desc: 'Tiền là phương tiện trao đổi, chưa phải tư bản' },
  { node: 2, action: 'buy', label: 'Mua hàng (T → H)', desc: 'Dùng tiền mua lương thực, thực phẩm — thỏa mãn nhu cầu sử dụng' },
]

const STEPS_THT = [
  { node: 0, action: 'hold', label: `Tiền ban đầu (T = $${capital})`, desc: `Nhà tư bản nắm giữ vốn $${capital} — chuẩn bị mua nguyên liệu may quần áo.` },
  { node: 1, action: 'buy', label: 'Mua hàng (T → H)', desc: `MUA nguyên liệu vải ($${fabric}) + hao mòn máy ($${depreciation}) + sức lao động ($${wage}).` },
  { node: 2, action: 'produce', label: `Sản xuất → H' (${product})`, desc: `Công nhân may ${product} trong 12 giờ — sinh giá trị thặng dư m = $${surplus}.` },
  { node: 3, action: 'sell', label: `Bán hàng (H' → T' = $${revenue})`, desc: `BÁN quần áo, thu về T' = T + ΔT = $${capital} + $${surplus} = $${revenue}.` },
]

function FlowDiagram({ type, activeStep, playing }) {
  const isCapital = type === 'capital'

  if (!isCapital) {
    return (
      <div className={`motion-diagram ${type} ${playing ? 'playing' : ''}`}>
        <HTHVisualDiagram activeStep={activeStep} playing={playing} />
        <div className="diagram-formula-bar">
          <span className="formula-chip h">H</span>
          <span className="formula-arrow">→</span>
          <span className="formula-chip t">T</span>
          <span className="formula-arrow">→</span>
          <span className="formula-chip h">H</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`motion-diagram ${type} ${playing ? 'playing' : ''}`}>
      <THTVisualDiagram activeStep={activeStep} playing={playing} />
      <div className="diagram-formula-bar">
        <span className="formula-chip t">T</span>
        <span className="formula-arrow">→</span>
        <span className="formula-chip h">H</span>
        <span className="formula-arrow">→</span>
        <span className="formula-chip sx">H&apos;</span>
        <span className="formula-arrow">→</span>
        <span className="formula-chip tp">T&apos;</span>
      </div>
      <p className="tht-formula-note">T&apos; = T + ΔT · Ví dụ may quần áo: ${capital} → ${revenue} (m = ${surplus})</p>
    </div>
  )
}

export default function MoneyMotionDiagram() {
  const [view, setView] = useState('both') // both | hth | tht
  const [stepHTH, setStepHTH] = useState(0)
  const [stepTHT, setStepTHT] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const interval = setInterval(() => {
      setStepHTH((s) => (s + 1) % STEPS_HTH.length)
      setStepTHT((s) => (s + 1) % STEPS_THT.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [playing])

  function handleStep(type, delta) {
    setPlaying(false)
    if (type === 'hth') setStepHTH((s) => (s + delta + STEPS_HTH.length) % STEPS_HTH.length)
    else setStepTHT((s) => (s + delta + STEPS_THT.length) % STEPS_THT.length)
  }

  return (
    <div className="money-motion">
      <div className="motion-header">
        <h3>💱 Sự vận động của đồng tiền</h3>
        <p className="motion-sub">
          Lưu thông hàng hóa đơn giản: <strong>H — T — H</strong> · Lưu thông tư bản: <strong>T — H — T&apos;</strong>
        </p>
      </div>

      <div className="motion-view-tabs">
        <button className={`tab-btn ${view === 'both' ? 'active' : ''}`} onClick={() => setView('both')}>
          Song song
        </button>
        <button className={`tab-btn ${view === 'hth' ? 'active' : ''}`} onClick={() => setView('hth')}>
          H — T — H
        </button>
        <button className={`tab-btn ${view === 'tht' ? 'active' : ''}`} onClick={() => setView('tht')}>
          T — H — T&apos;
        </button>
      </div>

      <div className="motion-controls">
        <button className="btn btn-primary" onClick={() => setPlaying((p) => !p)}>
          {playing ? '⏸ Dừng' : '▶ Phát animation'}
        </button>
        {!playing && (
          <span className="control-hint">Hoặc dùng nút ← → bên dưới từng sơ đồ</span>
        )}
      </div>

      {(view === 'both' || view === 'hth') && (
        <div className="motion-panel">
          <div className="panel-tag simple">Lưu thông hàng hóa đơn giản</div>
          <FlowDiagram type="simple" activeStep={stepHTH} playing={playing} />
          <div className="step-info">
            <div className="step-badge">Bước {stepHTH + 1}/{STEPS_HTH.length}</div>
            <strong>{STEPS_HTH[stepHTH].label}</strong>
            <p>{STEPS_HTH[stepHTH].desc}</p>
          </div>
          <div className="step-nav">
            <button className="btn btn-ghost" onClick={() => handleStep('hth', -1)}>← Trước</button>
            <button className="btn btn-ghost" onClick={() => handleStep('hth', 1)}>Sau →</button>
          </div>
          <div className="purpose-tag use-value">🎯 Mục đích: Giá trị sử dụng</div>
        </div>
      )}

      {(view === 'both' || view === 'tht') && (
        <div className="motion-panel capital-panel">
          <div className="panel-tag capital">Lưu thông của tư bản</div>
          <FlowDiagram type="capital" activeStep={stepTHT} playing={playing} />
          <div className="step-info">
            <div className="step-badge">Bước {stepTHT + 1}/{STEPS_THT.length}</div>
            <strong>{STEPS_THT[stepTHT].label}</strong>
            <p>{STEPS_THT[stepTHT].desc}</p>
          </div>
          <div className="step-nav">
            <button className="btn btn-ghost" onClick={() => handleStep('tht', -1)}>← Trước</button>
            <button className="btn btn-ghost" onClick={() => handleStep('tht', 1)}>Sau →</button>
          </div>
          <div className="purpose-tag surplus-value">🎯 Mục đích: T&apos; = T + ΔT (giá trị thặng dư)</div>
        </div>
      )}
    </div>
  )
}
