/**
 * Test Users Configuration for E2E Testing
 * 
 * This file contains test user credentials that should correspond to 
 * seeded users in the database from db/seed/index.ts
 */

export const TEST_USERS = {
  // Regular users with different subscription statuses
  regularUser: {
    email: "user1@example.com",
    password: "user123",
    expectedRole: "user" as const,
    expectedStatus: "paid" as const,
    name: "John Doe"
  },
  pendingUser: {
    email: "pending1@example.com", 
    password: "pending123",
    expectedRole: "user" as const,
    expectedStatus: "pending" as const,
    name: "Pending User 1"
  },
  inactiveUser: {
    email: "inactive1@example.com",
    password: "inactive123", 
    expectedRole: "user" as const,
    expectedStatus: "inactive" as const,
    name: "Inactive User 1"
  },
  expiredUser: {
    email: "expired1@example.com",
    password: "expired123",
    expectedRole: "user" as const,
    expectedStatus: "expired" as const,
    name: "Expired User 1"
  },
  cancelledUser: {
    email: "cancelled1@example.com",
    password: "cancelled123",
    expectedRole: "user" as const,
    expectedStatus: "cancelled" as const,
    name: "Cancelled User 1"
  },
  
  // Admin users
  adminUser: {
    email: "support@aicopilotvibe.com",
    password: "admin456",
    expectedRole: "admin" as const,
    expectedStatus: "active" as const,
    name: "Support Admin"
  },
  superAdmin: {
    email: "admin@aicopilotvibe.com",
    password: "admin123",
    expectedRole: "super_admin" as const, 
    expectedStatus: "active" as const,
    name: "Super Admin"
  }
} as const

// Type definitions for test users
export type TestUserKey = keyof typeof TEST_USERS
export type TestUser = typeof TEST_USERS[TestUserKey]
export type UserRole = TestUser['expectedRole']
export type UserStatus = TestUser['expectedStatus']

// Helper functions for test scenarios
export function getUserByRole(role: UserRole): TestUser {
  const users = Object.values(TEST_USERS).filter(user => user.expectedRole === role)
  return users[0] || TEST_USERS.regularUser
}

export function getUserByStatus(status: UserStatus): TestUser {
  const users = Object.values(TEST_USERS).filter(user => user.expectedStatus === status)
  return users[0] || TEST_USERS.regularUser
}

export function getAllUsersByRole(role: UserRole): TestUser[] {
  return Object.values(TEST_USERS).filter(user => user.expectedRole === role)
}

// Quick access exports for common test scenarios
export const ADMIN_USERS = {
  admin: TEST_USERS.adminUser,
  superAdmin: TEST_USERS.superAdmin
} as const

export const REGULAR_USERS = {
  paid: TEST_USERS.regularUser,
  pending: TEST_USERS.pendingUser,
  inactive: TEST_USERS.inactiveUser,
  expired: TEST_USERS.expiredUser,
  cancelled: TEST_USERS.cancelledUser
} as const

// Default export for easy importing
export default TEST_USERS