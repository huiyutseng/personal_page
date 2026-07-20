import { Sparkles } from 'lucide-react'
import { useState, type ImgHTMLAttributes } from 'react'

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** Tailwind classes for the gradient shown until a real image exists at `src`. */
  fallbackClassName?: string
  icon?: React.ReactNode
}

/**
 * Renders `src` if it loads; otherwise falls back to a soft gradient panel so
 * missing placeholder assets (see /public/images/…) never break the layout.
 */
export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  icon,
  ...rest
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-navy-card via-lavender/35 to-navy-deep ${fallbackClassName || className}`}
        role="img"
        aria-label={alt}
      >
        {icon ?? <Sparkles className="h-8 w-8 text-lavender/60" strokeWidth={1} />}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      loading="lazy"
      {...rest}
    />
  )
}
