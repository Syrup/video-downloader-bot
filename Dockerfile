FROM oven/bun:1-slim

WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy source code
COPY . .

# Download yt-dlp binary
RUN bun run download.ts &amp;&amp; chmod +x yt-dlp || true

# Run as non-root user (bun user in oven/bun image)
USER bun

CMD ["bun", "index.ts"]