import Navigation from '@/components/common/Navigation'
import DashboardWrapper from './DashboardWrapper'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <DashboardWrapper>
      <Navigation />
      <main>
        {children}
      </main>
      </DashboardWrapper>
    </div>
  )
}