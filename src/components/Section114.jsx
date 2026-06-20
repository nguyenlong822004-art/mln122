import { section114Info, capitalParts } from '../data/section114'

export default function Section114() {
  const total = capitalParts.reduce((s, p) => s + p.yarnValue, 0)

  return (
    <article className="section-page">
      <header className="section-hero">
        <span className="section-badge">{section114Info.course}</span>
        <p className="section-parent">{section114Info.parent}</p>
        <h2 className="section-title">
          {section114Info.section} — {section114Info.title}
        </h2>
        <p className="section-desc">
          Nhà tư bản chia vốn thành hai bộ phận c và v với vai trò hoàn toàn khác nhau trong quá trình sản xuất.
        </p>
      </header>

      <section className="section-block">
        <p className="block-intro">
          Để sản xuất, nhà tư bản chia vốn thành <strong>2 bộ phận</strong> với vai trò khác nhau:
        </p>

        <div className="cv-split-visual">
          <div className="cv-total">
            <span className="cv-label">T (vốn ứng trước)</span>
            <span className="cv-amount">${total}</span>
          </div>
          <div className="cv-split-bar">
            <div className="cv-bar-c" style={{ width: `${(capitalParts[0].yarnValue / total) * 100}%` }}>
              c = ${capitalParts[0].yarnValue}
            </div>
            <div className="cv-bar-v" style={{ width: `${(capitalParts[1].yarnValue / total) * 100}%` }}>
              v = ${capitalParts[1].yarnValue}
            </div>
          </div>
        </div>

        <div className="cv-grid">
          {capitalParts.map((p) => (
            <div key={p.symbol} className={`cv-card ${p.color}`}>
              <div className="cv-card-header">
                <span className="cv-icon">{p.icon}</span>
                <div>
                  <span className="cv-symbol">{p.symbol}</span>
                  <h4>{p.name}</h4>
                </div>
              </div>
              <div className="cv-section">
                <strong>Là gì?</strong>
                <p>{p.what}</p>
              </div>
              <div className="cv-section">
                <strong>Đặc điểm</strong>
                <p>{p.trait}</p>
              </div>
              <ul className="cv-examples">
                {p.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
              <div className="cv-yarn">
                <span>Ví dụ sợi:</span> {p.yarnBreakdown} = <strong>${p.yarnValue}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="compare-contrast">
          <div className="cc-item c-side">
            <span>c — Không tăng giá trị</span>
            <small>Chỉ tái hiện giá trị trong sản phẩm</small>
          </div>
          <div className="cc-vs">↔</div>
          <div className="cc-item v-side">
            <span>v — Tăng giá trị</span>
            <small>Tạo giá trị mới &gt; v → sinh ra m</small>
          </div>
        </div>
      </section>
    </article>
  )
}
