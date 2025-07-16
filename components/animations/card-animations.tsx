"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  variant?: "lift" | "tilt" | "glow" | "border" | "scale" | "fade"
  className?: string
}

export function AnimatedCard({ children, variant = "lift", className }: AnimatedCardProps) {
  const variants = {
    lift: "group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
    tilt: "group transition-all duration-300 hover:rotate-1 hover:scale-105 hover:shadow-xl",
    glow: "group transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25",
    border: "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
    scale: "group transition-all duration-300 hover:scale-105 hover:shadow-xl",
    fade: "group transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg",
  }

  const effects = {
    lift: null,
    tilt: null,
    glow: (
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    ),
    border: (
      <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    ),
    scale: null,
    fade: (
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-950 dark:to-purple-950" />
    ),
  }

  return (
    <div className={cn(variants[variant], className)}>
      {effects[variant]}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Specialized card animations
export function FloatingCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative transition-all duration-500",
        "hover:-translate-y-3 hover:shadow-2xl",
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-500/10 before:to-purple-500/10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        className
      )}
    >
      <div className="relative z-10 rounded-lg bg-white dark:bg-gray-900">{children}</div>
    </div>
  )
}

export function MagneticCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group cursor-pointer transition-all duration-300",
        "hover:shadow-xl hover:shadow-blue-500/25",
        "hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950",
        className
      )}
    >
      <div className="transition-transform duration-300 group-hover:scale-[1.02]">{children}</div>
    </div>
  )
}

export function RevealCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden transition-all duration-300 hover:shadow-lg", className)}>
      <div className="absolute inset-0 translate-y-full transform bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:translate-y-0" />
      <div className="relative z-10 transition-colors duration-300 group-hover:text-white">{children}</div>
    </div>
  )
}

export function BorderAnimatedCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative p-[2px] transition-all duration-300 hover:shadow-lg",
        "rounded-lg bg-gradient-to-r from-blue-500 to-purple-500",
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        className
      )}
    >
      <div className="relative z-10 rounded-lg bg-white p-6 transition-all duration-300 group-hover:bg-gray-50 dark:bg-gray-900 dark:group-hover:bg-gray-800">
        {children}
      </div>
    </div>
  )
}
