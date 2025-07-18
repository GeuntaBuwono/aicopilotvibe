import {
  insertAdminActivitySchema,
  insertEmailLogSchema,
  insertEmailOrderSchema,
  insertUserSchema,
  updateEmailOrderSchema,
  updateUserSchema,
} from "@/db/schema"
import { commonSchemas, formSchemas } from "@/lib/validation-utils"

describe("Database Schema Validation", () => {
  describe("User Schema", () => {
    it("should validate correct user insert data", () => {
      const validUser = {
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        enterpriseEmail: "john@company.com",
        countryCode: "US",
      }

      const result = insertUserSchema.safeParse(validUser)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe("John Doe")
        expect(result.data.email).toBe("john@example.com")
        expect(result.data.role).toBe("user")
      }
    })

    it("should reject invalid email format", () => {
      const invalidUser = {
        name: "John Doe",
        email: "invalid-email",
        role: "user",
      }

      const result = insertUserSchema.safeParse(invalidUser)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain("Invalid email format")
      }
    })

    it("should validate user update data", () => {
      const validUpdate = {
        name: "Jane Doe",
        email: "jane@example.com",
      }

      const result = updateUserSchema.safeParse(validUpdate)
      expect(result.success).toBe(true)
    })
  })

  describe("Email Order Schema", () => {
    it("should validate correct order insert data", () => {
      const validOrder = {
        userId: "user123",
        status: "pending",
        priority: "normal",
        paymentId: "payment123",
        polarSubscriptionId: "sub123",
      }

      const result = insertEmailOrderSchema.safeParse(validOrder)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.userId).toBe("user123")
        expect(result.data.status).toBe("pending")
        expect(result.data.priority).toBe("normal")
      }
    })

    it("should validate order update data", () => {
      const validUpdate = {
        status: "delivered",
        priority: "high",
        adminNotes: "Order completed successfully",
      }

      const result = updateEmailOrderSchema.safeParse(validUpdate)
      expect(result.success).toBe(true)
    })
  })

  describe("Email Log Schema", () => {
    it("should validate correct email log data", () => {
      const validLog = {
        userId: "user123",
        emailType: "verification",
        recipientEmail: "user@example.com",
        subject: "Email Verification",
        status: "sent",
        resendId: "resend123",
      }

      const result = insertEmailLogSchema.safeParse(validLog)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.emailType).toBe("verification")
        expect(result.data.recipientEmail).toBe("user@example.com")
        expect(result.data.status).toBe("sent")
      }
    })

    it("should reject invalid recipient email", () => {
      const invalidLog = {
        userId: "user123",
        emailType: "verification",
        recipientEmail: "invalid-email",
        subject: "Test",
        status: "sent",
      }

      const result = insertEmailLogSchema.safeParse(invalidLog)
      expect(result.success).toBe(false)
    })
  })

  describe("Admin Activity Schema", () => {
    it("should validate correct admin activity data", () => {
      const validActivity = {
        adminId: "admin123",
        action: "create_user",
        targetType: "user",
        targetId: "550e8400-e29b-41d4-a716-446655440000",
        details: { userId: "user123", changes: { name: "Updated Name" } },
        ipAddress: "192.168.1.1",
      }

      const result = insertAdminActivitySchema.safeParse(validActivity)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.action).toBe("create_user")
        expect(result.data.targetType).toBe("user")
        expect(result.data.ipAddress).toBe("192.168.1.1")
      }
    })

    it("should reject invalid UUID format", () => {
      const invalidActivity = {
        adminId: "admin123",
        action: "create_user",
        targetType: "user",
        targetId: "invalid-uuid",
      }

      const result = insertAdminActivitySchema.safeParse(invalidActivity)
      expect(result.success).toBe(false)
    })

    it("should reject invalid IP address", () => {
      const invalidActivity = {
        adminId: "admin123",
        action: "create_user",
        targetType: "user",
        targetId: "550e8400-e29b-41d4-a716-446655440000",
        ipAddress: "invalid-ip",
      }

      const result = insertAdminActivitySchema.safeParse(invalidActivity)
      expect(result.success).toBe(false)
    })
  })
})

describe("Form Validation Schemas", () => {
  describe("Sign In Form", () => {
    it("should validate correct sign in data", () => {
      const validData = {
        email: "user@example.com",
        password: "password123",
      }

      const result = formSchemas.signIn.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it("should reject invalid email", () => {
      const invalidData = {
        email: "invalid-email",
        password: "password123",
      }

      const result = formSchemas.signIn.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it("should reject empty password", () => {
      const invalidData = {
        email: "user@example.com",
        password: "",
      }

      const result = formSchemas.signIn.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe("Sign Up Form", () => {
    it("should validate correct sign up data", () => {
      const validData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      }

      const result = formSchemas.signUp.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it("should reject password mismatch", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "different123",
      }

      const result = formSchemas.signUp.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.some((issue) => issue.message.includes("match"))).toBe(true)
      }
    })

    it("should reject short password", () => {
      const invalidData = {
        name: "John Doe",
        email: "john@example.com",
        password: "short",
        confirmPassword: "short",
      }

      const result = formSchemas.signUp.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})

describe("Common Validation Schemas", () => {
  describe("Email Validation", () => {
    it("should validate correct email formats", () => {
      const validEmails = ["user@example.com", "test.email@domain.co.uk", "user+tag@example.org"]

      validEmails.forEach((email) => {
        const result = commonSchemas.email.safeParse(email)
        expect(result.success).toBe(true)
      })
    })

    it("should reject invalid email formats", () => {
      const invalidEmails = ["invalid-email", "@example.com", "user@", "user..name@example.com"]

      invalidEmails.forEach((email) => {
        const result = commonSchemas.email.safeParse(email)
        expect(result.success).toBe(false)
      })
    })
  })

  describe("UUID Validation", () => {
    it("should validate correct UUID formats", () => {
      const validUUIDs = [
        "550e8400-e29b-41d4-a716-446655440000",
        "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
      ]

      validUUIDs.forEach((uuid) => {
        const result = commonSchemas.uuid.safeParse(uuid)
        expect(result.success).toBe(true)
      })
    })

    it("should reject invalid UUID formats", () => {
      const invalidUUIDs = ["invalid-uuid", "550e8400-e29b-41d4-a716", "550e8400e29b41d4a716446655440000"]

      invalidUUIDs.forEach((uuid) => {
        const result = commonSchemas.uuid.safeParse(uuid)
        expect(result.success).toBe(false)
      })
    })
  })

  describe("Pagination Validation", () => {
    it("should validate pagination parameters", () => {
      const validPagination = {
        page: "1",
        limit: "10",
      }

      const result = commonSchemas.pagination.safeParse(validPagination)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(1)
        expect(result.data.limit).toBe(10)
      }
    })

    it("should apply default values", () => {
      const emptyPagination = {}

      const result = commonSchemas.pagination.safeParse(emptyPagination)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.page).toBe(1)
        expect(result.data.limit).toBe(10)
      }
    })

    it("should reject invalid pagination values", () => {
      const invalidPagination = {
        page: "0",
        limit: "101",
      }

      const result = commonSchemas.pagination.safeParse(invalidPagination)
      expect(result.success).toBe(false)
    })
  })
})
