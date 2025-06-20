import { Metadata } from 'next'
import ListLayout from '@/layouts/ListLayout'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import { compareDesc } from 'date-fns'

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return genPageMetadata({
    title: 'Blog',
    params: { locale },
  })
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  const { t } = await createTranslation(locale, 'home')
  const posts = allBlogs.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  const filteredPosts = posts.filter((post) => post.language === locale)

  return <ListLayout params={{ locale }} posts={filteredPosts} title={t('all')} />
}
