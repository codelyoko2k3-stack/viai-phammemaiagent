import { Suspense } from "react"
import type { Metadata } from "next"
import NewsPageContent from "./NewsPageContent"
import { getCategoryPosts } from "@/lib/api/public"
import { Post } from "@/types"
import { AI_AGENT_SLUGS } from "@/constants/app.constants"

export const metadata: Metadata = {
  title: 'Tin tức & Kiến thức chuyển đổi số',
  description: 'Cập nhật tin tức công nghệ mới nhất, kiến thức quản lý doanh nghiệp, CRM, Automation và các giải pháp AI Agent từ các chuyên gia ViAI.',
}

function NewsPageFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-[#F5F7FA] text-vs-gray-600 text-sm">
      Đang tải tin tức...
    </div>
  )
}

export default async function NewsPage() {
  let aiAgentPosts: Post[] = []
  try {
    const aiRes = await getCategoryPosts(AI_AGENT_SLUGS, { limit: 50 }).catch(() => ({ data: [] }))
    aiAgentPosts = (aiRes?.data ?? [])
      .filter((p) => !!p.badge)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .slice(0, 4)
  } catch (err) {
    console.error("Failed to fetch AI Agent posts for news sidebar:", err)
  }

  return (
    <Suspense fallback={<NewsPageFallback />}>
      <NewsPageContent aiAgentPosts={aiAgentPosts} />
    </Suspense>
  )
}
