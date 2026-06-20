import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import {
  productionSteps,
  circulationSteps,
  obstacles,
  BASE_PROD_DAYS,
  BASE_CIRC_DAYS,
  PENALTY_PROD_DAYS,
  PENALTY_CIRC_DAYS,
  FREEZE_MS,
  CH_YEAR,
  getResultMessage,
} from '../data/capitalFlowGame'

const STEP_MS = 1400

function FlowToken({ progress, frozen, region }) {
  return (
    <div
      className={`cfg-token ${frozen ? 'frozen' : ''} ${region}`}
      style={{ left: `${Math.min(progress, 98)}%` }}
      aria-hidden="true"
    >
      <span className="cfg-token-inner">💰</span>
      {frozen && <span className="cfg-freeze-badge">❄️</span>}
    </div>
  )
}

function ConveyorItems({ items, activeIndex, region, activeItemRef, obstacleActive }) {
  return (
    <div className={`cfg-conveyor-items ${region}`}>
      {items.map((step, i) => (
        <div
          key={step.id}
          ref={i === activeIndex ? activeItemRef : null}
          className={`cfg-conveyor-item ${i < activeIndex ? 'done' : ''} ${i === activeIndex ? 'active' : ''} ${i === activeIndex && obstacleActive ? 'obstacle-step' : ''}`}
        >
          <span className="cfg-ci-icon">{step.icon}</span>
          <span className="cfg-ci-label">{step.label}</span>
        </div>
      ))}
    </div>
  )
}

const SCROLL_OFFSET = 100

function scrollToGameArea(el, align = 'center') {
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const rect = el.getBoundingClientRect()
  const viewportH = window.innerHeight

  if (align === 'nearest') {
    const inView = rect.top >= SCROLL_OFFSET && rect.bottom <= viewportH - 24
    if (inView) return
  }

  let top
  if (align === 'start') {
    top = window.scrollY + rect.top - SCROLL_OFFSET
  } else if (align === 'nearest') {
    top = window.scrollY + rect.top - SCROLL_OFFSET
  } else {
    top = window.scrollY + rect.top - viewportH / 2 + rect.height / 2
  }

  window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'instant' : 'smooth' })
}

