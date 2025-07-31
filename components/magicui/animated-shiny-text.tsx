"use client"

import { cn } from "@/lib/utils"

interface AnimatedShinyTextProps {
  children: React.ReactNode
  className?: string
  shimmerWidth?: number
}

export function AnimatedShinyText({ children, className, shimmerWidth = 100 }: AnimatedShinyTextProps) {
  return (
    <div
      className={cn(
        "relative inline-block overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent",
        className
      )}
    >
      <span className="relative z-10">{children}</span>

      {/* Shimmer effect */}
      <div
        className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          width: `${shimmerWidth}px`,
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite",
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
