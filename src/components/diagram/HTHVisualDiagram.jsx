import { ClothIcon, MoneyIcon, FoodIcon, WorkerIcon } from './HTHIcons'

const STATIONS = [
  { id: 'cloth', label: 'H — Tấm vải', Icon: ClothIcon, x: 12 },
  { id: 'money', label: 'T — Tiền', Icon: MoneyIcon, x: 50 },
  { id: 'food', label: 'H — Lương thực', Icon: FoodIcon, x: 88 },
]

const WORKER_HOLDING = ['cloth', 'money', 'food']

const WORKER_CAPTIONS = ['👋 Bán vải', '💰 Cầm tiền', '🛒 Mua lương thực']

export default function HTHVisualDiagram({ activeStep, playing }) {
  const workerHolding = WORKER_HOLDING[Math.min(activeStep, 2)]

  return (
    <div className={`hth-visual ${playing ? 'playing' : ''} step-${activeStep}`}>
      <svg className="hth-paths" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="hth-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#a89f97" />
          </marker>
        </defs>
        <path
          className="hth-path-line path-sell"
          d="M 55 55 C 120 25, 130 25, 185 55"
          markerEnd="url(#hth-arrow)"
        />
        <path
          className="hth-path-line path-buy"
          d="M 215 55 C 270 85, 280 85, 345 55"
          markerEnd="url(#hth-arrow)"
        />
        <text x="115" y="18" className={`hth-path-label ${activeStep === 0 || playing ? 'on' : ''}`}>BÁN</text>
        <text x="275" y="105" className={`hth-path-label ${activeStep === 2 || playing ? 'on' : ''}`}>MUA</text>
      </svg>

      <div className="hth-stations">
        {STATIONS.map((station, i) => (
          <div
            key={station.id}
            className={`hth-station ${activeStep >= i ? 'visited' : ''} ${activeStep === i ? 'current' : ''}`}
            style={{ left: `${station.x}%` }}
          >
            <div className="hth-station-icon">
              <station.Icon />
            </div>
            <span className="hth-station-label">{station.label}</span>
          </div>
        ))}
      </div>

      <div className="hth-traveler-wrap" aria-hidden="true">
        <div className="hth-traveler">
          <div className="traveler-item traveler-cloth"><ClothIcon /></div>
          <div className="traveler-item traveler-money"><MoneyIcon /></div>
          <div className="traveler-item traveler-food"><FoodIcon /></div>
        </div>
      </div>

      <div
        className={`hth-worker ${playing ? 'walking' : ''}`}
        style={playing ? undefined : { left: `${STATIONS[activeStep].x}%` }}
        aria-label="Thợ thủ công"
      >
        <WorkerIcon holding={workerHolding} />
        <span className="hth-worker-caption">
          {playing ? 'Đi chợ...' : WORKER_CAPTIONS[activeStep]}
        </span>
      </div>
    </div>
  )
}
