import { hthVisual } from '../../data/section111'
import DiagramPhoto from './DiagramPhoto'
import { WorkerIcon } from './HTHIcons'

const { stations, worker } = hthVisual

export default function HTHVisualDiagram({ activeStep, playing }) {
  const workerHolding = worker.holding[Math.min(activeStep, 2)]

  return (
    <div className={`hth-visual ${playing ? 'playing' : ''} step-${activeStep}`}>
      <svg className="hth-paths" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <marker id="hth-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#78716c" />
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
        {stations.map((station, i) => (
          <div
            key={station.id}
            className={`hth-station ${activeStep >= i ? 'visited' : ''} ${activeStep === i ? 'current' : ''}`}
            style={{ left: `${station.x}%` }}
          >
            <div className="hth-station-icon">
              <DiagramPhoto src={station.image} alt={station.alt} />
            </div>
            <span className="hth-station-label">{station.label}</span>
          </div>
        ))}
      </div>

      <div className="hth-traveler-wrap" aria-hidden="true">
        <div className="hth-traveler">
          {stations.map((station) => (
            <div key={station.id} className={`traveler-item traveler-${station.id}`}>
              <DiagramPhoto src={station.image} alt="" size="traveler" />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`hth-worker ${playing ? 'walking' : ''}`}
        style={playing ? undefined : { left: `${stations[activeStep].x}%` }}
        aria-label="Thợ thủ công"
      >
        <div className="hth-worker-character">
          <WorkerIcon holding={workerHolding} />
        </div>
        <span className="hth-worker-caption">
          {playing ? 'Đi chợ...' : worker.captions[activeStep]}
        </span>
      </div>
    </div>
  )
}
