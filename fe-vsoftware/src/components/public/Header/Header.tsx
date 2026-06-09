import { getCategories, getCategoryPosts, getNavMenu, getFooterConfig } from '@/lib/api/public'
import { AI_AGENT_SLUGS, SERVICES_SLUGS, NEWS_SLUGS } from '@/constants/app.constants'
import HeaderClient from './HeaderClient'
import type { Category } from '@/types'

const Header = async () => {
  const [menuRes, aiAgentRes, servicesRes, newsRes, categoriesRes, footerRes] = await Promise.all([
    getNavMenu().catch(() => ({ data: null })),
    getCategoryPosts(AI_AGENT_SLUGS, { limit: 100 }).catch(() => ({ data: [] })),
    getCategoryPosts(SERVICES_SLUGS, { limit: 100 }).catch(() => ({ data: [] })),
    getCategoryPosts(NEWS_SLUGS, { limit: 8 }).catch(() => ({ data: [] })),
    getCategories().catch(() => ({ data: [] as Category[] })),
    getFooterConfig().catch(() => ({ data: null })),
  ])
  const menuData = menuRes?.data?.items ?? []
  const aiAgentPosts = aiAgentRes?.data ?? []
  const servicesPosts = servicesRes?.data ?? []
  const newsPosts = newsRes?.data ?? []
  const logoUrl = footerRes?.data?.brand?.logoUrl ?? null
  const logoAlt = footerRes?.data?.brand?.logoAlt ?? null

  // Sub-categories của "Tin tức"
  const allCats = categoriesRes?.data ?? []
  const tinTucCat = allCats.find((c) => c.slug === NEWS_SLUGS)
  const newsSubCategories =
    tinTucCat?.children && tinTucCat.children.length > 0
      ? tinTucCat.children
      : allCats.filter((c) => c.parentId === tinTucCat?.id)

  return (
    <HeaderClient
      menuData={menuData}
      aiAgentPosts={aiAgentPosts}
      servicesPosts={servicesPosts}
      newsPosts={newsPosts}
      newsSubCategories={newsSubCategories}
      logoUrl={logoUrl}
      logoAlt={logoAlt}
    />
  )
}

export default Header
