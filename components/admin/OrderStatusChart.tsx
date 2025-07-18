"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface OrderStats {
  pending: number
  processing: number
  delivered: number
  cancelled: number
}

interface OrderStatusChartProps {
  orderStats: OrderStats
  title?: string
}

export default function OrderStatusChart({ orderStats, title = "Order Status" }: OrderStatusChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  const total = Object.values(orderStats).reduce((sum, value) => sum + value, 0)

  const segments = [
    {
      key: "delivered",
      label: "Delivered",
      value: orderStats.delivered,
      color: "bg-green-500",
      hoverColor: "bg-green-400",
    },
    {
      key: "processing",
      label: "Processing",
      value: orderStats.processing,
      color: "bg-blue-500",
      hoverColor: "bg-blue-400",
    },
    {
      key: "pending",
      label: "Pending",
      value: orderStats.pending,
      color: "bg-yellow-500",
      hoverColor: "bg-yellow-400",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      value: orderStats.cancelled,
      color: "bg-red-500",
      hoverColor: "bg-red-400",
    },
  ]

  return (
    <div className="w-full">
      {title && <h3 className="mb-4 text-lg font-medium text-white">{title}</h3>}

      {/* Progress bar style chart */}
      <div className="mb-4">
        <div className="flex h-8 overflow-hidden rounded-lg">
          {segments.map((segment) => {
            const width = total > 0 ? (segment.value / total) * 100 : 0
            const isHovered = hoveredSegment === segment.key

            return width > 0 ? (
              <div
                key={segment.key}
                className={cn(
                  "relative cursor-pointer transition-all duration-300",
                  isHovered ? segment.hoverColor : segment.color
                )}
                style={{ width: `${width}%` }}
                onMouseEnter={() => setHoveredSegment(segment.key)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                    <div className="rounded bg-gray-700 px-2 py-1 text-xs whitespace-nowrap text-white">
                      {segment.label}: {segment.value} orders
                    </div>
                    <div className="mx-auto -mt-1 h-2 w-2 rotate-45 transform bg-gray-700"></div>
                  </div>
                )}
              </div>
            ) : null
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className={cn(
              "flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors",
              hoveredSegment === segment.key ? "bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
            )}
            onMouseEnter={() => setHoveredSegment(segment.key)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div className="flex items-center space-x-2">
              <div className={cn("h-3 w-3 rounded-full", segment.color)} />
              <span className="text-sm text-gray-300">{segment.label}</span>
            </div>
            <span className="text-sm font-medium text-white">{segment.value}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-4 rounded-lg bg-gray-700 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Total Orders</span>
          <span className="text-lg font-semibold text-white">{total}</span>
        </div>
      </div>
    </div>
  )
}
