'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="text-center py-4">
        <div className="text-5xl mb-4">📬</div>
        <p
          className="text-lg font-bold mb-1"
          style={{ fontFamily: 'var(--font-anton)', color: 'var(--color-gold-base)' }}
        >
          Link enviado!
        </p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Confira seu e-mail em{' '}
          <span className="font-semibold text-white">{email}</span>
        </p>
        <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Verifique a pasta de spam se não aparecer.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold mb-1.5 uppercase tracking-wider"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Seu e-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          required
          className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/20 outline-none transition-all"
          style={{
            backgroundColor: 'var(--color-felt-dark)',
            border: '1.5px solid rgba(201,150,13,0.25)',
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = 'var(--color-gold-base)')
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = 'rgba(201,150,13,0.25)')
          }
        />
      </div>

      {error && (
        <p className="text-red-400 text-xs">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide transition-all disabled:opacity-50 active:scale-[0.98]"
        style={{
          backgroundColor: 'var(--color-gold-base)',
          color: 'var(--color-felt-dark)',
          fontFamily: 'var(--font-anton)',
          letterSpacing: '0.05em',
        }}
      >
        {loading ? 'Enviando…' : '✨ Entrar com magic link'}
      </button>
    </form>
  )
}
