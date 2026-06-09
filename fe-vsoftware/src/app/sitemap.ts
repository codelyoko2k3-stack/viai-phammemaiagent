import { MetadataRoute } from 'next'
import { getCategories, getCategoryPosts, getPosts } from '@/lib/api/public'
import { AI_AGENT_SLUGS, SERVICES_SLUGS } from '@/constants/app.constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://viai.vn'

  // 1. Static routes
  const staticRoutes = [
    { path: '', priority: 1.0, freq: 'daily' },
    { path: '/introduction', priority: 0.8, freq: 'weekly' },
    { path: '/contact', priority: 0.7, freq: 'monthly' },
    { path: '/tin-tuc', priority: 0.8, freq: 'daily' },
    { path: '/dich-vu', priority: 0.9, freq: 'weekly' },
    { path: '/ai-agent', priority: 0.9, freq: 'weekly' },
    { path: '/chinh-sach-bao-mat', priority: 0.3, freq: 'yearly' },
    { path: '/dieu-khoan-su-dung', priority: 0.3, freq: 'yearly' },
  ].map(({ path, priority, freq }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority,
  }))

  try {
    const [categoriesRes, postsRes, servicesRes, aiAgentRes] = await Promise.all([
      getCategories().catch(() => ({ data: [] })),
      getPosts({ limit: 200 }).catch(() => ({ data: [] })),
      getCategoryPosts(SERVICES_SLUGS, { limit: 200 }).catch(() => ({ data: [] })),
      getCategoryPosts(AI_AGENT_SLUGS, { limit: 200 }).catch(() => ({ data: [] })),
    ])

    const categories = categoriesRes?.data ?? []
    const posts = postsRes?.data ?? []
    const services = servicesRes?.data ?? []
    const aiAgents = aiAgentRes?.data ?? []

    // 2. Category routes
    const categoryRoutes = categories.map((cat) => ({
      url: `${siteUrl}/category/${cat.slug}`,
      lastModified: new Date(cat.updatedAt || new Date().toISOString()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // 3. Bài viết tin tức
    const postRoutes = posts
      .filter((p) => p.status === 'published')
      .map((post) => ({
        url: `${siteUrl}/tin-tuc/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))

    // 4. Trang chi tiết Dịch vụ — quan trọng, priority cao
    const serviceRoutes = services
      .filter((s) => s.status === 'published')
      .map((svc) => ({
        url: `${siteUrl}/dich-vu/${svc.slug}`,
        lastModified: new Date(svc.updatedAt || svc.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }))

    // 5. Trang chi tiết AI Agent — quan trọng, priority cao
    const aiAgentRoutes = aiAgents
      .filter((a) => a.status === 'published')
      .map((agent) => ({
        url: `${siteUrl}/ai-agent/${agent.slug}`,
        lastModified: new Date(agent.updatedAt || agent.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }))

    return [
      ...staticRoutes,
      ...serviceRoutes,
      ...aiAgentRoutes,
      ...categoryRoutes,
      ...postRoutes,
    ]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return staticRoutes
  }
}
