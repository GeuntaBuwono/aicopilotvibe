import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { handlePaymentFailure, handlePaymentSuccess, /* polar, */ syncSubscriptionStatus } from "@/lib/payments"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = (await headers()).get("polar-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    // Parse webhook event (TODO: implement proper verification)
    const event = JSON.parse(body) as { type: string; data: { id: string; metadata: { userId: string } } }

    console.log("Received Polar webhook:", event.type)

    switch (event.type) {
      case "checkout.session.completed":
        const { userId } = event.data.metadata
        await handlePaymentSuccess(event.data.id, userId)
        console.log("Payment completed for user:", userId)
        break

      case "checkout.session.failed":
        const { userId: failedUserId } = event.data.metadata
        await handlePaymentFailure(event.data.id, failedUserId)
        console.log("Payment failed for user:", failedUserId)
        break

      case "subscription.created":
        const { userId: subUserId } = event.data.metadata
        await syncSubscriptionStatus(subUserId, event.data.id)
        console.log("Subscription created for user:", subUserId)
        break

      case "subscription.updated":
        const { userId: updateUserId } = event.data.metadata
        await syncSubscriptionStatus(updateUserId, event.data.id)
        console.log("Subscription updated for user:", updateUserId)
        break

      case "subscription.canceled":
        const { userId: cancelUserId } = event.data.metadata
        await syncSubscriptionStatus(cancelUserId, event.data.id)
        console.log("Subscription canceled for user:", cancelUserId)
        break

      case "subscription.invoice.paid":
        const { userId: paidUserId } = event.data.metadata
        await handlePaymentSuccess(event.data.id, paidUserId)
        console.log("Subscription invoice paid for user:", paidUserId)
        break

      case "subscription.invoice.failed":
        const { userId: invoiceFailedUserId } = event.data.metadata
        await handlePaymentFailure(event.data.id, invoiceFailedUserId)
        console.log("Subscription invoice failed for user:", invoiceFailedUserId)
        break

      default:
        console.log("Unhandled Polar webhook event type:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
