/** Nền động theo chủ đề lưu thông tư bản — T, H, tiền vàng */
const SYMBOLS = [
  { char: 'T', color: '#fbbf24', size: 28, x: 8, y: 12, dur: 22, delay: 0 },
  { char: 'H', color: '#60a5fa', size: 24, x: 85, y: 18, dur: 26, delay: 2 },
  { char: "T'", color: '#4ade80', size: 22, x: 72, y: 65, dur: 20, delay: 4 },
  { char: 'm', color: '#ef4444', size: 20, x: 15, y: 78, dur: 24, delay: 1 },
  { char: 'c', color: '#9ca3af', size: 18, x: 55, y: 8, dur: 28, delay: 3 },
  { char: 'v', color: '#3b82f6', size: 18, x: 38, y: 88, dur: 25, delay: 5 },
  { char: '$', color: '#fbbf24', size: 16, x: 92, y: 45, dur: 30, delay: 6 },
  { char: 'N', color: '#a78bfa', size: 16, x: 25, y: 42, dur: 27, delay: 2.5 },
]

const COINS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: 10 + i * 15,
  y: 25 + (i % 3) * 22,
  dur: 18 + i * 3,
  delay: i * 1.8,
}))

export default function AnimatedBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-glow bg-glow-red" />
      <div className="bg-glow bg-glow-gold" />

      <svg className="bg-flow-path" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          className="flow-curve"
          d="M 5 50 Q 25 20, 50 50 T 95 50"
          fill="none"
        />
        <path
          className="flow-curve flow-curve-2"
          d="M 95 30 Q 70 60, 50 30 T 5 30"
          fill="none"
        />
      </svg>

      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className="bg-symbol"
          style={{
            '--sym-x': `${s.x}%`,
            '--sym-y': `${s.y}%`,
            '--sym-size': `${s.size}px`,
            '--sym-color': s.color,
            '--sym-dur': `${s.dur}s`,
            '--sym-delay': `${s.delay}s`,
          }}
        >
          {s.char}
        </span>
      ))}

      {COINS.map((c) => (
        <span
          key={c.id}
          className="bg-coin"
          style={{
            '--coin-x': `${c.x}%`,
            '--coin-y': `${c.y}%`,
            '--coin-dur': `${c.dur}s`,
            '--coin-delay': `${c.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
