# Promptly

> Turn rough thoughts into master prompts.

A minimalist AI-powered web app that transforms rough user ideas into polished, copy-paste-ready prompts optimized for ChatGPT, Claude, Gemini, Cursor, and GitHub Copilot.

---

## Design

Built with a **Bauhaus-inspired design system** — constructivist geometry, primary color blocking (Red `#D02020`, Blue `#1040C0`, Yellow `#F0C020`), hard offset shadows, thick black borders, and the Outfit typeface. The interface is a geometric composition, not just a layout.

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS**
- **OpenRouter API** (via `openrouter/auto` — free tier, no credit card required)
- **OpenAI SDK** (OpenRouter is OpenAI-compatible)
- **Vercel** (deployment)

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/Lxzeroo/promptly.git
cd promptly
npm install
```

### 2. Get a free OpenRouter API key

1. Go to [openrouter.ai](https://openrouter.ai) → sign up with Google
2. Go to **Keys** → **Create Key**
3. Copy the key — it starts with `sk-or-v1-...`

No credit card required. Free tier includes 20 requests/min and 50+ requests/day.

### 3. Add the key to `.env.local`

Create a `.env.local` file in the project root:
OPENROUTER_API_KEY=sk-or-v1-your_key_here
### 4. Run locally

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel env add OPENROUTER_API_KEY
vercel --prod
```

### Option B — Vercel Dashboard

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add `OPENROUTER_API_KEY` under **Settings → Environment Variables**
4. Deploy

---

## How It Works

1. User selects an AI target (ChatGPT, Claude, Gemini, Cursor, GitHub Copilot)
2. User types rough thoughts into the input box
3. A hidden system prompt instructs the model to act as an elite prompt engineer
4. The model rewrites the input into a structured, polished, copy-paste-ready prompt
5. Each AI target gets a different output structure optimized for that model's behavior

### Output structures per target

| Target | Structure |
|---|---|
| ChatGPT | Role → Context → Task → Requirements → Output Format |
| Claude | Objective → Background → Requirements → Deliverables |
| Gemini | Goal → Context → Instructions → Desired Output |
| Cursor | Project Context → Tech Stack → Requirements → Files To Create → Expected Output |
| GitHub Copilot | Project Description → Technical Requirements → Implementation Details → Expected Deliverables |

---

## Project Structure
src/
├── app/
│   ├── page.tsx              # Main UI — Bauhaus layout, two-column desktop
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Bauhaus design tokens, Outfit font, animations
│   └── api/generate/
│       └── route.ts          # POST /api/generate
│
├── components/
│   ├── TargetSelector.tsx    # AI target dropdown
│   ├── PromptInput.tsx       # Thoughts textarea with validation
│   ├── GenerateButton.tsx    # Generate button with loading state
│   └── PromptOutput.tsx      # Read-only output + copy button
│
├── lib/
│   ├── gemini.ts             # OpenRouter client (OpenAI-compatible)
│   └── promptBuilder.ts      # System prompts + user messages per target
│
└── types/
└── index.ts              # Shared TypeScript types
---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | OpenRouter API key — get one free at openrouter.ai |

---

## License

MIT
