# UmojaAware Production Deployment (Coolify + Docker Compose)

## Overview
This repository contains only the production application sources and Docker files for deploying UmojaAware via Coolify using environment variables (no file secrets required).

## Services
- Frontend: React (CRA), built and served by Nginx on port 8000
- Backend: Node/Express (TypeScript), listens on port 5000, health endpoint `/health`

## Files
- `docker-compose.yml` – Orchestrates frontend and backend services
- `Dockerfile` – Frontend multi-stage build (Node → Nginx)
- `backend/Dockerfile` – Backend build and runtime image
- `nginx.conf` – Nginx config (frontend), includes `/health`
- `backend/` – Backend TypeScript sources and configs
- `src/`, `public/` – Frontend sources and assets

## Coolify Configuration
1. Build Pack: Docker Compose
2. Base Directory: `/`
3. Docker Compose Location: `/docker-compose.yml`
4. Domains:
   - Frontend: `https://umoja-aware.com`
   - Backend: `https://api.umoja-aware.com`

### Environment Variables (Runtime only)
#### Backend
```
PORT=5000
NODE_ENV=production
DEEPSEEK_API_KEY=sk-a88de1bf5a604793bed69e1893c8fa34
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
MOONSHOT_API_KEY=sk-d0RcC70ujgic7dFc2GxD8N9XbYncZslpNh4EHBd2fUFSyxfe
MOONSHOT_API_URL=https://api.moonshot.ai/v1/chat/completions
CORS_ORIGINS=https://umoja-aware.com,https://www.umoja-aware.com
```

#### Frontend
```
REACT_APP_BACKEND_URL=https://api.umoja-aware.com
```

### Healthchecks
- Backend: `GET /health` → `{ "status": "ok" }`
- Frontend (Nginx): `GET /health` → `ok`

## Verify After Deploy
1. `GET https://api.umoja-aware.com/health` returns `{ "status": "ok" }`
2. `POST https://api.umoja-aware.com/api/test-ai-direct` returns content
3. Open `https://umoja-aware.com`
   - News shows loader briefly then items
   - Chat returns AI responses

## Notes
- Provider keys are environment variables only; do not commit secrets.
- CORS origins can be extended via `CORS_ORIGINS` env.
