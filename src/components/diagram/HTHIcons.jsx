/** Minh họa SVG cho sơ đồ H — T — H */

export function ClothIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <rect x="8" y="12" width="64" height="56" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <path d="M8 20h64M8 28h64M8 36h64M8 44h64M8 52h64" stroke="#93c5fd" strokeWidth="1" opacity="0.8" />
      <path d="M20 12v56M32 12v56M44 12v56M56 12v56" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />
      <ellipse cx="40" cy="40" rx="18" ry="14" fill="#60a5fa" opacity="0.3" />
    </svg>
  )
}

export function MoneyIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="28" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="22" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="40" y="48" textAnchor="middle" fill="#b45309" fontSize="22" fontWeight="bold" fontFamily="serif">$</text>
      <ellipse cx="28" cy="28" rx="8" ry="5" fill="white" opacity="0.35" />
    </svg>
  )
}

export function FoodIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <path d="M18 55 L40 18 L62 55 Z" fill="#fde68a" stroke="#ca8a04" strokeWidth="2" />
      <path d="M22 50 L58 50" stroke="#ca8a04" strokeWidth="1.5" />
      <ellipse cx="40" cy="52" rx="22" ry="8" fill="#fbbf24" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="32" cy="48" r="3" fill="#fef9c3" />
      <circle cx="40" cy="46" r="3" fill="#fef9c3" />
      <circle cx="48" cy="48" r="3" fill="#fef9c3" />
    </svg>
  )
}

export function WorkerIcon({ className = '', holding = 'cloth' }) {
  return (
    <svg className={className} viewBox="0 0 60 90" aria-hidden="true">
      {/* Head */}
      <circle cx="30" cy="14" r="10" fill="#fcd9b6" stroke="#c4a484" strokeWidth="1.5" />
      <path d="M22 12 Q30 8 38 12" fill="#5c4033" stroke="none" />
      {/* Body */}
      <path d="M18 28 L42 28 L38 58 L22 58 Z" fill="#4a7c59" stroke="#2d5a3d" strokeWidth="1.5" />
      {/* Arms */}
      <path d="M18 32 L8 42" stroke="#fcd9b6" strokeWidth="5" strokeLinecap="round" />
      <path d="M42 32 L52 42" stroke="#fcd9b6" strokeWidth="5" strokeLinecap="round" />
      {/* Legs */}
      <path d="M24 58 L22 78" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
      <path d="M36 58 L38 78" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
      {/* Held item */}
      {holding === 'cloth' && (
        <rect x="4" y="38" width="14" height="12" rx="1" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1" transform="rotate(-15 11 44)" />
      )}
      {holding === 'money' && (
        <circle cx="10" cy="42" r="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      )}
      {holding === 'food' && (
        <path d="M46 38 L52 48 L40 48 Z" fill="#fde68a" stroke="#ca8a04" strokeWidth="1" />
      )}
    </svg>
  )
}
