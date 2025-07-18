import { z } from "zod"

// Generic validation wrapper for database operations
export class DbValidationError extends Error {
  constructor(public validationErrors: z.ZodError) {
    super("Database validation failed")
    this.name = "DbValidationError"
  }
}
