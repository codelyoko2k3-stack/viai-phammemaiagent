import type { Metadata } from 'next'
import PageHero from '@/components/common/PageHero'

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng — ViAI',
  description:
    'Điều khoản sử dụng dịch vụ và website ViAI: quyền, nghĩa vụ của khách hàng và trách nhiệm của ViAI.',
}

const SECTIONS = [
  {
    title: '1. Chấp nhận điều khoản',
    body: `Khi truy cập và sử dụng website cũng như các dịch vụ của ViAI, quý khách đồng ý tuân thủ các điều khoản sử dụng được nêu dưới đây. Nếu không đồng ý với bất kỳ nội dung nào, quý khách vui lòng ngừng sử dụng website và dịch vụ.`,
  },
  {
    title: '2. Phạm vi dịch vụ',
    body: `ViAI cung cấp các giải pháp phần mềm theo yêu cầu, sản phẩm AI Agent & Automation, tư vấn và triển khai chuyển đổi số cho doanh nghiệp SME. Nội dung, tính năng, báo giá hiển thị trên website mang tính chất giới thiệu và có thể được điều chỉnh theo từng dự án cụ thể, được thống nhất bằng hợp đồng/báo giá riêng giữa hai bên.`,
  },
  {
    title: '3. Quyền và nghĩa vụ của khách hàng',
    body: `Khách hàng cam kết cung cấp thông tin chính xác khi đăng ký tư vấn hoặc ký kết hợp đồng; sử dụng sản phẩm/dịch vụ đúng mục đích, đúng phạm vi đã thoả thuận; không sao chép, phân phối lại mã nguồn, tài liệu hoặc sản phẩm của ViAI khi chưa có sự cho phép bằng văn bản.`,
  },
  {
    title: '4. Quyền sở hữu trí tuệ',
    body: `Toàn bộ nội dung trên website (văn bản, hình ảnh, logo, giao diện, mã nguồn nền tảng) thuộc quyền sở hữu của ViAI/ViTechGroup hoặc các đối tác được cấp phép. Mọi hành vi sao chép, sử dụng lại nhằm mục đích thương mại khi chưa được sự đồng ý đều vi phạm điều khoản sử dụng.`,
  },
  {
    title: '5. Giới hạn trách nhiệm',
    body: `ViAI nỗ lực đảm bảo thông tin trên website chính xác và được cập nhật thường xuyên, tuy nhiên không đảm bảo website hoạt động liên tục, không có lỗi hoặc không bị gián đoạn do các yếu tố khách quan (hạ tầng mạng, bảo trì hệ thống, sự cố bất khả kháng...). Trách nhiệm cụ thể đối với từng dịch vụ/sản phẩm được quy định chi tiết trong hợp đồng tương ứng.`,
  },
  {
    title: '6. Thay đổi điều khoản',
    body: `ViAI có thể cập nhật, điều chỉnh điều khoản sử dụng này theo từng thời kỳ để phù hợp với hoạt động thực tế và quy định pháp luật. Phiên bản mới nhất sẽ được đăng tải trên website và có hiệu lực kể từ thời điểm công bố.`,
  },
  {
    title: '7. Liên hệ',
    body: `Mọi thắc mắc liên quan đến điều khoản sử dụng, quý khách vui lòng liên hệ ViAI qua trang Liên hệ hoặc Zalo OA chính thức để được hỗ trợ và giải đáp.`,
  },
]

export default function DieuKhoanSuDungPage() {
  return (
    <>
      <PageHero
        title="Điều khoản sử dụng"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Điều khoản sử dụng' }]}
      />
      <div className="container mx-auto px-6 py-14 max-w-3xl">
        <p className="text-[15px] text-gray-500 leading-relaxed mb-10">
          Điều khoản sử dụng dưới đây áp dụng cho mọi cá nhân, tổ chức truy cập và sử dụng website cũng như dịch vụ
          do ViAI cung cấp. Vui lòng đọc kỹ trước khi sử dụng.
        </p>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-[17px] font-extrabold text-[#1A1A1A] mb-2">{s.title}</h2>
              <p className="text-[14.5px] text-gray-600 leading-[1.8]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
