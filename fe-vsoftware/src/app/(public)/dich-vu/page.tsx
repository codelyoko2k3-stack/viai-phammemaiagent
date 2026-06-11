import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoryPosts } from '@/lib/api/public'
import { getEmojiForPost } from '@/lib/public-content'
import { SERVICES_SLUGS, SERVICES_URL } from '@/constants/app.constants'

export const metadata: Metadata = {
  title: 'Dịch vụ — ViAI',
  description:
    'Toàn bộ dịch vụ ViAI: Phần mềm vận hành, theo ngành nghề, thiết kế web & nền tảng. Triển khai theo yêu cầu cho SMEs.',
}

export default async function ServicesIndexPage() {
  const res = await getCategoryPosts(SERVICES_SLUGS, { limit: 100 }).catch(() => ({ data: [] }))
  const products = (res.data || []).slice().sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

  return (
    <div className="bg-vs-bg min-h-screen">
      <section className="bg-vs-hero py-16">
        <div className="max-w-8xl mx-auto px-6 text-center">
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-vs-dark leading-[1.2] mb-4">
            Toàn bộ <span className="text-vs-blue">dịch vụ</span> của ViAI
          </h1>
          <p className="text-[16px] text-vs-gray-700 max-w-2xl mx-auto leading-[1.7]">
            Phần mềm vận hành, giải pháp theo ngành nghề, thiết kế web & app — triển khai theo yêu cầu cho doanh nghiệp Việt.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-8xl mx-auto px-6">
          {products.length === 0 ? (
            <div className="text-center py-16 text-vs-gray-600">
              📭 Chưa có dịch vụ nào. Đăng bài mới trong danh mục <strong>Dịch vụ</strong> để hiện ở đây.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((post) => {
                const href = `/${SERVICES_URL}/${post.slug}`
                const imageSrc = post.productPageConfig?.hero?.heroImageSrc || post.logoUrl
                return (
                  <Link
                    key={post.id}
                    href={href}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-vs hover:shadow-vs-md hover:-translate-y-1 transition-all flex flex-col no-underline"
                  >
                    {post.badge && (
                      <span className="absolute top-4 right-4 z-10 text-[10px] font-extrabold bg-vs-orange text-white px-2.5 py-1 rounded-full uppercase tracking-[0.08em] shadow-md">
                        {post.badge}
                      </span>
                    )}
                    <div className="relative w-full aspect-video bg-vs-blue-light">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={post.title}
                          fill
                          unoptimized
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          {getEmojiForPost(post.slug, post.title)}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-[17px] font-extrabold text-vs-dark mb-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[13.5px] text-vs-gray-600 leading-[1.65] mb-4 flex-1 whitespace-pre-line">
                        {post.excerpt || post.seoDescription || 'Giải pháp phần mềm theo yêu cầu.'}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[13px] font-extrabold text-vs-blue transition-[gap] group-hover:gap-2">
                        Xem chi tiết →
                      </span>
                    </div>
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
