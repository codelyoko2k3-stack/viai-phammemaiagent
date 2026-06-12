import { Suspense } from "react"
import NewsPageContent from "./NewsPageContent"
import { getCategories, getCategoryPosts, getCategoryBySlug } from "@/lib/api/public"
import { Post } from "@/types"
import type { Metadata } from "next"
import { AI_AGENT_SLUGS } from "@/constants/app.constants"

const PAGE_SIZE = 9

function NewsPageFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-[#F5F7FA] text-vs-gray-600 text-sm">
      Đang tải tin tức...
    </div>
  )
}

type Props = {
  params: { slug: string }
  searchParams: { page?: string; category?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug).then(res => res.data).catch(() => null)
  if (!category) return { title: 'Danh mục không tồn tại' }
  return {
    title: `Danh mục: ${category.name}`,
    description: category.description || `Các bài viết, dịch vụ thuộc danh mục ${category.name} tại ViAI.`,
    alternates: {
      canonical: `/category/${params.slug}`
    },
  }
}

export default async function NewsPage({ params, searchParams }: Props) {
  const { slug } = params
  const page = Math.max(1, parseInt(searchParams.page || "1", 10))
  const categoryParam = searchParams.category || "all"
  const selectedSlug = categoryParam === "all" ? slug : categoryParam

  const [categoriesRes, countsRes, postsRes] = await Promise.all([
    getCategories().catch(() => ({ data: [] })),
    getCategoryPosts(slug, { limit: 100 }).catch(() => ({ data: [], total: 0 })),
    getCategoryPosts(selectedSlug, { page, limit: PAGE_SIZE }).catch(() => ({
      data: [],
      total: 0,
      totalPages: 1,
    })),
  ])

  const categories = categoriesRes?.data ?? []

  let aiAgentPosts: Post[] = []
  try {
    const aiRes = await getCategoryPosts(AI_AGENT_SLUGS, { limit: 50 }).catch(() => ({ data: [] }))
    aiAgentPosts = (aiRes?.data ?? [])
      .filter((p) => !!p.badge)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .slice(0, 4)
  } catch (err) {
    console.error("Failed to fetch AI Agent posts:", err)
  }

  return (
    <Suspense fallback={<NewsPageFallback />}>
      <NewsPageContent
        slug={slug}
        aiAgentPosts={aiAgentPosts}
        initialCategories={categories}
        initialCounts={countsRes}
        initialPosts={postsRes}
        initialPage={page}
        initialCategory={categoryParam}
      />
    </Suspense>
  )
}