export default function CapitalFlowGame() {
  const [phase, setPhase] = useState('intro')
  const [region, setRegion] = useState('production')
  const [stepIndex, setStepIndex] = useState(0)
  const [prodTime, setProdTime] = useState(BASE_PROD_DAYS)
  const [circTime, setCircTime] = useState(BASE_CIRC_DAYS)
  const [wrongCount, setWrongCount] = useState(0)
  const [obstacleKey, setObstacleKey] = useState(null)
  const [frozen, setFrozen] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [animPulse, setAnimPulse] = useState(false)
  const timersRef = useRef([])
  const sectionRef = useRef(null)
  const arenaRef = useRef(null)
  const activeStepRef = useRef(null)
  const obstaclePanelRef = useRef(null)
  const freezePanelRef = useRef(null)

  const steps = region === 'production' ? productionSteps : circulationSteps
  const currentStep = steps[stepIndex]

  const totalSteps = productionSteps.length + circulationSteps.length
  const globalIndex =
    region === 'production' ? stepIndex : productionSteps.length + stepIndex
  const overallProgress = ((globalIndex + (phase === 'playing' ? 0.5 : 0)) / totalSteps) * 100

  const regionProgress =
    steps.length > 1 ? ((stepIndex + 0.5) / steps.length) * 100 : 50

  const ch = prodTime + circTime
  const N = useMemo(() => (ch > 0 ? (CH_YEAR / ch).toFixed(1) : '0'), [ch])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  useEffect(() => {
    if (phase !== 'obstacle' || !obstacleKey) return

    const timer = setTimeout(() => {
      scrollToGameArea(arenaRef.current, 'start')
      setTimeout(() => scrollToGameArea(obstaclePanelRef.current, 'nearest'), 300)
    }, 80)

    return () => clearTimeout(timer)
  }, [phase, obstacleKey, stepIndex, region])

  useEffect(() => {
    if (!frozen) return

    const timer = setTimeout(() => {
      scrollToGameArea(activeStepRef.current, 'center')
      setTimeout(() => scrollToGameArea(freezePanelRef.current, 'nearest'), 280)
    }, 80)

    return () => clearTimeout(timer)
  }, [frozen])

  useEffect(() => {
    if (phase !== 'result') return
    setTimeout(() => scrollToGameArea(sectionRef.current, 'start'), 100)
  }, [phase])

  const startGame = useCallback(() => {
    clearTimers()
    setPhase('playing')
    setRegion('production')
    setStepIndex(0)
    setProdTime(BASE_PROD_DAYS)
    setCircTime(BASE_CIRC_DAYS)
    setWrongCount(0)
    setObstacleKey(null)
    setFrozen(false)
    setFeedback(null)
    setAnimPulse(true)
    setTimeout(() => scrollToGameArea(sectionRef.current, 'start'), 120)
  }, [clearTimers])

  const finishGame = useCallback(() => {
    setPhase('result')
    setAnimPulse(false)
  }, [])

  const advanceStep = useCallback(() => {
    setAnimPulse((p) => !p)

    if (currentStep?.obstacle) {
      setPhase('obstacle')
      setObstacleKey(currentStep.obstacle)
      setFeedback(null)
      return
    }

    if (stepIndex + 1 >= steps.length) {
      if (region === 'production') {
        setRegion('circulation')
        setStepIndex(0)
        setFeedback({ type: 'info', text: '🛒 Chặng 2: Vốn ra thị trường — bán hàng thu tiền!' })
        schedule(() => setFeedback(null), 2500)
        schedule(() => scrollToGameArea(arenaRef.current, 'start'), 200)
      } else {
        finishGame()
      }
      return
    }

    setStepIndex((i) => i + 1)
  }, [currentStep, stepIndex, steps.length, region, finishGame, schedule])

  useEffect(() => {
    if (phase !== 'playing' || frozen) return
    const id = setTimeout(advanceStep, STEP_MS)
    timersRef.current.push(id)
    return () => clearTimeout(id)
  }, [phase, frozen, stepIndex, region, advanceStep])

  function handleObstacleAnswer(optionIndex) {
    const obs = obstacles[obstacleKey]
    if (!obs) return

    if (optionIndex === obs.correct) {
      setFeedback({ type: 'success', text: obs.success })
      schedule(() => {
        setObstacleKey(null)
        setFeedback(null)
        setPhase('playing')
        setStepIndex((i) => i + 1)
      }, 1500)
    } else {
      setWrongCount((w) => w + 1)
      if (obstacleKey === 'machine') {
        setProdTime((t) => t + PENALTY_PROD_DAYS)
      } else {
        setCircTime((t) => t + PENALTY_CIRC_DAYS)
      }
      setFeedback({ type: 'error', text: obs.fail })
      setFrozen(true)
      requestAnimationFrame(() => {
        scrollToGameArea(arenaRef.current, 'start')
      })
      schedule(() => {
        setFrozen(false)
        setObstacleKey(null)
        setFeedback(null)
        setPhase('playing')
        setStepIndex((i) => i + 1)
      }, FREEZE_MS)
    }
  }

  const obs = obstacleKey ? obstacles[obstacleKey] : null
  const result = phase === 'result' ? getResultMessage(ch, wrongCount) : null

  if (phase === 'intro') {
    return (
      <section className="game-section cfg-game">
        <div className="game-intro">
          <h2 className="section-title">🏁 Đường đua Dòng vốn</h2>
          <p className="section-desc">
            Mô phỏng 2 chặng: <strong>Sản xuất</strong> (vốn trong nhà xưởng) và{' '}
            <strong>Lưu thông</strong> (vốn ra thị trường). Vượt chướng ngại bằng trắc nghiệm để
            giữ <em>ch</em> thấp và <em>N</em> cao!
          </p>

          <div className="cfg-intro-zones">
            <div className="cfg-zone-preview production">
              <span className="cfg-zp-icon">🏭</span>
              <h4>Chặng 1 — Sản xuất</h4>
              <p>Vải → Lương thợ → Máy may → Quần áo</p>
              <small>⚠️ Hao mòn TBCĐ</small>
            </div>
            <div className="cfg-zone-arrow">→</div>
            <div className="cfg-zone-preview circulation">
              <span className="cfg-zp-icon">🛒</span>
              <h4>Chặng 2 — Lưu thông</h4>
              <p>Đóng thùng → Bán hàng → Thu T&apos;</p>
              <small>⚠️ Hàng tồn kho</small>
            </div>
          </div>

          <div className="game-rules">
            <h3>Luật chơi</h3>
            <ul>
              <li>Dòng vốn tự chạy trên băng chuyền — gặp sự cố thì dừng, trả lời câu hỏi</li>
              <li>Trả lời <strong>đúng</strong> → tiếp tục ngay</li>
              <li>Trả lời <strong>sai</strong> → đóng băng 5 giây + tăng ts hoặc tl</li>
              <li>Kết thúc: tính <strong>ch = ts + tl</strong> và <strong>N = 360/ch</strong></li>
            </ul>
          </div>
          <button type="button" className="btn btn-primary btn-lg" onClick={startGame}>
            Bắt đầu đường đua
          </button>
        </div>
      </section>
    )
  }

  if (phase === 'result' && result) {
    return (
      <section className="game-section cfg-game" ref={sectionRef}>
        <div className={`game-result cfg-result cfg-result-${result.type}`}>
          <h2 className="section-title">{result.title}</h2>
          <p className="cfg-result-body">{result.body}</p>

          <div className="result-stats">
            <div className="stat-card">
              <span className="stat-label">Thời gian sản xuất (ts)</span>
              <span className="stat-value">{prodTime} ngày</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Thời gian lưu thông (tl)</span>
              <span className="stat-value">{circTime} ngày</span>
            </div>
            <div className="stat-card highlight">
              <span className="stat-label">ch = ts + tl</span>
              <span className="stat-value">{ch} ngày</span>
            </div>
            <div className="stat-card highlight">
              <span className="stat-label">N = 360 / ch</span>
              <span className="stat-value green">{N} vòng/năm</span>
            </div>
          </div>

          <div className="time-bar-chart result-chart">
            <div
              className="time-bar production"
              style={{ width: `${(prodTime / ch) * 100}%` }}
            >
              ts: {prodTime}d
            </div>
            <div
              className="time-bar circulation"
              style={{ width: `${(circTime / ch) * 100}%` }}
            >
              tl: {circTime}d
            </div>
          </div>

          <p className="result-insight">
            T&apos; = T + m — vốn quay càng nhanh (N lớn), nhà tư bản bóc lột được nhiều m hơn
            trong cùng một năm.
          </p>
          <button type="button" className="btn btn-primary" onClick={startGame}>
            Chơi lại
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="game-section cfg-game" ref={sectionRef}>
      <div className="game-header-bar">
        <h2 className="section-title">🏁 Đường đua Dòng vốn</h2>
        <div className="game-status">
          <span className="status-badge">🏭 ts={prodTime}d</span>
          <span className="status-badge">🛒 tl={circTime}d</span>
          <span className="status-badge">ch={ch}d</span>
          <span className="status-badge green">N≈{N}</span>
        </div>
      </div>

      <div className="cfg-overall-bar">
        <div className="cfg-overall-fill" style={{ width: `${overallProgress}%` }} />
        <span className="cfg-overall-label">Tiến độ vòng quay: {Math.round(overallProgress)}%</span>
      </div>

      <div className="cfg-arena" ref={arenaRef}>
        {/* Chặng 1 */}
        <div className={`cfg-zone cfg-zone-production ${region === 'production' ? 'active' : 'done'}`}>
          <div className="cfg-zone-header">
            <span className="cfg-zone-badge">🛑 Chặng 1</span>
            <h3>Giai đoạn Sản xuất</h3>
            <p>Vốn nằm trong nhà xưởng</p>
          </div>
          <div className={`cfg-belt ${region === 'production' && animPulse ? 'running' : ''} ${frozen ? 'frozen-belt' : ''}`}>
            <div className="cfg-belt-track" />
            <div className="cfg-smoke-factory" aria-hidden="true">
              {region === 'production' && <><span /><span /><span /></>}
            </div>
            {region === 'production' && (
              <FlowToken progress={regionProgress} frozen={frozen} region="production" />
            )}
            <ConveyorItems
              items={productionSteps}
              activeIndex={region === 'production' ? stepIndex : productionSteps.length}
              region="production"
              activeItemRef={region === 'production' ? activeStepRef : null}
              obstacleActive={phase === 'obstacle' && region === 'production'}
            />
          </div>
        </div>

        {/* Chặng 2 */}
        <div className={`cfg-zone cfg-zone-circulation ${region === 'circulation' ? 'active' : ''}`}>
          <div className="cfg-zone-header">
            <span className="cfg-zone-badge">🛒 Chặng 2</span>
            <h3>Giai đoạn Lưu thông</h3>
            <p>Vốn ra thị trường</p>
          </div>
          <div className={`cfg-belt circulation ${region === 'circulation' && animPulse ? 'running' : ''} ${frozen ? 'frozen-belt' : ''}`}>
            <div className="cfg-belt-track" />
            {region === 'circulation' && (
              <FlowToken progress={regionProgress} frozen={frozen} region="circulation" />
            )}
            <ConveyorItems
              items={circulationSteps}
              activeIndex={region === 'circulation' ? stepIndex : -1}
              region="circulation"
              activeItemRef={region === 'circulation' ? activeStepRef : null}
              obstacleActive={phase === 'obstacle' && region === 'circulation'}
            />
          </div>
        </div>
      </div>

      {phase === 'obstacle' && obs && (
        <div
          className="cfg-obstacle-panel"
          ref={obstaclePanelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cfg-obstacle-title"
        >
          <div className="cfg-obstacle-anchor">
            <span className="cfg-obstacle-step-icon">{currentStep?.icon}</span>
            <span className="cfg-obstacle-step-label">{currentStep?.label}</span>
          </div>
          <div className="cfg-obstacle-card">
            <h3 id="cfg-obstacle-title">{obs.title}</h3>
            <p className="cfg-obstacle-insight">{obs.insight}</p>
            <p className="quiz-q">{obs.question}</p>
            <div className="quiz-options">
              {obs.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className="quiz-opt"
                  onClick={() => handleObstacleAnswer(i)}
                  disabled={!!feedback}
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback && <p className={`feedback ${feedback.type}`}>{feedback.text}</p>}
            {frozen && (
              <div className="cfg-freeze-panel" ref={freezePanelRef} role="status" aria-live="polite">
                <span className="cfg-freeze-text">❄️ Dòng vốn đóng băng...</span>
                <p className="cfg-freeze-hint">Chờ vốn tan băng để tiếp tục trên băng chuyền</p>
                <div className="cfg-freeze-bar" />
              </div>
            )}
          </div>
        </div>
      )}

      {feedback && phase !== 'obstacle' && (
        <p className={`cfg-toast ${feedback.type}`}>{feedback.text}</p>
      )}

      {currentStep && phase === 'playing' && !frozen && (
        <div className="cfg-now-playing">
          <span className="cfg-np-icon">{currentStep.icon}</span>
          <span>{currentStep.label}</span>
          <span className="cfg-np-dots"><span /><span /><span /></span>
        </div>
      )}
    </section>
  )
}
