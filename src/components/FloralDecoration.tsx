interface FloralDecorationProps {
  className?: string
  /** "gold" reads well on dark navy sections, "lavender" on cream sections */
  tone?: 'gold' | 'lavender'
  flip?: boolean
  variant?: 'vine' | 'wildVine' | 'sprig'
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
  variant = 'vine',
}: FloralDecorationProps) {
  const line = tone === 'gold' ? '#D8B46A' : '#C9B7E8'
  const petal = tone === 'gold' ? '#D8C4E8' : '#B8A7D9'
  const petalSoft = tone === 'gold' ? '#F2B8C1' : '#D8C4E8'
  const leaf = tone === 'gold' ? '#C89555' : '#9C8BC0'
  const blossomOne = [-8, 48, 116, 184, 252, 314]
  const blossomTwo = [10, 86, 151, 229, 302]

  if (variant === 'wildVine') {
    return (
      <svg
        viewBox="0 0 220 220"
        className={className}
        style={flip ? { transform: 'scaleX(-1)' } : undefined}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M20 220 C 30 178, 19 148, 42 116 C 60 91, 44 62, 68 36"
          fill="none"
          stroke={line}
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.62"
        />
        <path
          d="M38 130 C 20 116, 24 94, 10 78"
          fill="none"
          stroke={leaf}
          strokeWidth="0.95"
          strokeLinecap="round"
          opacity="0.45"
        />
        <ellipse cx="30" cy="160" rx="8" ry="3.6" fill={leaf} opacity="0.38" transform="rotate(-58 30 160)" />
        <ellipse cx="45" cy="105" rx="6" ry="3" fill={leaf} opacity="0.36" transform="rotate(46 45 105)" />
        <ellipse cx="15" cy="82" rx="5.4" ry="2.8" fill={leaf} opacity="0.32" transform="rotate(-28 15 82)" />
        <g transform="translate(42,117) rotate(-18)">
          {[-20, 46, 121, 203, 281].map((deg, i) => (
            <ellipse
              key={deg}
              cx={i === 1 ? '0.8' : '-0.4'}
              cy="-6.2"
              rx={i === 4 ? '3.4' : '4.6'}
              ry={i === 0 ? '7.2' : '6.1'}
              fill={petal}
              opacity={i === 2 ? '0.58' : '0.78'}
              transform={`rotate(${deg})`}
            />
          ))}
          <circle r="2.4" fill={line} opacity="0.82" />
        </g>
        <circle cx="25" cy="190" r="1.4" fill={line} opacity="0.8" />
        <circle cx="64" cy="42" r="1.2" fill={petalSoft} opacity="0.7" />
        <circle cx="8" cy="72" r="1" fill={line} opacity="0.56" />
      </svg>
    )
  }

  if (variant === 'sprig') {
    return (
      <svg
        viewBox="0 0 220 220"
        className={className}
        style={flip ? { transform: 'scaleX(-1)' } : undefined}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M72 198 C 86 156, 72 124, 102 92 C 124 68, 112 43, 137 22"
          fill="none"
          stroke={line}
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.58"
        />
        <path
          d="M92 126 C 118 114, 128 91, 151 82"
          fill="none"
          stroke={leaf}
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.42"
        />
        <ellipse cx="88" cy="142" rx="5.8" ry="2.7" fill={leaf} opacity="0.34" transform="rotate(-34 88 142)" />
        <ellipse cx="133" cy="91" rx="6.5" ry="2.9" fill={leaf} opacity="0.36" transform="rotate(18 133 91)" />
        <g transform="translate(103,94) rotate(17)">
          {[-6, 69, 151, 236, 304].map((deg, i) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-4.8"
              rx={i === 0 ? '3.2' : '3.8'}
              ry={i === 3 ? '5.3' : '5.9'}
              fill={petal}
              opacity={i === 4 ? '0.62' : '0.76'}
              transform={`rotate(${deg})`}
            />
          ))}
          <circle r="2" fill={line} opacity="0.78" />
        </g>
        <circle cx="139" cy="24" r="1.2" fill={line} opacity="0.78" />
        <circle cx="154" cy="80" r="1" fill={petalSoft} opacity="0.66" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 212 C 38 174, 24 132, 58 96 C 88 64, 76 32, 104 12"
        fill="none"
        stroke={line}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M29 190 C 54 176, 46 151, 73 134"
        fill="none"
        stroke={leaf}
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="25" cy="177" rx="9.5" ry="4.2" fill={leaf} opacity="0.5" transform="rotate(-42 25 177)" />
      <ellipse cx="67" cy="139" rx="7.2" ry="4.6" fill={leaf} opacity="0.46" transform="rotate(28 67 139)" />
      <ellipse cx="48" cy="116" rx="5.8" ry="3.2" fill={leaf} opacity="0.34" transform="rotate(-18 48 116)" />

      {/* blossom cluster 1 */}
      <g transform="translate(58,93) rotate(-7)">
        {blossomOne.map((deg, i) => (
          <ellipse
            key={deg}
            cx={i % 2 === 0 ? '0.6' : '-0.8'}
            cy={i === 2 ? '-8.8' : '-7.6'}
            rx={i % 2 === 0 ? '5.1' : '5.9'}
            ry={i === 4 ? '7.1' : '8.2'}
            fill={petal}
            opacity={i === 5 ? '0.72' : '0.84'}
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="3.5" fill={line} />
      </g>

      {/* blossom cluster 2, smaller */}
      <g transform="translate(99,17) rotate(11)">
        {blossomTwo.map((deg, i) => (
          <ellipse
            key={deg}
            cx={i === 1 ? '0.5' : '-0.3'}
            cy="-5.5"
            rx={i === 3 ? '3.5' : '4.3'}
            ry={i === 0 ? '6.5' : '5.8'}
            fill={petalSoft}
            opacity={i === 2 ? '0.7' : '0.84'}
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
