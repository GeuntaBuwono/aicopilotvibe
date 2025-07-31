"use client"

import Link from "next/link"
import { ButtonHover } from "@/components/animations/button-hover"
import { FloatingElements } from "@/components/magic/interactive-elements"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { TextAnimate } from "@/components/magicui/text-animate"

export function Footer() {
  return (
    <footer className="from-background to-muted/20 border-border/50 relative overflow-hidden border-t bg-gradient-to-b">
      <FloatingElements count={4} className="opacity-20" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
              <AnimatedGradientText className="text-xl font-bold" colorFrom="#3b82f6" colorTo="#8b5cf6" speed={2}>
                AI Copilot Vibe
              </AnimatedGradientText>
            </div>

            <TextAnimate
              animation="fadeIn"
              delay={0.2}
              duration={0.8}
              className="text-muted-foreground mb-6 max-w-md leading-relaxed"
            >
              Empowering your coding journey with an unlimited AI coding assistant. Access GitHub repositories and enjoy
              daily token resets.
            </TextAnimate>
          </div>

          {/* Quick Links */}
          <div>
            <TextAnimate animation="slideUp" delay={0.3} duration={0.6} className="text-foreground mb-4 font-semibold">
              Quick Links
            </TextAnimate>
            <ul className="space-y-3">
              {[
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Comparison", href: "#comparison" },
                { name: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.name}>
                  <ButtonHover
                    variant="slide"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </ButtonHover>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <TextAnimate animation="slideUp" delay={0.4} duration={0.6} className="text-foreground mb-4 font-semibold">
              Support
            </TextAnimate>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <ButtonHover
                    variant="slide"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </ButtonHover>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-border/50 mt-12 border-t pt-8">
          <div className="mx-auto max-w-md text-center">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-background border-border focus:ring-primary text-foreground placeholder-muted-foreground flex-1 rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
              />
              <ButtonHover
                variant="gradient"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
              >
                Subscribe
              </ButtonHover>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-border/50 mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <TextAnimate animation="fadeIn" delay={0.6} duration={0.6} className="text-muted-foreground text-sm">
              {`© ${new Date().getFullYear()} AI Copilot Vibe. All rights reserved.`}
            </TextAnimate>

            <div className="flex items-center space-x-6">
              <TextAnimate className="text-muted-foreground text-sm">Made with ❤️ for AI enthusiasts</TextAnimate>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
