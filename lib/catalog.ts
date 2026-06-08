export interface Team {
  code: string
  name: string
  grp: string   // 'Especiais' | 'A'–'L' | 'Coca-Cola'
  total: number
  ord: number
  flag: string   // emoji shown in text exports (renders on mobile/WhatsApp)
  iso2?: string  // ISO 3166-1 alpha-2 (or 'gb-eng'/'gb-sct') for the on-screen image flag
}

export const TEAMS: Team[] = [
  // ── Especiais (foil) ───────────────────────────────────────────────────
  // FWC00–FWC08 = abertura (logo, emblemas, mascotes, bola, países-sede)
  // FWC09–FWC19 = "FIFA Museum" (campeões de Copas passadas, 1934–2022)
  // Numeração interna 1–20; exibida como 00–19 (ver stickerLabel).
  { code: 'FWC', name: 'Especiais (FWC00–19)',  grp: 'Especiais', total: 20, ord: 0,  flag: '🏆' },

  // ── Grupo A ────────────────────────────────────────────────────────────
  { code: 'MEX', name: 'México',               grp: 'A', total: 20, ord: 1,  flag: '🇲🇽', iso2: 'mx' },
  { code: 'RSA', name: 'África do Sul',         grp: 'A', total: 20, ord: 2,  flag: '🇿🇦', iso2: 'za' },
  { code: 'KOR', name: 'Coreia do Sul',         grp: 'A', total: 20, ord: 3,  flag: '🇰🇷', iso2: 'kr' },
  { code: 'CZE', name: 'Tchéquia',             grp: 'A', total: 20, ord: 4,  flag: '🇨🇿', iso2: 'cz' },

  // ── Grupo B ────────────────────────────────────────────────────────────
  { code: 'CAN', name: 'Canadá',               grp: 'B', total: 20, ord: 5,  flag: '🇨🇦', iso2: 'ca' },
  { code: 'BIH', name: 'Bósnia-Herzegovina',   grp: 'B', total: 20, ord: 6,  flag: '🇧🇦', iso2: 'ba' },
  { code: 'QAT', name: 'Catar',                grp: 'B', total: 20, ord: 7,  flag: '🇶🇦', iso2: 'qa' },
  { code: 'SUI', name: 'Suíça',               grp: 'B', total: 20, ord: 8,  flag: '🇨🇭', iso2: 'ch' },

  // ── Grupo C ────────────────────────────────────────────────────────────
  { code: 'BRA', name: 'Brasil',               grp: 'C', total: 20, ord: 9,  flag: '🇧🇷', iso2: 'br' },
  { code: 'MAR', name: 'Marrocos',             grp: 'C', total: 20, ord: 10, flag: '🇲🇦', iso2: 'ma' },
  { code: 'HAI', name: 'Haiti',                grp: 'C', total: 20, ord: 11, flag: '🇭🇹', iso2: 'ht' },
  { code: 'SCO', name: 'Escócia',             grp: 'C', total: 20, ord: 12, flag: '🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}', iso2: 'gb-sct' },

  // ── Grupo D ────────────────────────────────────────────────────────────
  { code: 'USA', name: 'Estados Unidos',       grp: 'D', total: 20, ord: 13, flag: '🇺🇸', iso2: 'us' },
  { code: 'PAR', name: 'Paraguai',             grp: 'D', total: 20, ord: 14, flag: '🇵🇾', iso2: 'py' },
  { code: 'AUS', name: 'Austrália',            grp: 'D', total: 20, ord: 15, flag: '🇦🇺', iso2: 'au' },
  { code: 'TUR', name: 'Türkiye',              grp: 'D', total: 20, ord: 16, flag: '🇹🇷', iso2: 'tr' },

  // ── Grupo E ────────────────────────────────────────────────────────────
  { code: 'GER', name: 'Alemanha',             grp: 'E', total: 20, ord: 17, flag: '🇩🇪', iso2: 'de' },
  { code: 'CUW', name: 'Curaçao',             grp: 'E', total: 20, ord: 18, flag: '🇨🇼', iso2: 'cw' },
  { code: 'CIV', name: 'Costa do Marfim',     grp: 'E', total: 20, ord: 19, flag: '🇨🇮', iso2: 'ci' },
  { code: 'ECU', name: 'Equador',              grp: 'E', total: 20, ord: 20, flag: '🇪🇨', iso2: 'ec' },

  // ── Grupo F ────────────────────────────────────────────────────────────
  { code: 'NED', name: 'Holanda',              grp: 'F', total: 20, ord: 21, flag: '🇳🇱', iso2: 'nl' },
  { code: 'JPN', name: 'Japão',               grp: 'F', total: 20, ord: 22, flag: '🇯🇵', iso2: 'jp' },
  { code: 'SWE', name: 'Suécia',             grp: 'F', total: 20, ord: 23, flag: '🇸🇪', iso2: 'se' },
  { code: 'TUN', name: 'Tunísia',             grp: 'F', total: 20, ord: 24, flag: '🇹🇳', iso2: 'tn' },

  // ── Grupo G ────────────────────────────────────────────────────────────
  { code: 'BEL', name: 'Bélgica',             grp: 'G', total: 20, ord: 25, flag: '🇧🇪', iso2: 'be' },
  { code: 'EGY', name: 'Egito',               grp: 'G', total: 20, ord: 26, flag: '🇪🇬', iso2: 'eg' },
  { code: 'IRN', name: 'Irã',                grp: 'G', total: 20, ord: 27, flag: '🇮🇷', iso2: 'ir' },
  { code: 'NZL', name: 'Nova Zelândia',       grp: 'G', total: 20, ord: 28, flag: '🇳🇿', iso2: 'nz' },

  // ── Grupo H ────────────────────────────────────────────────────────────
  { code: 'ESP', name: 'Espanha',              grp: 'H', total: 20, ord: 29, flag: '🇪🇸', iso2: 'es' },
  { code: 'CPV', name: 'Cabo Verde',           grp: 'H', total: 20, ord: 30, flag: '🇨🇻', iso2: 'cv' },
  { code: 'KSA', name: 'Arábia Saudita',      grp: 'H', total: 20, ord: 31, flag: '🇸🇦', iso2: 'sa' },
  { code: 'URU', name: 'Uruguai',              grp: 'H', total: 20, ord: 32, flag: '🇺🇾', iso2: 'uy' },

  // ── Grupo I ────────────────────────────────────────────────────────────
  { code: 'FRA', name: 'França',              grp: 'I', total: 20, ord: 33, flag: '🇫🇷', iso2: 'fr' },
  { code: 'SEN', name: 'Senegal',              grp: 'I', total: 20, ord: 34, flag: '🇸🇳', iso2: 'sn' },
  { code: 'IRQ', name: 'Iraque',              grp: 'I', total: 20, ord: 35, flag: '🇮🇶', iso2: 'iq' },
  { code: 'NOR', name: 'Noruega',              grp: 'I', total: 20, ord: 36, flag: '🇳🇴', iso2: 'no' },

  // ── Grupo J ────────────────────────────────────────────────────────────
  { code: 'ARG', name: 'Argentina',            grp: 'J', total: 20, ord: 37, flag: '🇦🇷', iso2: 'ar' },
  { code: 'ALG', name: 'Argélia',             grp: 'J', total: 20, ord: 38, flag: '🇩🇿', iso2: 'dz' },
  { code: 'AUT', name: 'Áustria',             grp: 'J', total: 20, ord: 39, flag: '🇦🇹', iso2: 'at' },
  { code: 'JOR', name: 'Jordânia',            grp: 'J', total: 20, ord: 40, flag: '🇯🇴', iso2: 'jo' },

  // ── Grupo K ────────────────────────────────────────────────────────────
  { code: 'POR', name: 'Portugal',             grp: 'K', total: 20, ord: 41, flag: '🇵🇹', iso2: 'pt' },
  { code: 'COD', name: 'Congo DR',             grp: 'K', total: 20, ord: 42, flag: '🇨🇩', iso2: 'cd' },
  { code: 'UZB', name: 'Uzbequistão',         grp: 'K', total: 20, ord: 43, flag: '🇺🇿', iso2: 'uz' },
  { code: 'COL', name: 'Colômbia',            grp: 'K', total: 20, ord: 44, flag: '🇨🇴', iso2: 'co' },

  // ── Grupo L ────────────────────────────────────────────────────────────
  { code: 'ENG', name: 'Inglaterra',           grp: 'L', total: 20, ord: 45, flag: '🏴\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', iso2: 'gb-eng' },
  { code: 'CRO', name: 'Croácia',             grp: 'L', total: 20, ord: 46, flag: '🇭🇷', iso2: 'hr' },
  { code: 'GHA', name: 'Gana',                grp: 'L', total: 20, ord: 47, flag: '🇬🇭', iso2: 'gh' },
  { code: 'PAN', name: 'Panamá',              grp: 'L', total: 20, ord: 48, flag: '🇵🇦', iso2: 'pa' },

  // ── Especiais do final do álbum ────────────────────────────────────────
  // Coca-Cola "debaixo do rótulo" (14 figurinhas extras). ⚠️ Confirmar a
  // quantidade real com o álbum físico — ajuste `total` aqui se precisar.
  { code: 'COK', name: 'Coca-Cola',            grp: 'Coca-Cola', total: 14, ord: 49, flag: '🥤' },
]

