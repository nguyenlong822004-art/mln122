import { useState } from 'react'

export default function ChapterQuiz({
  questions,
  title = '❓ Trắc nghiệm ôn tập',
  description = 'Kiểm tra hiểu biết về chương.',
  excellent = '🌟 Xuất sắc! Bạn đã nắm vững kiến thức.',
  good = '👍 Khá tốt! Hãy xem lại phần lý thuyết để củng cố thêm.',
  needsWork = '📚 Cần ôn tập thêm. Hãy đọc lại các mục trong chương!',
}) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[current]

  function handleAnswer(index) {
    if (selected !== null) return
    setSelected(index)
    setAnswered((a) => a + 1)
    if (index === question.correct) {
      setScore((s) => s + 1)
    }
  }

  function nextQuestion() {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setAnswered(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <section className="quiz-section">
        <h2 className="section-title">❓ Kết quả trắc nghiệm</h2>
        <div className="quiz-result-card">
          <div className="quiz-score-circle" data-score={pct}>
            <span className="quiz-score-num">{pct}%</span>
            <span className="quiz-score-label">Điểm</span>
          </div>
          <p>
            Bạn trả lời đúng <strong>{score}/{questions.length}</strong> câu hỏi.
          </p>
          <p className="quiz-grade">
            {pct >= 80 ? excellent : pct >= 60 ? good : needsWork}
          </p>
          <button type="button" className="btn btn-primary" onClick={restart}>
            Làm lại
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="quiz-section">
      <h2 className="section-title">{title}</h2>
      <p className="section-desc">{description}</p>

      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${(answered / questions.length) * 100}%` }}
        />
      </div>
      <p className="quiz-counter">
        Câu {current + 1}/{questions.length} · Đúng: {score}
      </p>

      <div key={current} className="quiz-card">
        <p className="quiz-question">{question.question}</p>
        <div className="quiz-options">
          {question.options.map((opt, i) => {
            let className = 'quiz-opt'
            if (selected !== null) {
              if (i === question.correct) className += ' correct'
              else if (i === selected) className += ' wrong'
            }
            return (
              <button
                key={i}
                type="button"
                className={className}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
              >
                <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            )
          })}
        </div>

        {selected !== null && (
          <div className="quiz-explanation">
            <p>{question.explanation}</p>
            <button type="button" className="btn btn-primary" onClick={nextQuestion}>
              {current + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
