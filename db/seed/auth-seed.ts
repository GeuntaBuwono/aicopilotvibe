import { Polar } from "@polar-sh/sdk"
import { hashPassword } from "better-auth/crypto"
import { eq } from "drizzle-orm"
import { db } from "../index"
import { authSchema, businessSchema } from "../schema"
import type { SelectUser } from "../schema/auth-schema"

// ================================
// SEED CREDENTIALS CONFIGURATION
// ================================

// Admin user credentials
const ADMIN_CREDENTIALS = {
  superAdmin: {
    name: "Super Admin",
    email: "admin@aicopilotvibe.com",
    password: "admin123",
  },
  regularAdmin: {
    name: "Support Admin",
    email: "support@aicopilotvibe.com",
    password: "admin456",
  },
} as const

// Regular user credentials (active users with subscriptions)
const REGULAR_USER_CREDENTIALS = {
  john: {
    name: "John Doe",
    email: "john.doe.test@gmail.com",
    password: "user123",
    enterpriseEmail: "john.doe@github-enterprise.com",
    enterprisePassword: "enterprise123",
  },
  jane: {
    name: "Jane Smith",
    email: "jane.smith.test@outlook.com",
    password: "user234",
    enterpriseEmail: "jane.smith@github-enterprise.com",
    enterprisePassword: "enterprise234",
  },
  bob: {
    name: "Bob Johnson",
    email: "bob.johnson.test@yahoo.com",
    password: "user345",
    enterpriseEmail: "bob.johnson@github-enterprise.com",
    enterprisePassword: "enterprise345",
  },
} as const

// Inactive user credentials (no Polar integration)
const INACTIVE_USER_CREDENTIALS = {
  inactive1: {
    name: "Inactive User 1",
    email: "inactive1@example.com",
    password: "inactive123",
  },
  inactive2: {
    name: "Inactive User 2",
    email: "inactive2@example.com",
    password: "inactive234",
  },
} as const

// Pending user credentials (Polar customers without subscriptions)
const PENDING_USER_CREDENTIALS = {
  pending1: {
    name: "Pending User 1",
    email: "pending.user1.test@gmail.com",
    password: "pending123",
  },
  pending2: {
    name: "Pending User 2",
    email: "pending.user2.test@outlook.com",
    password: "pending234",
  },
} as const

// Expired user credentials (expired subscriptions)
const EXPIRED_USER_CREDENTIALS = {
  expired1: {
    name: "Expired User 1",
    email: "expired.user1.test@gmail.com",
    password: "expired123",
  },
  expired2: {
    name: "Expired User 2",
    email: "expired.user2.test@yahoo.com",
    password: "expired234",
  },
} as const

// Cancelled user credentials (cancelled subscriptions)
const CANCELLED_USER_CREDENTIALS = {
  cancelled1: {
    name: "Cancelled User 1",
    email: "cancelled.user1.test@outlook.com",
    password: "cancelled123",
  },
  cancelled2: {
    name: "Cancelled User 2",
    email: "cancelled.user2.test@gmail.com",
    password: "cancelled234",
  },
} as const

// Initialize Polar SDK for sandbox (conditionally)
let polar: Polar | null = null
if (process.env.POLAR_ACCESS_TOKEN) {
  polar = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: "sandbox", // Always use sandbox for seeding
  })
}

// Types for our seed data
interface SeedUserData {
  name: string
  email: string
  password: string
}

interface SeedProfileData {
  role: "user" | "admin" | "super_admin"
  emailVerified?: boolean
  enterpriseEmail?: string
  enterprisePassword?: string
  countryCode?: string
  createPolarCustomer?: boolean
  subscriptionStatus?: "active" | "cancelled" | "expired" | "trialing"
}

interface CreateUserResult {
  user: SelectUser
  polarCustomer?: {
    id: string
    email: string
    name: string | null
    [key: string]: unknown
  }
  polarSubscription?: {
    id: string
    status: string
    customerId: string
  }
}

