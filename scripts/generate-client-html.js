import { promises as fs } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const clientDistDir = path.resolve(root, 'dist', 'client')
const manifestPath = path.join(clientDistDir, '.vite', 'manifest.json')
const targetHtmlPath = path.join(clientDistDir, 'index.html')

async function main() {
  try {
    await fs.access(manifestPath)
  } catch {
    console.error(`[generate-client-html] manifest not found at ${manifestPath}. Run \`vite build\` first.`)
    process.exit(1)
  }

  const manifestRaw = await fs.readFile(manifestPath, 'utf8')
  const manifest = JSON.parse(manifestRaw)

  const entry = manifest['src/client/main.tsx'] ?? manifest['src/client/main.ts']
  if (!entry?.file) {
    console.error('[generate-client-html] Entry for src/client/main.tsx not found in manifest.')
    process.exit(1)
  }

  const cssFiles = new Set(entry.css ?? [])
  const styleEntry = manifest['src/style.css']
  if (styleEntry?.file) {
    cssFiles.add(styleEntry.file)
  }

  const links = Array.from(cssFiles).map((href) => `    <link rel="stylesheet" href="${href}">`).join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>my-app</title>
${links ? links + '\n' : ''}  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entry.file}"></script>
  </body>
</html>
`

  await fs.writeFile(targetHtmlPath, html, 'utf8')
  console.info(`[generate-client-html] Wrote ${path.relative(root, targetHtmlPath)}`)
}

await main()
