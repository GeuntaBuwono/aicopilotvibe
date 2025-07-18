import { Footer } from "components/marketing/Footer/Footer"
import { Navigation } from "components/marketing/Navigation/Navigation"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <main className="container mx-auto max-w-4xl px-4 py-16">{children}</main>
      <Footer />
    </div>
  )
}
