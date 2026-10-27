import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteMeta } from '../routeMeta'
import type { RouteMeta } from '../routeMeta'

function setMetaTag(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.getElementById('page-jsonld') as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = 'page-jsonld'
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function removeJsonLd() {
  document.getElementById('page-jsonld')?.remove()
}

/**
 * Sets document <title>, meta description, canonical, og:* tags, and JSON-LD
 * based on the current route.
 *
 * For dynamic routes (blog posts), pass overrides.
 */
export function usePageSeo(overrides?: Partial<RouteMeta>) {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = overrides
      ? { ...getRouteMeta(pathname), ...overrides }
      : getRouteMeta(pathname)

    if (!meta?.title) return // unknown route, leave defaults

    document.title = meta.title

    if (meta.description) {
      setMetaTag('name', 'description', meta.description)
    }

    if (meta.canonical) {
      setCanonical(meta.canonical)
    }

    // Open Graph
    setMetaTag('property', 'og:title', meta.title)
    if (meta.description) setMetaTag('property', 'og:description', meta.description)
    setMetaTag('property', 'og:type', 'website')
    if (meta.canonical) setMetaTag('property', 'og:url', meta.canonical)
    setMetaTag('property', 'og:site_name', 'DoAide Meme')

    if (meta.ogImage) {
      setMetaTag('property', 'og:image', meta.ogImage)
      if (meta.ogImageWidth) setMetaTag('property', 'og:image:width', String(meta.ogImageWidth))
      if (meta.ogImageHeight) setMetaTag('property', 'og:image:height', String(meta.ogImageHeight))
    }

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', meta.title)
    if (meta.description) setMetaTag('name', 'twitter:description', meta.description)
    if (meta.ogImage) setMetaTag('name', 'twitter:image', meta.ogImage)

    // JSON-LD
    if (meta.jsonLd) {
      setJsonLd(meta.jsonLd)
    } else {
      removeJsonLd()
    }

    // Cleanup: reset to defaults on unmount
    return () => {
      document.title = 'DoAide Meme — Free Meme Generator | 40+ Templates & AI Captions'
      removeJsonLd()
    }
  }, [pathname, overrides])
}
