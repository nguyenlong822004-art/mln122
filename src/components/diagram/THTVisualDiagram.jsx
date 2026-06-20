import {
  MoneyIcon,
  MoneyPlusIcon,
  GoodsBundleIcon,
  YarnProductIcon,
  CapitalistIcon,
} from './THTIcons'

const STATIONS = [
  { id: 'T', label: 'T — $27 vốn', Icon: MoneyIcon, x: 8 },
  { id: 'H', label: 'H — MUA', Icon: GoodsBundleIcon, x: 32 },
  { id: 'Hprime', label: "H' — 20kg sợi", Icon: YarnProductIcon, x: 58 },
  { id: 'Tprime', label: "T' — $30", Icon: MoneyPlusIcon, x: 90 },
]

const CAPITALIST_ACTIONS = ['money', 'buy', 'produce', 'sell']
const CAPTIONS = [
  '💰 Cầm vốn T ($27)',
  '🛍️ MUA SLĐ + bông',
  '🏭 SX → 20kg sợi',
  "💵 BÁN → T' ($30)",
]

export default function THTVisualDiagram({ activeStep, playing }) {
  const capitalistAction = CAPITALIST_ACTIONS[Math.min(activeStep, 3)]

  return (
    <div className={`tht-visual ${playing ? 'playing' : ''} step-${activeStep}`}>
      <div className="tht-formula-strip">
        <span className="tfs-chip t">T</span>
        <span className="tfs-arrow">→</span>
        <span className="tfs-chip h">H</span>
        <span className="tfs-arrow dim">··· SX ···</span>
        <span className="tfs-chip hp">H&apos;</span>
        <span className="tfs-arrow">→</span>
        <span className="tfs-chip tp">T&apos;</span>
      </div>

      <svg className="tht-paths" viewBox="0 0 500 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="tht-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#a89f97" />
          </marker>
        </defs>
        <path className="tht-path-line" d="M 35 50 C 80 20, 100 20, 145 50" markerEnd="url(#tht-arrow)" />
        <path className="tht-path-line" d="M 165 50 L 265 50" markerEnd="url(#tht-arrow)" />
        <path className="tht-path-line" d="M 285 50 C 330 20, 350 20, 420 50" markerEnd="url(#tht-arrow)" />
        <text x="85" y="14" className={`tht-path-label buy ${activeStep === 1 || playing ? 'on' : ''}`}>MUA</text>
        <text x="210" y="88" className={`tht-path-label prod ${activeStep === 2 || playing ? 'on' : ''}`}>SẢN XUẤT</text>
        <text x="355" y="14" className={`tht-path-label sell ${activeStep === 3 || playing ? 'on' : ''}`}>BÁN</text>
      </svg>

      <div className="tht-stations">
        {STATIONS.map((station, i) => (
          <div
            key={station.id}
            className={`tht-station ${activeStep >= i ? 'visited' : ''} ${activeStep === i ? 'current' : ''}`}
            style={{ left: `${station.x}%` }}
          >
            <div className="tht-station-icon">
              <station.Icon />
            </div>
            <span className="tht-station-label">{station.label}</span>
          </div>
        ))}
      </div>

      <div className="tht-traveler-wrap" aria-hidden="true">
        <div className="tht-traveler">
          <div className="traveler-item traveler-money"><MoneyIcon /></div>
          <div className="traveler-item traveler-goods"><GoodsBundleIcon /></div>
          <div className="traveler-item traveler-yarn"><YarnProductIcon /></div>
          <div className="traveler-item traveler-money-plus"><MoneyPlusIcon /></div>
        </div>
      </div>

      <div
        className={`tht-capitalist ${playing ? 'walking' : ''}`}
        style={playing ? undefined : { left: `${STATIONS[activeStep].x}%` }}
        aria-label="Nhà tư bản"
      >
        <CapitalistIcon action={capitalistAction} />
        <span className="tht-capitalist-caption">
          {playing ? 'Đầu tư...' : CAPTIONS[activeStep]}
        </span>
      </div>

      <div className="tht-delta-badge">
        ΔT = <strong>$3</strong> (m)
      </div>
    </div>
  )
}
