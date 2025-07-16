"use client"

import { cn } from "@/lib/utils"

interface RippleProps {
  className?: string
  numRipples?: number
  size?: number
  color?: string
}

export function Ripple({ className, numRipples = 3, size = 100, color = "rgba(59, 130, 246, 0.3)" }: RippleProps) {
  const ripples = Array.from({ length: numRipples }, (_, i) => (
    <div
      key={i}
      className={cn("animate-ripple absolute rounded-full border opacity-0", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: color,
        animationDelay: `${i * 0.5}s`,
        animationDuration: "2s",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {ripples}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 2s infinite;
        }
      `}</style>
    </div>
  )
}
