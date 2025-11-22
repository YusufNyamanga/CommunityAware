# DeepSeek Integration Guide (Backend‑Only)

## Overview

Umoja‑Aware uses backend‑only AI integration. The frontend never calls external AI or stores AI keys. Approved providers are DeepSeek and Moonshot (Kimi).

## Keys and Environment

Set keys in `backend/.env`:

```
DEEPSEEK_API_KEY=sk-your-deepseek-key
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
MOONSHOT_API_KEY=sk-your-kimi-key    # optional; zh/zh‑tw only
MOONSHOT_API_URL=https://api.moonshot.cn/v1/chat/completions
```

## Provider Selection

- DeepSeek handles all languages by default
- Moonshot (Kimi) is used for Chinese (zh/zh‑tw) when a valid key is present

## Temperature Tuning

- Legal topics use low temperatures for factual accuracy
- Typical ranges: 0.35–0.4 depending on category

## How Requests Flow

1. Frontend sends chat requests to backend `/api/chat`
2. Backend selects provider and attaches official FAQ context
3. Responses stream or fall back to non‑stream mode
4. If providers are unreachable, backend or client returns a query‑matched offline answer

## Notes

- No frontend AI keys or direct provider calls
- Only DeepSeek and Moonshot (Kimi) are supported
