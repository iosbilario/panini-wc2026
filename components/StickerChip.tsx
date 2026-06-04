'use client'

interface Props {
  number: number
  isOwned: boolean
  isEscudo: boolean
  isPais: boolean
  onToggle: () => void
}

export default function StickerChip({
  number,
  isOwned,
  isEscudo,
  isPais,
  onToggle,
}: Props) {
  return (
    <button
      onClick={onToggle}
      title={
        isEscudo ? `#${number} — Escudo` : isPais ? `#${number} — País` : `#${number}`
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

      {/* Sticker number */}
      <span
        className="text-xs font-bold leading-none"
        style={{
          color: isOwned ? 'white' : 'rgba(255,255,255,0.3)',
          fontFamily: 'var(--font-archivo)',
        }}
      >
        {number}
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
