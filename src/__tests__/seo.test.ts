import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { routeMeta, getRouteMeta } from '../routeMeta'
import { blogPosts } from '../data/blog-posts'

describe('routeMeta', () => {
  it('has metadata for all static routes', () => {
    const expectedPaths = ['/', '/templates', '/custom-meme-creator', '/caption-generator', '/create', '/blog']
    for (const path of expectedPaths) {
      const meta = getRouteMeta(path)
      expect(meta, `missing meta for ${path}`).toBeDefined()
    }
  })

  it('every route has unique title', () => {
    const titles = routeMeta.map((r) => r.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('every route has unique canonical', () => {
    const canonicals = routeMeta.map((r) => r.canonical)
    expect(new Set(canonicals).size).toBe(canonicals.length)
  })

  it('every route has required SEO fields', () => {
    for (const meta of routeMeta) {
      expect(meta.title.length, `title too short for ${meta.path}`).toBeGreaterThan(10)
      expect(meta.description.length, `description too short for ${meta.path}`).toBeGreaterThan(30)
      expect(meta.canonical).toMatch(/^https:\/\/meme\.doaide\.com/)
      expect(meta.h1.length, `h1 too short for ${meta.path}`).toBeGreaterThan(3)
      expect(meta.ogImage).toBeTruthy()
      expect(meta.ogImageWidth).toBe(1200)
      expect(meta.ogImageHeight).toBe(630)
    }
  })

  it('every route has JSON-LD', () => {
    for (const meta of routeMeta) {
      expect(meta.jsonLd, `missing jsonLd for ${meta.path}`).toBeDefined()
    }
  })
})

describe('index.html SEO', () => {
  it('has og:image with dimensions', () => {
    const html = readFileSync(join(__dirname, '../../index.html'), 'utf-8')
    expect(html).toContain('og:image')
    expect(html).toContain('og:image:width')
    expect(html).toContain('og:image:height')
  })

  it('has twitter:image', () => {
    const html = readFileSync(join(__dirname, '../../index.html'), 'utf-8')
    expect(html).toContain('twitter:image')
  })

  it('has canonical link', () => {
    const html = readFileSync(join(__dirname, '../../index.html'), 'utf-8')
    expect(html).toContain('rel="canonical"')
  })

  it('does not contain "Apprend Technologies"', () => {
    const html = readFileSync(join(__dirname, '../../index.html'), 'utf-8')
    expect(html).not.toContain('Apprend')
  })
})

describe('blog posts have sitemap coverage', () => {
  it('every blog slug is in sitemap', () => {
    const sitemap = readFileSync(join(__dirname, '../../public/sitemap.xml'), 'utf-8')
    for (const post of blogPosts) {
      expect(
        sitemap,
        `blog slug "${post.slug}" missing from sitemap`
      ).toContain(`https://meme.doaide.com/blog/${post.slug}`)
    }
  })
})
