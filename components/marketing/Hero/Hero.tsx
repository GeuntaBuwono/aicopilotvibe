"use client"

import Link from "next/link"
import { PulseButton } from "@/components/animations/button-hover"
import { FloatingElements } from "@/components/magic/interactive-elements"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { TextAnimate } from "@/components/magicui/text-animate"

export function Hero() {
  return (
    <section className="from-background via-background to-background relative overflow-hidden bg-gradient-to-br">
      {/* Enhanced Background decorations */}
      <FloatingElements count={8} className="opacity-30" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 opacity-40 mix-blend-multiply blur-3xl filter"></div>
        <div className="animation-delay-1000 absolute top-0 right-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 opacity-40 mix-blend-multiply blur-3xl filter"></div>
        <div className="animation-delay-2000 absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 transform animate-pulse rounded-full bg-indigo-500/10 opacity-40 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
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
                $150
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
                Get Early Access - $150
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

      {/* Enhanced Hero Image/Demo */}
      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="animate-in slide-in-from-bottom-4 delay-[6000ms] duration-1500">
          <div className="bg-card/80 border-border/50 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-sm">
            <div className="bg-muted/50 flex items-center space-x-3 px-6 py-4">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-8">
              <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="mb-4 flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">GitHub Access</h3>
                    <p className="text-sm opacity-80">Daily Token Reset</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed opacity-90">
                  Email service with GitHub access and unlimited tokens that reset daily. Perfect for developers who hit
                  limits in Cursor, Copilot, and Claude Code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
