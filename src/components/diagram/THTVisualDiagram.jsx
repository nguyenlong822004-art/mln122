import { thtVisual } from '../../data/section111'
import DiagramPhoto from './DiagramPhoto'
import { CapitalistIcon } from './THTIcons'

const { stations, capitalist } = thtVisual

const CAPITALIST_ACTIONS = ['money', 'buy', 'produce', 'sell']

const TRAVELER_CLASS = {
  T: 'money',
  H: 'goods',
  Hprime: 'clothing',
  Tprime: 'money-plus',
}

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
            <path d="M0,0 L8,4 L0,8 Z" fill="#78716c" />
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
        {stations.map((station, i) => (
          <div
            key={station.id}
            className={`tht-station ${activeStep >= i ? 'visited' : ''} ${activeStep === i ? 'current' : ''}`}
            style={{ left: `${station.x}%` }}
          >
            <div className="tht-station-icon">
              <DiagramPhoto src={station.image} alt={station.alt} />
            </div>
            <span className="tht-station-label">{station.label}</span>
          </div>
        ))}
      </div>

      <div className="tht-traveler-wrap" aria-hidden="true">
        <div className="tht-traveler">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`traveler-item traveler-${TRAVELER_CLASS[station.id]}`}
            >
              <DiagramPhoto src={station.image} alt="" size="traveler" />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`tht-capitalist ${playing ? 'walking' : ''}`}
        style={playing ? undefined : { left: `${stations[activeStep].x}%` }}
        aria-label="Nhà tư bản"
      >
        <div className="tht-capitalist-character">
          <CapitalistIcon action={capitalistAction} />
        </div>
        <span className="tht-capitalist-caption">
          {playing ? 'Đầu tư...' : capitalist.captions[activeStep]}
        </span>
      </div>

      <div className="tht-delta-badge">
        ΔT = <strong>$3</strong> (m)
      </div>
    </div>
  )
}
