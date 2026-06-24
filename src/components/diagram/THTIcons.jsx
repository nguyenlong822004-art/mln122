import { MoneyIcon, ClothIcon } from './HTHIcons'

/** Minh họa SVG cho sơ đồ T — H — H' — T' (lưu thông tư bản) */

export function MoneyPlusIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="28" fill="#dcfce7" stroke="#22c55e" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="22" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="40" y="44" textAnchor="middle" fill="#15803d" fontSize="16" fontWeight="bold" fontFamily="serif">$</text>
      <text x="58" y="28" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="bold">+</text>
      <ellipse cx="28" cy="28" rx="8" ry="5" fill="white" opacity="0.4" />
    </svg>
  )
}

export function GoodsBundleIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <rect x="42" y="18" width="28" height="22" rx="3" fill="#fef3c7" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="52" cy="28" r="4" fill="#fde68a" />
      <circle cx="62" cy="32" r="3" fill="#fde68a" />
      <text x="56" y="52" textAnchor="middle" fill="#92400e" fontSize="8" fontWeight="600">Vải</text>
      <circle cx="22" cy="26" r="10" fill="#fcd9b6" stroke="#c4a484" strokeWidth="1.5" />
      <path d="M14 24 Q22 18 30 24" fill="#5c4033" />
      <rect x="12" y="38" width="16" height="18" rx="2" fill="#4a7c59" stroke="#2d5a3d" strokeWidth="1" />
      <text x="22" y="68" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="600">SLĐ</text>
    </svg>
  )
}

export function FactoryIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <rect x="10" y="38" width="60" height="28" fill="#64748b" stroke="#475569" strokeWidth="2" />
      <path d="M10 38 L25 18 L40 38" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <path d="M25 18 L45 18 L60 38" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <rect x="18" y="48" width="10" height="12" fill="#fbbf24" opacity="0.8" />
      <rect x="34" y="48" width="10" height="12" fill="#fbbf24" opacity="0.8" />
      <rect x="50" y="48" width="10" height="12" fill="#fbbf24" opacity="0.8" />
      <rect x="28" y="28" width="8" height="14" fill="#475569" />
      <ellipse cx="32" cy="22" rx="6" ry="4" fill="#cbd5e1" opacity="0.6" />
    </svg>
  )
}

export function YarnProductIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden="true">
      <rect x="12" y="20" width="56" height="44" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <path d="M12 30h56M12 40h56M12 50h56" stroke="#93c5fd" strokeWidth="1" />
      <ellipse cx="40" cy="42" rx="16" ry="12" fill="#60a5fa" opacity="0.35" />
      <text x="40" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="700">Quần áo</text>
    </svg>
  )
}

export function CapitalistIcon({ className = '', action = 'money' }) {
  return (
    <svg className={className} viewBox="0 0 60 95" aria-hidden="true">
      <circle cx="30" cy="14" r="10" fill="#fcd9b6" stroke="#c4a484" strokeWidth="1.5" />
      <ellipse cx="30" cy="10" rx="11" ry="5" fill="#1e293b" />
      <rect x="14" y="8" width="32" height="4" rx="2" fill="#1e293b" />
      <path d="M16 28 L44 28 L40 56 L20 56 Z" fill="#1e3a5f" stroke="#0f172a" strokeWidth="1.5" />
      <path d="M44 28 L48 22 L52 28" fill="#1e3a5f" stroke="#0f172a" strokeWidth="1" />
      <path d="M16 32 L6 40" stroke="#fcd9b6" strokeWidth="5" strokeLinecap="round" />
      <path d="M44 32 L54 38" stroke="#fcd9b6" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 56 L20 78" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
      <path d="M38 56 L40 78" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
      {action === 'money' && (
        <circle cx="8" cy="44" r="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      )}
      {action === 'buy' && (
        <rect x="48" y="36" width="12" height="10" rx="1" fill="#fef3c7" stroke="#ca8a04" strokeWidth="1" />
      )}
      {action === 'produce' && (
        <rect x="46" y="34" width="14" height="12" rx="1" fill="#93c5fd" stroke="#3b82f6" strokeWidth="1" />
      )}
      {action === 'sell' && (
        <circle cx="8" cy="44" r="9" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
      )}
    </svg>
  )
}

export { MoneyIcon, ClothIcon }
