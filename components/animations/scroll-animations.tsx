"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: ReactNode
  variant?: "fade" | "slide" | "scale" | "bounce"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

export function ScrollAnimation({
  children,
  variant = "fade",
  direction = "up",
  delay = 0,
  duration = 600,
  className,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getInitialTransform = () => {
    switch (variant) {
      case "slide":
        switch (direction) {
          case "up":
            return "translateY(2rem)"
          case "down":
            return "translateY(-2rem)"
          case "left":
            return "translateX(2rem)"
          case "right":
            return "translateX(-2rem)"
          default:
            return "translateY(2rem)"
        }
      case "scale":
        return "scale(0.8)"
      case "bounce":
        return "translateY(2rem) scale(0.8)"
      default:
        return "none"
    }
  }

  const getVisibleTransform = () => {
    switch (variant) {
      case "slide":
      case "bounce":
        return "translateY(0) translateX(0) scale(1)"
      case "scale":
        return "scale(1)"
      default:
        return "none"
    }
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? getVisibleTransform() : getInitialTransform(),
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: variant === "bounce" ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)" : "ease-out",
      }}
    >
      {children}
    </div>
  )
}

// Staggered animation for lists
export function StaggeredAnimation({
  children,
  staggerDelay = 100,
  className,
}: {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimation key={index} variant="slide" direction="up" delay={index * staggerDelay}>
          {child}
        </ScrollAnimation>
      ))}
    </div>
  )
}

// Parallax effect
export function ParallaxElement({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const [offsetY, setOffsetY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const _rect = ref.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const parallax = scrolled * speed
        setOffsetY(parallax)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
    >
      {children}
    </div>
  )
}

// Reveal animation on scroll
export function RevealOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          setIsVisible(entry.isIntersecting)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        "transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
    >
      {children}
    </div>
  )
}

// Counter animation
export function CounterAnimation({
  end,
  duration = 2000,
  className,
}: {
  end: number
  duration?: number
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting && !isVisible) {
          setIsVisible(true)

          const startTime = Date.now()
          const startCount = 0

          const updateCount = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            setCount(Math.floor(startCount + (end - startCount) * progress))

            if (progress < 1) {
              requestAnimationFrame(updateCount)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, isVisible])

  return (
    <div ref={ref} className={className}>
      {count.toLocaleString()}
    </div>
  )
}
