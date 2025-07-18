import { hashPassword } from "better-auth/crypto"
import { db } from "../index"
import { authSchema, businessSchema } from "../schema"

async function seedDatabase() {
  console.log("🌱 Seeding database...")

  // Helper function to create users with profiles
  const createUser = async (
    userData: {
      name: string
      email: string
      password: string
    },
    profileData: {
      role: "user" | "admin" | "super_admin"
      subscriptionStatus: string
      emailVerified?: boolean
      enterpriseEmail?: string
      enterprisePassword?: string
      countryCode?: string
      paymentDate?: Date
      subscriptionExpiresAt?: Date
    }
  ) => {
    const hashedPassword = await hashPassword(userData.password)

    // Create user with consolidated profile fields
    const users = await db
      .insert(authSchema.user)
      .values({
        id: crypto.randomUUID(),
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

    return user
  }

  // ADMIN USERS
  console.log("👑 Creating admin users...")

  // Super Admin
  const superAdmin = await createUser(
    {
      name: "Super Admin",
      email: "admin@aicopilotvibe.com",
      password: "admin123",
    },
    {
      role: "super_admin",
      subscriptionStatus: "active",
    }
  )

  // Regular Admin
  const admin = await createUser(
    {
      name: "Support Admin",
      email: "support@aicopilotvibe.com",
      password: "admin456",
    },
    {
      role: "admin",
      subscriptionStatus: "active",
    }
  )

  // REGULAR USERS WITH DIFFERENT STATUSES
  console.log("👥 Creating regular users...")

  // Active paid users
  const user1 = await createUser(
    {
      name: "John Doe",
      email: "user1@example.com",
      password: "user123",
    },
    {
      role: "user",
      subscriptionStatus: "paid",
      enterpriseEmail: "john.doe@github-enterprise.com",
      enterprisePassword: "enterprise123",
      countryCode: "US",
      paymentDate: new Date(),
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  )

  const user2 = await createUser(
    {
      name: "Jane Smith",
      email: "user2@example.com",
      password: "user234",
    },
    {
      role: "user",
      subscriptionStatus: "paid",
      enterpriseEmail: "jane.smith@github-enterprise.com",
      enterprisePassword: "enterprise234",
      countryCode: "CA",
      paymentDate: new Date(),
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  )

  const user3 = await createUser(
    {
      name: "Bob Johnson",
      email: "user3@example.com",
      password: "user345",
    },
    {
      role: "user",
      subscriptionStatus: "paid",
      enterpriseEmail: "bob.johnson@github-enterprise.com",
      enterprisePassword: "enterprise345",
      countryCode: "GB",
      paymentDate: new Date(),
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  )

  // Inactive users (not paid)
  await createUser(
    {
      name: "Inactive User 1",
      email: "inactive1@example.com",
      password: "inactive123",
    },
    {
      role: "user",
      subscriptionStatus: "inactive",
      emailVerified: false,
    }
  )

  await createUser(
    {
      name: "Inactive User 2",
      email: "inactive2@example.com",
      password: "inactive234",
    },
    {
      role: "user",
      subscriptionStatus: "inactive",
    }
  )

  await createUser(
    {
      name: "Inactive User 3",
      email: "inactive3@example.com",
      password: "inactive345",
    },
    {
      role: "user",
      subscriptionStatus: "inactive",
    }
  )

  // Pending users (registered but not paid)
  await createUser(
    {
      name: "Pending User 1",
      email: "pending1@example.com",
      password: "pending123",
    },
    {
      role: "user",
      subscriptionStatus: "pending",
    }
  )

  await createUser(
    {
      name: "Pending User 2",
      email: "pending2@example.com",
      password: "pending234",
    },
    {
      role: "user",
      subscriptionStatus: "pending",
    }
  )

  // Expired users (previously paid but expired)
  await createUser(
    {
      name: "Expired User 1",
      email: "expired1@example.com",
      password: "expired123",
    },
    {
      role: "user",
      subscriptionStatus: "expired",
      paymentDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      subscriptionExpiresAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    }
  )

  await createUser(
    {
      name: "Expired User 2",
      email: "expired2@example.com",
      password: "expired234",
    },
    {
      role: "user",
      subscriptionStatus: "expired",
      paymentDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      subscriptionExpiresAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    }
  )

  // Cancelled users
  await createUser(
    {
      name: "Cancelled User 1",
      email: "cancelled1@example.com",
      password: "cancelled123",
    },
    {
      role: "user",
      subscriptionStatus: "cancelled",
    }
  )

  await createUser(
    {
      name: "Cancelled User 2",
      email: "cancelled2@example.com",
      password: "cancelled234",
    },
    {
      role: "user",
      subscriptionStatus: "cancelled",
    }
  )

  // Create sample orders
  console.log("📦 Creating sample orders...")

  await db.insert(businessSchema.emailOrders).values([
    {
      userId: user1.id,
      status: "delivered",
      paymentId: "pi_test_123",
      polarSubscriptionId: "sub_test_123",
      assignedAdminId: admin.id,
      adminNotes: "Delivered successfully",
      priority: "normal",
      deliveredAt: new Date(),
    },
    {
      userId: user2.id,
      status: "pending",
      paymentId: "pi_test_456",
      polarSubscriptionId: "sub_test_456",
      assignedAdminId: admin.id,
      adminNotes: "Processing order",
      priority: "high",
    },
    {
      userId: user3.id,
      status: "processing",
      paymentId: "pi_test_789",
      polarSubscriptionId: "sub_test_789",
      assignedAdminId: superAdmin.id,
      adminNotes: "Working on enterprise setup",
      priority: "normal",
    },
  ])

  console.log("✅ Database seeded successfully!")
  console.log("\n📊 SEEDED USERS SUMMARY:")
  console.log("=" + "=".repeat(50))

  console.log("\n👑 ADMIN USERS:")
  console.log("📧 Super Admin: admin@aicopilotvibe.com / admin123")
  console.log("📧 Admin: support@aicopilotvibe.com / admin456")

  console.log("\n💰 PAID USERS (active subscriptions):")
  console.log("📧 user1@example.com / user123")
  console.log("📧 user2@example.com / user234")
  console.log("📧 user3@example.com / user345")

  console.log("\n❌ INACTIVE USERS (never paid):")
  console.log("📧 inactive1@example.com / inactive123 (email not verified)")
  console.log("📧 inactive2@example.com / inactive234")
  console.log("📧 inactive3@example.com / inactive345")

  console.log("\n⏳ PENDING USERS (registered, not paid):")
  console.log("📧 pending1@example.com / pending123")
  console.log("📧 pending2@example.com / pending234")

  console.log("\n💸 EXPIRED USERS (subscription expired):")
  console.log("📧 expired1@example.com / expired123")
  console.log("📧 expired2@example.com / expired234")

  console.log("\n🚫 CANCELLED USERS:")
  console.log("📧 cancelled1@example.com / cancelled123")
  console.log("📧 cancelled2@example.com / cancelled234")

  console.log("\n" + "=".repeat(52))
  console.log("Total users created: 13")
  console.log("- Super Admin: 1")
  console.log("- Admin: 1")
  console.log("- Regular Users: 11")
  console.log("  - Paid: 3")
  console.log("  - Inactive: 3")
  console.log("  - Pending: 2")
  console.log("  - Expired: 2")
  console.log("  - Cancelled: 2")
  console.log("Total orders created: 3")
}

seedDatabase().catch(console.error)
