'use client'

import type { Team } from '@/lib/catalog'
import { isSpecialGroup, stickerLabel, teamNumbers } from '@/lib/catalog'
import StickerChip from './StickerChip'
import Flag from './Flag'

interface Props {
  team: Team
  owned: Set<string>
  dups: Map<string, number>
  view: 'collect' | 'dups'
  showOnlyMissing: boolean
  onToggle: (teamCode: string, number: number) => void
  onCycleDup: (teamCode: string, number: number) => void
  onResetDup: (teamCode: string, number: number) => void
}

export default function TeamCard({
  team,
  owned,
  dups,
  view,
  showOnlyMissing,
  onToggle,
  onCycleDup,
  onResetDup,
}: Props) {
  const allNumbers = teamNumbers(team)
  const ownedCount = allNumbers.filter((n) => owned.has(`${team.code}-${n}`)).length
  const isComplete = ownedCount === team.total
  const isSpecial = isSpecialGroup(team.grp)

  // ── Duplicates view: only owned stickers can have repeats ──────────────
  if (view === 'dups') {
    const ownedNumbers = allNumbers.filter((n) => owned.has(`${team.code}-${n}`))
    // Nothing collected → nothing to trade, hide the card
    if (ownedNumbers.length === 0) return null

    const dupTotal = ownedNumbers.reduce(
      (s, n) => s + (dups.get(`${team.code}-${n}`) ?? 0),
      0
    )

    return (
      <div
        className="rounded-xl p-3.5"
        style={{
          backgroundColor: 'var(--color-felt-card)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <CardHeader team={team} isSpecial={isSpecial}>
          <span
            className="shrink-0 text-xs font-mono ml-2"
            style={{ color: dupTotal > 0 ? '#facc15' : 'rgba(255,255,255,0.35)' }}
          >
            {dupTotal > 0 ? `${dupTotal} rep.` : '—'}
          </span>
        </CardHeader>

        <div className="flex flex-wrap gap-1.5">
          {ownedNumbers.map((n) => (
            <StickerChip
              key={n}
              number={n}
              label={stickerLabel(team, n)}
              isOwned
              isEscudo={!isSpecial && n === 1}
              isPais={!isSpecial && n === 13}
              dupCount={dups.get(`${team.code}-${n}`) ?? 0}
              view="dups"
              onToggle={() => onCycleDup(team.code, n)}
              onReset={() => onResetDup(team.code, n)}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Collect view (default) ─────────────────────────────────────────────
  // In "missing only" mode, hide completed teams entirely
  if (showOnlyMissing && isComplete) return null

  const chipsToShow = showOnlyMissing
    ? allNumbers.filter((n) => !owned.has(`${team.code}-${n}`))
    : allNumbers

  return (
    <div
      className="rounded-xl p-3.5"
      style={{
        backgroundColor: 'var(--color-felt-card)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <CardHeader team={team} isSpecial={isSpecial}>
        <span
          className="shrink-0 text-xs font-mono ml-2"
          style={{ color: isComplete ? '#4ade80' : 'rgba(255,255,255,0.35)' }}
        >
          {ownedCount}/{team.total}
        </span>
      </CardHeader>

      <div className="flex flex-wrap gap-1.5">
        {chipsToShow.map((n) => (
          <StickerChip
            key={n}
            number={n}
            label={stickerLabel(team, n)}
            isOwned={owned.has(`${team.code}-${n}`)}
            isEscudo={!isSpecial && n === 1}
            isPais={!isSpecial && n === 13}
            dupCount={dups.get(`${team.code}-${n}`) ?? 0}
            view="collect"
            onToggle={() => onToggle(team.code, n)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Shared header: flag + code + name + right-side stat ──────────────────
function CardHeader({
  team,
  isSpecial,
  children,
}: {
  team: Team
  isSpecial: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="shrink-0 text-[11px] font-bold px-2 py-0.5 rounded font-mono flex items-center gap-1"
          style={{
            backgroundColor: 'var(--color-felt-dark)',
            color: 'var(--color-gold-base)',
          }}
        >
          <Flag iso2={team.iso2} fallback={team.flag} className="text-sm" />
          {team.code}
        </span>
        <span
          className="text-sm truncate"
          style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-archivo)' }}
        >
          {team.name}
        </span>
      </div>
      {children}
    </div>
  )
}
