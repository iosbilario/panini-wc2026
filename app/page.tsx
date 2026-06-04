import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AuthForm from '@/components/AuthForm'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect('/checklist')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4 select-none">⚽</div>
          <h1
            className="text-4xl tracking-widest uppercase mb-1"
            style={{ fontFamily: 'var(--font-anton)', color: 'var(--color-gold-base)' }}
          >
            Panini WC 2026
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Seu álbum digital da Copa do Mundo
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            backgroundColor: 'var(--color-felt-mid)',
            borderColor: 'rgba(201,150,13,0.2)',
          }}
        >
          <AuthForm />
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Seus dados ficam salvos na nuvem — acesse de qualquer dispositivo.
        </p>
      </div>
    </main>
  )
}
