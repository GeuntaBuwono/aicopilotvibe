/**
 * Test Script: Price Change Demonstration
 *
 * This script demonstrates how changing the PRODUCT_PRICE in pricing.ts
 * automatically updates all related calculations and configurations.
 */

import { PRODUCT_PRICE, ORIGINAL_PRICE, DISCOUNT_PERCENTAGE, PRICING_CONFIG } from "./pricing"
import { PRODUCT_INFO, PRICING_PLANS } from "./products"

console.log("🎯 Current Pricing Configuration:")
console.log("================================")
console.log(`💰 Product Price: $${PRODUCT_PRICE}`)
console.log(`💸 Original Price: $${ORIGINAL_PRICE}`)
console.log(`🎉 Discount: ${DISCOUNT_PERCENTAGE}%`)
console.log(`💵 You Save: $${ORIGINAL_PRICE - PRODUCT_PRICE}`)

console.log("\n📦 Product Information:")
console.log("=======================")
console.log(`📝 Name: ${PRODUCT_INFO.name}`)
console.log(`💰 Price: $${PRODUCT_INFO.price}/${PRODUCT_INFO.billingPeriod}`)
console.log(`🏷️  Discount: ${PRODUCT_INFO.discountPercentage}%`)

console.log("\n🛒 Pricing Plans Array:")
console.log("=======================")
PRICING_PLANS.forEach((plan, index) => {
  console.log(`Plan ${index + 1}: ${plan.name}`)
  console.log(`  💰 Price: $${plan.price}`)
  console.log(`  🏷️  Discount: ${plan.discountPercentage}%`)
  console.log(`  ✨ Features: ${plan.features.length} items`)
})

console.log("\n✅ All values are automatically synchronized!")
console.log("💡 To change the price, simply update PRODUCT_PRICE in pricing.ts")

// Example: Simulate price change calculation
const newPrice = 200
const newDiscount = Math.round((1 - newPrice / ORIGINAL_PRICE) * 100)
console.log(`\n🔮 If you change PRODUCT_PRICE to $${newPrice}:`)
console.log(`   📊 New discount would be: ${newDiscount}%`)
console.log(`   💵 New savings would be: $${ORIGINAL_PRICE - newPrice}`)

export { PRODUCT_PRICE, PRICING_CONFIG, PRODUCT_INFO }
