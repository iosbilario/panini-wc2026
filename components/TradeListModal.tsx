'use client'

import { useState } from 'react'
import type { Team } from '@/lib/catalog'

interface TradeEntry {
  team: Team
  repeated: { n: number; qty: number }[]
}

interface Props {
  tradeList: TradeEntry[]
  totalDups: number
  onClose: () => void
}

export default function TradeListModal({ tradeList, totalDups, onClose }: Props) {
  const [copied, setCopied] = useState(false)

  const body = tradeList
    .map(
      ({ team, repeated }) =>
        `${team.flag} ${team.code}: ` +
        repeated.map(({ n, qty }) => (qty > 1 ? `${n}×${qty}` : `${n}`)).join(', ')
    )
    .join('\n')

  const text =
    `♻️ Repetidas para troca — Copa 2026\n` +
    `${totalDups} figurinha${totalDups !== 1 ? 's' : ''} disponíve${totalDups !== 1 ? 'is' : 'l'}\n\n` +
    body

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-md flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--color-felt-mid)',
          border: '1px solid rgba(255,255,255,0.08)',
          maxHeight: '85vh',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div>
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-anton)', color: '#facc15' }}>
              ♻️ Repetidas para troca
            </h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {totalDups} figurinha{totalDups !== 1 ? 's' : ''} disponíve
              {totalDups !== 1 ? 'is' : 'l'} para troca
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
            style={{ color: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.06)' }}
          >
            ✕
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {tradeList.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📭</div>
              <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                Nenhuma repetida marcada ainda.
              </p>
              <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Ative o modo <strong>♻️ Repetidas</strong> e toque nas figurinhas coladas.
              </p>
            </div>
          ) : (
            <pre
              className="text-xs leading-relaxed whitespace-pre-wrap font-mono"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {text}
            </pre>
          )}
        </div>

        {/* Footer */}
        {tradeList.length > 0 && (
          <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={handleCopy}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
              style={{
                backgroundColor: copied ? '#15803d' : '#facc15',
                color: copied ? 'white' : '#1a1205',
                fontFamily: 'var(--font-anton)',
                letterSpacing: '0.04em',
              }}
            >
              {copied ? '✓ Copiado!' : '📋 Copiar lista de troca'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
