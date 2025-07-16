"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return <Loader2 className={cn("animate-spin", sizes[size], className)} />
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: "0.1s" }} />
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" style={{ animationDelay: "0.2s" }} />
    </div>
  )
}

export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
      <div className="h-3 w-3 animate-pulse rounded-full bg-purple-500" style={{ animationDelay: "0.2s" }} />
      <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" style={{ animationDelay: "0.4s" }} />
    </div>
  )
}

export function LoadingWave({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-8 w-1 animate-pulse rounded-full bg-gradient-to-t from-blue-500 to-purple-500"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1s",
            animationDirection: "alternate",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  )
}

export function LoadingRipple({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-10 w-10", className)}>
      <div className="absolute inset-0 animate-ping rounded-full border-2 border-blue-500" />
      <div
        className="absolute inset-2 animate-ping rounded-full border-2 border-purple-500"
        style={{ animationDelay: "0.2s" }}
      />
      <div
        className="absolute inset-4 animate-ping rounded-full border-2 border-blue-500"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  )
}

export function SkeletonLoader({ lines = 3, className }: { lines?: number; className?: string }) {
  const [widths, setWidths] = useState<number[]>([])

  useEffect(() => {
    // Generate widths client-side only to avoid hydration mismatch
    const randomWidths = Array.from({ length: lines }, () => Math.random() * 40 + 60)
    setWidths(randomWidths)
  }, [lines])

  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
          style={{ width: widths[i] ? `${widths[i]}%` : "80%" }}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 p-6", className)}>
      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2">
        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-10 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

export function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700", className)}>
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}

export function IndeterminateProgress({ className }: { className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700", className)}>
      <div className="h-full animate-pulse bg-gradient-to-r from-blue-500 to-purple-500" />
    </div>
  )
}
