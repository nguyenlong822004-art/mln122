import MoneyMotionDiagram from './MoneyMotionDiagram'
import MoneyFlowDrag from './MoneyFlowDrag'
import {
  section111Info,
  tbcnConditions,
  moneyDefinition,
  moneyMotions,
} from '../data/section111'

export default function Section111() {
  return (
    <article className="section-111">
      {/* Hero mục */}
      <header className="s111-hero">
        <span className="s111-badge">{section111Info.course}</span>
        <p className="s111-parent">{section111Info.parent}</p>
        <h2 className="section-title">
          {section111Info.section} — {section111Info.title}
        </h2>
        <p className="section-desc">
          Khám phá điều kiện ra đời TBCN, bản chất tiền và sự khác biệt giữa lưu thông hàng hóa đơn giản
          (H—T—H) với lưu thông tư bản (T—H—T&apos;).
        </p>
      </header>

      {/* 1. Điều kiện TBCN */}
      <section className="s111-block" id="tbcn-conditions">
        <h3 className="s111-heading">📋 Điều kiện ra đời sản xuất hàng hóa tư bản chủ nghĩa (TBCN)</h3>
        <div className="s111-condition-grid">
          {tbcnConditions.map((c) => (
            <div key={c.title} className="s111-condition-card">
              <span className="s111-condition-icon">{c.icon}</span>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Định nghĩa tiền */}
      <section className="s111-block" id="money-def">
        <h3 className="s111-heading">💵 Định nghĩa về Tiền</h3>
        <blockquote className="s111-quote">{moneyDefinition.text}</blockquote>
        <p className="s111-note">{moneyDefinition.note}</p>
      </section>

      {/* 2.5. Dòng chảy của Tiền — kéo thả */}
      <section className="s111-block s111-flow-block" id="money-flow">
        <h3 className="s111-heading">💸 Dòng chảy của Tiền — Thử ngay!</h3>
        <p className="section-desc">
          Kéo xấp tiền xuống <strong>Tiêu dùng</strong> (H—T—H) hoặc <strong>Tư bản</strong> (T—H—T&apos;) để cảm nhận
          sự khác biệt giữa tiền lưu thông thông thường và tiền tư bản.
        </p>
        <MoneyFlowDrag />
      </section>

      {/* 3. Hai dạng vận động — tóm tắt */}
      <section className="s111-block" id="money-motion">
        <h3 className="s111-heading">🔄 Sự vận động của đồng tiền</h3>
        <div className="s111-motion-cards">
          {moneyMotions.map((m) => (
            <div key={m.id} className={`s111-motion-card ${m.color}`}>
              <span className="s111-motion-context">{m.context}</span>
              <h4>{m.title}</h4>
              <div className="s111-motion-formula">{m.formula}</div>
              <p className="s111-motion-desc">{m.formulaDesc}</p>
              <div className="s111-motion-flow">
                <span>Bắt đầu: <strong>{m.start}</strong></span>
                <span>Kết thúc: <strong>{m.end}</strong></span>
              </div>
              <p className="s111-motion-purpose">{m.purpose}</p>
              <p className="s111-motion-example"><em>VD:</em> {m.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sơ đồ tương tác */}
      <section className="s111-block s111-diagram-block" id="diagram">
        <h3 className="s111-heading">🎬 Sơ đồ trực quan — So sánh H—T—H và T—H—T&apos;</h3>
        <p className="section-desc">
          Xem animation vải → tiền → lương thực (H—T—H) và chu trình tư bản (T—H—T&apos;). Nhấn{' '}
          <strong>Phát animation</strong> hoặc dùng nút ← → từng bước.
        </p>
        <MoneyMotionDiagram />
      </section>

      {/* 5. So sánh trực quan + công thức theo ngành */}
      <section className="s111-block s111-block-wide" id="compare">
        <div className="motion-compare-section">
          <h3 className="s111-heading">⚖️ So sánh trực quan</h3>

          <div className="compare-visual-grid">
            <div className="compare-visual-card same">
              <div className="compare-visual-icon">🤝</div>
              <h5>Giống nhau</h5>
              <ul>
                <li>
                  <span className="chip-group">
                    <span className="chip h">H</span>
                    <span className="chip t">T</span>
                  </span>
                  <span className="li-text">Đều có Hàng và Tiền</span>
                </li>
                <li>
                  <span className="chip-group">
                    <span className="chip action">Mua</span>
                    <span className="chip action">Bán</span>
                  </span>
                  <span className="li-text">Hai hành vi đối lập: Mua ↔ Bán</span>
                </li>
                <li>Đều qua lưu thông hàng hóa</li>
              </ul>
            </div>

            <div className="compare-visual-card diff-outside">
              <div className="compare-visual-icon">👁️</div>
              <h5>Khác — Biểu hiện bên ngoài</h5>
              <div className="diff-rows">
                <div className="diff-row">
                  <span className="diff-label">H—T—H</span>
                  <div className="mini-flow">
                    <span className="action sell">Bán</span>
                    <span>→</span>
                    <span className="action buy">Mua</span>
                  </div>
                  <span className="diff-note">Bắt đầu Bán, kết thúc Mua</span>
                </div>
                <div className="diff-row highlight">
                  <span className="diff-label">T—H—T&apos;</span>
                  <div className="mini-flow">
                    <span className="action buy">Mua</span>
                    <span>→</span>
                    <span className="action sell">Bán</span>
                  </div>
                  <span className="diff-note">Bắt đầu Mua, kết thúc Bán</span>
                </div>
              </div>
            </div>

            <div className="compare-visual-card diff-inside">
              <div className="compare-visual-icon">🔍</div>
              <h5>Khác — Bản chất bên trong</h5>
              <div className="essence-compare">
                <div className="essence-box">
                  <span>H—T—H</span>
                  <p>Thỏa mãn <strong>nhu cầu sử dụng</strong></p>
                  <small>VD: Bán vải → mua gạo, thực phẩm</small>
                </div>
                <div className="essence-vs">VS</div>
                <div className="essence-box capital">
                  <span>T—H—T&apos;</span>
                  <p>Thu <strong>giá trị lớn hơn</strong></p>
                  <small>T&apos; = T + ΔT = T + m</small>
                </div>
              </div>
            </div>
          </div>

          <div className="capital-types-visual">
            <h5>📐 Các dạng công thức chung của tư bản</h5>
            <div className="capital-type-cards">
              <div className="type-card">
                <span className="type-icon">🛒</span>
                <span className="type-name">Thương nghiệp</span>
                <code>T — H — T&apos;</code>
              </div>
              <div className="type-card">
                <span className="type-icon">🏭</span>
                <span className="type-name">Công nghiệp</span>
                <code>T — H — H&apos; — T&apos;</code>
              </div>
              <div className="type-card">
                <span className="type-icon">🏦</span>
                <span className="type-name">Cho vay</span>
                <code>T — T&apos;</code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
