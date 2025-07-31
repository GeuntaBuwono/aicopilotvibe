"use client"

import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { AnimatedList } from "@/components/magicui/animated-list"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { ShineBorder } from "@/components/magicui/shine-border"
import { TextAnimate } from "@/components/magicui/text-animate"
import { CheckoutButton, SecureCheckoutButton } from "@/components/payment/CheckoutButton"
import { PRICING_PLANS } from "@/mock/products"
import { MagicCard } from "../../magicui/magic-card"

const pricingPlans = PRICING_PLANS

export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32">
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
            Limited users only. GitHub access with daily token resets for developers.
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
                          <NumberTicker
                            startValue={plan.originalPrice}
                            value={plan.price}
                            prefix="$"
                            delay={1.5 + index * 0.4}
                          />
                        </span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-muted-foreground text-sm line-through">${plan.originalPrice}</span>
                        <span className="text-sm font-medium text-green-600">Save {plan.discountPercentage}%</span>
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
                      <SecureCheckoutButton className="w-full py-3 text-lg font-semibold">
                        {plan.cta}
                      </SecureCheckoutButton>
                    ) : plan.popular ? (
                      <CheckoutButton className="w-full py-3 text-lg font-semibold">{plan.cta}</CheckoutButton>
                    ) : (
                      <CheckoutButton className="w-full py-3 text-lg font-semibold">{plan.cta}</CheckoutButton>
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
            <div className="text-muted-foreground text-lg font-medium">Limited availability</div>
            <div className="text-muted-foreground text-lg font-medium">Early access</div>
          </div>
        </div>

        {/* Service Policy */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-blue-500/10 px-6 py-3 text-blue-600">
            <svg className="mr-2 hidden h-5 w-5 md:flex" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M13 2a1 1 0 011 1v8.93l.707-.707a1 1 0 011.414 1.414l-2.5 2.5a1 1 0 01-1.414 0l-2.5-2.5a1 1 0 111.414-1.414l.707.707V3a1 1 0 011-1zm-7 2a1 1 0 00-1 1v8.93l-.707-.707a1 1 0 00-1.414 1.414l2.5 2.5a1 1 0 001.414 0l2.5-2.5a1 1 0 10-1.414-1.414L6 13.93V5a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">Questions? Check our FAQ section below</span>
          </div>
        </div>
      </div>
    </section>
  )
}
