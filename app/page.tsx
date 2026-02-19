import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Examples } from "@/components/landing/examples"
import { SocialProof } from "@/components/landing/social-proof"
import { Pricing } from "@/components/landing/pricing"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Examples />
        <SocialProof />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
