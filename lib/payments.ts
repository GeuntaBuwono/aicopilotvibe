import { Polar } from "@polar-sh/sdk"
import { eq } from "drizzle-orm"
import { db } from "@/db/index"
import { emailLogs, emailOrders, user } from "@/db/schema"

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
})

export async function handlePaymentSuccess(paymentId: string, userId: string) {
  try {
    // Note: Subscription status is now managed by Polar.sh SDK
    // We only update the lastLogin to track activity
    await db
      .update(user)
      .set({
        lastLogin: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))

    // Create order record
    await db.insert(emailOrders).values({
      userId,
      status: "pending",
      paymentId,
      priority: "normal",
    })

    return true
  } catch (error) {
    console.error("Failed to handle payment success:", error)
    throw new Error("Payment processing failed")
  }
}

export async function handlePaymentFailure(paymentId: string, userId: string) {
  try {
    // Log the failed payment attempt
    await db.insert(emailLogs).values({
      userId,
      emailType: "payment_failed",
      recipientEmail: "", // Will be populated from user data
      subject: "Payment Failed",
      status: "failed",
      errorMessage: `Payment failed for payment ID: ${paymentId}`,
    })

    return true
  } catch (error) {
    console.error("Failed to handle payment failure:", error)
    throw new Error("Payment failure processing failed")
  }
}

export async function createSubscription(userId: string, userEmail: string) {
  try {
    // Note: This is a placeholder implementation
    const subscription = {
      id: `sub_${Date.now()}`,
      status: "active",
      userId,
      userEmail,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }

    return subscription
  } catch (error) {
    console.error("Failed to create subscription:", error)
    throw new Error("Subscription creation failed")
  }
}

export async function cancelSubscription(subscriptionId: string) {
  try {
    // Note: This is a placeholder implementation
    const subscription = {
      id: subscriptionId,
      status: "canceled",
      cancelAtPeriodEnd: true,
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }

    return subscription
  } catch (error) {
    console.error("Failed to cancel subscription:", error)
    throw new Error("Subscription cancellation failed")
  }
}

export async function getSubscriptionStatus(subscriptionId: string) {
  try {
    // Note: This is a placeholder implementation
    const subscription = {
      id: subscriptionId,
      status: "active",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    }

    return subscription
  } catch (error) {
    console.error("Failed to get subscription status:", error)
    throw new Error("Subscription status retrieval failed")
  }
}

// Helper function to sync subscription status with local database
export async function syncSubscriptionStatus(userId: string, subscriptionId: string) {
  try {
    const subscription = await getSubscriptionStatus(subscriptionId)

    // Note: Subscription status is now managed via Polar.sh SDK
    // We only update lastLogin to track user activity
    await db
      .update(user)
      .set({
        lastLogin: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))

    // Return subscription data from Polar.sh instead of local DB
    return {
      status: subscription.status,
      expiresAt: new Date(subscription.currentPeriodEnd),
    }
  } catch (error) {
    console.error("Failed to sync subscription status:", error)
    throw new Error("Subscription sync failed")
  }
}
