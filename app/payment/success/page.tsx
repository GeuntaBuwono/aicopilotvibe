"use client"

import { CheckCircle, Loader2, XCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "@/lib/auth-client"

function PaymentSuccessContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    const checkoutId = searchParams.get("checkout_id")

    if (!checkoutId) {
      setStatus("error")
      setMessage("No checkout ID provided")
      return
    }

    if (!session) {
      setStatus("error")
      setMessage("Please sign in to continue")
      return
    }

    // Payment success is automatically handled by Polar.sh webhooks
    // No need to manually process payment success
    setStatus("success")
    setMessage("Payment successful! Your order has been created.")
  }, [searchParams, session])

  const handleContinue = () => {
    router.push("/dashboard")
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Access Denied
            </CardTitle>
            <CardDescription>Please sign in to view your payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/sign-in")} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {status === "loading" && (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                Processing Payment
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                Payment Successful!
              </>
            )}
            {status === "error" && (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                Payment Failed
              </>
            )}
          </CardTitle>
          <CardDescription>
            {status === "loading" && "Please wait while we verify your payment..."}
            {status === "success" && "Your payment has been processed successfully"}
            {status === "error" && "There was an issue with your payment"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">{message}</p>

            {status === "success" && (
              <div className="space-y-2">
                <div className="rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-green-800">
                    🎉 Your enterprise email will be delivered within 24 hours. We'll notify you once it's ready!
                  </p>
                </div>
                <Button onClick={handleContinue} className="w-full">
                  Continue to Dashboard
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-2">
                <div className="rounded-lg bg-red-50 p-4">
                  <p className="text-sm text-red-800">
                    If you believe this is an error, please contact our support team at support@aicopilotvibe.com
                  </p>
                </div>
                <Button onClick={handleContinue} variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </div>
            )}

            {status === "loading" && (
              <div className="flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
