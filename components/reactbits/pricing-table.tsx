"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import /* Button */ "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  cta: React.ReactNode
}

interface PricingTableProps {
  plans: PricingPlan[]
  className?: string
}

export function PricingTable({ plans, className }: PricingTableProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={cn(
            "relative overflow-hidden transition-shadow duration-300 hover:shadow-lg",
            plan.popular && "border-blue-500 ring-2 ring-blue-500/20"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">Most Popular</Badge>
            </div>
          )}

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-primary text-4xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">{plan.cta}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
