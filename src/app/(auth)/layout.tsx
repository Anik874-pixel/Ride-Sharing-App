export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto   ">
        {children}
      </div>
    </div>
  )
}