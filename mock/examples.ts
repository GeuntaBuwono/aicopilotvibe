/**
 * Usage Examples for Mock Data
 *
 * This file demonstrates how to use the pricing and product configuration
 * in different parts of your application.
 */

import { PRODUCT_PRICE, PRICING_CONFIG, DISCOUNT_PERCENTAGE } from "./pricing"
import { PRODUCT_INFO, PRICING_PLANS } from "./products"

// Example 1: Using individual pricing values
export function formatPrice() {
  return `$${PRODUCT_PRICE}/month`
}

// Example 2: Using the complete pricing config
export function getPricingDisplay() {
  return {
    price: `${PRICING_CONFIG.currencySymbol}${PRICING_CONFIG.price}`,
    period: PRICING_CONFIG.billingPeriodLabel,
    discount: `${PRICING_CONFIG.discountPercentage}% off`,
    originalPrice: `${PRICING_CONFIG.currencySymbol}${PRICING_CONFIG.originalPrice}`,
  }
}

// Example 3: Using product information
export function getProductSummary() {
  return {
    name: PRODUCT_INFO.name,
    description: PRODUCT_INFO.description,
    price: PRODUCT_INFO.price,
    features: PRODUCT_INFO.features,
    savings: `Save ${DISCOUNT_PERCENTAGE}%`,
  }
}

// Example 4: Using in API responses
export function getCheckoutData() {
  return {
    productId: "github-access-token-reset",
    amount: PRODUCT_PRICE * 100, // Convert to cents for payment processors
    currency: PRICING_CONFIG.currency.toLowerCase(),
    description: PRODUCT_INFO.description,
    metadata: {
      productName: PRODUCT_INFO.name,
      originalPrice: PRICING_CONFIG.originalPrice,
      discountApplied: DISCOUNT_PERCENTAGE,
    },
  }
}

// Example 5: Using for email templates
export function getEmailPricingData() {
  return {
    productName: PRODUCT_INFO.name,
    monthlyPrice: formatPrice(),
    savings: `You're saving ${DISCOUNT_PERCENTAGE}% (${PRICING_CONFIG.currencySymbol}${
      PRICING_CONFIG.originalPrice - PRICING_CONFIG.price
    })`,
    features: PRODUCT_INFO.features.join(", "),
  }
}

// Example 6: Conditional pricing logic
export function shouldShowDiscount() {
  return PRICING_CONFIG.discountPercentage > 0
}

export function getDiscountBadge() {
  if (!shouldShowDiscount()) return null

  return {
    text: `${DISCOUNT_PERCENTAGE}% OFF`,
    originalPrice: PRICING_CONFIG.originalPrice,
    savings: PRICING_CONFIG.originalPrice - PRICING_CONFIG.price,
  }
}
