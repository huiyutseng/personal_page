interface FloralDecorationProps {
  className?: string
  /** "gold" reads well on dark navy sections, "lavender" on cream sections */
  tone?: 'gold' | 'lavender'
  flip?: boolean
}

/**
 * A small procedural vine-and-blossom ornament, drawn purely in SVG so no
 * external image assets are required. Purely decorative — hidden from
 * assistive tech.
 */
export default function FloralDecoration({
  className = '',
  tone = 'gold',
  flip = false,
}: FloralDecorationProps) {
  const line = tone === 'gold' ? '#D8B46A' : '#C9B7E8'
  const petal = tone === 'gold' ? '#D8C4E8' : '#B8A7D9'
  const petalSoft = tone === 'gold' ? '#F2B8C1' : '#D8C4E8'
  const leaf = tone === 'gold' ? '#C89555' : '#9C8BC0'

  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 210 C 40 170, 20 120, 55 90 C 85 65, 70 30, 100 10"
        fill="none"
        stroke={line}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M30 190 C 55 175, 45 150, 70 135"
        fill="none"
        stroke={leaf}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="26" cy="176" rx="9" ry="4.5" fill={leaf} opacity="0.55" transform="rotate(-35 26 176)" />
      <ellipse cx="66" cy="140" rx="8" ry="4" fill={leaf} opacity="0.5" transform="rotate(20 66 140)" />

      {/* blossom cluster 1 */}
      <g transform="translate(58,92)">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-8"
            rx="5.5"
            ry="8"
            fill={petal}
            opacity="0.85"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="3.5" fill={line} />
      </g>

      {/* blossom cluster 2, smaller */}
      <g transform="translate(98,16)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-5.5"
            rx="4"
            ry="6"
            fill={petalSoft}
            opacity="0.85"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="2.5" fill={line} />
      </g>

      <circle cx="14" cy="204" r="1.4" fill={line} opacity="0.9" />
      <circle cx="86" cy="70" r="1.2" fill={line} opacity="0.8" />
      <circle cx="120" cy="8" r="1.4" fill={line} opacity="0.9" />
    </svg>
  )
}
