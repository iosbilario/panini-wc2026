-- ============================================================
-- Migration 002 — Seed teams catalog
-- Run this AFTER 001_schema.sql
-- ============================================================

insert into teams (code, name, grp, total, ord) values
  -- Especiais
  ('FWC', 'Especiais (FWC 1–8)',  'Especiais', 8,  0),

  -- Grupo A
  ('MEX', 'México',               'A', 20, 1),
  ('RSA', 'África do Sul',        'A', 20, 2),
  ('KOR', 'Coreia do Sul',        'A', 20, 3),
  ('CZE', 'Tchéquia',            'A', 20, 4),

  -- Grupo B
  ('CAN', 'Canadá',              'B', 20, 5),
  ('BIH', 'Bósnia-Herzegovina',  'B', 20, 6),
  ('QAT', 'Catar',               'B', 20, 7),
  ('SUI', 'Suíça',              'B', 20, 8),

  -- Grupo C
  ('BRA', 'Brasil',              'C', 20, 9),
  ('MAR', 'Marrocos',            'C', 20, 10),
  ('HAI', 'Haiti',               'C', 20, 11),
  ('SCO', 'Escócia',            'C', 20, 12),

  -- Grupo D
  ('USA', 'Estados Unidos',      'D', 20, 13),
  ('PAR', 'Paraguai',            'D', 20, 14),
  ('AUS', 'Austrália',           'D', 20, 15),
  ('TUR', 'Türkiye',             'D', 20, 16),

  -- Grupo E
  ('GER', 'Alemanha',            'E', 20, 17),
  ('CUW', 'Curaçao',            'E', 20, 18),
  ('CIV', 'Costa do Marfim',    'E', 20, 19),
  ('ECU', 'Equador',             'E', 20, 20),

  -- Grupo F
  ('NED', 'Holanda',             'F', 20, 21),
  ('JPN', 'Japão',              'F', 20, 22),
  ('SWE', 'Suécia',            'F', 20, 23),
  ('TUN', 'Tunísia',            'F', 20, 24),

  -- Grupo G
  ('BEL', 'Bélgica',            'G', 20, 25),
  ('EGY', 'Egito',              'G', 20, 26),
  ('IRN', 'Irã',               'G', 20, 27),
  ('NZL', 'Nova Zelândia',      'G', 20, 28),

  -- Grupo H
  ('ESP', 'Espanha',             'H', 20, 29),
  ('CPV', 'Cabo Verde',          'H', 20, 30),
  ('KSA', 'Arábia Saudita',     'H', 20, 31),
  ('URU', 'Uruguai',             'H', 20, 32),

  -- Grupo I
  ('FRA', 'França',             'I', 20, 33),
  ('SEN', 'Senegal',             'I', 20, 34),
  ('IRQ', 'Iraque',             'I', 20, 35),
  ('NOR', 'Noruega',             'I', 20, 36),

  -- Grupo J
  ('ARG', 'Argentina',           'J', 20, 37),
  ('ALG', 'Argélia',            'J', 20, 38),
  ('AUT', 'Áustria',            'J', 20, 39),
  ('JOR', 'Jordânia',           'J', 20, 40),

  -- Grupo K
  ('POR', 'Portugal',            'K', 20, 41),
  ('COD', 'Congo DR',            'K', 20, 42),
  ('UZB', 'Uzbequistão',        'K', 20, 43),
  ('COL', 'Colômbia',           'K', 20, 44),

  -- Grupo L
  ('ENG', 'Inglaterra',          'L', 20, 45),
  ('CRO', 'Croácia',            'L', 20, 46),
  ('GHA', 'Gana',               'L', 20, 47),
  ('PAN', 'Panamá',             'L', 20, 48)

on conflict (code) do nothing;
