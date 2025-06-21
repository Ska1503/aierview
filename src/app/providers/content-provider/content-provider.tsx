import { FC, PropsWithChildren } from 'react'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/features/sidebar'
import { getQueryClient } from '@/shared/api'
import { PageWrapper } from '@/shared/ui'

const ContentProvider: FC<PropsWithChildren> = async ({ children }) => {
  const queryClient = getQueryClient()

  return (
    <div className="flex">
      <Sidebar />
      <PageWrapper>
        <Header />
        <main className="main">{children}</main>
      </PageWrapper>
    </div>
  )
}
export default ContentProvider
