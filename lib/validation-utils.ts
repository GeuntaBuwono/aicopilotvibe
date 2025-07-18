import { z } from "zod"

// Common validation patterns
export const commonSchemas = {
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  uuid: z.string().uuid("Invalid UUID format"),
  url: z.string().url("Invalid URL format"),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]+$/, "Invalid phone number format"),
  countryCode: z.string().length(2, "Country code must be 2 characters"),

  // Pagination
  pagination: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  }),

  // Date ranges
  dateRange: z
    .object({
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    })
    .refine((data) => !data.startDate || !data.endDate || data.startDate <= data.endDate, {
      message: "Start date must be before end date",
    }),

  // Search and filtering
  search: z.object({
    query: z.string().optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("asc"),
  }),
}

// Validation utility functions
export class ValidationUtils {
  // Generic validation helper
  static validateData<T extends z.ZodType>(
    data: unknown,
    schema: T
  ): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
    const result = schema.safeParse(data)

    if (!result.success) {
      return {
        success: false,
        errors: result.error,
      }
    }

    return { success: true, data: result.data }
  }

  // Query parameters validation
  static validateQueryParams<T extends z.ZodType>(
    searchParams: URLSearchParams,
    schema: T
  ): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
    const params = Object.fromEntries(searchParams.entries())
    return this.validateData(params, schema)
  }

  // Path parameters validation
  static validatePathParams<T extends z.ZodType>(
    params: Record<string, string>,
    schema: T
  ): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
    return this.validateData(params, schema)
  }
}

// Specific validation schemas for common use cases
export const apiSchemas = {
  // User management
  createUser: z.object({
    name: z.string().min(1, "Name is required").max(255, "Name too long"),
    email: commonSchemas.email,
    role: z.enum(["user", "admin", "super_admin"]).default("user"),
  }),

  updateUser: z.object({
    name: z.string().min(1).optional(),
    email: commonSchemas.email.optional(),
    role: z.enum(["user", "admin", "super_admin"]).optional(),
  }),

  // Order management
  createOrder: z.object({
    userId: z.string().min(1, "User ID is required"),
    priority: z.enum(["low", "normal", "high", "urgent"]).default("normal"),
    paymentId: z.string().optional(),
    polarSubscriptionId: z.string().optional(),
  }),

  updateOrder: z.object({
    status: z.enum(["pending", "processing", "delivered", "cancelled", "failed"]).optional(),
    priority: z.enum(["low", "normal", "high", "urgent"]).optional(),
    adminNotes: z.string().optional(),
    assignedAdminId: z.string().optional(),
  }),

  // Email management
  sendEmail: z.object({
    to: commonSchemas.email,
    subject: z.string().min(1).max(500),
    template: z.enum(["verification", "welcome", "order_confirmation", "delivery_notification", "password_reset"]),
    data: z.record(z.any()).optional(),
  }),

  // Admin activity
  logAdminActivity: z.object({
    action: z.enum(["create_user", "update_user", "delete_user", "deliver_order", "update_order", "assign_order"]),
    targetType: z.enum(["user", "order", "email", "system"]),
    targetId: commonSchemas.uuid,
    details: z.record(z.any()).optional(),
  }),
}

// Form validation schemas for frontend
export const formSchemas = {
  signIn: z.object({
    email: commonSchemas.email,
    password: z.string().min(1, "Password is required"),
  }),

  signUp: z
    .object({
      name: z.string().min(1, "Name is required").max(255),
      email: commonSchemas.email,
      password: commonSchemas.password,
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),

  updateProfile: z.object({
    name: z.string().min(1, "Name is required").max(255),
    email: commonSchemas.email,
    enterpriseEmail: commonSchemas.email.optional(),
    countryCode: commonSchemas.countryCode.optional(),
  }),

  changePassword: z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: commonSchemas.password,
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),

  contactForm: z.object({
    name: z.string().min(1, "Name is required").max(255),
    email: commonSchemas.email,
    subject: z.string().min(1, "Subject is required").max(500),
    message: z.string().min(1, "Message is required").max(2000),
  }),
}

// Type exports for better TypeScript experience
export type ValidationResult<T> = { success: true; data: T } | { success: false; errors: z.ZodError }

export type CommonSchemas = typeof commonSchemas
export type ApiSchemas = typeof apiSchemas
export type FormSchemas = typeof formSchemas
