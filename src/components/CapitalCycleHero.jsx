/** Animation công thức T — H — H' — T' trên trang chủ */
const STEPS = [
  { sym: 'T', label: 'Tiền', color: 'gold', desc: 'Vốn ban đầu' },
  { sym: 'H', label: 'Hàng hóa', color: 'blue', desc: 'Yếu tố SX' },
  { sym: "H'", label: 'Sản phẩm', color: 'purple', desc: 'Sản xuất' },
  { sym: "T'", label: 'Tiền + m', color: 'green', desc: 'Thu lợi nhuận' },
]

export default function CapitalCycleHero() {
  return (
    <div className="capital-cycle-hero">
      <p className="capital-cycle-label">Công thức tư bản công nghiệp</p>
      <div className="capital-cycle-track">
        <div className="capital-cycle-flow" />
        {STEPS.map((step, i) => (
          <div
            key={step.sym}
            className={`capital-cycle-node color-${step.color}`}
            style={{ '--node-i': i }}
          >
            <span className="ccn-ring" />
            <span className="ccn-symbol">{step.sym}</span>
            <span className="ccn-label">{step.label}</span>
          </div>
        ))}
        <span className="capital-cycle-dot" />
      </div>
      <div className="capital-cycle-captions">
        {STEPS.map((step) => (
          <span key={step.sym} className="ccc-item">
            <strong>{step.sym}</strong> — {step.desc}
          </span>
        ))}
      </div>
      <div className="capital-cycle-dual">
        <span className="dual-formula hth">H — T — H</span>
        <span className="dual-vs">vs</span>
        <span className="dual-formula tht">T — H — T&apos;</span>
      </div>
    </div>
  )
}
