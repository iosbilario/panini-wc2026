'use client'

import type { Team } from '@/lib/catalog'
import StickerChip from './StickerChip'

interface Props {
  team: Team
  owned: Set<string>
  showOnlyMissing: boolean
  onToggle: (teamCode: string, number: number) => void
}

export default function TeamCard({ team, owned, showOnlyMissing, onToggle }: Props) {
  const allNumbers = Array.from({ length: team.total }, (_, i) => i + 1)
  const ownedCount = allNumbers.filter((n) => owned.has(`${team.code}-${n}`)).length
  const isComplete = ownedCount === team.total

  // In "missing only" mode, hide completed teams entirely
  if (showOnlyMissing && isComplete) return null

  const chipsToShow = showOnlyMissing
    ? allNumbers.filter((n) => !owned.has(`${team.code}-${n}`))
    : allNumbers

  const isSpecial = team.grp === 'Especiais'

  return (
    <div
      className="rounded-xl p-3.5"
      style={{
        backgroundColor: 'var(--color-felt-card)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded font-mono"
            style={{
              backgroundColor: 'var(--color-felt-dark)',
              color: 'var(--color-gold-base)',
            }}
          >
            {team.code}
          </span>
          <span
            className="text-sm truncate"
            style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-archivo)' }}
          >
            {team.name}
          </span>
        </div>
        <span
          className="shrink-0 text-xs font-mono ml-2"
          style={{ color: isComplete ? '#4ade80' : 'rgba(255,255,255,0.35)' }}
        >
          {ownedCount}/{team.total}
        </span>
      </div>

      {/* Chips grid */}
      <div className="flex flex-wrap gap-1.5">
        {chipsToShow.map((n) => (
          <StickerChip
            key={n}
            number={n}
            isOwned={owned.has(`${team.code}-${n}`)}
            isEscudo={!isSpecial && n === 1}
            isPais={!isSpecial && n === 13}
            onToggle={() => onToggle(team.code, n)}
          />
        ))}
      </div>
    </div>
  )
}
