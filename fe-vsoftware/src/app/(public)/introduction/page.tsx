import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/common/PageHero'
import AiAgentSection from '../_components/AiAgentSection'
import CtaSection from '../_components/CtaSection'
import { getCategoryPosts } from '@/lib/api/public'
import type { Post } from '@/types'
import { AI_AGENT_SLUGS, NEWS_SLUGS } from '@/constants/app.constants'
import { Layers, Bot, RefreshCw, MessagesSquare, BarChart3, Plug, Network, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Giới thiệu ViAI — Phần mềm theo yêu cầu cho SME Việt',
  description:
    'ViAI là công ty phần mềm theo yêu cầu tại Việt Nam. Hơn 5 năm kinh nghiệm, 200+ doanh nghiệp tin dùng, giải pháp AI Agent & Automation.',
}

const STATS = [
  { num: '200+', label: 'Doanh nghiệp đang dùng phần mềm ViAI', color: 'blue' },
  { num: '50+', label: 'Dự án đã hoàn thành & đang vận hành production', color: 'orange' },
  { num: '5+', label: 'Năm kinh nghiệm phát triển phần mềm cho SME Việt', color: 'blue' },
  { num: '98%', label: 'Khách hàng hài lòng sau 3 tháng sử dụng đầu tiên', color: 'orange' },
]

const REASONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Native tiếng Việt',
    desc: 'Phần mềm được xây mới hoàn toàn cho quy trình và ngôn ngữ Việt Nam — không phải bản dịch từ phần mềm ngoại, không lệch chuẩn kế toán, thuế hay thói quen vận hành của doanh nghiệp Việt.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
      </svg>
    ),
    title: 'Giá hợp lý cho SMEs',
    desc: 'Báo giá theo module, dự án nhỏ từ 30 triệu — phù hợp ngân sách doanh nghiệp vừa và nhỏ, không tính phí theo mức enterprise quốc tế.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Triển khai nhanh',
    desc: 'Bàn giao theo từng module trong 4–8 tuần. Bạn dùng được phần đầu trong khi phần sau vẫn đang được xây dựng.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
    title: 'Hỗ trợ người Việt 24/7',
    desc: 'Đội ngũ kỹ thuật người Việt phản hồi qua Zalo, hotline — không rào cản ngôn ngữ, không chờ đợi qua múi giờ khác.',
  },
]

const SOLUTIONS = [
  {
    icon: Bot,
    title: 'AI Agent tự động hỗ trợ vận hành doanh nghiệp',
    desc: 'AI Agent thay nhân viên xử lý các tác vụ lặp đi lặp lại — vận hành doanh nghiệp 24/7 không gián đoạn.',
  },
  {
    icon: RefreshCw,
    title: 'Tự động hoá quy trình (Workflow Automation)',
    desc: 'Số hoá và tự động hoá các luồng công việc nội bộ — duyệt đơn, báo giá, xác nhận, escalate.',
  },
  {
    icon: MessagesSquare,
    title: 'AI chăm sóc khách hàng & marketing',
    desc: 'Trả lời inbox, comment, gửi tin nhắn marketing đa kênh — hiểu ngữ cảnh, tone giọng theo brand.',
  },
  {
    icon: BarChart3,
    title: 'AI hỗ trợ sales, quản lý dữ liệu & vận hành nội bộ',
    desc: 'Phân tích doanh thu, theo dõi KPI, đề xuất tối ưu — biến dữ liệu thô thành insight bán hàng.',
  },
  {
    icon: Plug,
    title: 'Kết nối CRM, phần mềm & hệ thống hiện có',
    desc: 'Tích hợp sẵn với Facebook, Zalo, WordPress, MISA AMIS, Pancake, Haravan, Sapo, KiotViet...',
  },
  {
    icon: Network,
    title: 'Xây dựng hệ thống AI ứng dụng thực tế cho SME Việt',
    desc: 'Giải pháp được đóng gói, tinh chỉnh cho nghiệp vụ doanh nghiệp Việt — không phải tool quốc tế chung chung.',
  },
]

