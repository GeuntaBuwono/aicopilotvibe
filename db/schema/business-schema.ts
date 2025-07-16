import { pgTable, pgEnum, uuid, varchar, text, timestamp, jsonb, inet, boolean, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { user } from "./auth-schema"

// User Role Enum
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "super_admin"])

// Extended User Profile (adds business fields to the existing user table)
export const userProfile = pgTable("user_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  role: userRoleEnum("role").default("user"),

  // Subscription fields
  subscriptionStatus: varchar("subscription_status", { length: 50 }).default("inactive"),
  paymentDate: timestamp("payment_date"),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),

  // Enterprise email credentials
  enterpriseEmail: varchar("enterprise_email", { length: 255 }),
  enterprisePassword: varchar("enterprise_password", { length: 255 }),

  // User metadata
  countryCode: varchar("country_code", { length: 2 }),
  lastLogin: timestamp("last_login"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Order Tracking
export const emailOrders = pgTable(
  "email_orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    status: varchar("status", { length: 50 }).default("pending"),
    paymentId: varchar("payment_id", { length: 255 }),
    polarSubscriptionId: varchar("polar_subscription_id", { length: 255 }),
    assignedAdminId: text("assigned_admin_id").references(() => user.id),
    adminNotes: text("admin_notes"),
    priority: varchar("priority", { length: 20 }).default("normal"),
    createdAt: timestamp("created_at").defaultNow(),
    deliveredAt: timestamp("delivered_at"),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index("email_orders_user_id_idx").on(table.userId),
      statusIdx: index("email_orders_status_idx").on(table.status),
      createdAtIdx: index("email_orders_created_at_idx").on(table.createdAt),
      assignedAdminIdx: index("email_orders_assigned_admin_idx").on(table.assignedAdminId),
    }
  }
)

// Email Logging
export const emailLogs = pgTable(
  "email_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => user.id),
    emailType: varchar("email_type", { length: 50 }),
    recipientEmail: varchar("recipient_email", { length: 255 }),
    subject: varchar("subject", { length: 500 }),
    status: varchar("status", { length: 50 }),
    resendId: varchar("resend_id", { length: 255 }),
    errorMessage: text("error_message"),
    sentAt: timestamp("sent_at").defaultNow(),
  },
  (table) => {
    return {
      userIdIdx: index("email_logs_user_id_idx").on(table.userId),
      emailTypeIdx: index("email_logs_email_type_idx").on(table.emailType),
      statusIdx: index("email_logs_status_idx").on(table.status),
      sentAtIdx: index("email_logs_sent_at_idx").on(table.sentAt),
    }
  }
)

// Admin Activity (tracks admin actions)
export const adminActivity = pgTable(
  "admin_activity",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    adminId: text("admin_id").references(() => user.id),
    action: varchar("action", { length: 100 }),
    targetType: varchar("target_type", { length: 50 }),
    targetId: uuid("target_id"),
    details: jsonb("details"),
    ipAddress: inet("ip_address"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      adminIdIdx: index("admin_activity_admin_id_idx").on(table.adminId),
      actionIdx: index("admin_activity_action_idx").on(table.action),
      createdAtIdx: index("admin_activity_created_at_idx").on(table.createdAt),
    }
  }
)

// Relations
export const userProfileRelations = relations(userProfile, ({ one, many }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
  orders: many(emailOrders),
  emailLogs: many(emailLogs),
  assignedOrders: many(emailOrders, {
    relationName: "assignedAdmin",
  }),
  adminActivities: many(adminActivity),
}))

export const emailOrdersRelations = relations(emailOrders, ({ one }) => ({
  user: one(user, {
    fields: [emailOrders.userId],
    references: [user.id],
  }),
  userProfile: one(userProfile, {
    fields: [emailOrders.userId],
    references: [userProfile.userId],
  }),
  assignedAdmin: one(user, {
    fields: [emailOrders.assignedAdminId],
    references: [user.id],
    relationName: "assignedAdmin",
  }),
}))

export const emailLogsRelations = relations(emailLogs, ({ one }) => ({
  user: one(user, {
    fields: [emailLogs.userId],
    references: [user.id],
  }),
  userProfile: one(userProfile, {
    fields: [emailLogs.userId],
    references: [userProfile.userId],
  }),
}))

export const adminActivityRelations = relations(adminActivity, ({ one }) => ({
  admin: one(user, {
    fields: [adminActivity.adminId],
    references: [user.id],
  }),
}))
