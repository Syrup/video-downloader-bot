# Video Downloader Bot 🎬✨

## Yooo fr fr this bot goes HARD 🔥💯

A Telegram bot that literally yoinks videos from TikTok, Instagram Reels, Facebook Reels, and more using yt-dlp. No watermark on TikTok? We got you bestie 😤👌 Fast streams straight to your chat - it's giving main character energy ✨

[![Docker Image](https://img.shields.io/badge/Docker-Production%20Ready-blue)](Dockerfile)
[![Bun](https://img.shields.io/badge/Bun-Fast%20Runtime-orange?logo=bun)](https://bun.sh)
[![It's giving](https://img.shields.io/badge/It's-Giving-ff69b4)]()
[![No cap](https://img.shields.io/badge/No-Cap-00ff00)]()

## ✨ Features That SLAP ✨
- 🎥💖 Download TikTok (vt.tiktok.com, m.tiktok.com), Instagram Reels, Facebook Reels - literally ALL the vibes
- 🚫🎨 No watermark on TikTok (best[mp4]) - clean content hits different fr
- 📱💅 Works on mobile AND desktop Telegram - slay anywhere bestie
- ⚡🚀 Streaming mode activated (no temp files cluttering ur bot) - it's giving efficiency
- 🍪👀 Cookies support (`cookies.txt` for private/logged-in content) - sneaky little hacker vibes

## 🏃‍♀️💨 Quick Start (Local) - Let's Goooo
1. Clone & install (ez mode fr):
   ```bash
   git clone https://github.com/Syrup/video-downloader-bot
   cd video-downloader-bot
   bun install
   ```
2. Get BOT_TOKEN from [@BotFather](https://t.me/botfather) 🤖👑 (he's the real MVP)
3. Env setup: `cp .env.example .env` & fill `BOT_TOKEN=your_token_here` 🔑
4. Grab yt-dlp: `bun run download.ts` 📥
5. Fire it up: `bun index.ts` 🚀💫

Now just send a video URL (like `https://vt.tiktok.com/abc`) to your bot and watch the magic happen ✨🪄 No cap this goes crazy 🔥

## 🐳✨ Docker (Production) - Big Brain Moves
```bash
docker build -t vidbot .
docker run -d \
  --name vidbot \
  -e BOT_TOKEN=your_token_here \
  -v $(pwd)/cookies.txt:/app/cookies.txt:ro \
  -p 3000:3000 \
  vidbot
```

**Pro tips for the culture 🎯:**
- 🍪 Mount `cookies.txt` for TikTok logins/private vids - stay mysterious bestie
- 🚂💜 Railway/Heroku: Just use the `Dockerfile` + Railway vars and you're chillin
- 🏗️ Multi-arch? yt-dlp auto-downloads in Docker (linux/amd64) - literally does itself, periodt

## 🌐💅 Supported Sites (We Got Range Bestie)
- 🎵 **TikTok**: `vt.tiktok.com/*`, `tiktok.com/@user/video/*` - the main course fr
- 📸 **Instagram**: `instagram.com/reel/*` - aesthetic content on lock
- 👥 **Facebook**: `facebook.com/reel/*`, `facebook.com/reels/*` - even for the boomers (jk love u)
- ✨ **More via yt-dlp** - YouTube Shorts? Try it and lmk if it slaps 🤷‍♀️

## 🔐 Env Vars (The Tea ☕)
| Var | Required | Desc |
|-----|----------|------|
| `BOT_TOKEN` | ✅ (absolutely) | Telegram Bot Token - this is like, super important bestie 🔑 |

## 🍪👀 Cookies (Pro Tip - This is the Way)
Export TikTok/IG cookies as `cookies.txt` (Netscape format) via browser extensions (e.g., Get cookies.txt). Mount in Docker or place in `/app`. This lets you access private content and be all sneaky beaky like 🕵️‍♀️💫

## 🆘💬 Troubleshooting (When Life Gets Messy)
- **Big files** 📦: Telegram has a 50MB limit bestie – gotta use smaller formats or it's giving error vibes
- **Rate limits** 🚨: yt-dlp handles it but if you spam you'll catch a ban fr fr (don't be that person 💀)
- **No audio** 🔇: Force `best[ext=mp4]` in the code and it should be bussin again
- **Logs** 📝: Peep the `console.log` for yt-dlp output - detective mode activated 🔍

## 🚀🌟 Deploy (Send It to Production Bestie)
- **Railway** 🚂: Connect repo, add `BOT_TOKEN`, and you're living your best life
- **Render** 🎨: Docker + env vars = *chef's kiss* 👨‍🍳💋
- **VPS** 🖥️: Just `docker-compose up -d` and call it a day - we love efficiency ✨

## 📜💖 License
MIT © Syrup

---

Made with 💜 and way too much coffee ☕ (and maybe some energy drinks 🥤) 

**No cap, this project hits different 😤🔥 If it helped you, drop a ⭐ - it's giving supportive bestie energy ✨**
