import { FC, PropsWithChildren } from 'react'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { getQueryClient } from '@/shared/api'

const ContentProvider: FC<PropsWithChildren> = async ({ children }) => {
  const queryClient = getQueryClient()

  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  )
}
export default ContentProvider
