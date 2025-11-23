# Umoja‑Aware — Coolify Deployment Guide

## Overview
Umoja‑Aware is a React frontend with a Node/Express backend. This deployment guide focuses on Coolify setup for a production domain: `https://umoja-aware.com`.

## Repository Structure
- `frontend (root)`
  - React app, build with `npm run build`, served as static assets from `build/`
  - PWA: `public/manifest.json`, `public/service-worker.js`
  - GA and AdSense head scripts in `public/index.html`
- `backend/`
  - Node/Express API (TypeScript → `dist/`), start with `npm start`
  - Security: `helmet`, rate limiting, CORS with `https://umoja-aware.com`

## Environment Variables
Configure in Coolify services; do not commit secrets.

### Frontend
- `REACT_APP_BACKEND_URL` — Base URL for API (e.g., `https://umoja-aware.com` if reverse‑proxied on same domain; otherwise your API origin)

### Backend
- `NODE_ENV=production`
- `PORT=5000` (or the service port you expose)
- `JWT_SECRET=<strong_random_string>`
- `RATE_LIMIT_MAX_REQUESTS=120` (example)
- `RATE_LIMIT_WINDOW=900000` (15 minutes)
- Optional AI providers:
  - `DEEPSEEK_API_KEY=<key>`
  - `DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions` (default)
  - `MOONSHOT_API_KEY=<key>`
  - `MOONSHOT_API_URL=https://api.moonshot.cn/v1/chat/completions`

## Build & Run Commands
### Frontend (React)
- Build: `npm run build`
- Output directory: `build`

### Backend (Node/Express)
- Build: `npm run build`
- Run: `npm start`
- Health check: `GET /health`

## Coolify Setup
Create two services:

### 1) Frontend Service
- Type: Static site or Node app serving `build/`
- Build command: `npm ci && npm run build`
- Output directory: `build`
- Env:
  - `REACT_APP_BACKEND_URL` pointing to your API base URL
- Domain: `https://umoja-aware.com`

### 2) Backend Service
- Type: Node app
- Build command: `npm ci && npm run build`
- Run command: `npm start`
- Env: set all backend variables listed above
- Healthcheck: `GET /health`
- CORS: already whitelisted for `https://umoja-aware.com` and `https://www.umoja-aware.com`

## Security Notes
- No secrets are hardcoded. Provider keys are read from environment.
- `helmet` adds HTTP security headers.
- Rate limits applied to chat/news/jobs endpoints.
- Debug/test endpoints are disabled in production.
- Service Worker avoids caching API and `/health` routes.

## Ads & Analytics
- GA4 tag and AdSense client script are embedded in `public/index.html`:
  - GA: `G-TXVHX0VBRR`
  - AdSense: `ca-pub-6949690818884998`
- Footer renders a responsive AdSense unit. No additional configuration is required in Coolify.

## PWA Icons & Favicon
- `favicon.svg` is used for all PWA icon sizes (64/192/512, maskable) in `manifest.json`.

## Troubleshooting
- If deployment fails on the backend:
  - Verify `NODE_ENV=production` and `JWT_SECRET` are set.
  - Confirm the service port and healthcheck settings.
  - Ensure the configured domain matches CORS allowed origins.
- If the frontend cannot reach API:
  - Confirm `REACT_APP_BACKEND_URL` points to the correct origin.
  - Check browser console network logs; verify HTTPS and CORS.

## Notes
- For additional ad placements or analytics events, update the React components and/or head scripts as needed without changing deployment steps.
