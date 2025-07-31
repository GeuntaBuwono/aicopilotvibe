import { Polar } from "@polar-sh/sdk"
import { eq } from "drizzle-orm"
import { db } from "@/db/index"
import { emailLogs, emailOrders, user } from "@/db/schema"

// Define Subscription type based on Polar SDK structure
interface PolarSubscription {
  id: string
  status: string
  customerId: string
  productId: string
  currentPeriodEnd: Date | null
  cancelAtPeriodEnd?: boolean
  [key: string]: unknown
}

// Initialize Polar SDK conditionally
let polar: Polar | null = null
if (process.env.POLAR_ACCESS_TOKEN) {
  polar = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
  })
}

// Export polar for external use, but handle null case
export { polar }

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
    // First, get or create customer in Polar.sh
    const customer = await getOrCreatePolarCustomer(userEmail, userId)
    
    // Note: In real implementation, subscriptions are created through checkout flow
    // This would typically involve:
    // 1. Creating a checkout session
    // 2. Redirecting user to Polar.sh checkout
    // 3. Handling the webhook when subscription is created
    
    const subscription = {
      id: `sub_${Date.now()}`,
      status: "active",
      userId,
      userEmail,
      customerId: customer.id,
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
  if (!polar) {
    throw new Error("Polar SDK not initialized. Please set POLAR_ACCESS_TOKEN.")
  }
  
  try {
    // Get subscription from Polar.sh
    const subscription = await polar.subscriptions.get({
      id: subscriptionId,
    })

    return {
      id: subscription.id,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      customerId: subscription.customerId,
      productId: subscription.productId,
    }
  } catch (error) {
    console.error("Failed to get subscription status:", error)
    throw new Error("Subscription status retrieval failed")
  }
}

// Helper function to get or create customer in Polar.sh
export async function getOrCreatePolarCustomer(email: string, externalId: string) {
  if (!polar) {
    throw new Error("Polar SDK not initialized. Please set POLAR_ACCESS_TOKEN.")
  }
  
  if (!process.env.POLAR_ORGANIZATION_ID) {
    throw new Error("POLAR_ORGANIZATION_ID is required")
  }
  
  try {
    // Try to find existing customer by external ID
    try {
      const customer = await polar.customers.getExternal({
        externalId: externalId,
      })
      return customer
    } catch {
      // Customer doesn't exist, create new one
      console.log(`Creating new Polar.sh customer for ${email}`)
      
      const customer = await polar.customers.create({
        externalId: externalId,
        email: email,
        organizationId: process.env.POLAR_ORGANIZATION_ID,
      })
      
      return customer
    }
  } catch (error) {
    console.error("Failed to get or create Polar.sh customer:", error)
    throw new Error("Customer creation/retrieval failed")
  }
}

// Helper function to get customer subscriptions from Polar.sh
export async function getCustomerSubscriptions(customerId: string) {
  if (!polar) {
    throw new Error("Polar SDK not initialized. Please set POLAR_ACCESS_TOKEN.")
  }
  
  try {
    const subscriptions: PolarSubscription[] = []
    const result = await polar.subscriptions.list({
      customerId: customerId,
    })
    
    for await (const page of result) {
      subscriptions.push(...page.result.items)
    }
    
    return subscriptions
  } catch (error) {
    console.error("Failed to get customer subscriptions:", error)
    throw new Error("Failed to retrieve customer subscriptions")
  }
}

// Helper function to check if user has active subscription
export async function hasActiveSubscription(userId: string, userEmail?: string) {
  if (!polar) {
    console.warn("Polar SDK not initialized. Cannot check subscription status.")
    return false
  }
  
  try {
    // Find user's Polar.sh customer
    const customer = await getOrCreatePolarCustomer(userEmail || "", userId)
    
    // Get customer's subscriptions
    const subscriptions = await getCustomerSubscriptions(customer.id)
    
    // Check if any subscription is active
    return subscriptions.some((sub: PolarSubscription) =>
      sub.status === "active" ||
      sub.status === "trialing" ||
      sub.status === "past_due"
    )
  } catch (error) {
    console.warn("Failed to check subscription status:", error)
    return false
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
      expiresAt: subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd) : new Date(),
    }
  } catch (error) {
    console.error("Failed to sync subscription status:", error)
    throw new Error("Subscription sync failed")
  }
}
