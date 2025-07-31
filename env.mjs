import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

/**
 * Get fallback URL based on environment context
 * - Production: Use production domain
 * - Development: Use localhost:3000
 * - GitHub Actions/CI: Use localhost (for build processes)
 * - Browser: Use window.location.origin if available
 */
function getAppUrlFallback() {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined"

  // Check for common CI environment indicators
  const isCI = process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true" || process.env.NODE_ENV === "test"

  // Production environment
  if (process.env.NODE_ENV === "production" && !isCI) {
    return window.location.origin
  }

  // Development environment with browser context
  if (isBrowser && !isCI) {
    return window.location.origin
  }

  // CI/GitHub Actions or server-side build context
  if (isCI || !isBrowser) {
    return "http://localhost:3000"
  }

  // Final fallback
  return "http://localhost:3000"
}

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    BETTER_AUTH_SECRET: z
      .string()
      .min(32)
      .regex(/^[0-9a-f]+$/i, "BETTER_AUTH_SECRET must be a valid hex string"),
    DATABASE_URL: z.string().url(),
    POLAR_ACCESS_TOKEN: z.string(),
    POLAR_WEBHOOK_SECRET: z.string(),
    POLAR_SERVER: z.enum(["production", "sandbox"]).default("sandbox"),
    NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_SLUG: z.string(),
    NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID: z.string(),
    RESEND_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
    POLAR_SERVER: process.env.POLAR_SERVER,
    NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_SLUG: process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_SLUG,
    NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID: process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || getAppUrlFallback(),
  },
})
