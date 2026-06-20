import { useState, useEffect, useCallback, useRef } from 'react'
import { MoneyIcon, FoodIcon, ClothIcon } from './diagram/HTHIcons'
import { FactoryIcon, MoneyPlusIcon } from './diagram/THTIcons'

const BASE_AMOUNT = 10

const CONSUMPTION_ITEMS = [
  { id: 'food', icon: '🧺', label: 'Giỏ đồ ăn', Svg: FoodIcon },
  { id: 'bill', icon: '🧾', label: 'Hóa đơn điện' },
  { id: 'medicine', icon: '💊', label: 'Tiền thuốc men' },
  { id: 'clothes', icon: '👕', label: 'Quần áo hàng ngày' },
]

const CAPITAL_STEPS = [
  { id: 'fabric', label: 'Mua vải nguyên liệu', Svg: ClothIcon },
  { id: 'wage', label: 'Trả lương thợ may', emoji: '👷' },
  { id: 'machine', label: 'Máy may sản xuất', Svg: FactoryIcon },
  { id: 'sell', label: 'Bán quần áo', emoji: '👕' },
  { id: 'return', label: "Thu T' gấp đôi", Svg: MoneyPlusIcon },
]

const MESSAGES = {
  consumption: {
    title: 'H — T — H',
    text: 'Bạn vừa dùng Tiền như một phương tiện lưu thông thông thường để thỏa mãn nhu cầu cuộc sống (H—T—H). Ở đây, tiền chỉ là vật ngang giá, tiêu đi là hết và không tự sinh thêm tiền.',
  },
  capital: {
    title: "T — H — T'",
    text: "Chính xác! Bạn vừa biến Tiền thành Tư bản (T—H—T'). Khi tiền được ném vào sản xuất (mua vải, thuê thợ), nó có một 'quyền năng đặc biệt' là quay trở lại túi bạn với số lượng lớn hơn ban đầu. Đây chính là hình thức biểu hiện đầu tiên của tư bản!",
  },
}

function DraggableCoin({ amount, disabled, onDragStart, doubled, animating }) {
  return (
    <div
      className={`mf-coin ${disabled ? 'disabled' : ''} ${doubled ? 'doubled' : ''} ${animating ? 'animating' : ''}`}
      draggable={!disabled && !animating}
      onDragStart={(e) => {
        if (disabled || animating) {
          e.preventDefault()
          return
        }
        e.dataTransfer.setData('text/plain', 'coin')
        e.dataTransfer.effectAllowed = 'move'
        onDragStart()
      }}
      role="button"
      tabIndex={disabled || animating ? -1 : 0}
      aria-label={`Kéo xấp tiền $${amount}`}
      aria-disabled={disabled || animating}
    >
      <div className="mf-coin-icon">
        {doubled ? <MoneyPlusIcon /> : <MoneyIcon />}
      </div>
      <span className="mf-coin-amount">${amount}</span>
      {!disabled && !animating && <span className="mf-coin-hint">Kéo thả ↓</span>}
    </div>
  )
}

