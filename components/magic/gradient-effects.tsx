"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientEffectProps {
  children: ReactNode
  variant?: "glow" | "border" | "text" | "background" | "mesh"
  className?: string
}

export function GradientEffect({ children, variant = "glow", className }: GradientEffectProps) {
  const variants = {
    glow: "relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20 before:blur-xl before:animate-pulse",
    border:
      "relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:p-[2px] before:rounded-lg after:absolute after:inset-[2px] after:bg-white after:dark:bg-gray-900 after:rounded-lg",
    text: "bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",
    background: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm",
    mesh: "bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10",
  }

  return (
    <div className={cn(variants[variant], className)}>
      {variant === "border" && <div className="relative z-10">{children}</div>}
      {variant !== "border" && children}
    </div>
  )
}

export function AnimatedGradientBackground({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="animate-gradient-x absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20" />
      <div className="animate-gradient-y absolute inset-0 bg-gradient-to-l from-pink-500/20 via-blue-500/20 to-green-500/20" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function MeshGradient({
  className,
  colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981"],
}: {
  className?: string
  colors?: string[]
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-30 mix-blend-multiply"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, ${colors[0]}40 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${colors[1]}40 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${colors[2]}40 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, ${colors[3]}40 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 animate-pulse opacity-20 mix-blend-multiply"
        style={{
          background: `
            radial-gradient(circle at 60% 20%, ${colors[0]}30 0%, transparent 40%),
            radial-gradient(circle at 20% 60%, ${colors[1]}30 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, ${colors[2]}30 0%, transparent 40%)
          `,
        }}
      />
    </div>
  )
}

export function GradientBlob({
  className,
  size = "lg",
  color = "blue",
}: {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  color?: "blue" | "purple" | "pink" | "green" | "cyan"
}) {
  const sizes = {
    sm: "w-20 h-20",
    md: "w-40 h-40",
    lg: "w-60 h-60",
    xl: "w-80 h-80",
  }

  const colors = {
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-pink-500",
    pink: "from-pink-500 to-rose-500",
    green: "from-green-500 to-emerald-500",
    cyan: "from-cyan-500 to-blue-500",
  }

  return (
    <div className={cn("absolute animate-pulse opacity-20 blur-xl", sizes[size], className)}>
      <div
        className={cn("h-full w-full animate-spin rounded-full bg-gradient-to-r", colors[color])}
        style={{ animationDuration: "20s" }}
      />
    </div>
  )
}

export function InteractiveGradient({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 transition-all duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function GlowingText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:bg-clip-text before:text-transparent before:opacity-50 before:blur-sm",
        className
      )}
    >
      {children}
    </span>
  )
}
