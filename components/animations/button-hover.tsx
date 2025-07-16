"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ButtonHoverProps {
  children: ReactNode
  variant?: "gradient" | "lift" | "ripple" | "glow" | "slide"
  className?: string
}

export function ButtonHover({ children, variant = "gradient", className }: ButtonHoverProps) {
  const variants = {
    gradient: "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
    lift: "group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
    ripple: "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
    glow: "group relative transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25",
    slide: "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
  }

  const effects = {
    gradient: (
      <div className="absolute inset-0 origin-left scale-x-0 transform bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:scale-x-100" />
    ),
    lift: null,
    ripple: (
      <div className="absolute inset-0 scale-0 transform rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-100" />
    ),
    glow: (
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
    ),
    slide: (
      <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:translate-x-0" />
    ),
  }

  return (
    <div className={cn(variants[variant], className)}>
      {effects[variant]}
      <div className="relative z-10 transition-colors duration-300 group-hover:text-white">{children}</div>
    </div>
  )
}

// Specialized button animations
export function RippleButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-600 active:scale-95",
        "before:absolute before:inset-0 before:translate-x-full before:skew-x-12 before:bg-white/20 before:transition-transform before:duration-500 hover:before:translate-x-0",
        className
      )}
    >
      {children}
    </button>
  )
}

export function PulseButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-lg bg-purple-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-purple-600",
        "before:absolute before:inset-0 before:scale-100 before:animate-pulse before:rounded-lg before:bg-purple-500 before:transition-transform before:duration-300 hover:before:scale-110",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export function ShineButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
