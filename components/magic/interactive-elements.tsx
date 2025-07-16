"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface MouseFollowerProps {
  children: React.ReactNode
  className?: string
}

export function MouseFollower({ children, className }: MouseFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}

      {isHovering && (
        <motion.div
          className="pointer-events-none fixed z-50 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: isHovering ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
        />
      )}
    </div>
  )
}

export function MagneticElement({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("cursor-pointer", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElements({ count = 5, className }: { count?: number; className?: string }) {
  const elements = Array.from({ length: count }, (_, i) => (
    <motion.div
      key={i}
      className="absolute h-2 w-2 rounded-full bg-blue-500/30"
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ))

  return <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>{elements}</div>
}

export function CursorTrail({ className }: { className?: string }) {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: idRef.current++,
      }

      setTrail((prev) => [...prev.slice(-20), newPoint])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-50", className)}>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute h-2 w-2 rounded-full bg-blue-500"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: index / trail.length,
            scale: 1,
            x: point.x - 4,
            y: point.y - 4,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.1 }}
        />
      ))}
    </div>
  )
}

export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateXValue = (e.clientY - centerY) / 10
    const rotateYValue = (centerX - e.clientX) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={cn("cursor-pointer", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulseOnHover({ children, className }: { children: React.ReactNode; className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}

      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}
