import Link from "next/link"
import { SignInForm } from "@/components/auth/sign-in-form"
import { ParticleBackground } from "@/components/magic/particle-background"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"
import { ShineBorder } from "@/components/magicui/shine-border"

export default function SignInPage() {
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
                Welcome Back
              </AnimatedGradientText>
              <p className="text-muted-foreground text-lg">Sign in to your AI Copilot Vibe account</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Or{" "}
                <Link href="/sign-up" className="font-medium text-blue-600 transition-colors hover:text-blue-500">
                  create a new account
                </Link>
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <ShineBorder className="p-0" shineColor={["#3b82f6", "#8b5cf6", "#3b82f6"]} duration={4}>
              <MagicCard className="p-8" gradientFrom="#3b82f6" gradientTo="#8b5cf6" gradientOpacity={0.05}>
                <SignInForm />

                <BlurFade delay={0.7}>
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="border-muted-foreground/20 w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-background text-muted-foreground px-4">New to AI Copilot Vibe?</span>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Link
                        href="/sign-up"
                        className="inline-flex items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/5 px-6 py-2 text-sm font-medium text-blue-600 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/10"
                      >
                        Create your account
                      </Link>
                    </div>
                  </div>
                </BlurFade>
              </MagicCard>
            </ShineBorder>
          </div>
        </BlurFade>

        {/* Additional info section */}
        <BlurFade delay={0.8}>
          <div className="mt-8 text-center">
            <div className="text-muted-foreground text-sm">
              <p>Secure authentication with daily token resets</p>
              <div className="mt-2 flex items-center justify-center space-x-4 text-xs">
                <span className="flex items-center">
                  <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                  24h Setup
                </span>
                <span className="flex items-center">
                  <div className="mr-1 h-2 w-2 rounded-full bg-blue-500"></div>
                  Unlimited Access
                </span>
                <span className="flex items-center">
                  <div className="mr-1 h-2 w-2 rounded-full bg-purple-500"></div>
                  Daily Reset
                </span>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </div>
  )
}
