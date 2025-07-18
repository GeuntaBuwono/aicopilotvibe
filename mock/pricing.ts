/**
 * Pricing Configuration
 *
 * This file contains all pricing-related constants and configurations.
 * Update the PRODUCT_PRICE value here to change the price across the entire application.
 */

// Main product price - Change this value to update pricing everywhere
export const PRODUCT_PRICE = 150

// Original price for discount calculations
export const ORIGINAL_PRICE = 899

// Calculated discount percentage
export const DISCOUNT_PERCENTAGE = Math.round((1 - PRODUCT_PRICE / ORIGINAL_PRICE) * 100)

// Pricing configuration object
export const PRICING_CONFIG = {
  price: PRODUCT_PRICE,
  originalPrice: ORIGINAL_PRICE,
  discountPercentage: DISCOUNT_PERCENTAGE,
  currency: "USD",
  currencySymbol: "$",
  billingPeriod: "month",
  billingPeriodLabel: "/month",
} as const

// Export individual values for convenience
export { PRODUCT_PRICE as price }
export { ORIGINAL_PRICE as originalPrice }
export { DISCOUNT_PERCENTAGE as discountPercentage }
