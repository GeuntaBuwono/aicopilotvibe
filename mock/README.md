# Mock Data Configuration

This folder contains centralized configuration for pricing, products, and other mock data used throughout the application.

## 📁 File Structure

```
mock/
├── README.md          # This documentation file
├── index.ts          # Main exports for all mock data
├── pricing.ts        # Pricing configuration and constants
├── products.ts       # Product definitions and features
└── test-users.ts     # Test user credentials for E2E testing
```

## 💰 Pricing Configuration

### Quick Price Update

To change the product price, simply update the `PRODUCT_PRICE` constant in `pricing.ts`:

```typescript
// Change this value to update pricing everywhere
export const PRODUCT_PRICE = 150 // ← Update this number
```

### Available Pricing Constants

- `PRODUCT_PRICE` - Main product price (currently $150)
- `ORIGINAL_PRICE` - Original price for discount calculations ($899)
- `DISCOUNT_PERCENTAGE` - Automatically calculated discount percentage
- `PRICING_CONFIG` - Complete pricing configuration object

### Usage Examples

```typescript
// Import individual values
import { PRODUCT_PRICE, ORIGINAL_PRICE } from "@/mock/pricing"

// Import complete configuration
import { PRICING_CONFIG } from "@/mock/pricing"

// Import everything
import { price, originalPrice, discountPercentage } from "@/mock/pricing"
```

## 🛍️ Product Configuration

The `products.ts` file contains:

- Product features list
- Product information and metadata
- Complete pricing plans array
- Automatically imports pricing from `pricing.ts`

### Usage

```typescript
// Import pricing plans
import { PRICING_PLANS } from "@/mock/products"

// Import product info
import { PRODUCT_INFO, PRODUCT_FEATURES } from "@/mock/products"

// Import default product
import PRODUCT from "@/mock/products"
```

## 🔄 How It Works

1. **Centralized Pricing**: All pricing is defined in `pricing.ts`
2. **Automatic Updates**: When you change `PRODUCT_PRICE`, it updates everywhere
3. **Type Safety**: All exports are properly typed with TypeScript
4. **Easy Imports**: Use the main `index.ts` or import specific files

## 🎯 Benefits

- ✅ **Single Source of Truth**: Change price in one place
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Easy Maintenance**: Clear file organization
- ✅ **Automatic Calculations**: Discount percentages calculated automatically
- ✅ **Consistent Data**: Same pricing used across all components

## 🧪 Test Users Configuration

The `test-users.ts` file contains test user credentials that correspond to seeded users in the database:

### Available Test Users

```typescript
// Import test users
import { TEST_USERS, ADMIN_USERS, REGULAR_USERS } from "@/mock/test-users"

// Admin users
TEST_USERS.adminUser      // support@aicopilotvibe.com / admin456
TEST_USERS.superAdmin     // admin@aicopilotvibe.com / admin123

// Regular users with different statuses
TEST_USERS.regularUser    // user1@example.com / user123 (paid)
TEST_USERS.pendingUser    // pending1@example.com / pending123
TEST_USERS.inactiveUser   // inactive1@example.com / inactive123
TEST_USERS.expiredUser    // expired1@example.com / expired123
TEST_USERS.cancelledUser  // cancelled1@example.com / cancelled123
```

### Helper Functions

```typescript
// Get users by role or status
getUserByRole("admin")        // Returns first admin user
getUserByStatus("inactive")   // Returns first inactive user
getAllUsersByRole("user")     // Returns all regular users

// Quick access collections
ADMIN_USERS.admin            // Admin user shortcut
REGULAR_USERS.paid           // Paid user shortcut
```

## 🚀 Quick Start

1. **Change the price**: Edit `PRODUCT_PRICE` in `pricing.ts`
2. **Update features**: Modify `PRODUCT_FEATURES` in `products.ts`
3. **Add new products**: Extend the configuration in `products.ts`
4. **Update test users**: Modify credentials in `test-users.ts`

That's it! The changes will automatically propagate throughout the application.
