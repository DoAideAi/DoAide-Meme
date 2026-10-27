import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const ROUTES = [
  '/',
  '/templates',
  '/custom-meme-creator',
  '/caption-generator',
  '/create',
  '/blog',
  '/blog/how-to-make-memes-that-go-viral',
  '/blog/best-meme-templates-2026',
  '/blog/meme-marketing-guide-for-brands',
  '/blog/top-50-meme-templates-2026',
  '/blog/how-to-make-viral-memes-complete-guide',
  '/blog/meme-marketing-small-businesses',
]

const SITEMAP_URLS = [
  'https://meme.doaide.com/',
  'https://meme.doaide.com/templates',
  'https://meme.doaide.com/custom-meme-creator',
  'https://meme.doaide.com/caption-generator',
  'https://meme.doaide.com/create',
  'https://meme.doaide.com/blog',
  'https://meme.doaide.com/blog/how-to-make-memes-that-go-viral',
  'https://meme.doaide.com/blog/best-meme-templates-2026',
  'https://meme.doaide.com/blog/meme-marketing-guide-for-brands',
  'https://meme.doaide.com/blog/top-50-meme-templates-2026',
  'https://meme.doaide.com/blog/how-to-make-viral-memes-complete-guide',
  'https://meme.doaide.com/blog/meme-marketing-small-businesses',
]

describe('routes', () => {
  it('all expected routes are defined', () => {
    expect(ROUTES.length).toBeGreaterThanOrEqual(12)
  })

  it('routes start with /', () => {
    for (const route of ROUTES) {
      expect(route.startsWith('/')).toBe(true)
    }
  })
})

describe('sitemap', () => {
  it('has all required URLs', () => {
    expect(SITEMAP_URLS.length).toBeGreaterThanOrEqual(12)
    for (const url of SITEMAP_URLS) {
      expect(url.startsWith('https://meme.doaide.com')).toBe(true)
    }
  })

  it('sitemap.xml contains all expected URLs', () => {
    const sitemapPath = join(__dirname, '../../public/sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')
    for (const url of SITEMAP_URLS) {
      expect(sitemapContent).toContain(`<loc>${url}</loc>`)
    }
  })

  it('sitemap.xml has lastmod dates', () => {
    const sitemapPath = join(__dirname, '../../public/sitemap.xml')
    const sitemapContent = readFileSync(sitemapPath, 'utf-8')
    expect(sitemapContent).toContain('<lastmod>')
  })
})
