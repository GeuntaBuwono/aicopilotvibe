import { Check } from "lucide-react"
import Link from "next/link"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { ParticleBackground } from "@/components/magic/particle-background"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"
import { ShineBorder } from "@/components/magicui/shine-border"
import { Badge } from "@/components/ui/badge"
import { PRODUCT_PRICE } from "@/mock/pricing"

export default function SignUpPage() {
  return (
    <div className="from-background via-background to-muted/20 relative min-h-screen bg-gradient-to-br">
      {/* Background effects */}
      <ParticleBackground />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 opacity-40 blur-3xl"></div>
        <div className="absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/5 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 animate-pulse rounded-full bg-indigo-500/5 opacity-40 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <BlurFade delay={0.1}>
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
              <AnimatedGradientText
                className="mb-4 text-4xl font-bold"
                colorFrom="#3b82f6"
                colorTo="#8b5cf6"
                speed={1.5}
              >
                Join AI Copilot Vibe
              </AnimatedGradientText>
              <p className="text-muted-foreground mb-4 text-lg">Create your account for unlimited AI coding</p>

              {/* Benefits badges */}
              <div className="mb-4 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="border-blue-500/20 bg-blue-500/10 text-blue-600">
                  <Check className="mr-1 h-3 w-3" />
                  Daily Reset
                </Badge>
                <Badge variant="secondary" className="border-purple-500/20 bg-purple-500/10 text-purple-600">
                  <Check className="mr-1 h-3 w-3" />
                  Unlimited Tokens
                </Badge>
                <Badge variant="secondary" className="border-green-500/20 bg-green-500/10 text-green-600">
                  <Check className="mr-1 h-3 w-3" />
                  GitHub Access
                </Badge>
              </div>

              <p className="text-muted-foreground mt-2 text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <ShineBorder className="p-0" shineColor={["#3b82f6", "#8b5cf6", "#3b82f6"]} duration={4}>
              <MagicCard className="p-8" gradientFrom="#3b82f6" gradientTo="#8b5cf6" gradientOpacity={0.05}>
                <SignUpForm />

                <BlurFade delay={0.8}>
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="border-muted-foreground/20 w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-background text-muted-foreground px-4">Already have an account?</span>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Link
                        href="/sign-in"
                        className="inline-flex items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/5 px-6 py-2 text-sm font-medium text-blue-600 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10"
                      >
                        Sign in instead
                      </Link>
                    </div>
                  </div>
                </BlurFade>

                <BlurFade delay={0.9}>
                  <div className="mt-8">
                    <div className="text-muted-foreground text-center text-xs">
                      By creating an account, you agree to our{" "}
                      <Link href="/terms" className="text-blue-600 transition-colors hover:text-blue-500">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 transition-colors hover:text-blue-500">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </BlurFade>
              </MagicCard>
            </ShineBorder>
          </div>
        </BlurFade>

        {/* Pricing reminder */}
        <BlurFade delay={1.0}>
          <div className="mt-8 text-center">
            <MagicCard className="mx-auto max-w-md p-6" gradientOpacity={0.1}>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Early Access Pricing</h3>
                <div className="text-3xl font-bold text-blue-600">${PRODUCT_PRICE}/month</div>
                <p className="text-muted-foreground text-sm">Limited time offer • 24h setup • Early access</p>
                <div className="text-muted-foreground flex justify-center space-x-4 text-xs">
                  <span className="flex items-center">
                    <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                    Unlimited tokens
                  </span>
                  <span className="flex items-center">
                    <div className="mr-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    Daily reset
                  </span>
                </div>
              </div>
            </MagicCard>
          </div>
        </BlurFade>
      </div>
    </div>
  )
}
