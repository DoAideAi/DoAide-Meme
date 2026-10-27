/**
 * Centralised route-level SEO metadata.
 * Used by usePageSeo() at runtime and by scripts/prerender-routes.mjs at build time.
 */

export interface RouteMeta {
  path: string
  title: string
  description: string
  canonical: string
  h1: string
  ogImage?: string
  ogImageWidth?: number
  ogImageHeight?: number
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const BASE = 'https://meme.doaide.com'
const OG_IMAGE = `${BASE}/og-default.png`
const OG_W = 1200
const OG_H = 630

export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    title: 'DoAide Meme — Free Meme Generator | 40+ Templates & AI Captions',
    description:
      'Create memes instantly with 40+ templates, AI-powered captions, and custom image uploads. Free, no login required.',
    canonical: `${BASE}/`,
    h1: 'Create Memes Instantly',
    ogImage: OG_IMAGE,
    ogImageWidth: OG_W,
    ogImageHeight: OG_H,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'DoAide Meme',
        url: BASE,
        description:
          'Create, customize, and share memes instantly. 40+ templates, AI-powered captions, custom image uploads. Free meme maker — no login required.',
        applicationCategory: 'EntertainmentApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires a modern web browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
        featureList: [
          '40+ meme templates',
          'Custom image upload',
          'AI-powered caption generator',
          'Text overlay with fonts and colors',
          'Sticker overlays',
          'Image filters',
          'Download as PNG or JPG',
          'Share to WhatsApp and Twitter',
          'No login required',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is DoAide Meme free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, DoAide Meme is completely free. No login, no subscription, no hidden fees. Create and download unlimited memes with 40+ templates and AI-powered captions.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to create an account?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No account or login is needed. All tools — template browser, custom meme creator, and AI caption generator — work instantly in your browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I upload my own images to make memes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Use the Custom Meme Creator to upload any image, add top and bottom text with the classic meme font, and download your creation. Images are processed in your browser and never uploaded to our servers.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the AI caption generator work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Describe a topic or scenario, optionally select a meme template and tone, and our AI generates 5 creative caption suggestions. Click 'Use This' to open the editor with your chosen caption pre-filled.",
            },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Templates', item: `${BASE}/templates` },
          { '@type': 'ListItem', position: 3, name: 'Custom Creator', item: `${BASE}/custom-meme-creator` },
          { '@type': 'ListItem', position: 4, name: 'AI Captions', item: `${BASE}/caption-generator` },
          { '@type': 'ListItem', position: 5, name: 'Blog', item: `${BASE}/blog` },
        ],
      },
    ],
  },
  {
    path: '/templates',
    title: 'Free Meme Templates — Browse 40+ Formats | DoAide Meme',
    description:
      'Browse 40+ free meme templates. Pick a format, add your text, and download instantly. No login required.',
    canonical: `${BASE}/templates`,
    h1: 'Free Meme Template Browser',
    ogImage: OG_IMAGE,
    ogImageWidth: OG_W,
    ogImageHeight: OG_H,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Meme Templates',
      url: `${BASE}/templates`,
      description: 'Browse 40+ free meme templates with search and category filters.',
      isPartOf: { '@type': 'WebSite', name: 'DoAide Meme', url: BASE },
    },
  },
  {
    path: '/custom-meme-creator',
    title: 'Custom Meme Creator — Upload & Add Text Free | DoAide Meme',
    description:
      'Upload any image, add top and bottom text with Impact font, and download your meme. Free, no login, runs in your browser.',
    canonical: `${BASE}/custom-meme-creator`,
    h1: 'Custom Meme Creator',
    ogImage: OG_IMAGE,
    ogImageWidth: OG_W,
    ogImageHeight: OG_H,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Custom Meme Creator',
      url: `${BASE}/custom-meme-creator`,
      description: 'Upload any image, add classic meme text overlay, and download for free.',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },
  {
    path: '/caption-generator',
    title: 'AI Meme Caption Generator — Free AI Captions | DoAide Meme',
    description:
      'Generate funny meme captions with AI. Describe a topic, pick a tone, and get 5 creative suggestions instantly. Free, no login.',
    canonical: `${BASE}/caption-generator`,
    h1: 'AI Meme Caption Generator',
    ogImage: OG_IMAGE,
    ogImageWidth: OG_W,
    ogImageHeight: OG_H,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'AI Meme Caption Generator',
      url: `${BASE}/caption-generator`,
      description: 'Generate funny meme captions with AI. Free, no login required.',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },
  {
    path: '/create',
    title: 'Meme Editor — Create & Customize Memes | DoAide Meme',
    description:
      'Full-featured meme editor with text, stickers, filters, and sharing. Create memes from templates or your own images.',
    canonical: `${BASE}/create`,
    h1: 'Meme Editor',
    ogImage: OG_IMAGE,
    ogImageWidth: OG_W,
    ogImageHeight: OG_H,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'DoAide Meme Editor',
      url: `${BASE}/create`,
      description: 'Full-featured meme editor with text overlays, stickers, image filters, and social sharing.',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },
  {
    path: '/blog',
    title: 'Meme Blog — Tips, Guides & Meme Marketing | DoAide Meme',
    description:
      'Tips, guides, and insights on meme culture, meme marketing, and creating memes that people actually share.',
    canonical: `${BASE}/blog`,
    h1: 'DoAide Meme Blog',
    ogImage: OG_IMAGE,
    ogImageWidth: OG_W,
    ogImageHeight: OG_H,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'DoAide Meme Blog',
      url: `${BASE}/blog`,
      description: 'Tips, guides, and insights on meme culture, meme marketing, and creating memes.',
      publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
    },
  },
]

/** Lookup by pathname; returns undefined for dynamic blog/:slug routes. */
export function getRouteMeta(pathname: string): RouteMeta | undefined {
  return routeMeta.find((r) => r.path === pathname)
}