function DropZone({ type, title, formula, subtitle, dragOver, children, onDrop, onDragOver, onDragLeave, disabled }) {
  return (
    <div
      className={`mf-zone mf-zone-${type} ${dragOver === type ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
      onDragOver={(e) => {
        if (disabled) return
        e.preventDefault()
        onDragOver(type)
      }}
      onDragLeave={onDragLeave}
      onDrop={(e) => {
        if (disabled) return
        e.preventDefault()
        onDrop(type)
      }}
      aria-label={`Vùng thả ${title}`}
    >
      <div className="mf-zone-header">
        <span className={`mf-zone-formula ${type}`}>{formula}</span>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
      <div className="mf-zone-body">{children}</div>
    </div>
  )
}

export default function MoneyFlowDrag() {
  const [phase, setPhase] = useState('idle') // idle | consume-anim | capital-anim | message
  const [dragOver, setDragOver] = useState(null)
  const [paidItem, setPaidItem] = useState(null)
  const [capitalStep, setCapitalStep] = useState(-1)
  const [messageTarget, setMessageTarget] = useState(null)
  const [coinVisible, setCoinVisible] = useState(true)
  const [coinAmount, setCoinAmount] = useState(BASE_AMOUNT)
  const [coinDoubled, setCoinDoubled] = useState(false)
  const [consumeFlash, setConsumeFlash] = useState(null)
  const timersRef = useRef([])

  const busy = phase !== 'idle' && phase !== 'message'

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const reset = useCallback(() => {
    clearTimers()
    setPhase('idle')
    setDragOver(null)
    setPaidItem(null)
    setCapitalStep(-1)
    setMessageTarget(null)
    setCoinVisible(true)
    setCoinAmount(BASE_AMOUNT)
    setCoinDoubled(false)
    setConsumeFlash(null)
  }, [clearTimers])

  useEffect(() => () => clearTimers(), [clearTimers])

  function schedule(fn, ms) {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
  }

  function handleDrop(type) {
    setDragOver(null)
    if (busy) return

    if (type === 'consumption') {
      setPhase('consume-anim')
      setCoinVisible(false)
      const item = CONSUMPTION_ITEMS[Math.floor(Math.random() * CONSUMPTION_ITEMS.length)]
      setConsumeFlash(item.id)
      schedule(() => setPaidItem(item.id), 400)
      schedule(() => {
        setMessageTarget('consumption')
        setPhase('message')
      }, 1200)
      return
    }

    setPhase('capital-anim')
    setCoinVisible(false)
    setCapitalStep(0)

    CAPITAL_STEPS.forEach((_, i) => {
      schedule(() => setCapitalStep(i), i * 850)
    })

    schedule(() => {
      setCoinAmount(BASE_AMOUNT * 2)
      setCoinDoubled(true)
      setCoinVisible(true)
    }, CAPITAL_STEPS.length * 850)

    schedule(() => {
      setMessageTarget('capital')
      setPhase('message')
    }, CAPITAL_STEPS.length * 850 + 1000)
  }

  const msg = messageTarget ? MESSAGES[messageTarget] : null

  return (
    <div className="money-flow">
      <div className="mf-source">
        <p className="mf-source-label">💰 Nguồn tiền — Kéo xuống một trong hai hộp bên dưới</p>
        <div className="mf-coin-tray">
          {coinVisible ? (
            <DraggableCoin
              amount={coinAmount}
              disabled={phase === 'message'}
              animating={busy}
              doubled={coinDoubled}
              onDragStart={() => setDragOver(null)}
            />
          ) : (
            <div className="mf-coin-placeholder" aria-hidden="true">
              <span className="mf-coin-flying">💸</span>
            </div>
          )}
        </div>
      </div>

      <div className="mf-arena">
        <DropZone
          type="consumption"
          title="Tiêu dùng — Nhu cầu sống"
          formula="H — T — H"
          subtitle="Bán hàng → Lấy tiền → Mua nhu cầu sống"
          dragOver={dragOver}
          disabled={busy}
          onDragOver={setDragOver}
          onDragLeave={() => setDragOver(null)}
          onDrop={handleDrop}
        >
          <div className="mf-items-grid">
            {CONSUMPTION_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`mf-item ${paidItem === item.id ? 'paid' : ''} ${consumeFlash === item.id ? 'flash' : ''}`}
              >
                <div className="mf-item-icon">
                  {item.Svg ? <item.Svg /> : <span className="mf-item-emoji">{item.icon}</span>}
                </div>
                <span className="mf-item-label">{item.label}</span>
                {paidItem === item.id && <span className="mf-paid-stamp">Đã thanh toán</span>}
              </div>
            ))}
          </div>
        </DropZone>

        <DropZone
          type="capital"
          title="Tư bản — Đầu tư sinh lời"
          formula="T — H — T'"
          subtitle="Dùng tiền mua yếu tố sản xuất → Kiếm nhiều tiền hơn"
          dragOver={dragOver}
          disabled={busy}
          onDragOver={setDragOver}
          onDragLeave={() => setDragOver(null)}
          onDrop={handleDrop}
        >
          <div className={`mf-capital-stage ${phase === 'capital-anim' ? 'running' : ''}`}>
            {CAPITAL_STEPS.map((step, i) => (
              <div
                key={step.id}
                className={`mf-capital-step ${capitalStep >= i ? 'active' : ''} ${capitalStep === i ? 'current' : ''}`}
              >
                <div className="mf-capital-step-icon">
                  {step.Svg ? <step.Svg /> : <span className="mf-item-emoji">{step.emoji}</span>}
                  {step.id === 'machine' && capitalStep === i && (
                    <div className="mf-smoke-wrap" aria-hidden="true">
                      <span className="mf-smoke s1" />
                      <span className="mf-smoke s2" />
                      <span className="mf-smoke s3" />
                    </div>
                  )}
                </div>
                <span className="mf-capital-step-label">{step.label}</span>
              </div>
            ))}
            {capitalStep >= 3 && phase === 'capital-anim' && (
              <div className="mf-clothes-fly" aria-hidden="true">👕 → 💵</div>
            )}
          </div>
        </DropZone>
      </div>

      {phase === 'message' && msg && (
        <div className={`mf-message mf-message-${messageTarget}`} role="status">
          <span className="mf-message-formula">{msg.title}</span>
          <p>{msg.text}</p>
          <button type="button" className="btn btn-primary" onClick={reset}>
            Thử lại với ${BASE_AMOUNT}
          </button>
        </div>
      )}

      {phase === 'idle' && (
        <p className="mf-hint">💡 Mẹo: Thử cả hai hộp để thấy tiền &quot;tiêu hết&quot; và tiền &quot;sinh lời&quot; khác nhau thế nào.</p>
      )}
    </div>
  )
}