// 20 (FWC00–19) + 48×20 (seleções) + 14 (Coca-Cola) = 994
// (álbum base oficial = 980; +14 da promo Coca-Cola que o app também rastreia)
export const TOTAL_STICKERS = TEAMS.reduce((s, t) => s + t.total, 0)

export const GROUPS = [
  'Especiais',
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
  'Coca-Cola',
]

// Groups that are NOT national teams (no escudo/país markers, render as special)
export const SPECIAL_GROUPS = new Set(['Especiais', 'Coca-Cola'])

export function isSpecialGroup(grp: string): boolean {
  return SPECIAL_GROUPS.has(grp)
}

export function teamsByGroup(grp: string): Team[] {
  return TEAMS.filter(t => t.grp === grp).sort((a, b) => a.ord - b.ord)
}

// Display label for a sticker. FWC stickers are numbered 00–19 in the album,
// but stored internally as 1–20, so shift + zero-pad for display/export.
export function stickerLabel(team: Team, n: number): string {
  if (team.code === 'FWC') return String(n - 1).padStart(2, '0')
  return String(n)
}

// Human-readable section heading for a group code
export function groupLabel(grp: string): string {
  if (grp === 'Especiais') return '★ Especiais'
  if (grp === 'Coca-Cola') return '🥤 Coca-Cola'
  return `Grupo ${grp}`
}
