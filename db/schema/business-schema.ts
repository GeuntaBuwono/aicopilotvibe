import { relations } from "drizzle-orm"
import { index, inet, jsonb, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { z } from "zod"
import { user } from "./auth-schema"

// Note: user_profile table removed - all fields consolidated into user table
// - role: Now properly implemented in user table with enum
// - business fields: Moved to user table (enterpriseEmail, enterprisePassword, countryCode, lastLogin)
// - subscriptionStatus, paymentDate, subscriptionExpiresAt: Get from Polar.sh customer state

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
export const userRelations = relations(user, ({ many }) => ({
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
}))

export const adminActivityRelations = relations(adminActivity, ({ one }) => ({
  admin: one(user, {
    fields: [adminActivity.adminId],
    references: [user.id],
  }),
}))

// Zod schemas for validation - pure Zod implementation
export const insertEmailOrderSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().min(1, "User ID is required"),
  status: z.enum(["pending", "processing", "delivered", "cancelled", "failed"]).default("pending"),
  paymentId: z.string().nullable().optional(),
  polarSubscriptionId: z.string().nullable().optional(),
  assignedAdminId: z.string().nullable().optional(),
  adminNotes: z.string().nullable().optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
  createdAt: z.date().optional(),
  deliveredAt: z.date().nullable().optional(),
  updatedAt: z.date().optional(),
})

export const selectEmailOrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  status: z.string().nullable(),
  paymentId: z.string().nullable(),
  polarSubscriptionId: z.string().nullable(),
  assignedAdminId: z.string().nullable(),
  adminNotes: z.string().nullable(),
  priority: z.string().nullable(),
  createdAt: z.date().nullable(),
  deliveredAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
})

export const updateEmailOrderSchema = insertEmailOrderSchema.partial().extend({
  deliveredAt: z.date().optional(),
})

export const insertEmailLogSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().nullable().optional(),
  emailType: z.enum(["verification", "welcome", "order_confirmation", "delivery_notification", "password_reset"]),
  recipientEmail: z.string().email("Invalid email format"),
  subject: z.string().min(1, "Subject is required").max(500, "Subject too long"),
  status: z.enum(["pending", "sent", "delivered", "failed", "bounced"]).default("pending"),
  resendId: z.string().nullable().optional(),
  errorMessage: z.string().nullable().optional(),
  sentAt: z.date().optional(),
})

export const selectEmailLogSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().nullable(),
  emailType: z.string().nullable(),
  recipientEmail: z.string().nullable(),
  subject: z.string().nullable(),
  status: z.string().nullable(),
  resendId: z.string().nullable(),
  errorMessage: z.string().nullable(),
  sentAt: z.date().nullable(),
})

export const insertAdminActivitySchema = z.object({
  id: z.string().uuid().optional(),
  adminId: z.string().min(1, "Admin ID is required"),
  action: z.enum(["create_user", "update_user", "delete_user", "deliver_order", "update_order", "assign_order"]),
  targetType: z.enum(["user", "order", "email", "system"]),
  targetId: z.string().uuid("Invalid target ID format"),
  details: z.record(z.any()).optional(),
  ipAddress: z.string().ip("Invalid IP address format").optional(),
  createdAt: z.date().optional(),
})

export const selectAdminActivitySchema = z.object({
  id: z.string().uuid(),
  adminId: z.string().nullable(),
  action: z.string().nullable(),
  targetType: z.string().nullable(),
  targetId: z.string().uuid().nullable(),
  details: z.record(z.any()).nullable(),
  ipAddress: z.string().nullable(),
  createdAt: z.date().nullable(),
})

// Type exports for better TypeScript experience
export type InsertEmailOrder = z.infer<typeof insertEmailOrderSchema>
export type SelectEmailOrder = z.infer<typeof selectEmailOrderSchema>
export type UpdateEmailOrder = z.infer<typeof updateEmailOrderSchema>
export type InsertEmailLog = z.infer<typeof insertEmailLogSchema>
export type SelectEmailLog = z.infer<typeof selectEmailLogSchema>
export type InsertAdminActivity = z.infer<typeof insertAdminActivitySchema>
export type SelectAdminActivity = z.infer<typeof selectAdminActivitySchema>

// Utility schemas for common validations
export const orderStatusUpdateSchema = z.object({
  status: z.enum(["pending", "processing", "delivered", "cancelled", "failed"]),
  adminNotes: z.string().optional(),
  deliveredAt: z.date().optional(),
})

export const emailLogFilterSchema = z.object({
  userId: z.string().optional(),
  emailType: z
    .enum(["verification", "welcome", "order_confirmation", "delivery_notification", "password_reset"])
    .optional(),
  status: z.enum(["pending", "sent", "delivered", "failed", "bounced"]).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})

export const adminActivityFilterSchema = z.object({
  adminId: z.string().optional(),
  action: z
    .enum(["create_user", "update_user", "delete_user", "deliver_order", "update_order", "assign_order"])
    .optional(),
  targetType: z.enum(["user", "order", "email", "system"]).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
})
