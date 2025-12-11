# Video Downloader Bot 🛠️

A Telegram bot that downloads videos from TikTok, Instagram Reels, Facebook Reels, and more using yt-dlp. No watermark on TikTok (where possible), fast streams direct to chat.

[![Docker Image](https://img.shields.io/badge/Docker-Production%20Ready-blue)](Dockerfile)
[![Bun](https://img.shields.io/badge/Bun-Fast%20Runtime-orange?logo=bun)](https://bun.sh)

## Features
- 🎥 Download TikTok (vt.tiktok.com, m.tiktok.com), Instagram Reels, Facebook Reels
- 🚫 No watermark (TikTok best[mp4])
- 📱 Works on mobile/desktop Telegram
- ⚡ Streaming (no temp files in bot)
- 🍪 Cookies support (`cookies.txt` for private/logged-in content)

## Quick Start (Local)
1. Clone & install:
   ```
   git clone https://github.com/Syrup/video-downloader-bot
   cd video-downloader-bot
   bun install
   ```
2. Get BOT_TOKEN from [@BotFather](https://t.me/botfather)
3. Env: `cp .env.example .env` & fill `BOT_TOKEN=your_token_here`
4. Download yt-dlp: `bun run download.ts`
5. Run: `bun index.ts`

Send a video URL (e.g., `https://vt.tiktok.com/abc`) to the bot!

## Docker (Production)
```
docker build -t vidbot .
docker run -d \
  --name vidbot \
  -e BOT_TOKEN=your_token_here \
  -v $(pwd)/cookies.txt:/app/cookies.txt:ro \
  -p 3000:3000 \
  vidbot
```

- Mount `cookies.txt` for TikTok logins/private vids
- Railway/Heroku: Use `Dockerfile` + Railway vars
- Multi-arch? yt-dlp auto-dl in Docker (linux/amd64)

## Supported Sites
- TikTok: `vt.tiktok.com/*`, `tiktok.com/@user/video/*`
- Instagram: `instagram.com/reel/*`
- Facebook: `facebook.com/reel/*`, `facebook.com/reels/*`
- More via yt-dlp (YouTube Shorts? Test it)

## Env Vars
| Var | Required | Desc |
|-----|----------|------|
| `BOT_TOKEN` | ✅ | Telegram Bot Token |

## Cookies (Pro Tip)
Export TikTok/IG cookies as `cookies.txt` (Netscape format) via browser extensions (e.g., Get cookies.txt). Mount in Docker or place in `/app`.

## Troubleshooting
- **Big files**: Telegram 50MB limit – use smaller formats
- **Rate limits**: yt-dlp handles, but spam = ban
- **No audio**: Force `best[ext=mp4]` in code
- Logs: Check `console.log` for yt-dlp output

## Deploy
- **Railway**: Connect repo, add `BOT_TOKEN`
- **Render**: Docker + env vars
- **VPS**: `docker-compose up -d`

## License
MIT © Syrup
