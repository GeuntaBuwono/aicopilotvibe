import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { cancelSubscription, createSubscription, getSubscriptionStatus } from "@/lib/payments"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: userId, email } = session.user

    const subscription = await createSubscription(userId, email)

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
    })
  } catch (error) {
    console.error("Subscription creation failed:", error)
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { subscriptionId } = (await request.json()) as { subscriptionId: string }

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID required" }, { status: 400 })
    }

    const subscription = await cancelSubscription(subscriptionId)

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
    })
  } catch (error) {
    console.error("Subscription cancellation failed:", error)
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const subscriptionId = searchParams.get("subscriptionId")

    if (!subscriptionId) {
      return NextResponse.json({ error: "Subscription ID required" }, { status: 400 })
    }

    const subscription = await getSubscriptionStatus(subscriptionId)

    return NextResponse.json({
      subscriptionId: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
    })
  } catch (error) {
    console.error("Subscription status retrieval failed:", error)
    return NextResponse.json({ error: "Failed to get subscription status" }, { status: 500 })
  }
}
