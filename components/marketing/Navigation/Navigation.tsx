"use client"

import Link from "next/link"
import { useState } from "react"
import { ButtonHover } from "@/components/animations/button-hover"
import { ShinyButton } from "../../magicui/shiny-button"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="bg-background/80 border-border/50 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center">
              <Link href="/" className="group flex items-center space-x-2">
                <ShinyButton className="text-xl font-bold">AI Copilot Vibe</ShinyButton>
              </Link>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <ButtonHover
                  variant="lift"
                  className="text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-white"
                >
                  <Link href="#features">Features</Link>
                </ButtonHover>
                <ButtonHover
                  variant="lift"
                  className="text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-white"
                >
                  <Link href="#pricing">Pricing</Link>
                </ButtonHover>
                <ButtonHover
                  variant="lift"
                  className="text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-white"
                >
                  <Link href="#comparison">Comparison</Link>
                </ButtonHover>
              </div>
            </div>

            {/* Enhanced Desktop Auth Buttons */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-4">
                <ButtonHover
                  variant="glow"
                  className="border-border text-foreground rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-white"
                >
                  <Link href="/sign-in">Sign In</Link>
                </ButtonHover>
                <ButtonHover
                  variant="glow"
                  className="rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-medium transition-all duration-300"
                >
                  <Link href="/sign-up">Get Started</Link>
                </ButtonHover>
              </div>
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary hover:bg-muted focus:ring-primary inline-flex items-center justify-center rounded-md p-2 transition-all duration-300 focus:ring-2 focus:outline-none focus:ring-inset"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="bg-background/95 border-border/50 space-y-1 border-t px-2 pt-2 pb-3 backdrop-blur-md sm:px-3">
              <Link
                href="#features"
                className="text-foreground hover:text-primary animate-in slide-in-from-left-4 block px-3 py-2 text-base font-medium transition-colors duration-300"
                style={{ animationDelay: "100ms" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-foreground hover:text-primary animate-in slide-in-from-left-4 block px-3 py-2 text-base font-medium transition-colors duration-300"
                style={{ animationDelay: "150ms" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-foreground hover:text-primary animate-in slide-in-from-left-4 block px-3 py-2 text-base font-medium transition-colors duration-300"
                style={{ animationDelay: "200ms" }}
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#about"
                className="text-foreground hover:text-primary animate-in slide-in-from-left-4 block px-3 py-2 text-base font-medium transition-colors duration-300"
                style={{ animationDelay: "250ms" }}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="border-border/50 border-t pt-4 pb-3">
                <div className="space-y-3 px-3">
                  <ButtonHover
                    variant="glow"
                    className="border-border text-foreground w-full rounded-lg border py-2 text-sm font-medium transition-all duration-300 hover:text-white"
                  >
                    <Link href="/sign-in" className="block w-full">
                      Sign In
                    </Link>
                  </ButtonHover>
                  <ButtonHover
                    variant="gradient"
                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Link href="/sign-up" className="block w-full">
                      Get Started
                    </Link>
                  </ButtonHover>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
