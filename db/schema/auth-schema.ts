import { boolean, index, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { z } from "zod"

// Role enum for user access levels
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "super_admin"])

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),

  // Role system
  role: userRoleEnum("role").default("user").notNull(),

  // Business fields (previously in user_profile)
  enterpriseEmail: varchar("enterprise_email", { length: 255 }),
  enterprisePassword: varchar("enterprise_password", { length: 255 }),
  countryCode: varchar("country_code", { length: 2 }),
  lastLogin: timestamp("last_login"),

  // Timestamps
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()),
})

// Zod schemas for validation - pure Zod implementation
export const insertUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  email: z.string().email("Invalid email format"),
  emailVerified: z.boolean().default(false),
  image: z.string().nullable().optional(),
  role: z.enum(["user", "admin", "super_admin"]).default("user"),
  enterpriseEmail: z.string().email("Invalid enterprise email format").optional(),
  enterprisePassword: z.string().min(8, "Password must be at least 8 characters").optional(),
  countryCode: z.string().length(2, "Country code must be 2 characters").optional(),
  lastLogin: z.date().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const selectUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.enum(["user", "admin", "super_admin"]),
  enterpriseEmail: z.string().nullable(),
  enterprisePassword: z.string().nullable(),
  countryCode: z.string().nullable(),
  lastLogin: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const updateUserSchema = insertUserSchema.partial().omit({
  emailVerified: true,
})

export const insertSessionSchema = z.object({
  id: z.string().optional(),
  expiresAt: z.date(),
  token: z.string().min(1, "Token is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  userId: z.string().min(1, "User ID is required"),
})

export const selectSessionSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
})

export const insertAccountSchema = z.object({
  id: z.string().optional(),
  accountId: z.string().min(1, "Account ID is required"),
  providerId: z.string().min(1, "Provider ID is required"),
  userId: z.string().min(1, "User ID is required"),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  idToken: z.string().nullable().optional(),
  accessTokenExpiresAt: z.date().nullable().optional(),
  refreshTokenExpiresAt: z.date().nullable().optional(),
  scope: z.string().nullable().optional(),
  password: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const selectAccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.date().nullable(),
  refreshTokenExpiresAt: z.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const insertVerificationSchema = z.object({
  id: z.string().optional(),
  identifier: z.string().email("Invalid email format"),
  value: z.string().min(6, "Verification code must be at least 6 characters"),
  expiresAt: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const selectVerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
})

// Type exports for better TypeScript experience
export type InsertUser = z.infer<typeof insertUserSchema>
export type SelectUser = z.infer<typeof selectUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
export type InsertSession = z.infer<typeof insertSessionSchema>
export type SelectSession = z.infer<typeof selectSessionSchema>
export type InsertAccount = z.infer<typeof insertAccountSchema>
export type SelectAccount = z.infer<typeof selectAccountSchema>
export type InsertVerification = z.infer<typeof insertVerificationSchema>
export type SelectVerification = z.infer<typeof selectVerificationSchema>
