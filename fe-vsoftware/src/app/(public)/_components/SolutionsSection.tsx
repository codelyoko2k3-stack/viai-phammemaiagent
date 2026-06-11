import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { HomepageSolutionsConfig } from '@/types'
import { DynamicIcon } from '@/components/admin/IconPicker'

const DEFAULT_ITEMS = [
  {
    iconName: 'Bot',
    image: null,
    imageAlt: null,
    title: 'PHẦN MỀM AI AGENT',
    description: 'Trợ lý AI tự động hoá quy trình bán hàng, chăm sóc khách hàng, vận hành nội bộ — tích hợp ngay vào hệ thống hiện có.',
    ctaText: 'Khám phá sản phẩm',
    ctaHref: '/ai-agent',
    color: 'blue',
  },
  {
    iconName: 'Workflow',
    image: null,
    imageAlt: null,
    title: 'DỊCH VỤ TRIỂN KHAI AI',
    description: 'Tư vấn, xây dựng và triển khai giải pháp AI theo đúng bài toán của doanh nghiệp — từ A đến Z, có đội ngũ đồng hành.',
    ctaText: 'Xem dịch vụ',
    ctaHref: '/services',
    color: 'orange',
  },
  {
    iconName: 'GraduationCap',
    image: null,
    imageAlt: null,
    title: 'KHÓA HỌC AI AGENT',
    description: 'Đào tạo đội ngũ nội bộ sử dụng và xây dựng AI Agent — từ cơ bản đến nâng cao, thực hành trên case thực tế.',
    ctaText: 'Liên hệ tư vấn',
    ctaHref: '/contact',
    color: 'blue',
  },
] as const

function SolutionsSection({ config }: { config?: HomepageSolutionsConfig }) {
  const heading = config?.heading ?? 'Giải pháp'
  const headingEm = config?.headingEm ?? 'của ViAI'
  const description = config?.description ?? '3 trụ cột giúp doanh nghiệp bạn ứng dụng AI vào vận hành thực tế — từ phần mềm, triển khai đến đào tạo đội ngũ.'

  const items = config?.items && config.items.length > 0
    ? config.items.map((it, i) => ({
        ...it,
        color: DEFAULT_ITEMS[i % DEFAULT_ITEMS.length].color,
      }))
    : DEFAULT_ITEMS

  return (
    <section id="giai-phap" className="py-16 bg-white scroll-mt-24">
      <div className="max-w-8xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-[clamp(22px,3vw,34px)] font-extrabold text-vs-dark leading-[1.25]">
            {heading} <span className="text-vs-blue italic">{headingEm}</span>
          </h2>
          <p className="text-[15px] text-vs-gray-600 mt-3 max-w-2xl mx-auto whitespace-pre-line">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl bg-white border border-vs-gray-200 hover:shadow-vs-md hover:-translate-y-1 transition-all overflow-hidden"
            >
              {item.image && (
                <div className="relative w-full aspect-video">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col flex-1 p-8">
                {!item.image && (
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                    item.color === 'blue'
                      ? 'bg-[linear-gradient(135deg,_#1E5BC6_0%,_#1749A8_100%)]'
                      : 'bg-[linear-gradient(135deg,_#F47920_0%,_#D96510_100%)]'
                  }`}>
                    <DynamicIcon name={item.iconName} className="h-7 w-7 text-white" />
                  </div>
                )}
                <h3 className="text-[17px] font-extrabold text-vs-dark mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[14px] text-vs-gray-600 leading-[1.65] mb-6 flex-1 whitespace-pre-line">
                  {item.description}
                </p>
                {item.ctaHref && (
                  <Link
                    href={item.ctaHref}
                    className={`inline-flex items-center gap-1.5 text-[14px] font-bold ${
                      item.color === 'blue' ? 'text-vs-blue' : 'text-vs-orange'
                    } hover:gap-2.5 transition-all`}
                  >
                    {item.ctaText ?? 'Tìm hiểu thêm'}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection
