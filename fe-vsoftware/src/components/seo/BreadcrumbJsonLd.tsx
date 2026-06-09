import JsonLd from './JsonLd'

interface Item { label: string; href: string }

// BreadcrumbList schema — giúp Google hiện đường dẫn dạng "Trang chủ > Dịch vụ > Tên dịch vụ" ngay trên SERP
export default function BreadcrumbJsonLd({ items, siteUrl }: { items: Item[]; siteUrl: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  }
  return <JsonLd data={data} />
}
