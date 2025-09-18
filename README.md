# Hono + Cloudflare Workers + React + Tauri Starter

This repository is a full-stack starter template that combines a Hono server running on Cloudflare Workers, a React front end bundled with Vite, and a desktop application powered by Tauri. Use a single codebase to serve a progressive web app and package it as a native application across macOS, Windows, and Linux.

## Tech Stack
- **Server:** [Hono](https://hono.dev/) deployed to Cloudflare Workers
- **Client:** React 19 with Vite for development and bundling
- **Desktop:** Tauri 2 bridging the web build into a native shell
- **Tooling:** Wrangler CLI for Workers, Tailwind CSS (via the Vite plugin), Bun (optional) for fast scripting

## Prerequisites
- Node.js 20+ (or Bun 1.1+) and npm/bun for package management
- Wrangler CLI (`npm install --global wrangler`) configured with your Cloudflare account
- Tauri system dependencies (Rust toolchain, Xcode Command Line Tools on macOS, etc.) — see the [official platform guide](https://tauri.app/start/prerequisites)

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```
2. Start the Vite dev server with hot module replacement:
   ```bash
   npm run dev
   ```
   The client renders at `http://localhost:5173`, backed by the Hono routes in `src/server`.
3. (Optional) Run the Worker locally with Wrangler for a Cloudflare-accurate environment:
   ```bash
   npx wrangler dev
   ```

## Building the Web App
- Create an optimized production bundle:
  ```bash
  npm run build
  ```
  The Vite build emits static assets to `dist/`, which are also consumed by Tauri.
- Preview the production build locally:
  ```bash
  npm run preview
  ```

## Cloudflare Worker Deployment
1. Update `wrangler.jsonc` with your Worker name, compatibility flags, and bindings (KV, Durable Objects, secrets, etc.).
2. Deploy the Worker and static bundle:
   ```bash
   npm run deploy
   ```
   This command runs `vite build` and then `wrangler deploy`, pushing your Hono handler to Cloudflare’s global edge.

## Tauri Desktop App
- Launch the desktop container in development mode:
  ```bash
  npx tauri dev
  # or with Bun
  bunx tauri dev
  ```
  Tauri will boot the Vite dev server via the `beforeDevCommand` hook and open a native window pointed at it.
- Produce distributable binaries:
  ```bash
  npx tauri build
  ```
  Builds are written under `src-tauri/target/` according to your platform.

## Type-Safe Cloudflare Bindings
Whenever you add or change Worker environment bindings, regenerate the ambient types so Hono can infer them:
```bash
npm run cf-typegen
```
This refreshes `worker-configuration.d.ts` and keeps `CloudflareBindings` aligned with your deployed Worker configuration.

## Project Structure
```
.
├── public/                     # Static assets served by Vite
├── src/
│   ├── client/                 # React entrypoint and components
│   ├── server/                 # Hono routes and HTML renderer
│   └── style.css               # Example global styles (Tailwind-ready)
├── src-tauri/                  # Tauri configuration and bundler hooks
├── dist/                       # Vite production output (generated)
├── worker-configuration.d.ts   # Generated types for Cloudflare bindings
└── wrangler.jsonc              # Worker deployment settings
```

## Useful Commands
- `npm run dev` – Vite dev server
- `npx wrangler dev` – Local Worker preview
- `npm run build` – Production web build
- `npm run deploy` – Build + Cloudflare Workers deploy
- `npx tauri dev` – Desktop dev shell
- `npm run cf-typegen` – Refresh Cloudflare binding types

## Resources
- [Hono documentation](https://hono.dev/)
- [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
- [Vite guide](https://vitejs.dev/guide/)
- [React documentation](https://react.dev/)
- [Tauri documentation](https://tauri.app/)

Enjoy building for the web, the edge, and the desktop from one project!
