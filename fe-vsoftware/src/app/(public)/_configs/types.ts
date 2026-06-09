import type { ReactNode } from 'react'

export type CTA = {
  label: string
  href: string
  variant: 'ghost' | 'solid'
}

export type Plan = {
  name: string
  sub: string
  price: string
  period: string
  features: Array<string | ReactNode>
  cta: CTA
  badge?: string
  featured?: boolean
}

export type PainCard = {
  color: 'blue' | 'orange'
  icon: ReactNode
  title: string
  desc: string
}

export type ServiceCard = {
  icon: string
  color: 'blue' | 'orange'
  title: string
  desc: string
  tags: string[]
  href: string
  badge?: string
  imageSrc?: string
}

export type AiCard = {
  icon: ReactNode
  color: 'blue' | 'orange' | 'featured'
  badge?: string
  title: string
  desc: string
  checks: string[]
  href: string
}

export type WhyItem = {
  icon: string
  color: 'blue' | 'orange'
  title: string
  desc: string
}

export type WhyStat = {
  num: string
  label: string
}