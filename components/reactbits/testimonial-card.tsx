"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  className?: string
}

export function TestimonialCard({ name, role, company, content, rating, avatar, className }: TestimonialCardProps) {
  return (
    <Card className={cn("transition-shadow duration-300 hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={cn("h-4 w-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
          ))}
        </div>

        <blockquote className="mb-6 text-gray-700 dark:text-gray-300">"{content}"</blockquote>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-semibold">{name}</p>
            <p className="text-muted-foreground text-xs">
              {role} at {company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
