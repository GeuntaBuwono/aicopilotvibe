"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth, canAccessAdmin } from "@/lib/auth"
import { actionClient } from "@/lib/safe-action"
import { formSchemas } from "@/lib/validation-utils"

// Use the centralized validation schemas
const signInSchema = formSchemas.signIn
const signUpSchema = formSchemas.signUp

export const signInAction = actionClient
  .inputSchema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const result = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      })

      if (result.user) {
        // Get the full session to access user role information
        const session = await auth.api.getSession({
          headers: await headers(),
        })

        // Role-based redirect after successful sign-in
        const redirectPath = session?.user && canAccessAdmin(session.user) ? "/admin" : "/dashboard"
        redirect(redirectPath)
      }

      // If we reach here, authentication failed
      throw new Error("Invalid email or password")
    } catch (error) {
      // Re-throw NEXT_REDIRECT errors to allow proper navigation
      if (isRedirectError(error)) {
        throw error
      }

      console.error("Sign in error:", error)
      throw new Error("Invalid email or password")
    }
  })

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    try {
      const result = await auth.api.signUpEmail({
        body: {
          email,
          password,
          name,
        },
      })

      if (result.user) {
        // Allow NEXT_REDIRECT to propagate - don't catch it
        redirect("/sign-in")
      }

      // If we reach here, signup failed
      throw new Error("Failed to create account. Please try again.")
    } catch (error) {
      // Re-throw NEXT_REDIRECT errors to allow proper navigation
      if (isRedirectError(error)) {
        throw error
      }

      console.error("Sign up error:", error)
      throw new Error("Failed to create account. Please try again.")
    }
  })

export const signOutAction = actionClient.action(async () => {
  try {
    await auth.api.signOut({ headers: { "Content-Type": "application/json" } })
    // Allow NEXT_REDIRECT to propagate - don't catch it
    redirect("/")
  } catch (error) {
    // Re-throw NEXT_REDIRECT errors to allow proper navigation
    if (isRedirectError(error)) {
      throw error
    }

    console.error("Sign out error:", error)
    throw new Error("Failed to sign out")
  }
})