export default async function GioiThieuPage() {
  const aiPostsRes = await getCategoryPosts(AI_AGENT_SLUGS, { limit: 50 }).catch(() => ({ data: [] as Post[] }))
  const newsRes = await getCategoryPosts(NEWS_SLUGS, { limit: 6 }).catch(() => ({ data: [] as Post[] }))

  const productsToDisplay = newsRes.data.map(post => ({
    href: `/tin-tuc/${post.slug}`,
    img: post.thumbnail || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&h=180&q=80',
    alt: post.title,
    tag: post.category?.name || 'Tin tức',
    title: post.title,
    desc: post.excerpt || post.seoDescription || 'Cập nhật kiến thức và xu hướng công nghệ mới nhất từ ViAI.'
  }))

  return (
    <>
      <PageHero
        title="Giới Thiệu ViAI"
        titleEm="Thiệu"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Giới thiệu' }]}
        titleTag="div"
      />

      {/* Intro */}
      <section className="pt-[72px] pb-0 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-4 items-center">
            <div>
              <h1 className="text-[clamp(28px,3.5vw,44px)] font-extrabold text-vs-blue leading-[1.2] mb-6">
                ViAI - Phần mềm AI Agent cho doanh nghiệp Việt
              </h1>
              <div className="text-[16px] text-vs-gray-700 leading-[1.85]">
                <p className="mb-[18px]">ViAI là đơn vị phát triển phần mềm theo yêu cầu thuộc hệ sinh thái <strong>ViTechGroup</strong> — tập đoàn công nghệ tập trung vào chuyển đổi số thực chất cho doanh nghiệp vừa và nhỏ tại Việt Nam.</p>
                <p>Chúng tôi không bán phần mềm đóng hộp. Mỗi sản phẩm được phân tích, thiết kế và xây dựng riêng theo bài toán thực tế của từng khách hàng — từ spa 3 nhân viên đến chuỗi nhà hàng 20 chi nhánh.</p>
              </div>
            </div>
            <div className="relative rounded-[20px] overflow-hidden shadow-vs-lg">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=460&q=80"
                alt="Đội ngũ ViAI"
                width={800}
                height={460}
                className="w-full h-[460px] object-cover"
                unoptimized
                priority
              />
              <div className="absolute bottom-6 left-6 bg-vs-navy/90 backdrop-blur-sm rounded-xl px-5 py-4 text-white">
                <strong className="text-[28px] font-extrabold block leading-none text-vs-orange">2020</strong>
                <span className="text-[13px] text-white/70 mt-1 block">Năm thành lập ViTechGroup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-vs-bg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 text-center shadow-vs border-b-4 hover:-translate-y-1 transition-transform ${s.color === 'blue' ? 'border-vs-blue' : 'border-vs-orange'}`}>
                <div className={`text-[48px] font-extrabold leading-none mb-2 ${s.color === 'blue' ? 'text-vs-blue' : 'text-vs-orange'}`}>{s.num}</div>
                <div className="text-[14px] font-semibold text-vs-gray-600 leading-[1.4]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="text-[15.5px] text-vs-gray-700 leading-[1.85]">
              <p className="mb-5">Năm 2020, đội sáng lập ViTechGroup nhận ra một nghịch lý: thị trường phần mềm Việt không thiếu sản phẩm — nhưng hàng chục nghìn doanh nghiệp vừa và nhỏ vẫn dùng Excel, Zalo và sổ tay. Không phải vì họ không biết công nghệ, mà vì các phần mềm đang có <strong>không vừa vặn với bài toán của họ.</strong></p>
              <h3 className="text-[19px] font-extrabold text-vs-dark my-8 pl-3.5 border-l-4 border-vs-blue">Chúng tôi làm khác</h3>
              <p className="mb-5">ViAI bắt đầu bằng cách ngồi thực tế với từng ngành: quan sát quy trình làm việc, ghi lại điểm đau, đặt câu hỏi &ldquo;nếu không có phần mềm, bạn đang làm bước này như thế nào?&rdquo;. Từ đó thiết kế giải pháp vừa đủ, triển khai nhanh, và quan trọng nhất — nhân viên thực sự dùng được ngay từ ngày đầu.</p>
              <p>Đến nay, ViAI đã triển khai phần mềm cho hơn 200 doanh nghiệp từ spa, phòng khám, nhà hàng đến trung tâm đào tạo và chuỗi bán lẻ đa chi nhánh.</p>
              <blockquote className="border-l-4 border-vs-blue px-6 py-5 bg-vs-blue-light rounded-r-xl mt-6">
                <p className="text-[15px] text-vs-blue-dark font-semibold leading-[1.7] m-0 italic">&ldquo;Bài toán của SME Việt không cần giải pháp enterprise. Cần một phần mềm hiểu đúng nghiệp vụ, triển khai trong 5 ngày, và nhân viên dùng được ngay mà không cần training 3 tháng.&rdquo;</p>
                <cite className="text-[12px] text-vs-blue font-bold block mt-2.5 not-italic uppercase tracking-[0.05em]">— Lê Đức Nam, Founder & CEO ViTechGroup</cite>
              </blockquote>
            </div>
            <div>
              <div className="mb-8">
                <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-vs-dark leading-[1.25]">
                  Từ bài toán thực tế đến <em className="not-italic text-vs-blue">sản phẩm thực chiến</em>
                </h2>
                <p className="text-[16px] text-vs-gray-600 mt-3 leading-[1.65]">
                  ViAI ra đời không phải từ phòng lab — mà từ những lần ngồi cùng chủ doanh nghiệp tìm hiểu vì sao phần mềm cũ không giải quyết được vấn đề của họ.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-vs-md">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=700&h=380&q=80"
                  alt="Team ViAI"
                  width={700}
                  height={380}
                  className="w-full h-[380px] object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons */}
      <section className="py-20 bg-vs-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="w-14 h-14 rounded-2xl bg-vs-orange flex items-center justify-center mx-auto mb-5">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-vs-dark leading-[1.25]">
              4 lý do <em className="not-italic text-vs-blue">SMEs Việt</em> chọn ViAI
            </h2>
            <p className="text-[16px] text-vs-gray-600 mt-3 max-w-[620px] mx-auto leading-[1.65]">Khác biệt thực tế giữa ViAI và các giải pháp khác — không marketing rỗng, có thể kiểm chứng được.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REASONS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-vs hover:shadow-vs-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-vs-navy flex items-center justify-center mb-5">{r.icon}</div>
                <h3 className="text-[17px] font-extrabold text-vs-blue mb-2.5">{r.title}</h3>
                <p className="text-[14px] text-vs-gray-600 leading-[1.7] m-0">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <div className="w-14 h-14 rounded-2xl bg-vs-orange flex items-center justify-center mx-auto mb-5">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-vs-dark leading-[1.25]">
              Chúng tôi cung cấp <em className="not-italic text-vs-blue">các giải pháp</em>
            </h2>
            <p className="text-[16px] text-vs-gray-600 mt-3 max-w-[620px] mx-auto leading-[1.65]">6 nhóm giải pháp AI thực chiến — đóng gói sẵn, triển khai nhanh, đo lường được.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-vs-gray-200 hover:shadow-vs-md hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-vs-orange flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-vs-gray-600 bg-vs-bg px-2.5 py-1 rounded-full">Giải pháp {String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-[16px] font-extrabold text-vs-dark mb-2 leading-[1.4]">{s.title}</h3>
                <p className="text-[14px] text-vs-gray-600 leading-[1.65] m-0">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/ai-agent" className="inline-flex items-center gap-2 bg-vs-orange text-white font-bold text-[14px] px-7 py-3.5 rounded-full hover:bg-vs-orange-dark transition-colors no-underline">
              Khám phá 4 AI Agent của ViAI <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Agent */}
      <AiAgentSection
        aiPosts={aiPostsRes.data}
        config={{
          label: 'AI Agent',
          heading: 'Phần mềm AI Agent -',
          headingEm: 'ViAI',
          description: 'Không phải chatbot trả lời câu hỏi. Đây là nhân viên AI làm việc 24/7 — tích hợp sâu với phần mềm doanh nghiệp.',
        }}
      />

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(24px,3vw,36px)] font-extrabold text-vs-dark leading-[1.25]">
              Tin tức & <em className="not-italic text-vs-blue">kiến thức mới nhất</em>
            </h2>
            <p className="text-[16px] text-vs-gray-600 mt-3 max-w-[560px] mx-auto leading-[1.65]">Cập nhật xu hướng AI, automation và case study thực tế từ ViAI.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsToDisplay.map((p, i) => (
              <Link key={i} href={p.href} className="group bg-white rounded-2xl overflow-hidden shadow-vs hover:border hover:border-vs-blue hover:shadow-vs-md hover:-translate-y-1 transition-all no-underline">
                <div className="relative h-[180px] overflow-hidden">
                  <Image src={p.img} alt={p.alt} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 text-[11px] font-extrabold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full bg-vs-blue text-white">{p.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-[16px] font-extrabold text-vs-dark mb-2 group-hover:text-vs-blue transition-colors">{p.title}</h3>
                  <p className="text-[13.5px] text-vs-gray-600 leading-[1.6] m-0">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        config={{
          heading: 'Sẵn sàng bắt đầu dự án phần mềm của bạn?',
          description: 'Tư vấn miễn phí 30 phút — đội ngũ ViAI phân tích bài toán, đề xuất giải pháp và ước tính chi phí không ràng buộc.',
          ctaPrimaryText: 'Đặt lịch tư vấn miễn phí',
          ctaPrimaryHref: '/lien-he',
          ctaSecondaryText: '💬 Chat Zalo ngay',
          ctaSecondaryHref: 'https://zalo.me/viai',
          note: 'Phản hồi trong vòng 2 giờ làm việc. Không phí tư vấn.',
        }}
      />
    </>
  )
}
