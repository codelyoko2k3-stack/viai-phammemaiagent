/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bật standalone build cho Docker — Next sẽ tạo .next/standalone với mọi dependency cần thiết.
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'http', hostname: '192.168.1.18' },
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'api.viai.vn' },
      { protocol: 'https', hostname: 'viai.vn' },
    ],
  },
  // Slug cũ chứa "vsoftware" đã đổi sang "viai" khi rebrand — redirect 308 để giữ SEO/link cũ.
  async redirects() {
    return [
      { source: '/tin-tuc/case-study-crm-vsoftware-giup-cong-ty-bds-chot-deal-nhanh-3x', destination: '/tin-tuc/case-study-crm-viai-giup-cong-ty-bds-chot-deal-nhanh-3x', permanent: true },
      { source: '/tin-tuc/huong-dan-thiet-lap-crm-vsoftware-tu-a-z-trong-30-phut', destination: '/tin-tuc/huong-dan-thiet-lap-crm-viai-tu-a-z-trong-30-phut', permanent: true },
      { source: '/tin-tuc/cach-ket-noi-zalo-oa-voi-vsoftware-de-tu-dong-gui-tin-nhan', destination: '/tin-tuc/cach-ket-noi-zalo-oa-voi-viai-de-tu-dong-gui-tin-nhan', permanent: true },
      { source: '/tin-tuc/huong-dan-tao-workflow-tu-dong-dau-tien-trong-vsoftware-automation', destination: '/tin-tuc/huong-dan-tao-workflow-tu-dong-dau-tien-trong-viai-automation', permanent: true },
      { source: '/tin-tuc/tich-hop-vsoftware-voi-misa-amis-dong-bo-ke-toan-ban-hang', destination: '/tin-tuc/tich-hop-viai-voi-misa-amis-dong-bo-ke-toan-ban-hang', permanent: true },
    ]
  },
}

export default nextConfig
