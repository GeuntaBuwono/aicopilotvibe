"use client"

import { AlertCircle, CheckCircle, Circle, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = "active" | "inactive" | "pending" | "error" | "success" | "warning"

interface StatusIndicatorProps {
  status: StatusType
  label?: string
  showIcon?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

const statusConfig = {
  active: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle,
    label: "Active",
  },
  inactive: {
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    icon: Circle,
    label: "Inactive",
  },
  pending: {
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: Clock,
    label: "Pending",
  },
  error: {
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: XCircle,
    label: "Error",
  },
  success: {
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: CheckCircle,
    label: "Success",
  },
  warning: {
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    icon: AlertCircle,
    label: "Warning",
  },
}

const sizeConfig = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
}

export function StatusIndicator({ status, label, showIcon = true, size = "md", className }: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  const displayLabel = label || config.label

  return (
    <Badge className={cn("inline-flex items-center gap-1.5 font-medium", config.color, sizeConfig[size], className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {displayLabel}
    </Badge>
  )
}

// Animated version with pulse effect
export function AnimatedStatusIndicator({
  status,
  label,
  showIcon = true,
  size = "md",
  className,
}: StatusIndicatorProps) {
  const config = statusConfig[status]
  const Icon = config.icon
  const displayLabel = label || config.label

  return (
    <Badge
      className={cn(
        "inline-flex animate-pulse items-center gap-1.5 font-medium",
        config.color,
        sizeConfig[size],
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {displayLabel}
    </Badge>
  )
}

// Dot indicator for minimal display
export function StatusDot({
  status,
  size = "md",
  className,
}: {
  status: StatusType
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const config = statusConfig[status]

  const dotSizes = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  }

  return (
    <div
      className={cn(
        "inline-block rounded-full",
        config.color.split(" ")[0]?.replace("bg-", "bg-").replace("-100", "-500") || "bg-gray-500",
        dotSizes[size],
        className
      )}
    />
  )
}
