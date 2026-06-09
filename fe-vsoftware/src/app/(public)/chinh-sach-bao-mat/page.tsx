import type { Metadata } from 'next'
import PageHero from '@/components/common/PageHero'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật — ViAI',
  description:
    'Chính sách bảo mật thông tin của ViAI: cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu khách hàng.',
}

const SECTIONS = [
  {
    title: '1. Mục đích thu thập thông tin',
    body: `ViAI thu thập thông tin (họ tên, số điện thoại, email, tên doanh nghiệp...) khi quý khách chủ động để lại qua form liên hệ, đăng ký tư vấn, hoặc trao đổi trực tiếp với đội ngũ tư vấn. Thông tin này chỉ được dùng để: liên hệ tư vấn giải pháp phù hợp, gửi báo giá/demo theo yêu cầu, và cải thiện chất lượng dịch vụ.`,
  },
  {
    title: '2. Phạm vi sử dụng thông tin',
    body: `Chúng tôi không bán, trao đổi hay cho thuê thông tin cá nhân của khách hàng cho bên thứ ba vì mục đích thương mại. Thông tin chỉ được chia sẻ nội bộ giữa các bộ phận liên quan (kinh doanh, kỹ thuật, chăm sóc khách hàng) để phục vụ đúng yêu cầu của quý khách, hoặc khi pháp luật yêu cầu.`,
  },
  {
    title: '3. Thời gian lưu trữ thông tin',
    body: `Dữ liệu được lưu trữ trên hệ thống của ViAI cho đến khi quý khách có yêu cầu hủy bỏ. Trong mọi trường hợp, thông tin cá nhân sẽ được bảo mật trên máy chủ và không tự ý cung cấp cho bên thứ ba khi chưa có sự đồng ý.`,
  },
  {
    title: '4. Cam kết bảo mật thông tin',
    body: `ViAI áp dụng các biện pháp kỹ thuật và quản lý phù hợp (mã hóa kết nối, phân quyền truy cập, sao lưu định kỳ) nhằm bảo vệ thông tin khách hàng khỏi truy cập, sử dụng hoặc tiết lộ trái phép. Mọi nhân sự tiếp cận dữ liệu khách hàng đều có trách nhiệm bảo mật theo quy định nội bộ.`,
  },
  {
    title: '5. Quyền của khách hàng',
    body: `Quý khách có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân đã cung cấp cho ViAI bất kỳ lúc nào bằng cách liên hệ qua thông tin bên dưới. Chúng tôi sẽ phản hồi và xử lý yêu cầu trong thời gian sớm nhất.`,
  },
  {
    title: '6. Liên hệ',
    body: `Nếu có thắc mắc liên quan đến chính sách bảo mật này, quý khách vui lòng liên hệ ViAI qua trang Liên hệ hoặc Zalo OA chính thức để được hỗ trợ.`,
  },
]

export default function ChinhSachBaoMatPage() {
  return (
    <>
      <PageHero
        title="Chính sách bảo mật"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Chính sách bảo mật' }]}
      />
      <div className="container mx-auto px-6 py-14 max-w-3xl">
        <p className="text-[15px] text-gray-500 leading-relaxed mb-10">
          ViAI tôn trọng và cam kết bảo vệ quyền riêng tư của khách hàng. Chính sách dưới đây giải thích cách
          chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân khi quý khách truy cập và sử dụng dịch vụ của chúng tôi.
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
