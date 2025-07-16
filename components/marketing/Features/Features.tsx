"use client"

import { TiltCard } from "@/components/magic/interactive-elements"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { AnimatedList } from "@/components/magicui/animated-list"
import { Ripple } from "@/components/magicui/ripple"
import { ShineBorder } from "@/components/magicui/shine-border"
import { TextAnimate } from "@/components/magicui/text-animate"
import { LP_GRID_ITEMS } from "../../../lp-items"

export function Features() {
  return (
    <section id="features" className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="mb-20 text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            delay={0.5}
            duration={1.5}
            className="text-foreground mb-6 text-4xl font-bold md:text-5xl"
          >
            Why Choose Our
          </TextAnimate>
          <AnimatedGradientText
            className="text-4xl font-bold md:text-5xl"
            colorFrom="#3b82f6"
            colorTo="#8b5cf6"
            speed={2}
          >
            Email Service?
          </AnimatedGradientText>
          <TextAnimate
            animation="fadeIn"
            by="word"
            delay={1.5}
            duration={1.2}
            className="text-muted-foreground mx-auto mt-6 max-w-4xl text-xl leading-relaxed"
          >
            GitHub access with daily token resets. Perfect for developers who hit limits in Cursor, Copilot, and Claude
            Code.
          </TextAnimate>
        </div>

        {/* Enhanced Features Grid */}
        <AnimatedList
          className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          delay={1.8}
          stagger={0.4}
          animation="slideUp"
        >
          {LP_GRID_ITEMS.map((feature) => (
            <TiltCard key={feature.title} className="group relative">
              <div className="bg-card/50 border-border/50 hover:border-primary/30 relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-500">
                <Ripple
                  className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  color="rgba(59, 130, 246, 0.1)"
                  numRipples={3}
                />

                <div className="from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-300">
                  <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-semibold transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground group-hover:text-foreground leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </TiltCard>
          ))}
        </AnimatedList>

        {/* Enhanced Feature Highlight */}
        <ShineBorder className="w-full" shineColor={["#3b82f6", "#8b5cf6", "#3b82f6"]} borderWidth={2} duration={20}>
          <div className="from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-r p-8 lg:p-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <TextAnimate
                  animation="slideUp"
                  by="word"
                  delay={0.8}
                  duration={1.5}
                  className="text-foreground mb-6 text-3xl font-bold md:text-4xl"
                >
                  Ready to Stop Hitting Token Limits?
                </TextAnimate>

                <TextAnimate
                  animation="fadeIn"
                  by="word"
                  delay={1.5}
                  duration={1.2}
                  className="text-muted-foreground mb-8 text-lg leading-relaxed"
                >
                  Get GitHub access with daily token resets. Perfect for developers frustrated with Cursor, Copilot, and
                  Claude Code limitations.
                </TextAnimate>

                <div className="space-y-4">
                  {["24-hour setup process", "No refund policy", "Limited users only"].map((benefit, index) => (
                    <div
                      key={benefit}
                      className="animate-in slide-in-from-left-4 flex items-center space-x-3 duration-800"
                      style={{ animationDelay: `${2400 + index * 400}ms` }}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <TextAnimate
                        animation="fadeIn"
                        delay={2.4 + index * 0.4}
                        duration={1.2}
                        className="text-foreground text-sm font-medium"
                      >
                        {benefit}
                      </TextAnimate>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ShineBorder>
      </div>
    </section>
  )
}
