/* eslint-disable @typescript-eslint/no-explicit-any */
import { Polar } from "@polar-sh/sdk"
import { sql } from "drizzle-orm"
import { user } from "./schema"
import { db } from "."

// Environment validation
if (!("DATABASE_URL" in process.env)) {
  throw new Error("DATABASE_URL not found on .env.development")
}

// Initialize Polar SDK conditionally
let polar: Polar | null = null
const hasPolarConfig = !!(process.env.POLAR_ACCESS_TOKEN && process.env.POLAR_ORGANIZATION_ID)

if (hasPolarConfig) {
  try {
    polar = new Polar({
      accessToken: process.env.POLAR_ACCESS_TOKEN!,
      server: process.env.POLAR_SERVER === "production" ? "production" : "sandbox",
    })
    console.log("🔌 Polar.sh SDK initialized for customer cleanup")
  } catch (error) {
    console.warn("⚠️  Failed to initialize Polar.sh SDK:", error)
  }
} else {
  console.log("ℹ️  Polar.sh configuration not found - skipping customer cleanup")
}

/**
 * Clean up Polar.sh customers before database reset
 * This prevents conflicts when re-seeding the database
 */
async function cleanupPolarCustomers(): Promise<void> {
  if (!polar) {
    console.log("⏭️  Skipping Polar.sh cleanup (not configured)")
    return
  }

  try {
    console.log("🧹 Cleaning up Polar.sh customers...")

    // Get all users from database before dropping tables
    const users = await db.select({ id: user.id, email: user.email }).from(user)

    if (users.length === 0) {
      console.log("ℹ️  No users found in database - skipping Polar.sh cleanup")
      return
    }

    console.log(`🔍 Found ${users.length} users in database, checking Polar.sh customers...`)

    let cleanupCount = 0
    let errorCount = 0

    // Clean up customers using their external IDs (which match user UUIDs)
    for (const userData of users) {
      try {
        console.log(`🗑️  Deleting Polar.sh customer with externalId: ${userData.id} (${userData.email})`)

        await polar.customers.deleteExternal({
          externalId: userData.id,
        })

        cleanupCount++
        console.log(`✅ Deleted Polar.sh customer: ${userData.email}`)
      } catch (error: unknown) {
        const isNotFoundError =
          (error as any)?.status === 404 ||
          (typeof error === 'object' && error !== null && 'message' in error &&
            typeof (error as any).message === 'string' &&
            (error as any).message.includes("not found"))

        if (isNotFoundError) {
          // Customer doesn't exist in Polar.sh - this is expected for some users
          console.log(`ℹ️  Polar.sh customer not found for ${userData.email} (already deleted or never created)`)
        } else {
          // Unexpected error - log but continue
          errorCount++
          const errorMessage = error instanceof Error ? error.message : String(error)
          console.warn(`⚠️  Failed to delete Polar.sh customer for ${userData.email}:`, errorMessage)
        }
      }
    }

    if (cleanupCount > 0) {
      console.log(`✅ Successfully cleaned up ${cleanupCount} Polar.sh customers`)
    }

    if (errorCount > 0) {
      console.warn(`⚠️  ${errorCount} Polar.sh cleanup errors occurred (non-critical)`)
    }

  } catch (error) {
    // Don't fail the entire reset if Polar.sh cleanup fails
    console.error("❌ Polar.sh cleanup failed (continuing with database reset):", error)
  }
}

/**
 * Reset the database by dropping all tables and enums
 */
async function resetDatabase(): Promise<void> {
  console.log("🗄️  Resetting local database...")

  const query = sql`
		-- Delete all tables
		DO $$ DECLARE
		    r RECORD;
		BEGIN
		    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
		        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
		    END LOOP;
		END $$;
		
		-- Delete enums
		DO $$ DECLARE
			r RECORD;
		BEGIN
			FOR r IN (select t.typname as enum_name
			from pg_type t
				join pg_enum e on t.oid = e.enumtypid
				join pg_catalog.pg_namespace n ON n.oid = t.typnamespace
			where n.nspname = current_schema()) LOOP
				EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.enum_name);
			END LOOP;
		END $$;
		`

  await db.execute(query)
  console.log("✅ Local database reset completed")
}

/**
 * Main reset function that orchestrates the cleanup process
 */
async function reset(): Promise<void> {
  console.log("⏳ Starting comprehensive reset process...")
  const start = Date.now()

  try {
    // Step 1: Clean up Polar.sh customers (before dropping tables)
    await cleanupPolarCustomers()

    // Step 2: Reset local database
    await resetDatabase()

    const end = Date.now()
    console.log(`✅ Reset completed successfully in ${end - start}ms`)
    console.log("")
    console.log("🚀 You can now run 'pnpm db:push && pnpm db:seed' to reinitialize the database")

  } catch (error) {
    console.error("❌ Reset process failed:", error)
    throw error
  }
}

// Execute reset with proper error handling
reset()
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error("❌ Reset failed")
    console.error(err)
    process.exit(1)
  })
