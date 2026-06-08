// Renders a country flag as an image (Twemoji SVG via CDN) so it shows up on
// every platform — including Windows, whose system font has no flag emoji.
// `fallback` (the flag emoji) is used when no iso2 is provided.

const TWEMOJI_BASE =
  'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/'

// England / Scotland use emoji tag sequences instead of regional indicators.
const SUBDIVISIONS: Record<string, string> = {
  'gb-eng': '1f3f4-e0067-e0062-e0065-e006e-e0067-e007f',
  'gb-sct': '1f3f4-e0067-e0062-e0073-e0063-e0074-e007f',
}

function codepoints(iso2: string): string | null {
  const sub = SUBDIVISIONS[iso2]
  if (sub) return sub
  if (!/^[a-z]{2}$/i.test(iso2)) return null
  // Two-letter code → regional indicator symbols (U+1F1E6 = 'A')
  return iso2
    .toLowerCase()
    .split('')
    .map((c) => (0x1f1e6 + c.charCodeAt(0) - 97).toString(16))
    .join('-')
}

export default function Flag({
  iso2,
  fallback,
  className = '',
}: {
  iso2?: string
  fallback?: string
  className?: string
}) {
  const cp = iso2 ? codepoints(iso2) : null

  if (!cp) {
    // Special sections (FWC, Coca-Cola): plain emoji renders fine everywhere
    return (
      <span aria-hidden className={`leading-none ${className}`}>
        {fallback}
      </span>
    )
  }

  return (
    <img
      src={`${TWEMOJI_BASE}${cp}.svg`}
      alt=""
      aria-hidden
      loading="lazy"
      className={`inline-block w-[1.05em] h-[1.05em] object-contain align-[-0.15em] ${className}`}
    />
  )
}
