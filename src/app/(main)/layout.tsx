import { type Metadata } from 'next'

import { Providers } from '@/app/(main)/providers'
import { Layout } from '@/components/Layout'
import { getNavigation } from '@/lib/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s - Docs',
    default: 'CacheAdvance - Never miss the cache again.',
  },
  description:
    'Cache every single thing your app could ever do ahead of time, so your code never even has to run at all.',
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigation = await getNavigation()

  return (
    <div className="flex min-h-full bg-white dark:bg-slate-900">
      <Providers>
        <Layout navigation={navigation}>{children}</Layout>
      </Providers>
    </div>
  )
}