// Helper function to create customers in Polar.sh
const createPolarCustomer = async (userData: SeedUserData, profileData: SeedProfileData, userId: string) => {
  if (!polar) {
    throw new Error("Polar SDK not initialized")
  }
  
  try {
    console.log(`📡 Creating Polar.sh customer for ${userData.email}...`)
    
    // When using an organization token, organizationId should not be included
    const customer = await polar.customers.create({
      externalId: userId, // Use the actual user ID as external ID for better-auth compatibility
      email: userData.email,
      name: userData.name,
      billingAddress: {
        country: profileData.countryCode || "US",
      },
      // Note: organizationId is omitted when using organization token
    })

    console.log(`✅ Created Polar.sh customer: ${customer.id} with externalId: ${userId}`)
    return customer
  } catch (error) {
    console.error(`❌ Failed to create Polar.sh customer for ${userData.email}:`, error)
    throw error
  }
}

// Helper function to create subscription in Polar.sh (if you have products set up)
const createPolarSubscription = async (customerId: string, subscriptionStatus: string) => {
  try {
    // Note: This is a placeholder. In real Polar.sh, subscriptions are created through checkout flow
    // For testing, you would typically create them manually in the Polar.sh dashboard
    console.log(`📊 Would create ${subscriptionStatus} subscription for customer ${customerId}`)
    
    // Return mock subscription data for local database
    return {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      status: subscriptionStatus,
      customerId,
    }
  } catch (error) {
    console.error(`❌ Failed to create subscription:`, error)
    throw error
  }
}

