"use client"

import { Check, X } from "lucide-react"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { BlurFade } from "@/components/magicui/blur-fade"
import { MagicCard } from "@/components/magicui/magic-card"
import { ShineBorder } from "@/components/magicui/shine-border"
import { Badge } from "@/components/ui/badge"

const comparisonData = [
  {
    tool: "GitHub Copilot",
    tokenLimits: "Limited suggestions per month",
    price: "$10/month",
    githubAccess: false,
    dailyReset: false,
    limitations: "Hit limits with heavy usage",
    features: [
      { name: "Code suggestions", available: true },
      { name: "GitHub integration", available: false },
      { name: "Unlimited tokens", available: false },
      { name: "Daily reset", available: false },
    ],
  },
  {
    tool: "Cursor",
    tokenLimits: "Usage caps and rate limits",
    price: "$20/month",
    githubAccess: false,
    dailyReset: false,
    limitations: "Frustrating token restrictions",
    features: [
      { name: "Code suggestions", available: true },
      { name: "GitHub integration", available: false },
      { name: "Unlimited tokens", available: false },
      { name: "Daily reset", available: false },
    ],
  },
  {
    tool: "Claude Code",
    tokenLimits: "Strict rate limiting",
    price: "$20/month",
    githubAccess: false,
    dailyReset: false,
    limitations: "Frequent blocking",
    features: [
      { name: "Code suggestions", available: true },
      { name: "GitHub integration", available: false },
      { name: "Unlimited tokens", available: false },
      { name: "Daily reset", available: false },
    ],
  },
  {
    tool: "AI Copilot Vibe",
    tokenLimits: "Unlimited with daily resets",
    price: "$150/month",
    githubAccess: true,
    dailyReset: true,
    limitations: "No token limits ever",
    features: [
      { name: "Code suggestions", available: true },
      { name: "GitHub integration", available: true },
      { name: "Unlimited tokens", available: true },
      { name: "Daily reset", available: true },
    ],
    highlighted: true,
  },
]

export function Comparison() {
  return (
    <section id="comparison" className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.2} className="mb-16 text-center">
          <AnimatedGradientText
            className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl"
            colorFrom="#3b82f6"
            colorTo="#8b5cf6"
            speed={1.2}
          >
            Why Choose Our Service?
          </AnimatedGradientText>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed">
            Compare our unlimited AI coding assistant with other popular tools in the market
          </p>
        </BlurFade>

        {/* Mobile-first card layout */}
        <div className="space-y-6 lg:hidden">
          {comparisonData.map((item, index) => (
            <BlurFade key={index} delay={0.4 + index * 0.1}>
              {item.highlighted ? (
                <ShineBorder className="p-0" shineColor={["#3b82f6", "#8b5cf6", "#3b82f6"]} duration={3}>
                  <MagicCard className="p-6" gradientFrom="#3b82f6" gradientTo="#8b5cf6" gradientOpacity={0.1}>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{item.tool}</h3>
                      <Badge variant="default" className="bg-primary text-primary-foreground">
                        Recommended
                      </Badge>
                    </div>
                    <ComparisonCardContent item={item} />
                  </MagicCard>
                </ShineBorder>
              ) : (
                <MagicCard className="p-6" gradientOpacity={0.05}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{item.tool}</h3>
                  </div>
                  <ComparisonCardContent item={item} />
                </MagicCard>
              )}
            </BlurFade>
          ))}
        </div>

        {/* Desktop enhanced layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {comparisonData.map((item, index) => (
              <BlurFade key={index} delay={0.4 + index * 0.1}>
                {item.highlighted ? (
                  <ShineBorder className="h-full p-0" shineColor={["#3b82f6", "#8b5cf6", "#3b82f6"]} duration={3}>
                    <MagicCard
                      className="flex h-full flex-col p-6"
                      gradientFrom="#3b82f6"
                      gradientTo="#8b5cf6"
                      gradientOpacity={0.1}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{item.tool}</h3>
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          Best
                        </Badge>
                      </div>
                      <ComparisonCardContent item={item} />
                    </MagicCard>
                  </ShineBorder>
                ) : (
                  <MagicCard className="flex h-full flex-col p-6" gradientOpacity={0.05}>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold">{item.tool}</h3>
                    </div>
                    <ComparisonCardContent item={item} />
                  </MagicCard>
                )}
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <BlurFade delay={0.8} className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8">
            <h3 className="mb-4 text-2xl font-bold">Ready to never hit token limits again?</h3>
            <p className="text-muted-foreground mb-6">
              Join our exclusive early access program and get unlimited AI coding assistance
            </p>
            <ShineBorder shineColor={["#3b82f6", "#8b5cf6"]} className="inline-block">
              <button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-600">
                Get Early Access - $150/month
              </button>
            </ShineBorder>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}

function ComparisonCardContent({ item }: { item: (typeof comparisonData)[0] }) {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <span className="text-muted-foreground text-sm font-medium">Price</span>
        <span className="text-2xl font-bold">{item.price}</span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-muted-foreground text-sm font-medium">Token Limits</span>
        <span className="text-sm">{item.tokenLimits}</span>
      </div>

      <div className="flex flex-col space-y-3">
        <span className="text-muted-foreground text-sm font-medium">Features</span>
        <div className="space-y-2">
          {item.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              {feature.available ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">{feature.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-muted-foreground text-sm font-medium">GitHub Access</span>
        <span className="text-sm">
          {item.githubAccess ? (
            <Badge variant="default" className="bg-green-500 text-white">
              Full Access
            </Badge>
          ) : (
            <Badge variant="secondary">No Access</Badge>
          )}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-muted-foreground text-sm font-medium">Daily Reset</span>
        <span className="text-sm">
          {item.dailyReset ? (
            <Badge variant="default" className="bg-green-500 text-white">
              Every 24 hours
            </Badge>
          ) : (
            <Badge variant="secondary">No Reset</Badge>
          )}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-muted-foreground text-sm font-medium">Limitations</span>
        <span className="text-sm">{item.limitations}</span>
      </div>
    </div>
  )
}
