import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/db/index"
import { authSchema } from "@/db/schema"

export const schema = {
  auth: authSchema,
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql"
  }),
  schema: {
    ...schema,
  },
  plugins: [nextCookies()], // make sure this is the last plugin in the array
})
