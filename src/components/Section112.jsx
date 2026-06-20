import {
  section112Info,
  basicConcepts,
  laborCommodityConditions,
  laborValue,
  useValue,
} from '../data/section112'

export default function Section112() {
  return (
    <article className="section-page">
      <header className="section-hero">
        <span className="section-badge">{section112Info.course}</span>
        <p className="section-parent">{section112Info.parent}</p>
        <h2 className="section-title">
          {section112Info.section} — {section112Info.title}
        </h2>
        <p className="section-desc">
          Sức lao động trở thành hàng hóa trong CNTB — điều kiện, giá trị, giá trị sử dụng và vai trò then chốt
          trong công thức T — H — T&apos;.
        </p>
      </header>

      {/* 1. Khái niệm cơ bản */}
      <section className="section-block">
        <h3 className="block-heading">1️⃣ Các khái niệm cơ bản</h3>
        <div className="concept-grid">
          {basicConcepts.map((c) => (
            <div key={c.term} className="concept-card">
              <span className="concept-icon">{c.icon}</span>
              <h4>{c.term}</h4>
              <p>{c.definition}</p>
            </div>
          ))}
        </div>
        <div className="concept-relation">
          <span className="cr-box">Sức lao động</span>
          <span className="cr-arrow">→ vận dụng vào SX →</span>
          <span className="cr-box highlight">Lao động</span>
        </div>
      </section>

      {/* 2. Điều kiện */}
      <section className="section-block">
        <h3 className="block-heading">2️⃣ Điều kiện để sức lao động trở thành hàng hóa</h3>
        <p className="block-intro">
          Sức lao động chỉ biến thành hàng hóa khi có <strong>đủ 2 điều kiện</strong> sau:
        </p>
        <div className="condition-grid">
          {laborCommodityConditions.map((c, i) => (
            <div key={c.title} className="condition-card">
              <span className="condition-num">{i + 1}</span>
              <span className="condition-icon">{c.icon}</span>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Giá trị */}
      <section className="section-block">
        <h3 className="block-heading">3️⃣ Giá trị của hàng hóa sức lao động</h3>

        <div className="info-card">
          <h4>📏 Thước đo</h4>
          <p>{laborValue.measure}</p>
        </div>

        <div className="info-card">
          <h4>🔄 Bản chất tái sản xuất</h4>
          <p>{laborValue.reproduction}</p>
        </div>

        <div className="info-card special">
          <h4>✨ Tính chất đặc biệt</h4>
          <p>Khác hàng hóa thông thường, giá trị SLĐ bao hàm:</p>
          <div className="special-tags">
            {laborValue.specialNature.map((n) => (
              <div key={n.type} className="special-tag">
                <strong>{n.type}</strong>
                <span>{n.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <h4>📦 Ba bộ phận cấu thành giá trị</h4>
          <ol className="numbered-list">
            {laborValue.components.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Giá trị sử dụng */}
      <section className="section-block">
        <h3 className="block-heading">4️⃣ Giá trị sử dụng của hàng hóa sức lao động</h3>

        <div className="info-card">
          <h4>🎯 Cách thức biểu hiện</h4>
          <p>{useValue.expression}</p>
        </div>

        <div className="info-card highlight-green">
          <h4>🔑 Tính chất đặc biệt độc nhất</h4>
          <p>{useValue.special}</p>
        </div>

        <blockquote className="section-quote">
          <strong>Ý nghĩa:</strong> {useValue.meaning}
        </blockquote>

        <div className="key-insight">
          <div className="ki-step">NTB mua SLĐ (v)</div>
          <div className="ki-arrow">→</div>
          <div className="ki-step">Công nhân lao động</div>
          <div className="ki-arrow">→</div>
          <div className="ki-step highlight">Tạo giá trị &gt; v</div>
          <div className="ki-arrow">→</div>
          <div className="ki-step surplus">m = phần dôi ra</div>
        </div>
      </section>
    </article>
  )
}
