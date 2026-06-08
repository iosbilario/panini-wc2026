'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { GROUPS, TOTAL_STICKERS, teamsByGroup, groupLabel } from '@/lib/catalog'
import type { Team } from '@/lib/catalog'
import TeamCard from './TeamCard'
import ProgressBar from './ProgressBar'
import MissingListModal from './MissingListModal'
import TradeListModal from './TradeListModal'

interface Props {
  userId: string
  userEmail: string
  teams: Team[]
  initialOwned: string[]
  initialDups: { key: string; qty: number }[]
}

const OWNER_EMAIL = 'iosbilario@gmail.com'

// Tapping a collected sticker in "Repetidas" mode cycles 0 → 1 → … → MAX → 0
const MAX_DUP = 9

export default function ChecklistClient({
  userId,
  userEmail,
  teams,
  initialOwned,
  initialDups,
}: Props) {
  const [owned, setOwned] = useState<Set<string>>(() => new Set(initialOwned))
  const [dups, setDups] = useState<Map<string, number>>(
    () => new Map(initialDups.map((d): [string, number] => [d.key, d.qty]))
  )
  const [view, setView] = useState<'collect' | 'dups'>('collect')
  const [showOnlyMissing, setShowOnlyMissing] = useState(false)
  const [showMissingModal, setShowMissingModal] = useState(false)
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  // ── Optimistic toggle (collect mode) ───────────────────────────────────
  const toggleSticker = useCallback(
    async (teamCode: string, number: number) => {
      const key = `${teamCode}-${number}`
      const wasOwned = owned.has(key)
      const prevDup = dups.get(key) ?? 0

      setOwned((prev) => {
        const next = new Set(prev)
        wasOwned ? next.delete(key) : next.add(key)
        return next
      })
      // Removing a sticker you no longer own also clears its repeats
      if (wasOwned && prevDup > 0) {
        setDups((prev) => {
          const next = new Map(prev)
          next.delete(key)
          return next
        })
      }

      try {
        if (wasOwned) {
          const { error } = await supabase
            .from('owned')
            .delete()
            .eq('user_id', userId)
            .eq('team_code', teamCode)
            .eq('number', number)
          if (error) throw error
          if (prevDup > 0) {
            await supabase
              .from('duplicates')
              .delete()
              .eq('user_id', userId)
              .eq('team_code', teamCode)
              .eq('number', number)
          }
        } else {
          const { error } = await supabase
            .from('owned')
            .insert({ user_id: userId, team_code: teamCode, number })
          if (error) throw error
        }
      } catch {
        // Rollback on failure
        setOwned((prev) => {
          const next = new Set(prev)
          wasOwned ? next.add(key) : next.delete(key)
          return next
        })
        if (wasOwned && prevDup > 0) {
          setDups((prev) => new Map(prev).set(key, prevDup))
        }
      }
    },
    [owned, dups, supabase, userId]
  )

  // ── Optimistic cycle (duplicates mode) ─────────────────────────────────
  const cycleDup = useCallback(
    async (teamCode: string, number: number) => {
      const key = `${teamCode}-${number}`
      const prevQty = dups.get(key) ?? 0
      const nextQty = (prevQty + 1) % (MAX_DUP + 1) // 0..MAX, wraps to 0

      setDups((prev) => {
        const next = new Map(prev)
        nextQty === 0 ? next.delete(key) : next.set(key, nextQty)
        return next
      })

      try {
        if (nextQty === 0) {
          const { error } = await supabase
            .from('duplicates')
            .delete()
            .eq('user_id', userId)
            .eq('team_code', teamCode)
            .eq('number', number)
          if (error) throw error
        } else {
          const { error } = await supabase.from('duplicates').upsert(
            { user_id: userId, team_code: teamCode, number, qty: nextQty },
            { onConflict: 'user_id,team_code,number' }
          )
          if (error) throw error
        }
      } catch {
        // Rollback on failure
        setDups((prev) => {
          const next = new Map(prev)
          prevQty === 0 ? next.delete(key) : next.set(key, prevQty)
          return next
        })
      }
    },
    [dups, supabase, userId]
  )

  // ── Sign out ───────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  // ── Seed initial progress (owner only) ────────────────────────────────
  const handleSeed = async () => {
    setSeeding(true)
    setSeedMsg(null)
    try {
      const res = await fetch('/api/seed', { method: 'POST' })
      const json = await res.json()
      if (!res.ok) {
        setSeedMsg(`Erro: ${json.error}`)
      } else {
        setSeedMsg(`✓ ${json.inserted} figurinhas importadas! Recarregando…`)
        setTimeout(() => router.refresh(), 1200)
      }
    } catch {
      setSeedMsg('Erro ao importar. Tente novamente.')
    }
    setSeeding(false)
  }

  // ── Stats ──────────────────────────────────────────────────────────────
  const totalOwned = owned.size
  const totalMissing = TOTAL_STICKERS - totalOwned
  const pct = Math.round((totalOwned / TOTAL_STICKERS) * 100)
  const totalDups = useMemo(
    () => Array.from(dups.values()).reduce((s, q) => s + q, 0),
    [dups]
  )

  // ── Missing list (for export) ──────────────────────────────────────────
  const missingList = useMemo(
    () =>
      teams
        .map((team) => ({
          team,
          missing: Array.from({ length: team.total }, (_, i) => i + 1).filter(
            (n) => !owned.has(`${team.code}-${n}`)
          ),
        }))
        .filter(({ missing }) => missing.length > 0),
    [teams, owned]
  )

  // ── Repeated list (for trade export) ───────────────────────────────────
  const tradeList = useMemo(
    () =>
      teams
        .map((team) => ({
          team,
          repeated: Array.from({ length: team.total }, (_, i) => i + 1)
            .map((n) => ({ n, qty: dups.get(`${team.code}-${n}`) ?? 0 }))
            .filter(({ qty }) => qty > 0),
        }))
        .filter(({ repeated }) => repeated.length > 0),
    [teams, dups]
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-felt-dark)' }}>
      {/* ── Sticky header ──────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40"
        style={{
          backgroundColor: 'rgba(9,31,18,0.97)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(201,150,13,0.15)',
        }}
      >
        <div className="max-w-2xl mx-auto px-4 py-3">
          {/* Title row */}
          <div className="flex items-center justify-between mb-1">
            <h1
              className="text-2xl tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-anton)', color: 'var(--color-gold-base)' }}
            >
              ⚽ WC 2026
            </h1>
            <button
              onClick={handleSignOut}
              className="text-xs px-3 py-1 rounded-full transition-all"
              style={{
                color: 'rgba(255,255,255,0.35)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              Sair
            </button>
          </div>

          {/* Progress bar */}
          <ProgressBar
            owned={totalOwned}
            total={TOTAL_STICKERS}
            missing={totalMissing}
            pct={pct}
          />

          {/* Action buttons */}
          <div className="flex gap-2 mt-2.5 flex-wrap">
            <button
              onClick={() => setView((v) => (v === 'dups' ? 'collect' : 'dups'))}
              className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
              style={{
                backgroundColor: view === 'dups' ? '#facc15' : 'rgba(255,255,255,0.06)',
                color: view === 'dups' ? '#1a1205' : 'rgba(255,255,255,0.55)',
                border:
                  view === 'dups'
                    ? '1px solid transparent'
                    : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {view === 'dups' ? '✓ Repetidas' : '♻️ Repetidas'}
            </button>

            {view === 'collect' && (
              <button
                onClick={() => setShowOnlyMissing((v) => !v)}
                className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor: showOnlyMissing
                    ? 'var(--color-gold-base)'
                    : 'rgba(255,255,255,0.06)',
                  color: showOnlyMissing ? 'var(--color-felt-dark)' : 'rgba(255,255,255,0.55)',
                  border: showOnlyMissing
                    ? '1px solid transparent'
                    : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {showOnlyMissing ? '✓ Só faltantes' : 'Só faltantes'}
              </button>
            )}

            {view === 'collect' ? (
              <button
                onClick={() => setShowMissingModal(true)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                }}
              >
                📋 Lista de faltas
              </button>
            ) : (
              <button
                onClick={() => setShowTradeModal(true)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  color: '#facc15',
                  border: '1px solid rgba(250,204,21,0.3)',
                  backgroundColor: 'rgba(250,204,21,0.08)',
                }}
              >
                📤 Lista de troca{totalDups > 0 ? ` (${totalDups})` : ''}
              </button>
            )}

            {userEmail === OWNER_EMAIL && owned.size === 0 && (
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
                style={{
                  backgroundColor: 'rgba(22,163,74,0.15)',
                  color: '#4ade80',
                  border: '1px solid rgba(22,163,74,0.3)',
                }}
              >
                {seeding ? '⏳ Importando…' : '📥 Importar progresso inicial'}
              </button>
            )}
          </div>

          {seedMsg && (
            <p className="text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {seedMsg}
            </p>
          )}
        </div>
      </header>

      {/* ── Checklist ─────────────────────────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-20 space-y-8">
        {view === 'dups' && (
          <div
            className="rounded-xl px-4 py-3 text-xs"
            style={{
              backgroundColor: 'rgba(250,204,21,0.08)',
              border: '1px solid rgba(250,204,21,0.2)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <strong style={{ color: '#facc15' }}>Modo repetidas.</strong> Toque numa
            figurinha colada para marcar quantas você tem para troca (×1, ×2…). Toque de
            novo para aumentar; volta a zero depois de {MAX_DUP}. Depois use{' '}
            <strong>📤 Lista de troca</strong> para enviar aos interessados.
          </div>
        )}

        {GROUPS.map((grp) => {
          const grpTeams = teamsByGroup(grp)

          if (view === 'dups') {
            // Hide groups where nothing is collected (nothing to trade)
            const anyOwned = grpTeams.some((team) =>
              Array.from({ length: team.total }, (_, i) => i + 1).some((n) =>
                owned.has(`${team.code}-${n}`)
              )
            )
            if (!anyOwned) return null
          } else if (
            showOnlyMissing &&
            grpTeams.every((team) =>
              Array.from({ length: team.total }, (_, i) => i + 1).every((n) =>
                owned.has(`${team.code}-${n}`)
              )
            )
          ) {
            // In missing-only mode, skip groups that are all complete
            return null
          }

          return (
            <section key={grp}>
              <h2
                className="text-base uppercase tracking-widest mb-3"
                style={{ fontFamily: 'var(--font-anton)', color: 'var(--color-gold-base)' }}
              >
                {groupLabel(grp)}
              </h2>
              <div className="space-y-3">
                {grpTeams.map((team) => (
                  <TeamCard
                    key={team.code}
                    team={team}
                    owned={owned}
                    dups={dups}
                    view={view}
                    showOnlyMissing={showOnlyMissing}
                    onToggle={toggleSticker}
                    onCycleDup={cycleDup}
                  />
                ))}
              </div>
            </section>
          )
        })}

        {/* Empty state: missing-only filter with full album */}
        {view === 'collect' && showOnlyMissing && totalMissing === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🏆</div>
            <p
              className="text-xl mb-2"
              style={{ fontFamily: 'var(--font-anton)', color: 'var(--color-gold-base)' }}
            >
              ÁLBUM COMPLETO!
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>
              Todas as {TOTAL_STICKERS} figurinhas coladas.
            </p>
          </div>
        )}

        {/* Empty state: duplicates mode with nothing collected yet */}
        {view === 'dups' && totalOwned === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">♻️</div>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>
              Cole algumas figurinhas primeiro para poder marcar repetidas.
            </p>
          </div>
        )}
      </main>

      {/* ── Modals ────────────────────────────────────────────────────── */}
      {showMissingModal && (
        <MissingListModal
          missingList={missingList}
          totalMissing={totalMissing}
          onClose={() => setShowMissingModal(false)}
        />
      )}
      {showTradeModal && (
        <TradeListModal
          tradeList={tradeList}
          totalDups={totalDups}
          onClose={() => setShowTradeModal(false)}
        />
      )}
    </div>
  )
}
