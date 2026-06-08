export interface Team {
  code: string
  name: string
  grp: string   // 'Especiais' | 'A'–'L' | 'Estádios' | 'Coca-Cola'
  total: number
  ord: number
  flag: string  // emoji shown before the code (country flag, or thematic for special sections)
}

export const TEAMS: Team[] = [
  // ── Especiais ──────────────────────────────────────────────────────────
  { code: 'FWC', name: 'Especiais (FWC 1–8)',  grp: 'Especiais', total: 8,  ord: 0,  flag: '🏆' },

  // ── Grupo A ────────────────────────────────────────────────────────────
  { code: 'MEX', name: 'México',               grp: 'A', total: 20, ord: 1,  flag: '🇲🇽' },
  { code: 'RSA', name: 'África do Sul',         grp: 'A', total: 20, ord: 2,  flag: '🇿🇦' },
  { code: 'KOR', name: 'Coreia do Sul',         grp: 'A', total: 20, ord: 3,  flag: '🇰🇷' },
  { code: 'CZE', name: 'Tchéquia',             grp: 'A', total: 20, ord: 4,  flag: '🇨🇿' },

  // ── Grupo B ────────────────────────────────────────────────────────────
  { code: 'CAN', name: 'Canadá',               grp: 'B', total: 20, ord: 5,  flag: '🇨🇦' },
  { code: 'BIH', name: 'Bósnia-Herzegovina',   grp: 'B', total: 20, ord: 6,  flag: '🇧🇦' },
  { code: 'QAT', name: 'Catar',                grp: 'B', total: 20, ord: 7,  flag: '🇶🇦' },
  { code: 'SUI', name: 'Suíça',               grp: 'B', total: 20, ord: 8,  flag: '🇨🇭' },

  // ── Grupo C ────────────────────────────────────────────────────────────
  { code: 'BRA', name: 'Brasil',               grp: 'C', total: 20, ord: 9,  flag: '🇧🇷' },
  { code: 'MAR', name: 'Marrocos',             grp: 'C', total: 20, ord: 10, flag: '🇲🇦' },
  { code: 'HAI', name: 'Haiti',                grp: 'C', total: 20, ord: 11, flag: '🇭🇹' },
  { code: 'SCO', name: 'Escócia',             grp: 'C', total: 20, ord: 12, flag: '🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}' },

  // ── Grupo D ────────────────────────────────────────────────────────────
  { code: 'USA', name: 'Estados Unidos',       grp: 'D', total: 20, ord: 13, flag: '🇺🇸' },
  { code: 'PAR', name: 'Paraguai',             grp: 'D', total: 20, ord: 14, flag: '🇵🇾' },
  { code: 'AUS', name: 'Austrália',            grp: 'D', total: 20, ord: 15, flag: '🇦🇺' },
  { code: 'TUR', name: 'Türkiye',              grp: 'D', total: 20, ord: 16, flag: '🇹🇷' },

  // ── Grupo E ────────────────────────────────────────────────────────────
  { code: 'GER', name: 'Alemanha',             grp: 'E', total: 20, ord: 17, flag: '🇩🇪' },
  { code: 'CUW', name: 'Curaçao',             grp: 'E', total: 20, ord: 18, flag: '🇨🇼' },
  { code: 'CIV', name: 'Costa do Marfim',     grp: 'E', total: 20, ord: 19, flag: '🇨🇮' },
  { code: 'ECU', name: 'Equador',              grp: 'E', total: 20, ord: 20, flag: '🇪🇨' },

  // ── Grupo F ────────────────────────────────────────────────────────────
  { code: 'NED', name: 'Holanda',              grp: 'F', total: 20, ord: 21, flag: '🇳🇱' },
  { code: 'JPN', name: 'Japão',               grp: 'F', total: 20, ord: 22, flag: '🇯🇵' },
  { code: 'SWE', name: 'Suécia',             grp: 'F', total: 20, ord: 23, flag: '🇸🇪' },
  { code: 'TUN', name: 'Tunísia',             grp: 'F', total: 20, ord: 24, flag: '🇹🇳' },

  // ── Grupo G ────────────────────────────────────────────────────────────
  { code: 'BEL', name: 'Bélgica',             grp: 'G', total: 20, ord: 25, flag: '🇧🇪' },
  { code: 'EGY', name: 'Egito',               grp: 'G', total: 20, ord: 26, flag: '🇪🇬' },
  { code: 'IRN', name: 'Irã',                grp: 'G', total: 20, ord: 27, flag: '🇮🇷' },
  { code: 'NZL', name: 'Nova Zelândia',       grp: 'G', total: 20, ord: 28, flag: '🇳🇿' },

  // ── Grupo H ────────────────────────────────────────────────────────────
  { code: 'ESP', name: 'Espanha',              grp: 'H', total: 20, ord: 29, flag: '🇪🇸' },
  { code: 'CPV', name: 'Cabo Verde',           grp: 'H', total: 20, ord: 30, flag: '🇨🇻' },
  { code: 'KSA', name: 'Arábia Saudita',      grp: 'H', total: 20, ord: 31, flag: '🇸🇦' },
  { code: 'URU', name: 'Uruguai',              grp: 'H', total: 20, ord: 32, flag: '🇺🇾' },

  // ── Grupo I ────────────────────────────────────────────────────────────
  { code: 'FRA', name: 'França',              grp: 'I', total: 20, ord: 33, flag: '🇫🇷' },
  { code: 'SEN', name: 'Senegal',              grp: 'I', total: 20, ord: 34, flag: '🇸🇳' },
  { code: 'IRQ', name: 'Iraque',              grp: 'I', total: 20, ord: 35, flag: '🇮🇶' },
  { code: 'NOR', name: 'Noruega',              grp: 'I', total: 20, ord: 36, flag: '🇳🇴' },

  // ── Grupo J ────────────────────────────────────────────────────────────
  { code: 'ARG', name: 'Argentina',            grp: 'J', total: 20, ord: 37, flag: '🇦🇷' },
  { code: 'ALG', name: 'Argélia',             grp: 'J', total: 20, ord: 38, flag: '🇩🇿' },
  { code: 'AUT', name: 'Áustria',             grp: 'J', total: 20, ord: 39, flag: '🇦🇹' },
  { code: 'JOR', name: 'Jordânia',            grp: 'J', total: 20, ord: 40, flag: '🇯🇴' },

  // ── Grupo K ────────────────────────────────────────────────────────────
  { code: 'POR', name: 'Portugal',             grp: 'K', total: 20, ord: 41, flag: '🇵🇹' },
  { code: 'COD', name: 'Congo DR',             grp: 'K', total: 20, ord: 42, flag: '🇨🇩' },
  { code: 'UZB', name: 'Uzbequistão',         grp: 'K', total: 20, ord: 43, flag: '🇺🇿' },
  { code: 'COL', name: 'Colômbia',            grp: 'K', total: 20, ord: 44, flag: '🇨🇴' },

  // ── Grupo L ────────────────────────────────────────────────────────────
  { code: 'ENG', name: 'Inglaterra',           grp: 'L', total: 20, ord: 45, flag: '🏴\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}' },
  { code: 'CRO', name: 'Croácia',             grp: 'L', total: 20, ord: 46, flag: '🇭🇷' },
  { code: 'GHA', name: 'Gana',                grp: 'L', total: 20, ord: 47, flag: '🇬🇭' },
  { code: 'PAN', name: 'Panamá',              grp: 'L', total: 20, ord: 48, flag: '🇵🇦' },

  // ── Especiais do final do álbum ────────────────────────────────────────
  // Estádios-sede (16 figurinhas) — fonte: Panini oficial / InvestNews
  { code: 'EST', name: 'Estádios-sede',        grp: 'Estádios', total: 16, ord: 49, flag: '🏟️' },
  // Coca-Cola "debaixo do rótulo" (14 figurinhas extras) — fonte: Coca-Cola Brasil
  { code: 'COK', name: 'Coca-Cola',            grp: 'Coca-Cola', total: 14, ord: 50, flag: '🥤' },
]

// 8 (FWC) + 48×20 (seleções) + 16 (estádios) + 14 (Coca-Cola) = 998
export const TOTAL_STICKERS = TEAMS.reduce((s, t) => s + t.total, 0)

export const GROUPS = [
  'Especiais',
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'Estádios',
  'Coca-Cola',
]

// Groups that are NOT national teams (no escudo/país markers, render as special)
export const SPECIAL_GROUPS = new Set(['Especiais', 'Estádios', 'Coca-Cola'])

export function isSpecialGroup(grp: string): boolean {
  return SPECIAL_GROUPS.has(grp)
}

export function teamsByGroup(grp: string): Team[] {
  return TEAMS.filter(t => t.grp === grp).sort((a, b) => a.ord - b.ord)
}

// Human-readable section heading for a group code
export function groupLabel(grp: string): string {
  if (grp === 'Especiais') return '★ Especiais'
  if (grp === 'Estádios') return '🏟️ Estádios'
  if (grp === 'Coca-Cola') return '🥤 Coca-Cola'
  return `Grupo ${grp}`
}
