/** SVG nhân vật & xưởng may — Trò chơi 12 giờ */

export function FactoryWorkerIcon({ mood = 'neutral', working = false, className = '' }) {
  const face =
    mood === 'happy'
      ? { mouth: 'M22 18 Q30 24 38 18', brow: 'M24 10 L28 12 M32 12 L36 10' }
      : mood === 'tired'
        ? { mouth: 'M24 20 L36 20', brow: 'M24 9 L28 11 M32 11 L36 9' }
        : mood === 'angry'
          ? { mouth: 'M24 22 L36 18', brow: 'M24 8 L28 12 M32 12 L36 8' }
          : { mouth: 'M24 19 Q30 22 36 19', brow: 'M24 10 L28 10 M32 10 L36 10' }

  return (
    <svg className={`th-worker ${working ? 'working' : ''} ${className}`} viewBox="0 0 70 100" aria-hidden="true">
      <circle cx="35" cy="16" r="11" fill="#fcd9b6" stroke="#c4a484" strokeWidth="1.5" />
      <path d="M26 14 Q35 9 44 14" fill="#4a3728" />
      <path d={face.brow} stroke="#4a3728" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="15" r="1.2" fill="#334155" />
      <circle cx="40" cy="15" r="1.2" fill="#334155" />
      <path d={face.mouth} stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M22 32 L48 32 L44 62 L26 62 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
      <path d="M22 36 L12 48" stroke="#fcd9b6" strokeWidth="5" strokeLinecap="round" className="arm-left" />
      <path d="M48 36 L58 48" stroke="#fcd9b6" strokeWidth="5" strokeLinecap="round" className="arm-right" />
      <rect x="8" y="44" width="12" height="8" rx="1" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1" className="cloth-piece" />
      <path d="M28 62 L26 88" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
      <path d="M42 62 L44 88" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
      {working && (
        <g className="sparkles">
          <circle cx="58" cy="40" r="2" fill="#fbbf24" opacity="0.8" />
          <circle cx="62" cy="48" r="1.5" fill="#fbbf24" opacity="0.6" />
        </g>
      )}
    </svg>
  )
}

export function CapitalistIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 60 95" aria-hidden="true">
      <ellipse cx="30" cy="88" rx="18" ry="4" fill="rgba(0,0,0,0.2)" />
      <rect x="14" y="8" width="32" height="14" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
      <rect x="10" y="18" width="40" height="6" rx="2" fill="#1e293b" />
      <circle cx="30" cy="32" r="10" fill="#fcd9b6" stroke="#c4a484" strokeWidth="1.5" />
      <path d="M22 30 Q30 26 38 30" stroke="#4a3728" strokeWidth="2" fill="none" />
      <path d="M26 36 Q30 40 34 36" stroke="#b45309" strokeWidth="1.2" fill="none" />
      <path d="M18 44 L42 44 L38 72 L22 72 Z" fill="#7f1d1d" stroke="#991b1b" strokeWidth="1.5" />
      <path d="M38 48 L48 58" stroke="#fcd9b6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="50" cy="60" r="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="50" y="64" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="bold">$</text>
      <path d="M24 72 L22 86" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
      <path d="M36 72 L38 86" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export function SewingMachineIcon({ active = false, className = '' }) {
  return (
    <svg className={`th-machine ${active ? 'active' : ''} ${className}`} viewBox="0 0 100 70" aria-hidden="true">
      <rect x="10" y="35" width="80" height="28" rx="4" fill="#475569" stroke="#334155" strokeWidth="2" />
      <rect x="18" y="22" width="50" height="18" rx="3" fill="#64748b" stroke="#475569" strokeWidth="1.5" />
      <circle cx="75" cy="30" r="12" fill="#94a3b8" stroke="#64748b" strokeWidth="2" className="machine-wheel" />
      <circle cx="75" cy="30" r="4" fill="#334155" />
      <path d="M30 40 L70 40" stroke="#fbbf24" strokeWidth="2" className="needle-line" />
      <rect x="25" y="48" width="40" height="6" rx="2" fill="#1e293b" />
      {active && (
        <g className="machine-smoke">
          <circle cx="55" cy="18" r="4" fill="rgba(203,213,225,0.5)" />
          <circle cx="62" cy="12" r="3" fill="rgba(203,213,225,0.35)" />
          <circle cx="48" cy="10" r="2.5" fill="rgba(203,213,225,0.25)" />
        </g>
      )}
    </svg>
  )
}

export function FactoryScene({ working = false, hour = 0, totalHours = 12, workerMood = 'neutral', className = '' }) {
  const progress = totalHours > 0 ? (hour / totalHours) * 100 : 0
  const isSurplus = hour > 6

  return (
    <div className={`th-factory-scene ${working ? 'working' : ''} ${className}`}>
      <svg className="th-factory-bg" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="th-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="100%" stopColor="#1c1917" />
          </linearGradient>
        </defs>
        <rect x="0" y="130" width="400" height="50" fill="url(#th-floor)" />
        <rect x="20" y="40" width="120" height="90" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="2" />
        <rect x="30" y="50" width="30" height="25" fill="#1e3a5f" opacity="0.7" />
        <rect x="70" y="50" width="30" height="25" fill="#1e3a5f" opacity="0.7" />
        <rect x="110" y="50" width="20" height="25" fill="#1e3a5f" opacity="0.7" />
        <rect x="260" y="55" width="120" height="75" rx="4" fill="#44403c" stroke="#57534e" strokeWidth="2" />
        <rect x="270" y="65" width="100" height="8" fill="#78716c" />
        <rect x="270" y="80" width="100" height="8" fill="#78716c" />
        <rect x="270" y="95" width="100" height="8" fill="#78716c" />
        <rect x="160" y="100" width="80" height="30" rx="3" fill="#525252" stroke="#737373" strokeWidth="1" />
        <line x1="160" y1="115" x2="240" y2="115" stroke="#a8a29e" strokeWidth="1" strokeDasharray="4 3" className="belt-line" />
      </svg>

      <div className="th-scene-characters">
        <div className="th-scene-capitalist">
          <CapitalistIcon />
          <span className="th-char-label">Nhà tư bản</span>
        </div>
        <div className="th-scene-workstation">
          <SewingMachineIcon active={working} />
          <div className="th-scene-worker">
            <FactoryWorkerIcon mood={working ? 'neutral' : workerMood} working={working} />
            <span className="th-char-label">Công nhân may</span>
          </div>
        </div>
      </div>

      <div className="th-yarn-output">
        {[...Array(Math.min(hour, 8))].map((_, i) => (
          <span key={i} className="th-yarn-spool" style={{ '--i': i }}>🧵</span>
        ))}
      </div>

      <div className="th-hour-progress">
        <div
          className={`th-hour-fill necessary ${isSurplus ? 'past-necessary' : ''}`}
          style={{ width: `${Math.min(progress, 50)}%` }}
        />
        <div
          className="th-hour-fill surplus"
          style={{ width: `${Math.max(0, progress - 50)}%`, left: '50%' }}
        />
        <span className="th-hour-marker necessary-mark">6h — v</span>
        <span className="th-hour-marker surplus-mark">m</span>
      </div>
    </div>
  )
}
