"use client"

import { CreditCard, Loader2, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { authClient, useSession } from "@/lib/auth-client"

interface CheckoutButtonProps {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

export function CheckoutButton({ className, children = "Get Started", disabled = false }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleCheckout = async () => {
    if (!session) {
      router.push("/sign-in")
      return
    }

    setIsLoading(true)

    try {
      await authClient.checkout({
        slug: "Enterprise", // Use the slug defined in auth.ts
      })

      // The checkout method will handle the redirect automatically
      // No need to manually handle the redirect
    } catch (error) {
      console.error("Checkout error:", error)
      // You might want to show a toast notification here
      alert("Payment initialization failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className={className}
      size="lg"
      aria-label={isLoading ? "Processing payment..." : `Start payment process: ${children}`}
      aria-disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" aria-hidden="true" />
          {children}
        </>
      )}
    </Button>
  )
}

export function SecureCheckoutButton({
  className,
  children = "Secure Checkout",
  disabled = false,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleCheckout = async () => {
    if (!session) {
      router.push("/sign-in")
      return
    }

    setIsLoading(true)

    try {
      const { error, data } = await authClient.checkout({
        // Any Polar Product ID can be passed here
        products: [process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID!],
        // Or, if you setup "products" in the Checkout Config, you can pass the slug
        // slug: "pro",
      })

      if (error) {
        throw new Error("Failed to create checkout session")
      }

      if (data.redirect) {
        // Redirect to Polar.sh checkout
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      // You might want to show a toast notification here
      alert("Payment initialization failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={disabled || isLoading}
      className={className}
      size="lg"
      variant="default"
      aria-label={isLoading ? "Processing secure payment..." : `Start secure payment process: ${children}`}
      aria-disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          Processing...
        </>
      ) : (
        <>
          <Lock className="mr-2 h-4 w-4" aria-hidden="true" />
          {children}
        </>
      )}
    </Button>
  )
}
