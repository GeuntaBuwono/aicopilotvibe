"use client"

import { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
}

interface FeatureShowcaseProps {
  features: Feature[]
  className?: string
}

export function FeatureShowcase({ features, className }: FeatureShowcaseProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {features.map((feature, index) => (
        <Card
          key={index}
          className="group border-0 bg-gradient-to-br from-white to-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:from-gray-900 dark:to-gray-800"
        >
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
                <feature.icon className="h-5 w-5" />
              </div>
              {feature.badge && (
                <Badge variant="secondary" className="text-xs">
                  {feature.badge}
                </Badge>
              )}
            </div>

            <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-blue-600">{feature.title}</h3>

            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
