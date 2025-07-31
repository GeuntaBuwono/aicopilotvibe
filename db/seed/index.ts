import { seedAuth } from "./auth-seed"

async function seedDatabase() {
  console.log("🌱 Starting database seeding...")
  console.log("🏗️  Using modular seed structure")

  try {
    // Seed authentication data (users, accounts, basic orders)
    const authResult = await seedAuth()

    // Summary reporting
    console.log("\n✅ Database seeded successfully!")
    console.log("\n📊 SEEDED DATA SUMMARY:")
    console.log("=" + "=".repeat(50))

    console.log("\n👑 ADMIN USERS:")
    console.log("📧 Super Admin: admin@aicopilotvibe.com / admin123")
    console.log("📧 Admin: support@aicopilotvibe.com / admin456")

    console.log("\n💰 USERS WITH ENTERPRISE CREDENTIALS:")
    console.log("📧 user1@example.com / user123 (US, active)")
    console.log("📧 user2@example.com / user234 (CA, active)")
    console.log("📧 user3@example.com / user345 (GB, trialing)")

    console.log("\n❌ INACTIVE USERS (local only):")
    console.log("📧 inactive1@example.com / inactive123 (email not verified)")
    console.log("📧 inactive2@example.com / inactive234")

    console.log("\n⏳ PENDING USERS (Polar.sh customers, no subscriptions):")
    console.log("📧 pending1@example.com / pending123 (US)")
    console.log("📧 pending2@example.com / pending234 (DE)")

    console.log("\n💸 EXPIRED USERS (Polar.sh customers, expired subscriptions):")
    console.log("📧 expired1@example.com / expired123 (FR)")
    console.log("📧 expired2@example.com / expired234 (IT)")

    console.log("\n🚫 CANCELLED USERS (Polar.sh customers, cancelled subscriptions):")
    console.log("📧 cancelled1@example.com / cancelled123 (ES)")
    console.log("📧 cancelled2@example.com / cancelled234 (NL)")

    const totalUsers = authResult.adminUsers.length + authResult.regularUsers.length
    const polarUsers = authResult.regularUsers.filter(u => u.polarCustomer).length
    const localOnlyUsers = authResult.regularUsers.filter(u => !u.polarCustomer).length

    console.log("\n" + "=".repeat(52))
    console.log(`Total users created: ${totalUsers}`)
    console.log(`- Admin users: ${authResult.adminUsers.length}`)
    console.log(`- Regular users: ${authResult.regularUsers.length}`)
    console.log(`  - With Polar.sh integration: ${polarUsers}`)
    console.log(`  - Local only: ${localOnlyUsers}`)
    console.log(`Total orders created: ${authResult.orders.length}`)
    
    console.log("\n🏖️  ENVIRONMENT NOTES:")
    if (process.env.POLAR_ACCESS_TOKEN) {
      console.log("✅ Polar.sh integration enabled (sandbox mode)")
      console.log("🔧 Subscription status is verified via Polar.sh API")
    } else {
      console.log("⚠️  Polar.sh integration disabled (no access token)")
      console.log("📝 Only local database seeding performed")
    }
    
    console.log("\n🎯 NEXT STEPS:")
    console.log("1. Set up Polar.sh environment variables for full integration")
    console.log("2. Test login with any seeded user credentials")
    console.log("3. Verify Polar.sh customers in dashboard")
    console.log("4. Test subscription status verification")
    
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    throw error
  }
}

seedDatabase().catch((error) => {
  console.error("💥 Database seeding failed:", error)
  process.exit(1)
})
