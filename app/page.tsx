import { Metadata } from "next"
import { BorderAnimatedCard } from "@/components/animations/card-animations"
import { ParticleBackground } from "components/magic/particle-background"
import { BlurFade } from "components/magicui/blur-fade"
import { MagicCard } from "components/magicui/magic-card"
import { Comparison } from "components/marketing/Comparison/Comparison"
import { Features } from "components/marketing/Features/Features"
import { Footer } from "components/marketing/Footer/Footer"
import { Hero } from "components/marketing/Hero/Hero"
import { Navigation } from "components/marketing/Navigation/Navigation"
import { Pricing } from "components/marketing/Pricing/Pricing"

export const metadata: Metadata = {
  title: "AI Copilot Vibe - Never Hit Token Limits Again",
  description:
    "Email service with GitHub access and daily token resets for developers. Stop hitting limits in Cursor, Copilot & Claude Code. Early access $150/month.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://aicopilotvibe.com/",
    title: "AI Copilot Vibe - Never Hit Token Limits Again",
    description:
      "Email service with GitHub access and daily token resets for developers. Stop hitting limits in Cursor, Copilot & Claude Code. Early access $150/month.",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://aicopilotvibe.com/og-image.png",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Smooth cursor effect */}

      {/* Background particle effect */}
      <ParticleBackground />

      {/* Main content with enhanced animations */}
      <div className="relative z-10">
        <BlurFade delay={0.1}>
          <Navigation />
        </BlurFade>

        <BlurFade delay={0.2}>
          <Hero />
        </BlurFade>

        <BlurFade delay={0.3}>
          <Features />
        </BlurFade>

        <BlurFade delay={0.4}>
          <Comparison />
        </BlurFade>

        <BlurFade delay={0.5}>
          <Pricing />
        </BlurFade>

        {/* Enhanced testimonials section using BorderAnimatedCard */}
        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4">
            <BlurFade delay={0.6}>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold">What Developers Say</h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                  Early access users share their experience with unlimited AI coding
                </p>
              </div>
            </BlurFade>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BlurFade delay={0.7}>
                <BorderAnimatedCard className="h-full">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                      <div>
                        <h4 className="font-semibold">Solo Entrepreneur</h4>
                        <p className="text-muted-foreground text-sm">Independent Developer</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "Finally, no more hitting token limits! The daily reset feature is a game-changer for my
                      productivity."
                    </p>
                  </div>
                </BorderAnimatedCard>
              </BlurFade>

              <BlurFade delay={0.8}>
                <MagicCard className="h-full p-6" gradientFrom="#3b82f6" gradientTo="#8b5cf6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
                      <div>
                        <h4 className="font-semibold">Freelancer</h4>
                        <p className="text-muted-foreground text-sm">Startup Founder</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "The GitHub integration is seamless. I can code without worrying about rate limits anymore."
                    </p>
                  </div>
                </MagicCard>
              </BlurFade>

              <BlurFade delay={0.9}>
                <BorderAnimatedCard className="h-full">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      <div>
                        <h4 className="font-semibold">Tech Consultant</h4>
                        <p className="text-muted-foreground text-sm">Product Manager</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      "Worth every penny! The unlimited access has 10x'd my coding speed and creativity."
                    </p>
                  </div>
                </BorderAnimatedCard>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Enhanced stats section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <BlurFade delay={1.0}>
              <div className="grid gap-6 md:grid-cols-3">
                <MagicCard className="p-8 text-center" gradientOpacity={0.1}>
                  <div className="text-4xl font-bold text-blue-600">100%</div>
                  <div className="text-muted-foreground mt-2">Unlimited Access</div>
                  <div className="text-muted-foreground mt-1 text-sm">No token restrictions</div>
                </MagicCard>

                <MagicCard className="p-8 text-center" gradientOpacity={0.1}>
                  <div className="text-4xl font-bold text-purple-600">24h</div>
                  <div className="text-muted-foreground mt-2">Setup Time</div>
                  <div className="text-muted-foreground mt-1 text-sm">Quick deployment</div>
                </MagicCard>

                <MagicCard className="p-8 text-center" gradientOpacity={0.1}>
                  <div className="text-4xl font-bold text-green-600">Daily</div>
                  <div className="text-muted-foreground mt-2">Token Reset</div>
                  <div className="text-muted-foreground mt-1 text-sm">Fresh start every day</div>
                </MagicCard>
              </div>
            </BlurFade>
          </div>
        </section>

        <BlurFade delay={1.1}>
          <Footer />
        </BlurFade>
      </div>
    </div>
  )
}
