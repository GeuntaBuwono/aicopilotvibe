"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  blur?: string
  inView?: boolean
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  blur = "4px",
  inView = true,
}: BlurFadeProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        filter: `blur(${blur})`,
        y: 20,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }
          : {
              opacity: 0,
              filter: `blur(${blur})`,
              y: 20,
            }
      }
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}
