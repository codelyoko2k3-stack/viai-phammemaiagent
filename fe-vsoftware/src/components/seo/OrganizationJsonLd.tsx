import JsonLd from './JsonLd'

interface Props {
  siteUrl: string
  logoUrl: string
  hotline?: string
  email?: string
  address?: string
  socials?: string[]
}

// Organization + WebSite schema cho trang chủ.
// Giúp Google hiển thị logo + thông tin công ty trong Knowledge Panel SERP.
export default function OrganizationJsonLd({ siteUrl, logoUrl, hotline, email, address, socials = [] }: Props) {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ViAI',
      alternateName: 'ViTechGroup',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
        width: 1280,
        height: 906,
      },
      ...(hotline && {
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: hotline,
          contactType: 'customer service',
          areaServed: 'VN',
          availableLanguage: 'Vietnamese',
        },
      }),
      ...(email && { email }),
      ...(address && {
        address: {
          '@type': 'PostalAddress',
          streetAddress: address,
          addressCountry: 'VN',
        },
      }),
      ...(socials.length > 0 && { sameAs: socials }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ViAI',
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/tin-tuc?search={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return <JsonLd data={data as Record<string, unknown>[]} />
}
