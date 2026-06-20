import { section115Info, wageEssence, wageMisconceptions, wageFlow } from '../data/section115'

export default function Section115() {
  return (
    <article className="section-page">
      <header className="section-hero">
        <span className="section-badge">{section115Info.course}</span>
        <p className="section-parent">{section115Info.parent}</p>
        <h2 className="section-title">
          {section115Info.section} — {section115Info.title}
        </h2>
        <p className="section-desc">
          Bản chất thực sự của tiền công — không phải phần thưởng hào phóng mà là giá cả hàng hóa sức lao động.
        </p>
      </header>

      <section className="section-block">
        <div className="info-card highlight-green">
          <h4>✅ Bản chất thực tế</h4>
          <p className="essence-text">{wageEssence.truth}</p>
        </div>
        <div className="info-card">
          <h4>📌 Nguồn gốc</h4>
          <p>{wageEssence.origin}</p>
        </div>
      </section>

      <section className="section-block">
        <h3 className="block-heading">⚠️ Hiểu lầm phổ biến vs Sự thật</h3>
        <div className="misconception-list">
          {wageMisconceptions.map((m, i) => (
            <div key={i} className="misconception-card">
              <div className="mc-wrong">
                <span className="mc-tag wrong">Hiểu lầm</span>
                <p>{m.wrong}</p>
              </div>
              <div className="mc-arrow">↓</div>
              <div className="mc-right">
                <span className="mc-tag right">Sự thật</span>
                <p>{m.right}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <h3 className="block-heading">📊 Phân tích qua ví dụ sợi (12 giờ)</h3>
        <div className="wage-flow">
          {wageFlow.map((step, i) => (
            <div key={i} className={`wf-step ${i === 2 ? 'surplus' : ''}`}>
              <span className="wf-num">{i + 1}</span>
              <span className="wf-label">{step.step}</span>
              <span className="wf-value">{step.value}</span>
            </div>
          ))}
        </div>
        <blockquote className="section-quote">
          Công nhân tạo ra <strong>$6</strong> giá trị mới nhưng chỉ nhận <strong>$3</strong> tiền công.
          Phần còn lại <strong>$3</strong> là giá trị thặng dư — không được trả trong lương.
        </blockquote>
      </section>
    </article>
  )
}
