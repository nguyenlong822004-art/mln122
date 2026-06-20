import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}) {
  const ref = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
