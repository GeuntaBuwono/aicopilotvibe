"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface ChartData {
  date: string
  users: number
}

interface InteractiveChartProps {
  data: ChartData[]
  title?: string
  height?: number
}

export default function InteractiveChart({ data, title = "Chart", height = 128 }: InteractiveChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const maxValue = Math.max(...data.map((d) => d.users), 1)

  return (
    <div className="w-full">
      {title && <h3 className="mb-4 text-lg font-medium text-white">{title}</h3>}
      <div className="relative" style={{ height }}>
        <div className="flex h-full items-end space-x-2">
          {data.map((item, index) => {
            const heightPercentage = (item.users / maxValue) * 100
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                className="group relative flex flex-1 flex-col items-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform">
                    <div className="rounded bg-gray-700 px-2 py-1 text-xs whitespace-nowrap text-white">
                      {item.date}: {item.users} users
                    </div>
                    <div className="mx-auto -mt-1 h-2 w-2 rotate-45 transform bg-gray-700"></div>
                  </div>
                )}

                {/* Bar */}
                <div
                  className={cn(
                    "w-full rounded-t transition-all duration-300 ease-in-out",
                    isHovered ? "scale-105 bg-blue-400 shadow-lg" : "bg-blue-500 hover:bg-blue-400"
                  )}
                  style={{
                    height: `${heightPercentage}%`,
                    minHeight: "4px",
                  }}
                />

                {/* Date label */}
                <span className="mt-1 text-xs text-gray-400 transition-colors group-hover:text-gray-300">
                  {item.date}
                </span>

                {/* Value label */}
                <span className="text-xs text-gray-500 transition-colors group-hover:text-gray-400">{item.users}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
