"use client"

import { ButtonHover } from "@/components/animations/button-hover"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { AnimatedList } from "@/components/magicui/animated-list"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { PulsatingButton } from "@/components/magicui/pulsating-button"
import { ShineBorder } from "@/components/magicui/shine-border"
import { TextAnimate } from "@/components/magicui/text-animate"
import { MagicCard } from "../../magicui/magic-card"

const pricingPlans = [
  {
    name: "GitHub Access + Token Reset",
    description: "Email service with GitHub access and unlimited daily token resets",
    price: 150,
    originalPrice: 899,
    features: [
      "GitHub Access Included",
      "Daily Token Resets",
      "No Token Limits",
      "24-Hour Setup Process",
      "Email Delivery",
      "Limited Users Only",
      "No Social Media Presence",
    ],
    cta: "Get Early Access",
    popular: true,
    color: "gradient",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            delay={0.5}
            duration={1.5}
            className="text-foreground mb-6 text-4xl font-bold md:text-5xl"
          >
            Early Access
          </TextAnimate>
          <AnimatedGradientText
            className="pb-2 text-4xl font-bold md:text-5xl"
            colorFrom="#3b82f6"
            colorTo="#8b5cf6"
            speed={2}
          >
            Pricing
          </AnimatedGradientText>
          <TextAnimate
            animation="fadeIn"
            by="word"
            delay={1.5}
            duration={1.2}
            className="text-muted-foreground mx-auto mt-6 max-w-3xl text-xl"
          >
            Limited users only. GitHub access with daily token resets. No trial, no refund, no guarantee.
          </TextAnimate>
        </div>

        {/* Pricing Cards */}
        <AnimatedList
          className="mx-auto mb-16 grid max-w-md grid-cols-1 gap-8"
          delay={0.8}
          stagger={0.4}
          animation="slideUp"
        >
          {pricingPlans.map((plan, index) => (
            <MagicCard key={plan.name} className="relative">
              <ShineBorder
                className="h-full"
                shineColor={plan.popular ? ["#8b5cf6", "#a855f7"] : ["#e5e7eb", "#d1d5db"]}
                borderWidth={plan.popular ? 2 : 1}
                duration={plan.popular ? 15 : 20}
              >
                <div className="bg-card/50 flex h-full flex-col rounded-xl p-8 backdrop-blur-sm">
                  <div className="mb-8 text-center">
                    <h3 className="text-foreground mb-2 text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground mb-6 text-sm">{plan.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-foreground text-4xl font-bold">
                          <NumberTicker value={plan.price} prefix="$" delay={1.5 + index * 0.4} />
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-muted-foreground text-sm line-through">${plan.originalPrice}</span>
                        <span className="text-sm font-medium text-green-600">
                          Save {Math.round((1 - plan.price / plan.originalPrice) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 flex-1">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    {plan.color === "gradient" ? (
                      <PulsatingButton
                        className="w-full py-3 text-lg font-semibold"
                        onClick={() => (window.location.href = "/sign-up")}
                      >
                        {plan.cta}
                      </PulsatingButton>
                    ) : plan.popular ? (
                      <PulsatingButton
                        className="w-full py-3 text-lg font-semibold"
                        pulseColor="139, 92, 246"
                        duration="2s"
                        onClick={() => (window.location.href = "/sign-up")}
                      >
                        {plan.cta}
                      </PulsatingButton>
                    ) : (
                      <ButtonHover
                        variant="slide"
                        className="border-border text-foreground bg-background w-full rounded-lg border-2 py-3 text-lg font-semibold transition-all duration-300 hover:text-white"
                      >
                        {plan.cta}
                      </ButtonHover>
                    )}
                  </div>
                </div>
              </ShineBorder>
            </MagicCard>
          ))}
        </AnimatedList>

        {/* Service Disclaimer */}
        <div className="text-center">
          <TextAnimate animation="fadeIn" delay={2} className="text-muted-foreground mb-6">
            Early access for developers - Limited users only
          </TextAnimate>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="text-muted-foreground text-lg font-medium">24-hour setup</div>
            <div className="text-muted-foreground text-lg font-medium">No trial</div>
            <div className="text-muted-foreground text-lg font-medium">No refund</div>
            <div className="text-muted-foreground text-lg font-medium">No guarantee</div>
          </div>
        </div>

        {/* Service Policy */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-orange-500/10 px-6 py-3 text-orange-600">
            <svg className="mr-2 hidden h-5 w-5 md:flex" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">No refund policy - Purchase at your own risk</span>
          </div>
        </div>
      </div>
    </section>
  )
}
