FROM oven/bun:1-slim

WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy source code
COPY . .

# Download yt-dlp binary directly from GitHub releases (linux amd64)
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux -o ./yt-dlp && \
    chmod +x ./yt-dlp

# Run as non-root user (bun user in oven/bun image)
USER bun

CMD ["bun", "index.ts"]