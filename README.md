# Umoja-Aware – AI Legal Assistant for Bahrain

Umoja-Aware is a specialized AI assistant focused on Bahrain legal topics. The AI layer runs strictly in the backend and proxies all requests to approved providers.

## Core Setup

- Backend AI providers: DeepSeek and Moonshot (Kimi) only
- Frontend has no AI keys and never calls external AI directly
- All chat requests go through the backend at `/api/chat` (and `/api/chat/stream` in dev)

## Features

- AI legal assistance (labour law, company formation, visa services, LMRA, Sijilat)
- Category detection with tailored prompts
- Query‑matched offline fallback responses when providers are unreachable
- Modern responsive UI with minimalist chat and animated CTA placeholder

## Tech Stack

- Frontend: React 18 + TypeScript, Styled Components
- Backend: Node.js + TypeScript, Express, Axios
- AI Providers: DeepSeek, Moonshot (Kimi)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone <repository-url>
cd UmojaAware
npm install
```

### Configure Backend Environment

Create `backend/.env` from `backend/.env.example` and set keys:

```
PORT=5000
DEEPSEEK_API_KEY=sk-your-deepseek-key
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
MOONSHOT_API_KEY=sk-your-kimi-key    # optional; required for zh/zh‑tw
MOONSHOT_API_URL=https://api.moonshot.cn/v1/chat/completions
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=http://localhost:3001
```

### Run

Start backend:

```bash
cd backend
npm run dev
```

Start frontend (dev):

```bash
$env:PORT=3001; npm start
```

Open `http://localhost:3001`.

## Project Structure

```
backend/
  src/
    controllers/
    services/
    app.ts
frontend (root)/
  src/
    components/
    services/
    AppWithRouter.tsx
```

## AI Configuration Policy

- Only DeepSeek and Moonshot (Kimi) are supported
- Provider selection: Kimi for zh/zh‑tw when a valid key is present; otherwise DeepSeek
- Temperatures tuned for legal accuracy (0.35–0.4) per category
- Frontend must not include AI credentials or call providers directly

## Notes

- Offline fallback is query‑aware and category‑specific
- Idle chat layout is responsive; welcome screen does not scroll
- Main screen footer removed; sidebar footer retained

## Security

- Store keys in `backend/.env` only
- Use HTTPS in production
- Rate limit and validate inputs on the backend

## License

ISC
