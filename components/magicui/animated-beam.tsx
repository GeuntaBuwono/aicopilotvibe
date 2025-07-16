"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLElement | null>
  fromRef: React.RefObject<HTMLElement | null>
  toRef: React.RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  duration?: number
  delay?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const [path, setPath] = useState<string>("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const fromX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset
      const fromY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset
      const toX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset
      const toY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset

      const midX = (fromX + toX) / 2
      const midY = (fromY + toY) / 2 + curvature

      const pathString = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`
      setPath(pathString)

      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      })
    }

    updatePath()
    const resizeObserver = new ResizeObserver(updatePath)

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  if (!path) return null

  return (
    <svg
      ref={svgRef}
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStartColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Path */}
      <path d={path} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} fill="none" />

      {/* Animated beam */}
      <motion.path
        d={path}
        stroke="url(#beam-gradient)"
        strokeWidth={pathWidth}
        fill="none"
        strokeDasharray="20 20"
        initial={{ strokeDashoffset: reverse ? -40 : 40 }}
        animate={{ strokeDashoffset: reverse ? 40 : -40 }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  )
}
