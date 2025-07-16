"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface RevealAnimationProps {
  children: React.ReactNode
  variant?: "fade" | "slide" | "scale" | "flip" | "blur"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

export function RevealAnimation({
  children,
  variant = "fade",
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
}: RevealAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: {
        opacity: 0,
        x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
        y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    flip: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: { opacity: 1, rotateX: 0 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredReveal({
  children,
  staggerDelay = 0.1,
  className,
}: {
  children: React.ReactNode[]
  staggerDelay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export function TypewriterEffect({
  text,
  speed = 100,
  className,
}: {
  text: string
  speed?: number
  className?: string
}) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <span className={cn("relative", className)}>
      {displayedText}
      <motion.span
        className="ml-1 inline-block h-5 w-0.5 bg-blue-500"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </span>
  )
}

export function CounterReveal({
  end,
  duration = 2,
  className,
}: {
  end: number
  duration?: number
  className?: string
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const start = 0
      const startTime = Date.now()
      const endTime = startTime + duration * 1000

      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / (endTime - startTime), 1)

        setCount(Math.floor(start + (end - start) * progress))

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        }
      }

      requestAnimationFrame(updateCount)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  )
}

export function WaveReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: "0%" } : { y: "100%" }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function SlideInFromSides({
  children,
  direction = "left",
  className,
}: {
  children: React.ReactNode
  direction?: "left" | "right"
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{
          x: direction === "left" ? "-100%" : "100%",
          opacity: 0,
        }}
        animate={
          isInView
            ? { x: "0%", opacity: 1 }
            : {
                x: direction === "left" ? "-100%" : "100%",
                opacity: 0,
              }
        }
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function ZoomReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MorphReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{
        scale: 0.8,
        opacity: 0,
        rotateX: -15,
        rotateY: 15,
      }}
      animate={
        isInView
          ? {
              scale: 1,
              opacity: 1,
              rotateX: 0,
              rotateY: 0,
            }
          : {
              scale: 0.8,
              opacity: 0,
              rotateX: -15,
              rotateY: 15,
            }
      }
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
