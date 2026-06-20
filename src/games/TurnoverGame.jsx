import { useState, useCallback, useMemo } from 'react'
import { turnoverStages, quizQuestions } from '../data/content'

function getRandomQuestion(usedIndices) {
  const available = quizQuestions.map((_, i) => i).filter((i) => !usedIndices.includes(i))
  if (available.length === 0) return { index: 0, question: quizQuestions[0] }
  const index = available[Math.floor(Math.random() * available.length)]
  return { index, question: quizQuestions[index] }
}

export default function TurnoverGame() {
  const [phase, setPhase] = useState('intro')
  const [currentStage, setCurrentStage] = useState(0)
  const [capital, setCapital] = useState(27)
  const [prodTime, setProdTime] = useState(0)
  const [circTime, setCircTime] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [obstacle, setObstacle] = useState(null)
  const [usedQuestions, setUsedQuestions] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [finished, setFinished] = useState(false)

  const stage = turnoverStages[currentStage]
  const progress = ((currentStage / (turnoverStages.length - 1)) * 100).toFixed(0)

  const timeStats = useMemo(() => {
    const ch = prodTime + circTime
    const N = ch > 0 ? (365 / ch).toFixed(2) : '—'
    return { ch, N, prodTime, circTime }
  }, [prodTime, circTime])

  const startGame = useCallback(() => {
    setPhase('playing')
    setCurrentStage(0)
    setCapital(27)
    setProdTime(0)
    setCircTime(0)
    setScore(0)
    setLives(3)
    setObstacle(null)
    setUsedQuestions([])
    setFeedback(null)
    setFinished(false)
  }, [])

  function advanceStage() {
    const timeCost = stage.time || 0
    if (stage.type === 'production' || stage.id === 'SX' || stage.id === 'Hprime' || stage.id === 'wear') {
      setProdTime((t) => t + timeCost)
    } else if (stage.type === 'circulation') {
      setCircTime((t) => t + timeCost)
    }

    if (stage.id === 'Hprime') setCapital(30)
    if (stage.id === 'collect') setCapital(30)

    const nextStage = currentStage + 1

    if (nextStage >= turnoverStages.length) {
      setFinished(true)
      setPhase('result')
      setScore((s) => s + 500)
      return
    }

    setCurrentStage(nextStage)
    setFeedback(null)

    const next = turnoverStages[nextStage]
    if (next.type === 'obstacle') {
      const { index, question } = getRandomQuestion(usedQuestions)
      setUsedQuestions((u) => [...u, index])
      setObstacle({ ...question, qIndex: index })
    } else {
      setObstacle(null)
    }
  }

  function handleObstacleAnswer(optionIndex) {
    if (!obstacle) return

    if (optionIndex === obstacle.correct) {
      setFeedback({ type: 'success', text: obstacle.explanation })
      setScore((s) => s + 100)
      setTimeout(() => {
        setObstacle(null)
        setFeedback(null)
        advanceStage()
      }, 1500)
    } else {
      const newLives = lives - 1
      setLives(newLives)
      setFeedback({ type: 'error', text: obstacle.explanation })
      setProdTime((t) => t + 15)
      if (newLives <= 0) {
        setPhase('result')
        setFinished(false)
      }
    }
  }

  function skipObstacle() {
    setProdTime((t) => t + 25)
    setObstacle(null)
    setFeedback(null)
    advanceStage()
  }

  if (phase === 'intro') {
    return (
      <section className="game-section">
        <div className="game-intro">
          <h2 className="section-title">⚡ Vòng quay Tốc độ chu chuyển</h2>
          <p className="section-desc">
            Mô phỏng sơ đồ tuần hoàn tư bản (Slide 27):{' '}
            <strong>T — H ⟨ SLĐ … TSLĐ ⟩ … SX … H&apos; — T&apos;</strong>
          </p>

          <div className="turnover-formula-box intro-box">
            <p>Thời gian chu chuyển: <strong>ch = ts + tl</strong></p>
            <p>Tốc độ chu chuyển: <strong>N = CH / ch = 365 / ch</strong> (vòng/năm)</p>
          </div>

          <div className="turnover-map-preview">
            {turnoverStages.map((s) => (
              <div key={s.id} className={`map-node ${s.type}`}>
                <span>{s.icon}</span>
                <small>{s.name}</small>
              </div>
            ))}
          </div>

          <div className="game-rules">
            <h3>Cách chơi</h3>
            <ul>
              <li>Đưa <strong>$27</strong> (vốn ví dụ sợi) qua tuần hoàn → thu <strong>$30</strong> (T&apos;)</li>
              <li>Giai đoạn <strong>sản xuất</strong> (SX, H&apos;) cộng vào ts; <strong>lưu thông</strong> (T→H, bán) cộng vào tl</li>
              <li>Chướng ngại <strong>hao mòn TBCĐ</strong> — trả lời trắc nghiệm về tư bản cố định</li>
              <li>3 mạng — trả lời sai: +15 ngày sản xuất (chậm chu kỳ)</li>
            </ul>
          </div>
          <button className="btn btn-primary btn-lg" onClick={startGame}>
            Bắt đầu tuần hoàn
          </button>
        </div>
      </section>
    )
  }

  if (phase === 'result') {
    return (
      <section className="game-section">
        <div className="game-result">
          <h2 className="section-title">{finished ? '🏆 Hoàn thành tuần hoàn!' : '💔 Hết mạng!'}</h2>
          <div className="result-stats">
            <div className="stat-card">
              <span className="stat-label">Thời gian sản xuất (ts)</span>
              <span className="stat-value">{timeStats.prodTime} ngày</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Thời gian lưu thông (tl)</span>
              <span className="stat-value">{timeStats.circTime} ngày</span>
            </div>
            <div className="stat-card highlight">
              <span className="stat-label">ch = ts + tl → N = 365/ch</span>
              <span className="stat-value">{timeStats.N} vòng/năm</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">T&apos; thu về (m=$3)</span>
              <span className="stat-value green">${capital}</span>
            </div>
          </div>

          <div className="time-bar-chart result-chart">
            <div className="time-bar production" style={{ width: timeStats.ch > 0 ? `${(timeStats.prodTime / timeStats.ch) * 100}%` : '50%' }}>
              ts: {timeStats.prodTime}d
            </div>
            <div className="time-bar circulation" style={{ width: timeStats.ch > 0 ? `${(timeStats.circTime / timeStats.ch) * 100}%` : '50%' }}>
              tl: {timeStats.circTime}d
            </div>
          </div>

          <p className="result-insight">
            {finished
              ? `Chu kỳ ${timeStats.ch} ngày → N = 365/${timeStats.ch} = ${timeStats.N} vòng/năm. Tư bản lưu động quay nhanh hơn → thu m nhiều lần hơn.`
              : 'Ôn lại Mục 1.1.6 về tuần hoàn, tư bản cố định/lưu động và thử lại!'}
          </p>
          <button className="btn btn-primary" onClick={startGame}>Chơi lại</button>
        </div>
      </section>
    )
  }

  return (
    <section className="game-section">
      <div className="game-header-bar">
        <h2 className="section-title">⚡ Vòng quay Tốc độ chu chuyển</h2>
        <div className="game-status">
          <span className="status-badge">❤️ {lives}</span>
          <span className="status-badge">🏭 ts={prodTime}d</span>
          <span className="status-badge">🛒 tl={circTime}d</span>
          <span className="status-badge">⭐ {score}</span>
        </div>
      </div>

      <div className="turnover-track">
        <div className="track-progress" style={{ width: `${progress}%` }} />
        {turnoverStages.map((s, i) => (
          <div
            key={s.id}
            className={`track-node ${i < currentStage ? 'done' : ''} ${i === currentStage ? 'current' : ''} ${s.type}`}
            title={s.name}
          >
            <span>{s.icon}</span>
          </div>
        ))}
      </div>

      <div className="turnover-current">
        <div className="current-stage-card">
          <span className="stage-icon">{stage.icon}</span>
          <div>
            <span className="stage-type">
              {stage.type === 'production' ? '🏭 Thời gian sản xuất (+ts)'
                : stage.type === 'circulation' ? '🛒 Thời gian lưu thông (+tl)'
                : stage.type === 'obstacle' ? '⚠️ Tư bản cố định — hao mòn'
                : stage.type === 'finish' ? '🔁 Chu chuyển định kỳ'
                : '💰 Bắt đầu chu trình'}
            </span>
            <h3>{stage.name}</h3>
            <p className="stage-desc">{stage.desc}</p>
            <p className="stage-capital">Dòng vốn: <strong>${capital}</strong> {stage.id === 'collect' && '→ m = $3'}</p>
          </div>
        </div>

        {obstacle ? (
          <div className="obstacle-quiz">
            <h4>🔧 {stage.name} — Kiến thức tư bản cố định</h4>
            <p className="quiz-q">{obstacle.question}</p>
            <div className="quiz-options">
              {obstacle.options.map((opt, i) => (
                <button key={i} className="quiz-opt" onClick={() => handleObstacleAnswer(i)}>
                  {opt}
                </button>
              ))}
            </div>
            {feedback && <p className={`feedback ${feedback.type}`}>{feedback.text}</p>}
            <button className="btn btn-ghost skip-btn" onClick={skipObstacle}>Bỏ qua (+25 ngày ts)</button>
          </div>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={advanceStage}>
            {stage.time > 0 ? `Tiếp tục (+${stage.time} ngày)` : 'Tiếp tục →'}
          </button>
        )}
      </div>
    </section>
  )
}
