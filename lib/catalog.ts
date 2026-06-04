export interface Team {
  code: string
  name: string
  grp: string   // 'Especiais' | 'A'–'L'
  total: number
  ord: number
}

export const TEAMS: Team[] = [
  // ── Especiais ──────────────────────────────────────────────────────────
  { code: 'FWC', name: 'Especiais (FWC 1–8)',  grp: 'Especiais', total: 8,  ord: 0  },

  // ── Grupo A ────────────────────────────────────────────────────────────
  { code: 'MEX', name: 'México',               grp: 'A', total: 20, ord: 1  },
  { code: 'RSA', name: 'África do Sul',         grp: 'A', total: 20, ord: 2  },
  { code: 'KOR', name: 'Coreia do Sul',         grp: 'A', total: 20, ord: 3  },
  { code: 'CZE', name: 'Tchéquia',             grp: 'A', total: 20, ord: 4  },

  // ── Grupo B ────────────────────────────────────────────────────────────
  { code: 'CAN', name: 'Canadá',               grp: 'B', total: 20, ord: 5  },
  { code: 'BIH', name: 'Bósnia-Herzegovina',   grp: 'B', total: 20, ord: 6  },
  { code: 'QAT', name: 'Catar',                grp: 'B', total: 20, ord: 7  },
  { code: 'SUI', name: 'Suíça',               grp: 'B', total: 20, ord: 8  },

  // ── Grupo C ────────────────────────────────────────────────────────────
  { code: 'BRA', name: 'Brasil',               grp: 'C', total: 20, ord: 9  },
  { code: 'MAR', name: 'Marrocos',             grp: 'C', total: 20, ord: 10 },
  { code: 'HAI', name: 'Haiti',                grp: 'C', total: 20, ord: 11 },
  { code: 'SCO', name: 'Escócia',             grp: 'C', total: 20, ord: 12 },

  // ── Grupo D ────────────────────────────────────────────────────────────
  { code: 'USA', name: 'Estados Unidos',       grp: 'D', total: 20, ord: 13 },
  { code: 'PAR', name: 'Paraguai',             grp: 'D', total: 20, ord: 14 },
  { code: 'AUS', name: 'Austrália',            grp: 'D', total: 20, ord: 15 },
  { code: 'TUR', name: 'Türkiye',              grp: 'D', total: 20, ord: 16 },

  // ── Grupo E ────────────────────────────────────────────────────────────
  { code: 'GER', name: 'Alemanha',             grp: 'E', total: 20, ord: 17 },
  { code: 'CUW', name: 'Curaçao',             grp: 'E', total: 20, ord: 18 },
  { code: 'CIV', name: 'Costa do Marfim',     grp: 'E', total: 20, ord: 19 },
  { code: 'ECU', name: 'Equador',              grp: 'E', total: 20, ord: 20 },

  // ── Grupo F ────────────────────────────────────────────────────────────
  { code: 'NED', name: 'Holanda',              grp: 'F', total: 20, ord: 21 },
  { code: 'JPN', name: 'Japão',               grp: 'F', total: 20, ord: 22 },
  { code: 'SWE', name: 'Suécia',             grp: 'F', total: 20, ord: 23 },
  { code: 'TUN', name: 'Tunísia',             grp: 'F', total: 20, ord: 24 },

  // ── Grupo G ────────────────────────────────────────────────────────────
  { code: 'BEL', name: 'Bélgica',             grp: 'G', total: 20, ord: 25 },
  { code: 'EGY', name: 'Egito',               grp: 'G', total: 20, ord: 26 },
  { code: 'IRN', name: 'Irã',                grp: 'G', total: 20, ord: 27 },
  { code: 'NZL', name: 'Nova Zelândia',       grp: 'G', total: 20, ord: 28 },

  // ── Grupo H ────────────────────────────────────────────────────────────
  { code: 'ESP', name: 'Espanha',              grp: 'H', total: 20, ord: 29 },
  { code: 'CPV', name: 'Cabo Verde',           grp: 'H', total: 20, ord: 30 },
  { code: 'KSA', name: 'Arábia Saudita',      grp: 'H', total: 20, ord: 31 },
  { code: 'URU', name: 'Uruguai',              grp: 'H', total: 20, ord: 32 },

  // ── Grupo I ────────────────────────────────────────────────────────────
  { code: 'FRA', name: 'França',              grp: 'I', total: 20, ord: 33 },
  { code: 'SEN', name: 'Senegal',              grp: 'I', total: 20, ord: 34 },
  { code: 'IRQ', name: 'Iraque',              grp: 'I', total: 20, ord: 35 },
  { code: 'NOR', name: 'Noruega',              grp: 'I', total: 20, ord: 36 },

  // ── Grupo J ────────────────────────────────────────────────────────────
  { code: 'ARG', name: 'Argentina',            grp: 'J', total: 20, ord: 37 },
  { code: 'ALG', name: 'Argélia',             grp: 'J', total: 20, ord: 38 },
  { code: 'AUT', name: 'Áustria',             grp: 'J', total: 20, ord: 39 },
  { code: 'JOR', name: 'Jordânia',            grp: 'J', total: 20, ord: 40 },

  // ── Grupo K ────────────────────────────────────────────────────────────
  { code: 'POR', name: 'Portugal',             grp: 'K', total: 20, ord: 41 },
  { code: 'COD', name: 'Congo DR',             grp: 'K', total: 20, ord: 42 },
  { code: 'UZB', name: 'Uzbequistão',         grp: 'K', total: 20, ord: 43 },
  { code: 'COL', name: 'Colômbia',            grp: 'K', total: 20, ord: 44 },

  // ── Grupo L ────────────────────────────────────────────────────────────
  { code: 'ENG', name: 'Inglaterra',           grp: 'L', total: 20, ord: 45 },
  { code: 'CRO', name: 'Croácia',             grp: 'L', total: 20, ord: 46 },
  { code: 'GHA', name: 'Gana',                grp: 'L', total: 20, ord: 47 },
  { code: 'PAN', name: 'Panamá',              grp: 'L', total: 20, ord: 48 },
]

// 8 + 48×20 = 968
export const TOTAL_STICKERS = TEAMS.reduce((s, t) => s + t.total, 0)

export const GROUPS = [
  'Especiais',
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
]

export function teamsByGroup(grp: string): Team[] {
  return TEAMS.filter(t => t.grp === grp).sort((a, b) => a.ord - b.ord)
}
