import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoryPosts } from '@/lib/api/public'
import { getEmojiForPost } from '@/lib/public-content'
import { AI_AGENT_SLUGS } from '@/constants/app.constants'

export const metadata: Metadata = {
  title: 'Phần mềm AI Agent — ViAI',
  description:
    'Toàn bộ sản phẩm AI Agent của ViAI: AI Sales, Marketing, CSKH, Kế toán, Nhân sự, Báo cáo CEO. Tích hợp sâu vào phần mềm doanh nghiệp.',
}

export default async function AiAgentIndexPage() {
  const res = await getCategoryPosts(AI_AGENT_SLUGS, { limit: 100 }).catch(() => ({ data: [] }))
  const products = (res.data || []).slice().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  return (
    <div className="bg-vs-bg min-h-screen">
      <section className="bg-vs-hero py-16">
        <div className="max-w-8xl mx-auto px-6 text-center">
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-vs-dark leading-[1.2] mb-4">
            Toàn bộ sản phẩm <span className="text-vs-blue">AI Agent</span> của ViAI
          </h1>
          <p className="text-[16px] text-vs-gray-700 max-w-2xl mx-auto leading-[1.7]">
            Mỗi sản phẩm là 1 nhân viên AI làm việc 24/7 — tích hợp sâu vào phần mềm doanh nghiệp,
            tự động hoá quy trình thực tế.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-8xl mx-auto px-6">
          {products.length === 0 ? (
            <div className="text-center py-16 text-vs-gray-600">
              📭 Chưa có sản phẩm AI Agent nào. Đăng bài mới trong danh mục <strong>Phần mềm AI Agent</strong> để hiện ở đây.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((post) => {
                const href = `/${AI_AGENT_SLUGS}/${post.slug}`
                const features = post.productPageConfig?.features?.items ?? []
                const bullets = features.slice(0, 4).map((f) => f.title).filter(Boolean)
                return (
                  <Link
                    key={post.id}
                    href={href}
                    className="group relative rounded-2xl p-6 no-underline transition-all flex flex-col bg-white shadow-vs hover:shadow-vs-lg hover:-translate-y-1 hover:bg-vs-dark-gradient"
                  >
                    {post.badge && (
                      <span className="absolute top-4 right-4 z-10 text-[10px] font-extrabold bg-vs-orange text-white px-2.5 py-1 rounded-full uppercase tracking-[0.08em] shadow-md">
                        {post.badge}
                      </span>
                    )}
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-transparent flex items-center justify-center">
                      {post.logoUrl ? (
                        <Image
                          src={post.logoUrl}
                          alt={post.title}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-contain p-2"
                        />
                      ) : (
                        <span className="text-5xl">{getEmojiForPost(post.slug, post.title)}</span>
                      )}
                    </div>
                    <h3 className="text-[17px] font-extrabold mb-2 leading-snug text-vs-dark group-hover:text-white line-clamp-2">
                      {post.title}
                    </h3>
                    {bullets.length > 0 ? (
                      <ul className="flex flex-col gap-1.5 mb-4 flex-1">
                        {bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-[13px] leading-snug text-vs-gray-700 group-hover:text-white/85">
                            <span className="text-vs-orange shrink-0 mt-0.5 font-bold">✓</span>
                            <span className="line-clamp-2">{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[13.5px] text-vs-gray-600 leading-[1.65] mb-4 flex-1 whitespace-pre-line group-hover:text-white/75">
                        {post.excerpt || post.seoDescription || 'Giải pháp AI Agent thông minh.'}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-[13px] font-extrabold transition-[gap] group-hover:gap-2 text-vs-blue group-hover:text-vs-orange">
                      Tìm hiểu thêm →
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
