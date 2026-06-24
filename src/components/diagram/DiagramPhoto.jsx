/** Ảnh minh họa chuyên nghiệp cho sơ đồ lưu thông */
export default function DiagramPhoto({
  src,
  alt,
  className = '',
  size = 'station',
}) {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      className={`diagram-photo diagram-photo--${size} ${className}`.trim()}
      loading="lazy"
      decoding="async"
    />
  )
}
