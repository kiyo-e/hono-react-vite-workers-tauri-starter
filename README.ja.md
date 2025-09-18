# Hono + Cloudflare Workers + React + Tauri スターター

Hono で構築したサーバーを Cloudflare Workers 上で稼働させ、Vite + React のフロントエンドを同じコードベースから提供しつつ、Tauri でネイティブアプリとして配布できるサンプルリポジトリです。Web・エッジ・デスクトップを一元的に開発できます。

## 構成技術
- **サーバー:** Cloudflare Workers 上で動作する Hono
- **クライアント:** Vite でバンドルする React 19
- **デスクトップ:** Web ビルドをラップする Tauri 2
- **ツール:** Wrangler CLI、Tailwind CSS (Vite プラグイン)、高速実行用の Bun（任意）

## 前提条件
- Node.js 20 以上（または Bun 1.1 以上）と npm / bun
- Cloudflare アカウントに紐づいた Wrangler CLI (`npm install --global wrangler`)
- Tauri が要求する各 OS 向け依存関係（Rust toolchain、Xcode Command Line Tools など）

## セットアップと開発
1. 依存関係をインストールします。
   ```bash
   npm install
   # もしくは
   bun install
   ```
2. ホットリロード付きの Vite 開発サーバーを起動します。
   ```bash
   npm run dev
   ```
   ブラウザで `http://localhost:5173` を開くと、`src/server` で定義している Hono ルート経由でページがレンダリングされます。
3. Cloudflare Workers の実行環境で動作確認する場合は Wrangler を使います。
   ```bash
   npx wrangler dev
   ```

## Web ビルド
- 最適化された本番ビルドを作成します。
  ```bash
  npm run build
  ```
  ビルド成果物は `dist/` に出力され、Tauri でも利用されます。
- 本番ビルドをローカルでプレビューします。
  ```bash
  npm run preview
  ```

## Cloudflare Workers へのデプロイ
1. `wrangler.jsonc` で Worker 名や互換性フラグ、各種バインディング（KV・Durable Objects・Secrets など）を設定します。
2. ビルドとデプロイをまとめて実行します。
   ```bash
   npm run deploy
   ```
   `vite build` の後に `wrangler deploy` が走り、Hono ハンドラーが Cloudflare のエッジに配備されます。

## Tauri デスクトップアプリ
- 開発用にネイティブウィンドウを立ち上げます。
  ```bash
  npx tauri dev
  # Bun を使う場合
  bunx tauri dev
  ```
  `beforeDevCommand` フックで Vite の開発サーバーが起動し、Tauri ウィンドウがその URL に接続します。
- リリースビルドを生成します。
  ```bash
  npx tauri build
  ```
  生成物は OS ごとに `src-tauri/target/` 以下に保存されます。

## Cloudflare バインディングの型生成
Worker のバインディングを追加・変更した際は、型定義を更新して Hono から安全に参照できるようにします。
```bash
npm run cf-typegen
```
`worker-configuration.d.ts` が再生成され、`CloudflareBindings` が最新状態になります。

## ディレクトリ構成
```
.
├── public/                     # Vite が配信する静的ファイル
├── src/
│   ├── client/                 # React 入口とコンポーネント
│   ├── server/                 # Hono のルートと HTML レンダラー
│   └── style.css               # グローバルスタイル（Tailwind 利用想定）
├── src-tauri/                  # Tauri の設定とビルドフック
├── dist/                       # Vite の本番ビルド（生成物）
├── worker-configuration.d.ts   # Cloudflare バインディングの型定義
└── wrangler.jsonc              # Worker のデプロイ設定
```

## 主なコマンド
- `npm run dev` – Vite 開発サーバー
- `npx wrangler dev` – Cloudflare Worker ローカルプレビュー
- `npm run build` – 本番向け Web ビルド
- `npm run deploy` – ビルド + Cloudflare Workers デプロイ
- `npx tauri dev` – デスクトップ開発シェル
- `npm run cf-typegen` – Cloudflare バインディングの型更新

## 参考リンク
- [Hono ドキュメント](https://hono.dev/)
- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Vite ガイド](https://vitejs.dev/guide/)
- [React ドキュメント](https://react.dev/)
- [Tauri ドキュメント](https://tauri.app/)

このテンプレートで、Web・エッジ・ネイティブを一度に開発してみてください！
