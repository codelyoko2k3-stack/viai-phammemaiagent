import JsonLd from './JsonLd'

interface Props {
  name: string
  description?: string | null
  url: string
  imageUrl?: string | null
  providerName?: string
}

// Service schema — giúp Google hiểu đây là trang dịch vụ/sản phẩm của doanh nghiệp
export default function ServiceJsonLd({ name, description, url, imageUrl, providerName = 'ViAI' }: Props) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    url,
    provider: { '@type': 'Organization', name: providerName },
    ...(description && { description }),
    ...(imageUrl && { image: imageUrl }),
    areaServed: { '@type': 'Country', name: 'Vietnam' },
    availableLanguage: 'Vietnamese',
  }
  return <JsonLd data={data} />
}