// Helper function to create users with profiles and optional Polar.sh integration
const createUser = async (userData: SeedUserData, profileData: SeedProfileData): Promise<CreateUserResult> => {
  // Check if user already exists
  const existingUsers = await db
    .select()
    .from(authSchema.user)
    .where(eq(authSchema.user.email, userData.email))
    .limit(1)

  const existingUser = existingUsers[0]

  if (existingUser) {
    console.log(`⏭️  User ${userData.email} already exists, skipping creation`)
    
    let polarCustomer: {
      id: string
      email: string
      name: string | null
      [key: string]: unknown
    } | undefined = undefined
    let polarSubscription: {
      id: string
      status: string
      customerId: string
    } | undefined = undefined

    // Check if we need to create missing Polar.sh resources for existing user
    if (profileData.createPolarCustomer && polar) {
      try {
        console.log(`🔍 Checking Polar.sh resources for existing user ${userData.email}...`)
        
        // Try to find existing Polar customer by email
        // Note: In a real implementation, you might want to store the Polar customer ID
        // in your database to avoid this lookup
        try {
          // For existing users, use their existing ID for Polar customer creation
          polarCustomer = await createPolarCustomer(userData, profileData, existingUser.id)
          
          // Create subscription if status is specified
          if (profileData.subscriptionStatus && polarCustomer) {
            polarSubscription = await createPolarSubscription(polarCustomer.id, profileData.subscriptionStatus)
          }
        } catch {
          console.log(`ℹ️  Polar.sh resources may already exist for ${userData.email} or creation failed`)
        }
      } catch {
        console.warn(`⚠️  Failed to check/create Polar.sh resources for existing user ${userData.email}`)
      }
    }

    return {
      user: existingUser,
      polarCustomer: polarCustomer,
      polarSubscription: polarSubscription
    }
  }

  // User doesn't exist, proceed with creation
  // Generate user ID first - this will be used for both local user and Polar customer
  const userId = crypto.randomUUID()
  const hashedPassword = await hashPassword(userData.password)
  let polarCustomer: {
    id: string
    email: string
    name: string | null
    [key: string]: unknown
  } | undefined = undefined
  let polarSubscription: {
    id: string
    status: string
    customerId: string
  } | undefined = undefined

  // Create Polar.sh customer if specified - use the generated userId as externalId
  if (profileData.createPolarCustomer) {
    try {
      polarCustomer = await createPolarCustomer(userData, profileData, userId)
      
      // Create subscription if status is specified
      if (profileData.subscriptionStatus && polarCustomer) {
        polarSubscription = await createPolarSubscription(polarCustomer.id, profileData.subscriptionStatus)
      }
    } catch {
      console.warn(`⚠️  Failed to create Polar.sh resources for ${userData.email}, continuing with local user creation...`)
    }
  }

  // Create user in local database using the same userId
  const users = await db
    .insert(authSchema.user)
    .values({
      id: userId, // Use the same userId that was used for Polar customer externalId
      name: userData.name,
      email: userData.email,
      emailVerified: profileData.emailVerified ?? true,
      role: profileData.role,
      enterpriseEmail: profileData.enterpriseEmail,
      enterprisePassword: profileData.enterprisePassword,
      countryCode: profileData.countryCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()

  const user = users[0]
  if (!user) {
    throw new Error("Failed to create user")
  }

  // Create account for password
  await db.insert(authSchema.account).values({
    id: crypto.randomUUID(),
    accountId: user.id,
    providerId: "credential",
    userId: user.id,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  // Log the results
  if (polarCustomer) {
    console.log(`✅ Created user ${userData.email} (${userId}) with Polar.sh customer ${polarCustomer.id}`)
    if (polarSubscription) {
      console.log(`   📊 Subscription: ${polarSubscription.id} (${polarSubscription.status})`)
    }
  } else {
    console.log(`✅ Created local user ${userData.email} (${userId})`)
  }

  return {
    user,
    polarCustomer: polarCustomer,
    polarSubscription: polarSubscription
  }
}

// Order type for better typing
interface SeedOrder {
  userId: string
  status: string
  paymentId: string
  polarSubscriptionId: string
  assignedAdminId: string
  adminNotes: string
  priority: string
  deliveredAt?: Date
}

// Main auth seeding function
export async function seedAuth(): Promise<{
  adminUsers: CreateUserResult[]
  regularUsers: CreateUserResult[]
  orders: SeedOrder[]
}> {
  console.log("🔐 Seeding authentication data...")

  // Check if we have Polar access token when Polar integration is requested
  const hasPolarToken = !!process.env.POLAR_ACCESS_TOKEN
  if (!hasPolarToken) {
    console.warn("⚠️  POLAR_ACCESS_TOKEN not found - skipping Polar.sh integration")
  }

  const adminUsers: CreateUserResult[] = []
  const regularUsers: CreateUserResult[] = []

  // ADMIN USERS (no Polar.sh integration needed)
  console.log("\n👑 Creating admin users...")

  // Super Admin
  const superAdmin = await createUser(
    ADMIN_CREDENTIALS.superAdmin,
    {
      role: "super_admin",
    }
  )
  adminUsers.push(superAdmin)

  // Regular Admin
  const admin = await createUser(
    ADMIN_CREDENTIALS.regularAdmin,
    {
      role: "admin",
    }
  )
  adminUsers.push(admin)

  // REGULAR USERS WITH POLAR.SH INTEGRATION
  console.log("\n👥 Creating regular users...")

  // Active paid users (create in Polar.sh with active subscriptions)
  const user1 = await createUser(
    REGULAR_USER_CREDENTIALS.john,
    {
      role: "user",
      enterpriseEmail: REGULAR_USER_CREDENTIALS.john.enterpriseEmail,
      enterprisePassword: REGULAR_USER_CREDENTIALS.john.enterprisePassword,
      countryCode: "US",
      createPolarCustomer: hasPolarToken,
      subscriptionStatus: "active",
    }
  )
  regularUsers.push(user1)

  const user2 = await createUser(
    REGULAR_USER_CREDENTIALS.jane,
    {
      role: "user",
      enterpriseEmail: REGULAR_USER_CREDENTIALS.jane.enterpriseEmail,
      enterprisePassword: REGULAR_USER_CREDENTIALS.jane.enterprisePassword,
      countryCode: "CA",
      createPolarCustomer: hasPolarToken,
      subscriptionStatus: "active",
    }
  )
  regularUsers.push(user2)

  const user3 = await createUser(
    REGULAR_USER_CREDENTIALS.bob,
    {
      role: "user",
      enterpriseEmail: REGULAR_USER_CREDENTIALS.bob.enterpriseEmail,
      enterprisePassword: REGULAR_USER_CREDENTIALS.bob.enterprisePassword,
      countryCode: "GB",
      createPolarCustomer: hasPolarToken,
      subscriptionStatus: "trialing",
    }
  )
  regularUsers.push(user3)

  // Inactive users (no Polar.sh integration)
  console.log("\n❌ Creating inactive users (local only)...")
  
  const inactive1 = await createUser(
    INACTIVE_USER_CREDENTIALS.inactive1,
    {
      role: "user",
      emailVerified: false,
    }
  )
  regularUsers.push(inactive1)

  const inactive2 = await createUser(
    INACTIVE_USER_CREDENTIALS.inactive2,
    {
      role: "user",
    }
  )
  regularUsers.push(inactive2)

  // Pending users (created in Polar.sh but no subscription)
  console.log("\n⏳ Creating pending users...")
  
  const pending1 = await createUser(
    PENDING_USER_CREDENTIALS.pending1,
    {
      role: "user",
      createPolarCustomer: hasPolarToken,
      countryCode: "US",
    }
  )
  regularUsers.push(pending1)

  const pending2 = await createUser(
    PENDING_USER_CREDENTIALS.pending2,
    {
      role: "user",
      createPolarCustomer: hasPolarToken,
      countryCode: "DE",
    }
  )
  regularUsers.push(pending2)

  // Expired users (created in Polar.sh with expired subscriptions)
  console.log("\n💸 Creating expired users...")
  
  const expired1 = await createUser(
    EXPIRED_USER_CREDENTIALS.expired1,
    {
      role: "user",
      createPolarCustomer: hasPolarToken,
      subscriptionStatus: "expired",
      countryCode: "FR",
    }
  )
  regularUsers.push(expired1)

  const expired2 = await createUser(
    EXPIRED_USER_CREDENTIALS.expired2,
    {
      role: "user",
      createPolarCustomer: hasPolarToken,
      subscriptionStatus: "expired",
      countryCode: "IT",
    }
  )
  regularUsers.push(expired2)

  // Cancelled users (created in Polar.sh with cancelled subscriptions)
  console.log("\n🚫 Creating cancelled users...")
  
  const cancelled1 = await createUser(
    CANCELLED_USER_CREDENTIALS.cancelled1,
    {
      role: "user",
      createPolarCustomer: hasPolarToken,
      subscriptionStatus: "cancelled",
      countryCode: "ES",
    }
  )
  regularUsers.push(cancelled1)

  const cancelled2 = await createUser(
    CANCELLED_USER_CREDENTIALS.cancelled2,
    {
      role: "user",
      createPolarCustomer: hasPolarToken,
      subscriptionStatus: "cancelled",
      countryCode: "NL",
    }
  )
  regularUsers.push(cancelled2)

  // Create sample orders for users with Polar.sh integration
  console.log("\n📦 Creating sample orders...")

  const orders: SeedOrder[] = []
  if (user1.user) {
    orders.push({
      userId: user1.user.id,
      status: "delivered",
      paymentId: user1.polarSubscription?.id || "pi_test_123",
      polarSubscriptionId: user1.polarSubscription?.id || "sub_test_123",
      assignedAdminId: admin.user.id,
      adminNotes: "Delivered successfully via Polar.sh",
      priority: "normal",
      deliveredAt: new Date(),
    })
  }

  if (user2.user) {
    orders.push({
      userId: user2.user.id,
      status: "pending",
      paymentId: user2.polarSubscription?.id || "pi_test_456",
      polarSubscriptionId: user2.polarSubscription?.id || "sub_test_456",
      assignedAdminId: admin.user.id,
      adminNotes: "Processing order via Polar.sh",
      priority: "high",
    })
  }

  if (user3.user) {
    orders.push({
      userId: user3.user.id,
      status: "processing",
      paymentId: user3.polarSubscription?.id || "pi_test_789",
      polarSubscriptionId: user3.polarSubscription?.id || "sub_test_789",
      assignedAdminId: superAdmin.user.id,
      adminNotes: "Working on enterprise setup via Polar.sh",
      priority: "normal",
    })
  }

  if (orders.length > 0) {
    await db.insert(businessSchema.emailOrders).values(orders)
  }

  console.log("✅ Authentication seeding completed!")
  
  return {
    adminUsers,
    regularUsers,
    orders
  }
}
