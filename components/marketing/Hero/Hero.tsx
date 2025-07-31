"use client"

import Link from "next/link"
import { PulseButton } from "@/components/animations/button-hover"
import { FloatingElements } from "@/components/magic/interactive-elements"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { TextAnimate } from "@/components/magicui/text-animate"
import { PRODUCT_PRICE } from "@/mock/pricing"

export function Hero() {
  return (
    <section className="from-background via-background to-background relative overflow-hidden">
      {/* Enhanced Background decorations */}
      <FloatingElements count={8} className="opacity-30" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 opacity-40 mix-blend-multiply blur-3xl filter"></div>
        <div className="animation-delay-1000 absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 opacity-40 mix-blend-multiply blur-3xl filter"></div>
        <div className="animation-delay-2000 absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 transform animate-pulse rounded-full bg-indigo-500/10 opacity-40 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32 lg:pb-0">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="bg-primary/10 text-primary mb-8 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Early Access - Limited Users
          </div>

          {/* Main animated heading */}
          <div className="mb-8">
            <TextAnimate
              animation="slideUp"
              by="word"
              delay={0.8}
              duration={1.5}
              className="text-foreground text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
            >
              Never Hit Token Limits
            </TextAnimate>

            <div className="mt-4">
              <AnimatedGradientText
                className="pb-5 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
                colorFrom="#3b82f6"
                colorTo="#8b5cf6"
                speed={1.5}
              >
                Again
              </AnimatedGradientText>
            </div>
          </div>

          {/* Animated subheading */}
          <TextAnimate
            animation="fadeIn"
            by="word"
            delay={2}
            duration={1.2}
            className="text-muted-foreground mx-auto mb-12 max-w-4xl leading-relaxed"
          >
            Email service with GitHub access and daily token resets for developers. Stop hitting limits in Cursor,
            Copilot & Claude Code. Unlimited coding every day.
          </TextAnimate>

          {/* Service Benefits */}
          <div className="mb-12 flex flex-col items-center justify-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-12">
            <div className="text-center">
              <TextAnimate animation="scaleUp" delay={3} duration={1.2} className="text-foreground text-4xl font-bold">
                Daily
              </TextAnimate>
              <div className="text-muted-foreground text-sm">Token Resets</div>
            </div>
            <div className="text-center">
              <TextAnimate
                animation="scaleUp"
                delay={3.4}
                duration={1.2}
                className="text-foreground text-4xl font-bold"
              >
                24h
              </TextAnimate>
              <div className="text-muted-foreground text-sm">Setup Time</div>
            </div>
            <div className="text-center">
              <TextAnimate
                animation="scaleUp"
                delay={3.8}
                duration={1.2}
                className="text-foreground text-4xl font-bold"
              >
                {`$${PRODUCT_PRICE}`}
              </TextAnimate>
              <div className="text-muted-foreground text-sm">Early Access</div>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/sign-up" className="w-full sm:w-auto">
              <PulseButton
                // variant="outline"
                className="w-full px-8 py-4 text-lg font-semibold sm:w-auto"
                onClick={() => (window.location.href = "/sign-up")}
              >
                Get Early Access - ${PRODUCT_PRICE}
              </PulseButton>
            </Link>
          </div>

          {/* Service positioning */}
          <div className="flex flex-col items-center">
            <TextAnimate animation="fadeIn" delay={4.5} className="text-muted-foreground mb-6 text-sm">
              Exclusive access - No social media presence
            </TextAnimate>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <TextAnimate animation="slideUp" delay={4.7} className="text-muted-foreground font-semibold">
                Limited Users
              </TextAnimate>
              <TextAnimate animation="slideUp" delay={4.9} className="text-muted-foreground font-semibold">
                24h Setup
              </TextAnimate>
              <TextAnimate animation="slideUp" delay={5.1} className="text-muted-foreground font-semibold">
                No Refunds
              </TextAnimate>
              <TextAnimate animation="slideUp" delay={5.3} className="text-muted-foreground font-semibold">
                No Guarantee
              </TextAnimate>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
