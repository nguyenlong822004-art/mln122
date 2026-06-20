import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { FactoryScene, FactoryWorkerIcon } from '../components/diagram/TwelveHourIcons'
import {
  GAME,
  intensityLevels,
  dayTips,
  calcDayResult,
  getSatisfactionEmoji,
  getWorkerMood,
  getResultMessage,
} from '../data/twelveHourGame'

const HOUR_MS = 700

function scrollToGame(el) {
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 100
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

export default function TwelveHourGame() {
  const [phase, setPhase] = useState('intro')
  const [day, setDay] = useState(1)
  const [hours, setHours] = useState(GAME.standardHours)
  const [intensityId, setIntensityId] = useState('normal')
  const [satisfaction, setSatisfaction] = useState(GAME.satisfactionStart)
  const [totalM, setTotalM] = useState(0)
  const [history, setHistory] = useState([])
  const [animHour, setAnimHour] = useState(0)
  const [running, setRunning] = useState(false)
  const [lastDayResult, setLastDayResult] = useState(null)
  const [tipIndex, setTipIndex] = useState(0)
  const sectionRef = useRef(null)
  const timersRef = useRef([])

  const preview = useMemo(() => calcDayResult(hours, intensityId), [hours, intensityId])
  const workerMood = getWorkerMood(satisfaction)
  const satAfterPreview = Math.max(0, satisfaction - preview.satDrain)

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const finishDay = useCallback(() => {
    const result = calcDayResult(hours, intensityId)
    const newSat = Math.max(0, satisfaction - result.satDrain)
    const newTotalM = totalM + result.m

    setLastDayResult(result)
    setSatisfaction(newSat)
    setTotalM(newTotalM)
    setHistory((h) => [...h, { day, ...result, satisfactionAfter: newSat }])
    setRunning(false)
    setPhase('dayResult')
    setTipIndex((day - 1) % dayTips.length)

    if (newSat <= GAME.satisfactionStrike) {
      schedule(() => setPhase('final'), 2500)
      return
    }
    if (day >= GAME.totalDays) {
      schedule(() => setPhase('final'), 2500)
    }
  }, [hours, intensityId, satisfaction, totalM, day, schedule])

  const runProduction = useCallback(() => {
    setRunning(true)
    setAnimHour(0)
    setPhase('running')
    clearTimers()

    let h = 0
    function tick() {
      h += 1
      setAnimHour(h)
      if (h < hours) {
        schedule(tick, HOUR_MS)
      } else {
        schedule(finishDay, 600)
      }
    }
    schedule(tick, HOUR_MS)
  }, [hours, clearTimers, schedule, finishDay])

  const startWeek = useCallback(() => {
    clearTimers()
    setPhase('setup')
    setDay(1)
    setHours(GAME.standardHours)
    setIntensityId('normal')
    setSatisfaction(GAME.satisfactionStart)
    setTotalM(0)
    setHistory([])
    setAnimHour(0)
    setRunning(false)
    setLastDayResult(null)
    setTipIndex(0)
    setTimeout(() => scrollToGame(sectionRef.current), 100)
  }, [clearTimers])

  function nextDay() {
    if (satisfaction <= 0 || day >= GAME.totalDays) {
      setPhase('final')
      return
    }
    setDay((d) => d + 1)
    setAnimHour(0)
    setLastDayResult(null)
    setPhase('setup')
  }

  useEffect(() => {
    if (phase === 'dayResult') {
      setTimeout(() => scrollToGame(sectionRef.current), 150)
    }
  }, [phase])

  const finalResult = useMemo(
    () => getResultMessage(totalM, satisfaction, day, satisfaction <= 0),
    [totalM, satisfaction, day],
  )

  if (phase === 'intro') {
    return (
      <section className="game-section th-game" ref={sectionRef}>
        <div className="game-intro th-intro">
          <div className="th-intro-visual">
            <FactoryScene working={false} hour={6} totalHours={12} />
          </div>
          <h2 className="section-title">⏱️ Thử Thách Sản Xuất 12 Giờ</h2>
          <p className="section-desc">
            Mô phỏng <strong>Mục 1.1.3</strong> — bạn là nhà tư bản quản lý xưởng may. Phân bổ thời gian
            lao động: <strong>6 giờ cần thiết</strong> (bù lương v) và <strong>6 giờ thặng dư</strong> (m).
          </p>
          <div className="th-intro-split">
            <div className="th-split-box necessary">
              <span className="th-split-hours">6h</span>
              <strong>Lao động cần thiết</strong>
              <p>Tạo v = $3 (tiền công)</p>
            </div>
            <div className="th-split-arrow">+</div>
            <div className="th-split-box surplus">
              <span className="th-split-hours">6h</span>
              <strong>Lao động thặng dư</strong>
              <p>Tạo m = $3 (bị chiếm đoạt)</p>
            </div>
          </div>
          <div className="game-rules">
            <h3>Luật chơi</h3>
            <ul>
              <li>5 ngày sản xuất — mục tiêu tích lũy m, giữ công nhân không đình công</li>
              <li>Lương <strong>v = $3 cố định</strong> — kéo dài giờ làm không tăng lương!</li>
              <li>Tăng cường độ → m tăng nhanh nhưng <strong>hài lòng</strong> giảm mạnh</li>
              <li>Hài lòng = 0 → đình công, game over</li>
            </ul>
          </div>
          <button type="button" className="btn btn-primary btn-lg" onClick={startWeek}>
            Bắt đầu ca sản xuất
          </button>
        </div>
      </section>
    )
  }

  if (phase === 'final') {
    return (
      <section className="game-section th-game" ref={sectionRef}>
        <div className={`game-result th-result th-result-${finalResult.type}`}>
          <div className="th-result-chars">
            <FactoryWorkerIcon mood={satisfaction > 40 ? 'happy' : 'angry'} />
          </div>
          <h2 className="section-title">{finalResult.title}</h2>
          <p className="cfg-result-body">{finalResult.body}</p>
          <div className="result-stats">
            <div className="stat-card highlight">
              <span className="stat-label">Tổng m tích lũy</span>
              <span className="stat-value red">${totalM.toFixed(1)}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Tổng v trả công nhân</span>
              <span className="stat-value">${(GAME.wage * history.length).toFixed(0)}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Hài lòng cuối</span>
              <span className="stat-value">{Math.round(satisfaction)}%</span>
            </div>
          </div>
          <div className="formula-box">
            <code>m = T&apos; − (c + v) = ${totalM.toFixed(1)} (tích lũy tuần)</code>
          </div>
          {history.length > 0 && (
            <div className="history-table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Ngày</th>
                    <th>Giờ</th>
                    <th>v</th>
                    <th>m</th>
                    <th>Hài lòng</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row) => (
                    <tr key={row.day}>
                      <td>{row.day}</td>
                      <td>{row.hours}h</td>
                      <td>${row.v}</td>
                      <td className="green">${row.m.toFixed(1)}</td>
                      <td>{Math.round(row.satisfactionAfter)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button type="button" className="btn btn-primary" onClick={startWeek}>
            Chơi lại
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="game-section th-game" ref={sectionRef}>
      <div className="game-header-bar">
        <h2 className="section-title">⏱️ Thử Thách 12 Giờ</h2>
        <div className="game-status">
          <span className="status-badge">📅 Ngày {day}/{GAME.totalDays}</span>
          <span className="status-badge green">m tích lũy: ${totalM.toFixed(1)}</span>
          <span className="status-badge">
            {getSatisfactionEmoji(satisfaction)} {Math.round(satisfaction)}%
          </span>
        </div>
      </div>

      <FactoryScene
        working={running || phase === 'running'}
        hour={phase === 'running' ? animHour : Math.min(hours, GAME.necessaryHours)}
        totalHours={hours}
        workerMood={workerMood}
      />

      {(phase === 'setup' || phase === 'running') && (
        <>
          <div className="th-dual-bars">
            <div className="th-bar-col surplus-col">
              <div className="th-bar-header">
                <span>📈 Cột thặng dư (m)</span>
                <strong className="th-bar-value green">${preview.m.toFixed(1)}</strong>
              </div>
              <div className="th-bar-track">
                <div
                  className="th-bar-fill surplus-fill"
                  style={{ width: `${Math.min(100, (preview.m / 6) * 100)}%` }}
                />
              </div>
              <p className="th-bar-hint">m&apos; ≈ {preview.mRate}%</p>
            </div>
            <div className="th-bar-col sat-col">
              <div className="th-bar-header">
                <span>💙 Cột hài lòng</span>
                <strong className="th-bar-value">{Math.round(satAfterPreview)}%</strong>
              </div>
              <div className="th-bar-track">
                <div
                  className="th-bar-fill sat-fill"
                  style={{ width: `${satAfterPreview}%` }}
                />
              </div>
              <p className="th-bar-hint">Dự báo sau ca: {getSatisfactionEmoji(satAfterPreview)}</p>
            </div>
          </div>

          <div className="th-timeline">
            <p className="th-timeline-label">Phân bổ thời gian lao động ({hours}h)</p>
            <div className="th-timeline-track">
              {[...Array(hours)].map((_, i) => {
                const isNecessary = i < GAME.necessaryHours
                const isActive = phase === 'running' && i < animHour
                const isCurrent = phase === 'running' && i === animHour - 1
                return (
                  <div
                    key={i}
                    className={`th-hour-slot ${isNecessary ? 'necessary' : 'surplus'} ${isActive ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                    title={isNecessary ? 'Lao động cần thiết' : 'Lao động thặng dư'}
                  >
                    <span>{i + 1}</span>
                  </div>
                )
              })}
            </div>
            <div className="th-timeline-legend">
              <span className="leg-necessary">■ 6h đầu → v = $3</span>
              <span className="leg-surplus">■ Còn lại → m</span>
            </div>
          </div>

          {phase === 'setup' && (
            <div className="th-controls">
              <div className="control-group">
                <label>
                  Giờ làm việc: <span className="control-value">{hours}h</span>
                  {hours > GAME.standardHours && (
                    <span className="th-overtime-badge">+{hours - GAME.standardHours}h tăng ca</span>
                  )}
                </label>
                <input
                  type="range"
                  min={GAME.minHours}
                  max={GAME.maxHours}
                  value={hours}
                  onChange={(e) => setHours(+e.target.value)}
                />
              </div>

              <div className="th-intensity-grid">
                {intensityLevels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    className={`th-intensity-btn ${intensityId === level.id ? 'selected' : ''}`}
                    onClick={() => setIntensityId(level.id)}
                  >
                    <span className="th-int-icon">{level.icon}</span>
                    <span className="th-int-name">{level.label}</span>
                    <span className="th-int-mult">×{level.mult} giá trị</span>
                    <span className="th-int-desc">{level.desc}</span>
                  </button>
                ))}
              </div>

              <div className="th-preview-box">
                <div className="th-preview-row">
                  <span>Giá trị mới ({hours}h × ${GAME.valuePerHour} × {preview.level.mult})</span>
                  <strong>${preview.newValue.toFixed(1)}</strong>
                </div>
                <div className="th-preview-row">
                  <span>Tiền công v (cố định)</span>
                  <strong>− ${preview.v}</strong>
                </div>
                <div className="th-preview-row highlight">
                  <span>Giá trị thặng dư m</span>
                  <strong className="green">${preview.m.toFixed(1)}</strong>
                </div>
              </div>

              <div className="th-worker-status">
                <FactoryWorkerIcon mood={workerMood} />
                <p>Công nhân: {getSatisfactionEmoji(satisfaction)} hài lòng {Math.round(satisfaction)}%</p>
              </div>

              <button type="button" className="btn btn-primary btn-lg th-start-btn" onClick={runProduction}>
                🏭 Bắt đầu ca {hours} giờ
              </button>
            </div>
          )}

          {phase === 'running' && (
            <div className="th-running-status">
              <p className="th-running-label">
                {animHour <= GAME.necessaryHours ? (
                  <>⏳ Giờ {animHour}/{hours} — <strong className="necessary-text">Lao động cần thiết</strong> (bù v)</>
                ) : (
                  <>🔥 Giờ {animHour}/{hours} — <strong className="surplus-text">Lao động thặng dư</strong> (tạo m)</>
                )}
              </p>
              <div className="cfg-np-dots th-dots"><span /><span /><span /></div>
            </div>
          )}
        </>
      )}

      {phase === 'dayResult' && lastDayResult && (
        <div className="th-day-result">
          <h3>📋 Kết quả ngày {day}</h3>
          <div className="th-day-result-grid">
            <div className="th-dr-item">
              <span>Giá trị mới</span>
              <strong>${lastDayResult.newValue.toFixed(1)}</strong>
            </div>
            <div className="th-dr-item">
              <span>Lương v</span>
              <strong>${lastDayResult.v}</strong>
            </div>
            <div className="th-dr-item highlight">
              <span>Thặng dư m</span>
              <strong className="green">+${lastDayResult.m.toFixed(1)}</strong>
            </div>
            <div className="th-dr-item">
              <span>Hài lòng</span>
              <strong>{getSatisfactionEmoji(satisfaction)} {Math.round(satisfaction)}%</strong>
            </div>
          </div>
          <p className="th-day-tip">💡 {dayTips[tipIndex]}</p>
          {satisfaction <= 0 ? (
            <p className="feedback error">Công nhân đình công! Không thể tiếp tục.</p>
          ) : day < GAME.totalDays ? (
            <button type="button" className="btn btn-primary btn-lg" onClick={nextDay}>
              Ngày tiếp theo →
            </button>
          ) : (
            <button type="button" className="btn btn-primary btn-lg" onClick={() => setPhase('final')}>
              Xem tổng kết tuần
            </button>
          )}
        </div>
      )}
    </section>
  )
}
