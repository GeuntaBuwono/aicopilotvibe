import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ className, size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className={cn("animate-spin text-blue-500", sizeClasses[size])} />
        {text && <p className="text-sm text-gray-600">{text}</p>}
      </div>
    </div>
  )
}

export function LoadingCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-gray-200", className)}>{children}</div>
}

export function LoadingText({ className }: { className?: string }) {
  return <div className={cn("h-4 animate-pulse rounded bg-gray-200", className)} />
}
