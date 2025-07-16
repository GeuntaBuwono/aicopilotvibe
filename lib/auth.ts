import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/db/index"
import { authSchema, businessSchema } from "@/db/schema"

export const schema = {
  auth: authSchema,
  business: businessSchema,
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  schema: {
    ...schema,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
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
  plugins: [nextCookies()], // make sure this is the last plugin in the array
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
