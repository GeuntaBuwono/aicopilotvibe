"use client"

import { AlertCircle, CheckCircle, Mail } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NewsletterSignupProps {
  title?: string
  description?: string
  placeholder?: string
  className?: string
  onSubmit?: (email: string) => Promise<void>
}

export function NewsletterSignup({
  title = "Stay Updated",
  description = "Get the latest updates and exclusive content delivered to your inbox.",
  placeholder = "Enter your email address",
  className,
  onSubmit,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")

    try {
      if (onSubmit) {
        await onSubmit(email)
      }
      setStatus("success")
      setMessage("Thank you for subscribing!")
      setEmail("")
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <Card className={cn("mx-auto w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Mail className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
            />

            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {message}
              </div>
            )}

            {status === "success" && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                {message}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:from-blue-600 hover:to-purple-600"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Badge variant="outline" className="text-xs">
            <span className="mr-1 text-green-500">✓</span>
            No spam, unsubscribe anytime
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
