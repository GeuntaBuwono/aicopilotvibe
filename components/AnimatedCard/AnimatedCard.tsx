"use client"

import { twMerge } from "tailwind-merge"
// Floating animation component
export function FloatingElement({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div
      className={twMerge("animate-float", className)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "3s",
        animationIterationCount: "infinite",
      }}
    >
      {children}
    </div>
  )
}

// Pulse animation component
export function PulseElement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={twMerge("animate-pulse", className)}>{children}</div>
}

// Add this to your global CSS file (styles/globals.css)
export const floatingKeyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`
