# Promptly

> Turn rough thoughts into master prompts.

A minimalist AI-powered web app that transforms rough user ideas into polished, copy-paste-ready prompts optimized for ChatGPT, Claude, Gemini, Cursor, and GitHub Copilot.

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS**
- **Gemini 2.0 Flash** (via `@google/generative-ai`)
- **Vercel** (deployment)

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/promptly.git
cd promptly
npm install
```

### 2. Add your Gemini API key

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
GEMINI_API_KEY=your_actual_key_here
```

Get your key at: https://aistudio.google.com/app/apikey

### 3. Run locally

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npx vercel
```

Add environment variable when prompted:
```
GEMINI_API_KEY = your_actual_key_here
```

### Option B — Vercel Dashboard

1. Push to GitHub
2. Import project at https://vercel.com/new
3. Add `GEMINI_API_KEY` under **Settings → Environment Variables**
4. Deploy

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main UI
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Bauhaus styling + fonts
│   └── api/generate/
│       └── route.ts          # POST /api/generate
│
├── components/
│   ├── TargetSelector.tsx    # AI target dropdown
│   ├── PromptInput.tsx       # Thoughts textarea
│   ├── GenerateButton.tsx    # Generate button with loading state
│   └── PromptOutput.tsx      # Read-only output + copy button
│
├── lib/
│   ├── gemini.ts             # Gemini API client
│   └── promptBuilder.ts      # System prompts + user messages
│
└── types/
    └── index.ts              # Shared TypeScript types
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |

---

## License

MIT
