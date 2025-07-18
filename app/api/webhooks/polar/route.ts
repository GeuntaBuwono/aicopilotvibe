import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { handlePaymentFailure, handlePaymentSuccess, syncSubscriptionStatus } from "@/lib/payments"

interface WebhookEvent {
  type: string
  data: {
    id: string
    customerId?: string
    userId?: string
    metadata?: { userId: string }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = (await headers()).get("polar-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // TODO: Implement proper signature verification when @polar-sh/nextjs is available
    // For now, parse the webhook event
    const event = JSON.parse(body) as WebhookEvent

    console.log("Received Polar webhook:", event.type)

    // Extract customer/user ID from various possible locations
    const getCustomerId = (event: WebhookEvent): string | null => {
      return event.data.customerId || event.data.userId || event.data.metadata?.userId || null
    }

    const customerId = getCustomerId(event)

    // Handle different event types with better error handling
    try {
      switch (event.type) {
        case "checkout.session.completed":
        case "order.paid":
          if (customerId) {
            await handlePaymentSuccess(event.data.id, customerId)
            console.log("Payment completed for customer:", customerId)
          }
          break

        case "checkout.session.failed":
        case "order.failed":
          if (customerId) {
            await handlePaymentFailure(event.data.id, customerId)
            console.log("Payment failed for customer:", customerId)
          }
          break

        case "subscription.created":
          if (customerId) {
            await syncSubscriptionStatus(customerId, event.data.id)
            console.log("Subscription created for customer:", customerId)
          }
          break

        case "subscription.updated":
          if (customerId) {
            await syncSubscriptionStatus(customerId, event.data.id)
            console.log("Subscription updated for customer:", customerId)
          }
          break

        case "subscription.canceled":
        case "subscription.cancelled":
          if (customerId) {
            await syncSubscriptionStatus(customerId, event.data.id)
            console.log("Subscription canceled for customer:", customerId)
          }
          break

        case "subscription.invoice.paid":
          if (customerId) {
            await handlePaymentSuccess(event.data.id, customerId)
            console.log("Subscription invoice paid for customer:", customerId)
          }
          break

        case "subscription.invoice.failed":
          if (customerId) {
            await handlePaymentFailure(event.data.id, customerId)
            console.log("Subscription invoice failed for customer:", customerId)
          }
          break

        default:
          console.log("Unhandled Polar webhook event type:", event.type)
      }
    } catch (handlerError) {
      console.error(`Error processing ${event.type}:`, handlerError)
      // Continue processing - don't fail the webhook
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

// Note: To use the official @polar-sh/nextjs Webhooks utility, install it first:
// npm install @polar-sh/nextjs
// Then replace this implementation with:
// export const POST = Webhooks({ webhookSecret: process.env.POLAR_WEBHOOK_SECRET!, ... })
