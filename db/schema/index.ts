export * as authSchema from "./auth-schema"
export * as businessSchema from "./business-schema"
export * from "./auth-schema"
export * from "./business-schema"

// Export the role enum for easy access
export { userRoleEnum } from "./auth-schema"

// Re-export all Zod schemas for validation
export {
  // Auth schemas
  insertUserSchema,
  selectUserSchema,
  updateUserSchema,
  insertSessionSchema,
  selectSessionSchema,
  insertAccountSchema,
  selectAccountSchema,
  insertVerificationSchema,
  selectVerificationSchema,

  // Auth types
  type InsertUser,
  type SelectUser,
  type UpdateUser,
  type InsertSession,
  type SelectSession,
  type InsertAccount,
  type SelectAccount,
  type InsertVerification,
  type SelectVerification,
} from "./auth-schema"

export {
  // Business schemas
  insertEmailOrderSchema,
  selectEmailOrderSchema,
  updateEmailOrderSchema,
  insertEmailLogSchema,
  selectEmailLogSchema,
  insertAdminActivitySchema,
  selectAdminActivitySchema,

  // Utility schemas
  orderStatusUpdateSchema,
  emailLogFilterSchema,
  adminActivityFilterSchema,

  // Business types
  type InsertEmailOrder,
  type SelectEmailOrder,
  type UpdateEmailOrder,
  type InsertEmailLog,
  type SelectEmailLog,
  type InsertAdminActivity,
  type SelectAdminActivity,
} from "./business-schema"
