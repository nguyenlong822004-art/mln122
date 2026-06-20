import { useState } from 'react'
import { theoryParts, tableOfContents, yarnExample } from '../data/content'
import MoneyMotionDiagram from './MoneyMotionDiagram'

function renderMarkdown(text) {
  return text.split('\n\n').map((block, i) => {
    const lines = block.split('\n').map((line, j) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <p key={j} className={line.startsWith('-') ? 'list-item' : ''}>
          {parts.map((part, k) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={k}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </p>
      )
    })
    return (
      <div key={i} className="theory-block">
        {lines}
      </div>
    )
  })
}

export default function TheorySection() {
  const [activePart, setActivePart] = useState('all')

  const visibleParts =
    activePart === 'all' ? theoryParts : theoryParts.filter((p) => p.id === activePart)

  return (
    <section className="theory-section">
      <h2 className="section-title">📚 Lý luận C. Mác về giá trị thặng dư</h2>
      <p className="section-desc">Nội dung theo Session 8 — từ công thức chung tư bản đến đo lường bóc lột.</p>

      <div className="toc-card">
        <h3>📋 Mục lục chính</h3>
        <ol className="toc-list">
          {tableOfContents.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="part-filter">
        <button className={`filter-btn ${activePart === 'all' ? 'active' : ''}`} onClick={() => setActivePart('all')}>
          Tất cả
        </button>
        {theoryParts.map((p) => (
          <button
            key={p.id}
            className={`filter-btn ${activePart === p.id ? 'active' : ''}`}
            onClick={() => setActivePart(p.id)}
          >
            {p.part}
          </button>
        ))}
      </div>

      {visibleParts.map((part) => (
        <div key={part.id} className="theory-part">
          <h3 className="part-heading">
            <span className="part-badge">{part.part}</span>
            {part.title}
          </h3>
          <div className="theory-grid">
            {part.sections.map((section, index) => (
              <article
                key={section.id}
                className="theory-card"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="theory-card-header">
                  <span className="theory-icon">{section.icon}</span>
                  <h4>{section.title}</h4>
                </div>
                <div className="theory-card-body">{renderMarkdown(section.content)}</div>
              </article>
            ))}
          </div>

          {part.id === 'part2' && (
            <div className="theory-motion-wrap">
              <MoneyMotionDiagram />
            </div>
          )}
        </div>
      ))}

      <div className="yarn-example-card">
        <h3>🧵 Bảng ví dụ kinh tế — Sản xuất sợi (Slide 22–24)</h3>
        <div className="yarn-table-wrap">
          <table className="yarn-table">
            <thead>
              <tr>
                <th colSpan="2">Chi phí (NTB bỏ ra)</th>
                <th colSpan="2">Giá trị thu về (W&apos;)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tiền mua bông</td>
                <td>${yarnExample.cotton}</td>
                <td>Giá trị bông vào sợi</td>
                <td>${yarnExample.cotton}</td>
              </tr>
              <tr>
                <td>Hao mòn máy móc</td>
                <td>${yarnExample.depreciation}</td>
                <td>Giá trị máy móc vào sợi</td>
                <td>${yarnExample.depreciation}</td>
              </tr>
              <tr>
                <td>Tiền mua SLĐ (12h)</td>
                <td>${yarnExample.wage}</td>
                <td>Giá trị LĐ tạo ra (12×$0.5)</td>
                <td>${yarnExample.newValue}</td>
              </tr>
              <tr className="total-row">
                <td><strong>Tổng c + v</strong></td>
                <td><strong>${yarnExample.cost}</strong></td>
                <td><strong>Tổng W&apos;</strong></td>
                <td><strong>${yarnExample.Wprime}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="yarn-conclusion">
          <span className="yarn-formula">m = W&apos; − (c + v) = {yarnExample.Wprime} − {yarnExample.cost} = <strong>${yarnExample.m}</strong></span>
          <span className="yarn-formula">m&apos; = m/v × 100% = {yarnExample.m}/{yarnExample.v} × 100% = <strong>{yarnExample.mRate}%</strong></span>
        </div>
      </div>

    </section>
  )
}
