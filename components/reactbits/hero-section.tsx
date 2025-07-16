"use client"

import { ArrowRight, Play, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  badge?: string
  title: string
  subtitle: string
  primaryCTA: {
    text: string
    href: string
    onClick?: () => void
  }
  secondaryCTA?: {
    text: string
    href?: string
    onClick?: () => void
  }
  testimonial?: {
    text: string
    author: string
    rating: number
  }
  className?: string
}

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  testimonial,
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden px-4 py-20", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl text-center">
        {badge && <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">{badge}</Badge>}

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl dark:text-white">{title}</h1>

        <p className="mb-8 text-lg text-gray-600 md:text-xl dark:text-gray-300">{subtitle}</p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:from-blue-600 hover:to-purple-600"
            onClick={primaryCTA.onClick}
          >
            {primaryCTA.text}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          {secondaryCTA && (
            <Button variant="outline" size="lg" className="group" onClick={secondaryCTA.onClick}>
              <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              {secondaryCTA.text}
            </Button>
          )}
        </div>

        {testimonial && (
          <div className="mt-12 rounded-lg bg-white/60 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/60">
            <div className="mb-3 flex items-center justify-center gap-1">
              {Array.from({ length: testimonial.rating }, (_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <blockquote className="mb-2 text-gray-700 italic dark:text-gray-300">"{testimonial.text}"</blockquote>

            <cite className="text-sm text-gray-500 dark:text-gray-400">— {testimonial.author}</cite>
          </div>
        )}
      </div>
    </section>
  )
}
