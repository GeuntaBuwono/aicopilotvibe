import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    BETTER_AUTH_SECRET: z.string().min(32).regex(/^[0-9a-f]+$/i, "BETTER_AUTH_SECRET must be a valid hex string"),
    BETTER_AUTH_URL: z.string().url(),
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
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
    POLAR_SERVER: process.env.POLAR_SERVER,
    NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_SLUG: process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_SLUG,
    NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID: process.env.NEXT_PUBLIC_POLAR_ENTERPRISE_PRODUCT_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
