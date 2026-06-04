import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Leandro's current sticker collection
const SEED: Record<string, number[]> = {
  FWC: [],
  MEX: [1, 16],
  RSA: [2, 3, 9, 14, 15, 16, 19],
  KOR: [2, 3, 4, 5, 7, 9, 11, 14, 16, 17, 18, 19],
  CZE: [],
  CAN: [],
  BIH: [],
  QAT: [9, 11, 15, 18],
  SUI: [3, 4],
  BRA: [2, 4, 6, 7, 8, 10, 11],
  MAR: [5, 8, 9],
  HAI: [3, 4, 9, 11, 12, 14, 17, 18],
  SCO: [3, 4, 7, 11, 12, 16, 20],
  USA: [],
  PAR: [1, 3, 7, 11, 12, 20],
  AUS: [1, 16, 18, 20],
  TUR: [],
  GER: [3, 7, 11, 16],
  CUW: [3, 7, 11, 16, 20],
  CIV: [7, 20],
  ECU: [3, 5, 11, 14, 16, 20],
  NED: [5, 9, 14, 18, 20],
  JPN: [2, 3, 5, 9, 14, 15, 17, 20],
  SWE: [],
  TUN: [1],
  BEL: [3, 5, 7, 9, 10, 11, 15, 17],
  EGY: [3, 4, 5, 8, 12, 14, 17, 20],
  IRN: [1, 3, 5, 7, 9, 11, 14, 16, 18, 20],
  NZL: [3, 7, 8, 11, 12, 16, 20],
  ESP: [1, 5, 12, 14, 16, 17, 18, 20],
  CPV: [3, 7, 11, 20],
  KSA: [5, 6, 11, 16, 20],
  URU: [1],
  FRA: [2, 3, 4, 5, 7, 9, 10, 11, 14, 18],
  SEN: [2, 5, 9, 14, 18],
  IRQ: [],
  NOR: [3, 5, 6, 7, 10, 11, 16, 17],
  ARG: [14],
  ALG: [11],
  AUT: [1, 11, 16, 18, 20],
  JOR: [3, 4, 6, 7, 8, 10, 11, 12, 15, 16, 17, 18, 20],
  POR: [9, 14, 18, 20],
  COD: [],
  UZB: [],
  COL: [5, 9, 14, 18],
  ENG: [2, 3, 6, 7, 11, 16],
  CRO: [2, 3, 8, 9, 14, 15, 16, 17, 18],
  GHA: [7, 11, 17, 19],
  PAN: [1, 5, 9, 10, 15, 16, 20],
}

export async function POST() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  // Only seed for the album owner
  if (user.email !== 'iosbilario@gmail.com') {
    return NextResponse.json(
      { error: 'Seed disponível apenas para o dono do álbum' },
      { status: 403 }
    )
  }

  const rows = Object.entries(SEED).flatMap(([teamCode, numbers]) =>
    numbers.map((number) => ({
      user_id: user.id,
      team_code: teamCode,
      number,
    }))
  )

  if (rows.length === 0) {
    return NextResponse.json({ message: 'Nenhuma figurinha para importar', inserted: 0 })
  }

  const { error } = await supabase
    .from('owned')
    .upsert(rows, { onConflict: 'user_id,team_code,number', ignoreDuplicates: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Progresso importado!', inserted: rows.length })
}
