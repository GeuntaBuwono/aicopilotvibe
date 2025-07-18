import { hashPassword } from "better-auth/crypto"
import { eq } from "drizzle-orm"
import { db } from "../db/index"
import { authSchema } from "../db/schema"

async function createTestUser() {
  try {
    console.log("🔧 Setting up test user...")
    
    const testEmail = "test@example.com"
    const testPassword = "password123"
    
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(authSchema.user)
      .where(eq(authSchema.user.email, testEmail))
      .limit(1)
    
    if (existingUser.length > 0) {
      console.log("✅ Test user already exists:", testEmail)
      return
    }
    
    const hashedPassword = await hashPassword(testPassword)
    
    // Create test user
    const users = await db
      .insert(authSchema.user)
      .values({
        id: crypto.randomUUID(),
        name: "Test User",
        email: testEmail,
        emailVerified: true,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    
    const user = users[0]
    if (!user) {
      throw new Error("Failed to create test user")
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
    
    console.log("✅ Test user created successfully:", testEmail)
    console.log("🔑 Password:", testPassword)
    
  } catch (error) {
    console.error("❌ Failed to create test user:", error)
  }
}

// Run if called directly
if (require.main === module) {
  createTestUser()
}

export { createTestUser }