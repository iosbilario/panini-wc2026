import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TEAMS } from '@/lib/catalog'
import ChecklistClient from '@/components/ChecklistClient'

export default async function ChecklistPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/')

  // Load all owned + duplicate stickers for this user in parallel
  const [{ data: owned }, { data: duplicates }] = await Promise.all([
    supabase.from('owned').select('team_code, number').eq('user_id', user.id),
    supabase.from('duplicates').select('team_code, number, qty').eq('user_id', user.id),
  ])

  const initialOwned = (owned ?? []).map(
    (r) => `${r.team_code}-${r.number}`
  )

  const initialDups = (duplicates ?? []).map((r) => ({
    key: `${r.team_code}-${r.number}`,
    qty: r.qty as number,
  }))

  return (
    <ChecklistClient
      userId={user.id}
      userEmail={user.email ?? ''}
      teams={TEAMS}
      initialOwned={initialOwned}
      initialDups={initialDups}
    />
  )
}
