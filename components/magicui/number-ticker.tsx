"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  className?: string
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
}

export function NumberTicker({
  value,
  className,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now() + delay * 1000
    const endTime = startTime + duration * 1000

    const animate = () => {
      const now = Date.now()

      if (now < startTime) {
        requestAnimationFrame(animate)
        return
      }

      if (now >= endTime) {
        setDisplayValue(value)
        return
      }

      const progress = (now - startTime) / (endTime - startTime)
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      const currentValue = Math.floor(easedProgress * value)

      setDisplayValue(currentValue)
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration, delay])

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  )
}
