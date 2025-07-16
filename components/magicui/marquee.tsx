"use client"

import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 1,
}: MarqueeProps) {
  const repeatedChildren = Array.from({ length: repeat }, (_, i) => (
    <div key={i} className={vertical ? "mb-4" : "mr-4 whitespace-nowrap"}>
      {children}
    </div>
  ))

  return (
    <div className={cn("relative overflow-hidden", vertical ? "h-full" : "w-full", className)}>
      <div
        className={cn(
          "animate-marquee flex",
          vertical ? "flex-col" : "flex-row",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "hover:animate-pause"
        )}
      >
        {repeatedChildren}
        {/* Duplicate for seamless loop */}
        {repeatedChildren}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: ${vertical ? "translateY(0%)" : "translateX(0%)"};
          }
          100% {
            transform: ${vertical ? "translateY(-100%)" : "translateX(-100%)"};
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: ${vertical ? "translateY(-100%)" : "translateX(-100%)"};
          }
          100% {
            transform: ${vertical ? "translateY(0%)" : "translateX(0%)"};
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 20s linear infinite;
        }

        .animate-pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
