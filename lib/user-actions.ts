"use server"

import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { db } from "@/db/index"
import { user } from "@/db/schema"
import { auth } from "@/lib/auth"

export interface CustomFields {
  enterpriseEmail?: string
  countryCode?: string
}

export async function getCustomFields(userId?: string): Promise<CustomFields> {
  try {
    // Get session for current user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      throw new Error("Unauthorized")
    }

    const targetUserId = userId || session.user.id

    // Get custom fields from user table (enterpriseEmail, countryCode)
    const result = await db
      .select({
        enterpriseEmail: user.enterpriseEmail,
        countryCode: user.countryCode,
      })
      .from(user)
      .where(eq(user.id, targetUserId))
      .limit(1)

    if (result.length === 0) {
      return {}
    }

    const userData = result[0]
    return {
      enterpriseEmail: userData?.enterpriseEmail || undefined,
      countryCode: userData?.countryCode || undefined,
    }
  } catch (error) {
    console.error("Error fetching custom fields:", error)
    return {}
  }
}

export async function updateCustomFields(fields: CustomFields): Promise<{ success: boolean; error?: string }> {
  try {
    // Get session for current user
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" }
    }

    // Update custom fields in user table
    await db
      .update(user)
      .set({
        enterpriseEmail: fields.enterpriseEmail,
        countryCode: fields.countryCode,
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id))

    return { success: true }
  } catch (error) {
    console.error("Error updating custom fields:", error)
    return { success: false, error: "Failed to update custom fields" }
  }
}
