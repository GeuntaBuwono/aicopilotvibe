import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth"
import { Polar } from "@polar-sh/sdk"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/db/index"
import { authSchema, businessSchema } from "@/db/schema"

export const schema = {
  auth: authSchema,
  business: businessSchema,
}

// Initialize Polar SDK client
const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: (process.env.POLAR_SERVER as "production" | "sandbox") || "sandbox",
})

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...authSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
      subscriptionStatus: {
        type: "string",
        defaultValue: "inactive",
      },
    },
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID!,
              slug: process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_SLUG!,
            },
          ],
          successUrl: "/payment/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onOrderPaid: async (payload) => {
            console.log("Order paid:", payload)
            // Update user subscription status
            // This will be handled in the webhook route
          },
          onSubscriptionCreated: async (payload) => {
            console.log("Subscription created:", payload)
          },
          onSubscriptionCanceled: async (payload) => {
            console.log("Subscription canceled:", payload)
          },
        }),
      ],
    }),
    nextCookies(), // make sure this is the last plugin in the array
  ],
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user

// Role-based access control helpers
export function isAdmin(user: User): boolean {
  return user.role === "admin" || user.role === "super_admin"
}

export function isSuperAdmin(user: User): boolean {
  return user.role === "super_admin"
}

export function canAccessAdmin(user: User): boolean {
  return isAdmin(user)
}

export function canManageUsers(user: User): boolean {
  return isSuperAdmin(user)
}

export function canAssignOrders(user: User): boolean {
  return isAdmin(user)
}

export function hasActiveSubscription(user: User): boolean {
  return user.subscriptionStatus === "paid" || user.subscriptionStatus === "active"
}

export function canAccessCopilot(user: User): boolean {
  return hasActiveSubscription(user) || isAdmin(user)
}
