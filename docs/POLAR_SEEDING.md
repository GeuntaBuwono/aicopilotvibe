# Polar.sh Integration & Database Seeding Guide

This guide explains how to seed your database with users that are integrated with Polar.sh sandbox, creating both local database records and corresponding customers in Polar.sh.

## Overview

The enhanced seeding system creates:
- **Local users** in your PostgreSQL database
- **Polar.sh customers** in the Polar.sh sandbox
- **Mock subscriptions** for testing different subscription states
- **Sample orders** linking local and Polar.sh data

## Prerequisites

### 1. Polar.sh Account Setup

1. **Create Polar.sh Account**:
   - Visit [polar.sh](https://polar.sh) and create an account
   - Set up your organization

2. **Get API Credentials**:
   - Go to your [Polar.sh Dashboard](https://polar.sh/dashboard)
   - Navigate to **Settings > API Keys**
   - Create a new **Sandbox** API key
   - Copy your **Organization ID** from the dashboard

3. **Environment Variables**:
   ```bash
   # Add to your .env file
   POLAR_ACCESS_TOKEN=polar_at_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   POLAR_ORGANIZATION_ID=your-org-id-from-polar-dashboard
   POLAR_WEBHOOK_SECRET=polar_wh_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   POLAR_SERVER=sandbox
   ```

### 2. Database Setup

Ensure your database is set up and migrated:
```bash
pnpm db:push  # or pnpm db:migrate
```

## Seeding Options

### Single Command for All Features
```bash
pnpm db:seed
```
This command now automatically:
- Creates users in your local database
- Creates customers in Polar.sh sandbox (if `POLAR_ACCESS_TOKEN` is set)
- Handles both scenarios gracefully with appropriate logging

**With Polar.sh Integration**: When `POLAR_ACCESS_TOKEN` is provided, creates both local users and Polar.sh customers.

**Without Polar.sh Integration**: When no token is provided, creates only local users with helpful warnings.

## What Gets Created

### Admin Users (Local Only)
- **Super Admin**: `admin@aicopilotvibe.com` / `admin123`
- **Admin**: `support@aicopilotvibe.com` / `admin456`

### Regular Users with Polar.sh Integration

#### Active Subscription Users
- **John Doe**: `user1@example.com` / `user123`
  - Country: US
  - Status: Active subscription
  - Enterprise credentials included

- **Jane Smith**: `user2@example.com` / `user234`
  - Country: CA
  - Status: Active subscription
  - Enterprise credentials included

- **Bob Johnson**: `user3@example.com` / `user345`
  - Country: GB
  - Status: Trialing subscription
  - Enterprise credentials included

#### Pending Users (Polar.sh customers, no subscriptions)
- **Pending User 1**: `pending1@example.com` / `pending123` (US)
- **Pending User 2**: `pending2@example.com` / `pending234` (DE)

#### Expired Subscription Users
- **Expired User 1**: `expired1@example.com` / `expired123` (FR)
- **Expired User 2**: `expired2@example.com` / `expired234` (IT)

#### Cancelled Subscription Users
- **Cancelled User 1**: `cancelled1@example.com` / `cancelled123` (ES)
- **Cancelled User 2**: `cancelled2@example.com` / `cancelled234` (NL)

#### Inactive Users (Local Only)
- **Inactive User 1**: `inactive1@example.com` / `inactive123` (email not verified)
- **Inactive User 2**: `inactive2@example.com` / `inactive234`

## Seed Script Architecture

### Modular Structure

The seeding system is now organized in a modular way:

#### `db/seed/index.ts` (Main Orchestrator)
- **Purpose**: Entry point that coordinates all seeding operations
- **Features**: 
  - Calls individual seed modules
  - Provides comprehensive reporting
  - Handles environment detection
  - Manages error handling

#### `db/seed/auth-seed.ts` (Authentication Module)
- **Purpose**: Handles all user and authentication-related seeding
- **Features**:
  - Creates users in local database
  - Integrates with Polar.sh customer creation
  - Manages different user types and subscription states
  - Creates sample orders

### Core Functions in auth-seed.ts

#### `createPolarCustomer(userData, profileData)`
Creates a customer in Polar.sh sandbox with:
- External ID (UUID)
- Email address
- Name
- Billing address (country)
- Organization association

#### `createPolarSubscription(customerId, status)`
Creates mock subscription data for testing different states:
- `active`: Active subscription
- `trialing`: Trial period
- `expired`: Expired subscription
- `cancelled`: Cancelled subscription

#### `createUser(userData, profileData)`
Creates both local user and optionally Polar.sh customer:
- Local database user record
- Password hash for authentication
- Optional Polar.sh customer creation
- Optional subscription simulation

#### `seedAuth()` (Main Export)
Main function that orchestrates user creation:
- Returns structured data about created users
- Handles Polar.sh integration gracefully
- Provides detailed logging and error handling

## Testing Subscription Status

### Using the API

The enhanced `lib/payments.ts` provides functions to interact with Polar.sh:

```typescript
import { hasActiveSubscription, getCustomerSubscriptions } from '@/lib/payments'

// Check if user has active subscription
const isActive = await hasActiveSubscription(userId)

// Get all customer subscriptions
const subscriptions = await getCustomerSubscriptions(customerId)
```

### Available Functions

- `getOrCreatePolarCustomer(email, externalId)`: Get existing or create new customer
- `getCustomerSubscriptions(customerId)`: Get all subscriptions for a customer
- `hasActiveSubscription(userId)`: Check if user has any active subscription
- `getSubscriptionStatus(subscriptionId)`: Get detailed subscription information
- `syncSubscriptionStatus(userId, subscriptionId)`: Sync status with local database

## Error Handling

The seeding script includes comprehensive error handling:

- **Missing API Token**: Exits with clear error message
- **Polar.sh API Failures**: Warns but continues with local user creation
- **Database Errors**: Rolls back and reports specific failures
- **Network Issues**: Retries and graceful degradation

## Verification

### Check Local Database
```sql
SELECT id, name, email, role, country_code FROM "user";
```

### Check Polar.sh Dashboard
1. Visit [Polar.sh Dashboard](https://polar.sh/dashboard)
2. Navigate to **Customers** section
3. Verify created customers appear with correct details

### Test API Integration
```bash
# Start your development server
pnpm dev

# Test login with seeded users
# Visit http://localhost:3000/sign-in
# Use any of the seeded user credentials
```

## Troubleshooting

### Common Issues

1. **"POLAR_ACCESS_TOKEN not found"**
   - Ensure you've set the environment variable
   - Check the token is valid and for sandbox environment

2. **"Failed to create Polar.sh customer"**
   - Verify organization ID is correct
   - Check API token has proper permissions
   - Ensure sandbox mode is enabled

3. **"Customer creation/retrieval failed"**
   - Check internet connection
   - Verify Polar.sh service status
   - Review API rate limits

### Debug Mode

Enable detailed logging by setting:
```bash
DEBUG=true pnpm db:seed:polar
```

## Production Considerations

### Before Going Live

1. **Switch to Production Mode**:
   ```bash
   POLAR_SERVER=production
   ```

2. **Update API Tokens**:
   - Generate production API tokens
   - Update webhook secrets
   - Configure production organization ID

3. **Data Migration**:
   - Export sandbox customer data if needed
   - Set up production webhook endpoints
   - Test subscription flows thoroughly

### Security Notes

- Never commit API tokens to version control
- Use environment-specific configurations
- Regularly rotate API keys
- Monitor API usage and rate limits

## Integration with Webhooks

The seeded data works with your webhook handlers in `app/api/webhooks/polar/route.ts`:

- Subscription creation events
- Payment status updates
- Customer data changes
- Subscription cancellations

## Next Steps

1. **Product Setup**: Create products in Polar.sh dashboard
2. **Checkout Flow**: Implement subscription purchase flow
3. **Customer Portal**: Set up customer self-service portal
4. **Analytics**: Monitor subscription metrics
5. **Testing**: Create comprehensive test suites

## Support

For issues related to:
- **Polar.sh API**: Check [Polar.sh Documentation](https://docs.polar.sh)
- **Integration Issues**: Review webhook logs and API responses
- **Database Problems**: Check Drizzle ORM documentation

---

**Happy seeding! 🌱**
