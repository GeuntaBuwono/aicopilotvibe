"use client"

import { cn } from "@/lib/utils"

interface ShineBorderProps {
  children: React.ReactNode
  className?: string
  duration?: number
  shineColor?: string | string[]
  borderWidth?: number
  style?: React.CSSProperties
}

export function ShineBorder({
  children,
  className,
  duration = 14,
  shineColor = "#000000",
  borderWidth = 1,
  style,
}: ShineBorderProps) {
  const colorArray = Array.isArray(shineColor) ? shineColor : [shineColor]

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)} style={style}>
      {/* Shine border effect */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(90deg, ${colorArray.join(", ")})`,
          padding: `${borderWidth}px`,
          animation: `shine ${duration}s infinite linear`,
        }}
      >
        <div className="bg-background h-full w-full rounded-lg" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-3">{children}</div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }
      `}</style>
    </div>
  )
}
