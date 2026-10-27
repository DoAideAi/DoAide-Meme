#!/usr/bin/env node
/**
 * prerender-routes.mjs
 *
 * Run after `vite build` to inject per-route SEO meta tags (title, description,
 * canonical, og:*, twitter:*, JSON-LD) into the static dist/index.html for each
 * route defined in src/routeMeta.ts.
 *
 * This lets crawlers that don't execute JS (Googlebot does, but Facebook/Twitter
 * share previews, Slack unfurling, etc. do not) see the correct per-page metadata.
 *
 * Usage:
 *   node scripts/prerender-routes.mjs
 *
 * It reads dist/index.html as the template, then for each route writes a
 * corresponding file (e.g. dist/templates/index.html) with the meta tags
 * replaced.
 *
 * Blog post routes are generated dynamically from src/data/blog-posts.ts.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

// ── Import route metadata ────────────────────────────────────────────────────
// We can't import .ts directly, so we parse routeMeta manually with a simple
// approach: read the compiled dist JS or use a lightweight approach.
// For simplicity, we inline the metadata here, sourced from routeMeta.ts.

const BASE = 'https://meme.doaide.com'
const OG_IMAGE = `${BASE}/og-default.png`

/** @type {Array<{path: string, title: string, description: string, canonical: string, jsonLd?: object}>} */
const routes = [
  {
    path: '/',
    title: 'DoAide Meme — Free Meme Generator | 40+ Templates & AI Captions',
    description: 'Create memes instantly with 40+ templates, AI-powered captions, and custom image uploads. Free, no login required.',
    canonical: `${BASE}/`,
  },
  {
    path: '/templates',
    title: 'Free Meme Templates — Browse 40+ Formats | DoAide Meme',
    description: 'Browse 40+ free meme templates. Pick a format, add your text, and download instantly. No login required.',
    canonical: `${BASE}/templates`,
  },
  {
    path: '/custom-meme-creator',
    title: 'Custom Meme Creator — Upload & Add Text Free | DoAide Meme',
    description: 'Upload any image, add top and bottom text with Impact font, and download your meme. Free, no login, runs in your browser.',
    canonical: `${BASE}/custom-meme-creator`,
  },
  {
    path: '/caption-generator',
    title: 'AI Meme Caption Generator — Free AI Captions | DoAide Meme',
    description: 'Generate funny meme captions with AI. Describe a topic, pick a tone, and get 5 creative suggestions instantly. Free, no login.',
    canonical: `${BASE}/caption-generator`,
  },
  {
    path: '/create',
    title: 'Meme Editor — Create & Customize Memes | DoAide Meme',
    description: 'Full-featured meme editor with text, stickers, filters, and sharing. Create memes from templates or your own images.',
    canonical: `${BASE}/create`,
  },
  {
    path: '/blog',
    title: 'Meme Blog — Tips, Guides & Meme Marketing | DoAide Meme',
    description: 'Tips, guides, and insights on meme culture, meme marketing, and creating memes that people actually share.',
    canonical: `${BASE}/blog`,
  },
]

// ── Discover blog post slugs from the data file ──────────────────────────────
const blogDataPath = join(ROOT, 'src', 'data', 'blog-posts.ts')
const blogDataSrc = readFileSync(blogDataPath, 'utf-8')
const slugMatches = [...blogDataSrc.matchAll(/slug:\s*['"]([^'"]+)['"]/g)]

for (const [, slug] of slugMatches) {
  // Extract title and description for this slug
  const slugSection = blogDataSrc.slice(
    blogDataSrc.indexOf(`slug: '${slug}'`)
  )
  const titleMatch = slugSection.match(/title:\s*['"]([^'"]+)['"]/)
  const descMatch = slugSection.match(/description:\s*\n?\s*['"]([^'"]+)['"]/)
  const title = titleMatch ? `${titleMatch[1]} | DoAide Meme Blog` : `Blog | DoAide Meme`
  const description = descMatch ? descMatch[1] : 'Read this article on the DoAide Meme Blog.'

  routes.push({
    path: `/blog/${slug}`,
    title,
    description,
    canonical: `${BASE}/blog/${slug}`,
  })
}

// ── Read the template ────────────────────────────────────────────────────────
const templateHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

function replaceMetaTag(html, attr, key, newContent) {
  const regex = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")([^"]*)(")`, 'i')
  if (regex.test(html)) {
    return html.replace(regex, `$1${newContent}$3`)
  }
  // Insert before </head>
  const tag = `    <meta ${attr}="${key}" content="${newContent}" />\n`
  return html.replace('</head>', tag + '  </head>')
}

function replaceCanonical(html, href) {
  return html.replace(
    /(<link\s+rel="canonical"\s+href=")([^"]*)(")/, `$1${href}$3`
  )
}

function replaceTitle(html, title) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
}

// ── Generate per-route HTML files ────────────────────────────────────────────
let count = 0
for (const route of routes) {
  let html = templateHtml

  html = replaceTitle(html, route.title)
  html = replaceMetaTag(html, 'name', 'description', route.description)
  html = replaceCanonical(html, route.canonical)
  html = replaceMetaTag(html, 'property', 'og:title', route.title)
  html = replaceMetaTag(html, 'property', 'og:description', route.description)
  html = replaceMetaTag(html, 'property', 'og:url', route.canonical)
  html = replaceMetaTag(html, 'property', 'og:image', OG_IMAGE)
  html = replaceMetaTag(html, 'property', 'og:image:width', '1200')
  html = replaceMetaTag(html, 'property', 'og:image:height', '630')
  html = replaceMetaTag(html, 'name', 'twitter:title', route.title)
  html = replaceMetaTag(html, 'name', 'twitter:description', route.description)
  html = replaceMetaTag(html, 'name', 'twitter:image', OG_IMAGE)

  // Write file
  const routePath = route.path === '/' ? '/' : route.path
  const filePath = join(DIST, routePath, 'index.html')
  const dir = dirname(filePath)

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  // Don't overwrite the root index.html for '/' — it's already there.
  // For '/', we just update the existing file.
  if (route.path === '/') {
    writeFileSync(join(DIST, 'index.html'), html)
  } else {
    writeFileSync(filePath, html)
  }

  count++
}

console.log(`Prerendered SEO meta for ${count} routes.`)
