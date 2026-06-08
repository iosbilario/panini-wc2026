'use client'

import { useRef } from 'react'

interface Props {
  number: number
  label?: string
  isOwned: boolean
  isEscudo: boolean
  isPais: boolean
  dupCount: number
  view: 'collect' | 'dups'
  onToggle: () => void
  onReset?: () => void
}

export default function StickerChip({
  number,
  label,
  isOwned,
  isEscudo,
  isPais,
  dupCount,
  view,
  onToggle,
  onReset,
}: Props) {
  const hasDup = dupCount > 0
  const text = label ?? String(number)

  // Long-press (or right-click) clears the repeat count back to zero.
  const longPressed = useRef(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startPress = () => {
    longPressed.current = false
    timer.current = setTimeout(() => {
      longPressed.current = true
      onReset?.()
    }, 450)
  }
  const endPress = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }
  const handleTap = () => {
    if (longPressed.current) {
      longPressed.current = false
      return // long-press already handled the reset
    }
    onToggle()
  }

  // ── Duplicates view: chip is always owned; highlight when it has repeats ─
  if (view === 'dups') {
    return (
      <button
        onClick={handleTap}
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerLeave={endPress}
        onContextMenu={(e) => {
          e.preventDefault()
          onReset?.()
        }}
        title={
          hasDup
            ? `#${text} — ${dupCount} repetida${dupCount !== 1 ? 's' : ''} · toque p/ +1 · segure p/ zerar`
            : `#${text} — toque para marcar repetida`
        }
        className="relative flex items-center justify-center rounded-lg w-10 h-10 transition-all active:scale-90 select-none touch-manipulation"
        style={{
          backgroundColor: hasDup ? '#a16207' : 'var(--color-chip-missing)',
          border: hasDup
            ? '1.5px solid rgba(250,204,21,0.55)'
            : '1.5px solid rgba(255,255,255,0.08)',
          boxShadow: hasDup ? '0 2px 8px rgba(161,98,7,0.45)' : 'none',
        }}
      >
        {hasDup && (
          <span
            className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-0.5 flex items-center justify-center rounded-full text-[9px] font-bold leading-none"
            style={{ backgroundColor: '#facc15', color: '#1a1205' }}
          >
            ×{dupCount}
          </span>
        )}
        <span
          className="text-xs font-bold leading-none"
          style={{
            color: hasDup ? 'white' : 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-archivo)',
          }}
        >
          {text}
        </span>
      </button>
    )
  }

  // ── Collect view (default) ─────────────────────────────────────────────
  return (
    <button
      onClick={onToggle}
      title={
        isEscudo ? `#${text} — Escudo` : isPais ? `#${text} — País` : `#${text}`
      }
      className="relative flex flex-col items-center justify-center rounded-lg w-10 h-10 transition-all active:scale-90 select-none touch-manipulation"
      style={{
        backgroundColor: isOwned
          ? 'var(--color-chip-owned)'
          : 'var(--color-chip-missing)',
        border: isOwned
          ? '1.5px solid rgba(134,239,172,0.35)'
          : '1.5px solid rgba(255,255,255,0.07)',
        boxShadow: isOwned ? '0 2px 8px rgba(22,163,74,0.4)' : 'none',
      }}
    >
      {/* Check mark top-right when owned */}
      {isOwned && (
        <span
          className="absolute top-0.5 right-0.5 text-[7px] leading-none"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          ✓
        </span>
      )}

      {/* Repeated indicator (top-left dot) when this sticker has duplicates */}
      {hasDup && (
        <span
          className="absolute top-0.5 left-0.5 text-[8px] leading-none font-bold"
          style={{ color: '#facc15' }}
          title={`${dupCount} repetida${dupCount !== 1 ? 's' : ''}`}
        >
          ♻
        </span>
      )}

      {/* Sticker number */}
      <span
        className="text-xs font-bold leading-none"
        style={{
          color: isOwned ? 'white' : 'rgba(255,255,255,0.3)',
          fontFamily: 'var(--font-archivo)',
        }}
      >
        {text}
      </span>

      {/* Special label: escudo(1) or país(13) */}
      {(isEscudo || isPais) && (
        <span
          className="text-[6px] leading-none mt-0.5 uppercase font-bold tracking-tight"
          style={{ color: isOwned ? 'rgba(255,255,255,0.65)' : 'var(--color-gold-base)' }}
        >
          {isEscudo ? 'esc' : 'país'}
        </span>
      )}
    </button>
  )
}
