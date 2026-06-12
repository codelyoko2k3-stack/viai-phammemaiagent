import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import NewsPageContent from "@/app/(public)/tin-tuc/NewsPageContent"
import { getCategories, getCategoryPosts } from "@/lib/api/public"
import { Post } from "@/types"
import { AI_AGENT_SLUGS, NEWS_SLUGS } from "@/constants/app.constants"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoriesRes = await getCategories().catch(() => ({ data: [] }))
  const categories = categoriesRes?.data ?? []
  const cat = categories.find((c) => c.slug === params.slug)
  if (!cat) return { title: "Không tìm thấy chuyên mục" }
  return {
    title: `${cat.name} — Tin tức ViAI`,
    description: cat.description || `Bài viết trong chuyên mục ${cat.name}`,
    alternates: { canonical: `/chuyen-muc/${params.slug}` },
  }
}

function Fallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-[#F5F7FA] text-vs-gray-600 text-sm">
      Đang tải bài viết...
    </div>
  )
}

export default async function ChuyenMucPage({ params }: Props) {
  // Verify category exists & is child of "Tin tức"
  const categoriesRes = await getCategories().catch(() => ({ data: [] }))
  const categories = categoriesRes?.data ?? []
  const tinTuc = categories.find((c) => c.slug === NEWS_SLUGS)
  const cat = categories.find((c) => c.slug === params.slug)
  if (!cat) notFound()
  // Cho phép: cat là "tin-tuc" parent HOẶC con trực tiếp của "tin-tuc"
  const isValid = cat.slug === NEWS_SLUGS || cat.parentId === tinTuc?.id
  if (!isValid) notFound()

  // AI Agent posts cho sidebar
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
    <Suspense fallback={<Fallback />}>
      <NewsPageContent
        aiAgentPosts={aiAgentPosts}
        activeCategorySlug={params.slug}
        heroTitle={cat.name}
      />
    </Suspense>
  )
}
