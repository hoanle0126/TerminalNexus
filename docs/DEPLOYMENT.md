# Deployment Guide

> How to deploy TerminalNexus to production.

---

## Table of Contents

- [Build for Production](#build-for-production)
- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [Self-Hosted (VPS + Docker)](#self-hosted-vps--docker)
- [Self-Hosted (VPS + Node.js)](#self-hosted-vps--nodejs)
- [Environment Variables](#environment-variables)

---

## Build for Production

```bash
npm run build
```

This generates an optimized production build in `.next/`. Verify locally:

```bash
npm run start
# Open http://localhost:3000
```

---

## Vercel (Recommended)

The easiest way to deploy a Next.js app.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hoanle0126/TerminalNexus)

### Manual Deploy

1. Push your code to GitHub / GitLab / Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repo
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Output directory: `.next` (default)
6. Click **Deploy**

Vercel will auto-deploy on every push to `main`.

### Custom Domain

1. Go to **Settings → Domains** in your Vercel project
2. Add your domain (e.g. `yourdomain.com`)
3. Update DNS records as instructed by Vercel

---

## Netlify

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

### Via Dashboard

1. Go to [app.netlify.com](https://app.netlify.com/) → **Add new site** → Import from Git
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy

> **Note:** Netlify requires the `@netlify/plugin-nextjs` plugin for full Next.js support. Add it in your Netlify dashboard or `netlify.toml`.

---

## Self-Hosted (VPS + Docker)

### Dockerfile

```dockerfile
# ── Build stage ──
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production stage ──
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

> **Important:** For standalone output, add to `next.config.ts`:
>
> ```ts
> const nextConfig: NextConfig = {
>   output: "standalone",
> };
> ```

### Build & Run

```bash
# Build image
docker build -t terminal-nexus .

# Run container
docker run -d -p 3000:3000 --name terminal-nexus terminal-nexus
```

### Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

```bash
docker compose up -d
```

---

## Self-Hosted (VPS + Node.js)

If you prefer running Node.js directly on your VPS:

```bash
# 1. Clone & install
git clone https://github.com/hoanle0126/TerminalNexus.git
cd TerminalNexus
npm ci

# 2. Build
npm run build

# 3. Start with PM2 (recommended for process management)
npm install -g pm2
pm2 start npm --name "terminal-nexus" -- start

# 4. Save PM2 process list for auto-restart
pm2 save
pm2 startup
```

### Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL with Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Environment Variables

TerminalNexus does **not** require any environment variables by default. All configuration is done through TypeScript config files in `src/config/`.

If you add features that require API keys (e.g., contact form backend, analytics), create a `.env.local` file:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

> **Never commit `.env.local` to git.** It is already in `.gitignore`.
