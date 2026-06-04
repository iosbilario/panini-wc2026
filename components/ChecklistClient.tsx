'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { GROUPS, TOTAL_STICKERS, teamsByGroup } from '@/lib/catalog'
import type { Team } from '@/lib/catalog'
import TeamCard from './TeamCard'
import ProgressBar from './ProgressBar'
import MissingListModal from './MissingListModal'

interface Props {
  userId: string
  userEmail: string
  teams: Team[]
  initialOwned: string[]
}

const OWNER_EMAIL = 'iosbilario@gmail.com'

export default function ChecklistClient({ userId, userEmail, teams, initialOwned }: Props) {
  const [owned, setOwned] = useState<Set<string>>(() => new Set(initialOwned))
  const [showOnlyMissing, setShowOnlyMissing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  // ── Optimistic toggle ──────────────────────────────────────────────────
  const toggleSticker = useCallback(
    async (teamCode: string, number: number) => {
      const key = `${teamCode}-${number}`
      const wasOwned = owned.has(key)

      setOwned((prev) => {
        const next = new Set(prev)
        wasOwned ? next.delete(key) : next.add(key)
        return next
      })

      try {
        if (wasOwned) {
          const { error } = await supabase
            .from('owned')
            .delete()
            .eq('user_id', userId)
            .eq('team_code', teamCode)
            .eq('number', number)
          if (error) throw error
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
      }
    },
    [owned, supabase, userId]
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

  // ── Missing list ───────────────────────────────────────────────────────
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

            <button
              onClick={() => setShowModal(true)}
              className="text-xs px-3 py-1.5 rounded-full transition-all"
              style={{
                color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
            >
              📋 Lista de faltas
            </button>

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
        {GROUPS.map((grp) => {
          const grpTeams = teamsByGroup(grp)

          // In missing-only mode, skip groups that are all complete
          if (
            showOnlyMissing &&
            grpTeams.every((team) =>
              Array.from({ length: team.total }, (_, i) => i + 1).every((n) =>
                owned.has(`${team.code}-${n}`)
              )
            )
          ) {
            return null
          }

          return (
            <section key={grp}>
              <h2
                className="text-base uppercase tracking-widest mb-3"
                style={{ fontFamily: 'var(--font-anton)', color: 'var(--color-gold-base)' }}
              >
                {grp === 'Especiais' ? '★ Especiais' : `Grupo ${grp}`}
              </h2>
              <div className="space-y-3">
                {grpTeams.map((team) => (
                  <TeamCard
                    key={team.code}
                    team={team}
                    owned={owned}
                    showOnlyMissing={showOnlyMissing}
                    onToggle={toggleSticker}
                  />
                ))}
              </div>
            </section>
          )
        })}

        {/* Empty state when filter is on and all stickers are collected */}
        {showOnlyMissing && totalMissing === 0 && (
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
      </main>

      {/* ── Modal ─────────────────────────────────────────────────────── */}
      {showModal && (
        <MissingListModal
          missingList={missingList}
          totalMissing={totalMissing}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
