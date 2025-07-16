import { Polar } from "@polar-sh/sdk"
import { eq } from "drizzle-orm"
import { db } from "@/db/index"
import { /* authSchema, */ businessSchema } from "@/db/schema"

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
})

export async function createCheckoutSession(userId: string, userEmail: string) {
  try {
    const checkoutSession = await polar.checkouts.create({
      customerBillingAddress: {
        country: "US",
      },
      products: [process.env.POLAR_PRODUCT_ID!],
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?checkout_id={CHECKOUT_ID}`,
      externalCustomerId: userId,
      metadata: {
        userId,
        userEmail,
      },
    })

    return {
      id: checkoutSession.id,
      url: checkoutSession.url,
      clientSecret: checkoutSession.clientSecret,
      expiresAt: checkoutSession.expiresAt,
    }
  } catch (error) {
    console.error("Failed to create checkout session:", error)
    throw new Error("Payment session creation failed")
  }
}

export async function handlePaymentSuccess(paymentId: string, userId: string) {
  try {
    // Update user profile subscription status
    await db
      .update(businessSchema.userProfile)
      .set({
        subscriptionStatus: "paid",
        paymentDate: new Date(),
        subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        updatedAt: new Date(),
      })
      .where(eq(businessSchema.userProfile.userId, userId))

    // Create order record
    await db.insert(businessSchema.emailOrders).values({
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
    await db.insert(businessSchema.emailLogs).values({
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

    let status = "inactive"
    let expiresAt = null

    if (subscription.status === "active") {
      status = "paid"
      expiresAt = new Date(subscription.currentPeriodEnd)
    } else if (subscription.status === "canceled") {
      status = "cancelled"
    } else if (subscription.status === "past_due") {
      status = "expired"
    }

    await db
      .update(businessSchema.userProfile)
      .set({
        subscriptionStatus: status,
        subscriptionExpiresAt: expiresAt,
        updatedAt: new Date(),
      })
      .where(eq(businessSchema.userProfile.userId, userId))

    return { status, expiresAt }
  } catch (error) {
    console.error("Failed to sync subscription status:", error)
    throw new Error("Subscription sync failed")
  }
}
