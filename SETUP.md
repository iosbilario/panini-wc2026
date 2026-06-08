# Panini WC 2026 — Guia de Deploy

Tempo estimado: **15–20 minutos**.

---

## Passo 1 — Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login (ou crie conta).
2. Clique em **New project**.
3. Preencha:
   - **Name:** `panini-wc2026` (ou qualquer nome)
   - **Database Password:** escolha uma senha forte e **anote**
   - **Region:** South America (São Paulo) — melhor latência para o Brasil
4. Clique **Create new project** e aguarde ~1 minuto.

---

## Passo 2 — Rodar as migrations SQL

No Supabase Dashboard, vá em **SQL Editor** (ícone de banco de dados no menu lateral).

### 2a. Schema + RLS

Cole o conteúdo de `supabase/migrations/001_schema.sql` e clique **Run**.

### 2b. Seed dos times

Cole o conteúdo de `supabase/migrations/002_seed_teams.sql` e clique **Run**.

### 2c. Repetidas + seções especiais + hardening

Cole o conteúdo de `supabase/migrations/003_duplicates.sql` e clique **Run**.

> Esta migration cria a tabela `duplicates` (figurinhas repetidas para troca),
> cadastra a seção **Coca-Cola** (14) e adiciona um CHECK de faixa nos números.
> É segura de re-executar.

---

## Passo 3 — Configurar Auth (magic link)

1. No Supabase Dashboard, vá em **Authentication → URL Configuration**.
2. Em **Site URL**, coloque a URL do seu app na Vercel (você vai obter depois).
   - Por enquanto, coloque `http://localhost:3000` para desenvolvimento local.
3. Em **Redirect URLs**, adicione:
   ```
   http://localhost:3000/auth/callback
   https://SEU-APP.vercel.app/auth/callback
   ```
   (adicione a URL da Vercel depois do deploy)

---

## Passo 4 — Pegar as credenciais do Supabase

No Supabase Dashboard, vá em **Settings → API**:

- **Project URL** → copie (algo como `https://xyzxyz.supabase.co`)
- **Project API Keys → anon public** → copie

---

## Passo 5 — Subir o código para o GitHub

```bash
# Dentro da pasta panini-wc2026/
git init
git add .
git commit -m "feat: Panini WC 2026 checklist app"

# Crie um repositório no github.com (pode ser privado)
# Depois conecte e faça push:
git remote add origin https://github.com/SEU_USUARIO/panini-wc2026.git
git branch -M main
git push -u origin main
```

---

## Passo 6 — Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login.
2. Clique em **Add New → Project**.
3. Selecione o repositório `panini-wc2026`.
4. Antes de clicar em Deploy, abra **Environment Variables** e adicione:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xyzxyz.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` |

5. Clique **Deploy** e aguarde ~2 minutos.
6. Copie a URL gerada (algo como `panini-wc2026.vercel.app`).

---

## Passo 7 — Atualizar URLs no Supabase

Volte ao Supabase → **Authentication → URL Configuration** e adicione:

```
https://panini-wc2026.vercel.app/auth/callback
```

---

## Passo 8 — Importar seu progresso inicial

1. Abra o app na URL da Vercel.
2. Faça login com `iosbilario@gmail.com` via magic link.
3. Se aparecer o álbum vazio, clique no botão **"📥 Importar progresso inicial"** no cabeçalho.
4. Aguarde a mensagem de confirmação — 221 figurinhas serão carregadas automaticamente.

---

## Desenvolvimento local (opcional)

```bash
cd panini-wc2026
npm install
cp .env.local.example .env.local
# Edite .env.local com suas credenciais do Supabase
npm run dev
```

Acesse: http://localhost:3000

---

## Convidando amigos

Basta compartilhar a URL da Vercel! Qualquer pessoa pode criar uma conta via magic link e terá o próprio checklist independente — os dados de cada um ficam separados via RLS.

---

## Estrutura do projeto

```
panini-wc2026/
├── app/
│   ├── page.tsx            # Landing / login
│   ├── auth/callback/      # Magic link callback
│   ├── checklist/          # Checklist principal (protegido)
│   └── api/seed/           # Importar progresso inicial (dono)
├── components/
│   ├── ChecklistClient.tsx # Lógica client-side + otimismo (coleta + repetidas)
│   ├── TeamCard.tsx        # Card por seleção/seção (bandeira + sigla)
│   ├── StickerChip.tsx     # Chip individual (toggle / quantidade de repetidas)
│   ├── ProgressBar.tsx     # Barra de progresso global
│   ├── MissingListModal.tsx# Modal "Lista de faltas" (export)
│   ├── TradeListModal.tsx  # Modal "Lista de troca" (repetidas, export)
│   └── AuthForm.tsx        # Formulário de login
├── lib/
│   ├── catalog.ts          # 48 seleções + Especiais + Coca-Cola (estático, c/ bandeiras)
│   └── supabase/           # Clientes browser + server
├── middleware.ts            # Proteção de rotas
└── supabase/migrations/    # SQL para rodar no dashboard (001, 002, 003)
```
