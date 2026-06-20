import { courseInfo, parentSection } from '../data/section112'
import { section12Info } from '../data/section12'
import CapitalCycleHero from './CapitalCycleHero'
import ScrollReveal from './ScrollReveal'

const sections11 = [
  { id: 'section111', num: '1.1.1', title: 'Công thức chung của tư bản', icon: '📐' },
  { id: 'section112', num: '1.1.2', title: 'Hàng hóa sức lao động', icon: '👷' },
  { id: 'section113', num: '1.1.3', title: 'Sự sản xuất giá trị thặng dư', icon: '🧵' },
  { id: 'section114', num: '1.1.4', title: 'Tư bản bất biến & khả biến', icon: '⚙️' },
  { id: 'section115', num: '1.1.5', title: 'Tiền công trong CNTB', icon: '💵' },
  { id: 'section116', num: '1.1.6', title: 'Tuần hoàn & chu chuyển tư bản', icon: '🔁' },
]

export default function Hero({ onStart }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <ScrollReveal>
          <span className="hero-badge hero-badge-glow">{courseInfo}</span>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="hero-title hero-title-shimmer">
            Giá trị thặng dư trong KT thị trường
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="hero-desc">{parentSection} · {section12Info.section}</p>
        </ScrollReveal>

        <ScrollReveal delay={240}>
          <CapitalCycleHero />
        </ScrollReveal>

        <ScrollReveal delay={320}>
          <h3 className="hero-group-title">Mục 1.1 — Nguồn gốc giá trị thặng dư</h3>
        </ScrollReveal>

        <div className="hero-section-cards">
          {sections11.map((s, i) => (
            <ScrollReveal key={s.id} delay={380 + i * 60} className="hero-card-wrap">
              <button
                type="button"
                className="hero-section-card"
                onClick={() => onStart(s.id)}
              >
                <span className="hsc-icon">{s.icon}</span>
                <span className="hsc-num">{s.num}</span>
                <span className="hsc-title">{s.title}</span>
                <span className="hsc-arrow" aria-hidden="true">→</span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={720}>
          <h3 className="hero-group-title">Mục 1.2 — Bản chất giá trị thặng dư</h3>
        </ScrollReveal>

        <ScrollReveal delay={780} className="hero-card-wrap">
          <div className="hero-section-cards single">
            <button
              type="button"
              className="hero-section-card featured"
              onClick={() => onStart('section12')}
            >
              <span className="hsc-icon">📊</span>
              <span className="hsc-num">1.2</span>
              <span className="hsc-title">Tỷ suất m&apos; &amp; Khối lượng M</span>
              <span className="hsc-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
