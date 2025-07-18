import { PRICING_CONFIG } from "./pricing"

/**
 * Product Configuration
 *
 * This file contains product definitions and features.
 * The pricing is automatically imported from pricing.ts
 */

export const PRODUCT_FEATURES = [
  "GitHub Access Included",
  "Daily Token Resets",
  "No Token Limits",
  "24-Hour Setup Process",
  "Email Delivery",
  "Limited Users Only",
  "No Social Media Presence",
] as const

export const PRODUCT_INFO = {
  name: "GitHub Access + Token Reset",
  description: "Email service with GitHub access and unlimited daily token resets",
  cta: "Get Early Access",
  popular: true,
  color: "gradient",
  features: PRODUCT_FEATURES,
  ...PRICING_CONFIG,
} as const

// Export the complete product configuration
export const PRICING_PLANS = [PRODUCT_INFO] as const

// Default export for easy importing
export default PRODUCT_INFO
