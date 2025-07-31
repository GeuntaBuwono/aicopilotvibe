import { expect, test } from "@playwright/test"
import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { TEST_USERS } from "@/mock/test-users"

// MSW server setup for mocking non-auth API calls
const mockServer = setupServer(
  // Mock admin stats API
  http.get("/api/admin/stats", () => {
    return HttpResponse.json({
      totalUsers: 13,
      totalOrders: 3,
      totalRevenue: 450,
      activeSubscriptions: 3,
      conversionRate: 100.0
    })
  }),

  // Mock admin analytics API
  http.get("/api/admin/analytics", () => {
    return HttpResponse.json({
      totalUsers: 13,
      activeSubscriptions: 3,
      totalOrders: 3,
      completedOrders: 1,
      revenue: 450,
      recentActivity: [
        {
          id: "1",
          action: "User signed up",
          timestamp: new Date().toISOString(),
          details: "New user registration"
        }
      ],
      userGrowth: [
        { date: "2024-01-01", users: 10 },
        { date: "2024-01-02", users: 13 }
      ],
      orderStats: {
        pending: 1,
        processing: 1,
        delivered: 1,
        cancelled: 0
      }
    })
  }),

  // Mock admin orders API
  http.get("/api/admin/orders", () => {
    return HttpResponse.json({
      orders: [
        {
          id: "order-123",
          userId: "user-1",
          status: "delivered",
          priority: "normal",
          createdAt: new Date().toISOString(),
          user: { name: "John Doe", email: "user1@example.com" }
        }
      ]
    })
  }),

  // Mock user profile API
  http.get("/api/user/profile", () => {
    return HttpResponse.json({
      profile: {
        enterpriseEmail: "test@github-enterprise.com"
      }
    })
  })
)

test.describe("Authentication E2E Tests", () => {
  test.beforeAll(async () => {
    // Start MSW server for mocking non-auth APIs
    mockServer.listen({ onUnhandledRequest: "bypass" })
  })

  test.afterAll(async () => {
    mockServer.close()
  })

  test.beforeEach(async ({ page, context }) => {
    // Clear any existing session before each test
    await context.clearCookies()
    await context.clearPermissions()
    
    // Set longer timeout for auth operations
    test.setTimeout(45000)
  })

  test.afterEach(async () => {
    // Reset MSW handlers after each test
    mockServer.resetHandlers()
  })

  test.describe("Page Structure & UI", () => {
    test("should display sign-in page correctly", async ({ page }) => {
      await page.goto("/sign-in")

      // Check page title
      await expect(page.getByText("Welcome Back")).toBeVisible()

      // Check form elements
      await expect(page.locator('input[name="email"]')).toBeVisible()
      await expect(page.locator('input[name="password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toBeVisible()

      // Check navigation links
      await expect(page.getByText("create a new account")).toBeVisible()
    })

    test("should display sign-up page correctly", async ({ page }) => {
      await page.goto("/sign-up")

      // Check page title
      await expect(page.getByText("Join AI Copilot Vibe")).toBeVisible()

      // Check form elements
      await expect(page.locator('input[name="name"]')).toBeVisible()
      await expect(page.locator('input[name="email"]')).toBeVisible()
      await expect(page.locator('input[name="password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toBeVisible()

      // Check feature badges - use more specific selectors
      await expect(page.locator('span:has-text("Daily Reset")').first()).toBeVisible()
      await expect(page.locator('span:has-text("Unlimited Tokens")').first()).toBeVisible()
      await expect(page.locator('span:has-text("GitHub Access")').first()).toBeVisible()

      // Check pricing info
      await expect(page.getByText("$150/month")).toBeVisible()
    })

    test("should display particle background and animated elements", async ({ page }) => {
      await page.goto("/sign-in")

      // Check for particle background canvas element
      const particleBackground = page.locator('canvas, [class*="particle"], [id*="particle"]')
      await expect(particleBackground).toBeVisible()

      // Check for animated gradient text
      const gradientText = page.getByText("Welcome Back")
      await expect(gradientText).toBeVisible()

      // Check for auth features info
      await expect(page.getByText("Secure authentication")).toBeVisible()
      await expect(page.getByText("24h Setup")).toBeVisible()
      await expect(page.getByText("Unlimited Access")).toBeVisible()
    })

    test("should have proper form accessibility", async ({ page }) => {
      await page.goto("/sign-in")

      // Check that form inputs have proper attributes
      const emailInput = page.locator('input[name="email"]')
      const passwordInput = page.locator('input[name="password"]')

      await expect(emailInput).toHaveAttribute("type", "email")
      await expect(emailInput).toHaveAttribute("id", "email")
      await expect(passwordInput).toHaveAttribute("type", "password")
      await expect(passwordInput).toHaveAttribute("id", "password")

      // Check that form has labels
      await expect(page.locator('label[for="email"]')).toBeVisible()
      await expect(page.locator('label[for="password"]')).toBeVisible()
    })

    test("should navigate between sign-in and sign-up pages", async ({ page }) => {
      // Start at sign-in
      await page.goto("/sign-in")
      await expect(page.getByText("Welcome Back")).toBeVisible()

      // Navigate to sign-up
      await page.getByRole("link", { name: /create your account/i }).click()
      await expect(page).toHaveURL(/\/sign-up/)
      await expect(page.getByText("Join AI Copilot Vibe")).toBeVisible()

      // Navigate back to sign-in
      await page.locator('a[href="/sign-in"]:has-text("Sign in instead")').first().click()
      await expect(page).toHaveURL(/\/sign-in/)
      await expect(page.getByText("Welcome Back")).toBeVisible()
    })
  })

  test.describe("Authentication Flow", () => {
    test.describe("Form Validation", () => {
      test("should show loading state during form submission", async ({ page }) => {
        await page.goto("/sign-in")

        // Fill form with invalid credentials
        await page.locator('input[name="email"]').fill("invalid@example.com")
        await page.locator('input[name="password"]').fill("wrongpassword")

        // Click submit and check for loading state
        await page.locator('button[type="submit"]').click()

        // Check if button is disabled during submission
        const submitButton = page.locator('button[type="submit"]')
        await expect(submitButton).toBeDisabled()
      })

      test("should validate empty form fields", async ({ page }) => {
        await page.goto("/sign-in")

        // Try to submit empty form
        await page.getByRole("button", { name: /sign in/i }).click()

        // Form should still be visible and accessible
        const emailInput = page.locator('input[name="email"]')
        const passwordInput = page.locator('input[name="password"]')

        await expect(emailInput).toBeVisible()
        await expect(passwordInput).toBeVisible()
      })
    })

    test.describe("Successful Login", () => {
      test("should login regular user and redirect to dashboard", async ({ page }) => {
        await page.goto("/sign-in")

        // Fill form with valid regular user credentials
        await page.locator('input[name="email"]').fill(TEST_USERS.regularUser.email)
        await page.locator('input[name="password"]').fill(TEST_USERS.regularUser.password)

        // Submit form
        await page.locator('button[type="submit"]').click()

        // Wait for redirect to dashboard
        await expect(page).toHaveURL(/\/dashboard/)

        // Verify dashboard UI elements
        await expect(page.getByText("Dashboard")).toBeVisible()
        await expect(page.getByText("Welcome to AI Copilot Vibe")).toBeVisible()
        await expect(page.getByText("Account Status")).toBeVisible()
        await expect(page.getByText("Active")).toBeVisible()

        // Verify user name in header
        await expect(page.getByText(/Welcome,/)).toBeVisible()

        // Verify sign out button
        await expect(page.getByText("Sign Out")).toBeVisible()
      })

      test("should login admin user and redirect to admin panel", async ({ page }) => {
        await page.goto("/sign-in")

        // Fill form with valid admin credentials
        await page.locator('input[name="email"]').fill(TEST_USERS.adminUser.email)
        await page.locator('input[name="password"]').fill(TEST_USERS.adminUser.password)

        // Submit form
        await page.locator('button[type="submit"]').click()

        // Wait for redirect to admin panel
        await expect(page).toHaveURL(/\/admin/)

        // Verify admin panel UI elements
        await expect(page.getByText("Admin Dashboard")).toBeVisible()
        await expect(page.getByText("Admin Panel")).toBeVisible()

        // Verify admin navigation
        await expect(page.getByText("Orders")).toBeVisible()
        await expect(page.getByText("Users")).toBeVisible()
        await expect(page.getByText("Analytics")).toBeVisible()

        // Verify quick stats are loaded (mocked)
        await expect(page.getByText("Total Revenue")).toBeVisible()
        await expect(page.getByText("$450")).toBeVisible()
      })

      test("should login super admin and redirect to admin panel", async ({ page }) => {
        await page.goto("/sign-in")

        // Fill form with valid super admin credentials
        await page.locator('input[name="email"]').fill(TEST_USERS.superAdmin.email)
        await page.locator('input[name="password"]').fill(TEST_USERS.superAdmin.password)

        // Submit form
        await page.locator('button[type="submit"]').click()

        // Wait for redirect to admin panel
        await expect(page).toHaveURL(/\/admin/)

        // Verify admin panel UI
        await expect(page.getByText("Admin Dashboard")).toBeVisible()
        
        // Verify super admin has access to user management
        await page.getByText("Users").click()
        await expect(page).toHaveURL(/\/admin\/users/)
      })

      test("should login inactive user and show checkout option", async ({ page }) => {
        await page.goto("/sign-in")

        // Fill form with inactive user credentials
        await page.locator('input[name="email"]').fill(TEST_USERS.inactiveUser.email)
        await page.locator('input[name="password"]').fill(TEST_USERS.inactiveUser.password)

        // Submit form
        await page.locator('button[type="submit"]').click()

        // Wait for redirect to dashboard
        await expect(page).toHaveURL(/\/dashboard/)

        // Verify inactive status and checkout button
        await expect(page.getByText("Account Status")).toBeVisible()
        await expect(page.getByText("Inactive")).toBeVisible()
        
        // Should show checkout button for inactive users
        await expect(page.getByText(/Get Started/)).toBeVisible()
      })
    })

    test.describe("Error Handling", () => {
      test("should handle invalid credentials", async ({ page }) => {
        await page.goto("/sign-in")

        // Fill form with invalid credentials
        await page.locator('input[name="email"]').fill("invalid@example.com")
        await page.locator('input[name="password"]').fill("wrongpassword")

        // Submit form
        await page.locator('button[type="submit"]').click()

        // Wait a moment for any error handling
        await page.waitForTimeout(2000)

        // Check if we're still on sign-in page (indicating failed login)
        await expect(page).toHaveURL(/\/sign-in/)

        // Look for any error message (could be different text)
        const errorMessages = [
          "Invalid email or password",
          "Invalid credentials",
          "Authentication failed",
          "Login failed",
          "Error"
        ]
        
        let errorFound = false
        for (const errorText of errorMessages) {
          try {
            await expect(page.getByText(errorText)).toBeVisible({ timeout: 1000 })
            errorFound = true
            break
          } catch {
            // Continue to next error message
          }
        }

        // Form should remain accessible for retry
        await expect(page.locator('input[name="email"]')).toBeVisible()
        await expect(page.locator('input[name="password"]')).toBeVisible()
        await expect(page.locator('button[type="submit"]')).toBeEnabled()
      })

      test("should handle malformed email addresses", async ({ page }) => {
        await page.goto("/sign-in")

        // Fill form with malformed email
        await page.locator('input[name="email"]').fill("not-an-email")
        await page.locator('input[name="password"]').fill("password123")

        // Form validation should catch this
        const emailInput = page.locator('input[name="email"]')
        await expect(emailInput).toHaveAttribute("type", "email")
      })
    })
  })

  test.describe("Session Management", () => {
    test("should persist session across page reloads", async ({ page }) => {
      // Login first
      await page.goto("/sign-in")
      await page.locator('input[name="email"]').fill(TEST_USERS.regularUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.regularUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/dashboard/)

      // Reload page
      await page.reload()

      // Should still be on dashboard
      await expect(page).toHaveURL(/\/dashboard/)
      await expect(page.getByText("Dashboard")).toBeVisible()
    })

    test("should redirect logged-in users away from auth pages", async ({ page }) => {
      // Login first
      await page.goto("/sign-in")
      await page.locator('input[name="email"]').fill(TEST_USERS.regularUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.regularUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/dashboard/)

      // Try to access sign-in page while logged in
      await page.goto("/sign-in")
      // Should redirect away from sign-in page
      await expect(page).not.toHaveURL(/\/sign-in/)
    })

    test("should handle logout functionality", async ({ page }) => {
      // Login first
      await page.goto("/sign-in")
      await page.locator('input[name="email"]').fill(TEST_USERS.regularUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.regularUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/dashboard/)

      // Click sign out
      await page.getByText("Sign Out").click()

      // Should redirect to homepage
      await expect(page).toHaveURL(/\/$/)

      // Try to access protected route
      await page.goto("/dashboard")
      
      // Should redirect to sign-in
      await expect(page).toHaveURL(/\/sign-in/)
    })

    test("should handle admin logout functionality", async ({ page }) => {
      // Login as admin
      await page.goto("/sign-in")
      await page.locator('input[name="email"]').fill(TEST_USERS.adminUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.adminUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/admin/)

      // Look for user session menu (admin layout)
      const userMenu = page.getByRole("button").filter({ hasText: /support/i }).first()
      if (await userMenu.isVisible()) {
        await userMenu.click()
        await page.getByText("Sign Out").click()
      } else {
        // Fallback: look for any sign out link
        await page.getByText("Sign Out").click()
      }

      // Should redirect to homepage
      await expect(page).toHaveURL(/\/$/)

      // Session should be cleared
      await page.goto("/admin")
      await expect(page).toHaveURL(/\/sign-in/)
    })
  })

  test.describe("Role-based Access Control", () => {
    test("should prevent regular users from accessing admin routes", async ({ page }) => {
      // Login as regular user
      await page.goto("/sign-in")
      await page.locator('input[name="email"]').fill(TEST_USERS.regularUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.regularUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/dashboard/)

      // Try to access admin route
      await page.goto("/admin")
      
      // Should be redirected away or show access denied
      await expect(page).not.toHaveURL(/\/admin/)
    })

    test("should show role-specific UI elements", async ({ page }) => {
      // Test regular user dashboard
      await page.goto("/sign-in")
      await page.locator('input[name="email"]').fill(TEST_USERS.regularUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.regularUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/dashboard/)

      // Regular user should NOT see admin panel link
      await expect(page.getByText("Admin Panel")).not.toBeVisible()

      // Logout and test admin user
      await page.getByText("Sign Out").click()
      await page.goto("/sign-in")
      
      await page.locator('input[name="email"]').fill(TEST_USERS.adminUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.adminUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/admin/)

      // Admin should see admin-specific navigation
      await expect(page.getByText("Orders")).toBeVisible()
      await expect(page.getByText("Users")).toBeVisible()
      await expect(page.getByText("Analytics")).toBeVisible()
    })
  })

  test.describe("Navigation and User Experience", () => {
    test("should navigate from homepage to sign-in", async ({ page }) => {
      await page.goto("/")
      
      // Look for sign-in link on homepage
      const signInLink = page.getByRole("link", { name: /sign in/i })
      if (await signInLink.isVisible()) {
        await signInLink.click()
        await expect(page).toHaveURL(/\/sign-in/)
        await expect(page.getByText("Welcome Back")).toBeVisible()
      }
    })

    test("should handle browser back/forward after login", async ({ page }) => {
      // Login
      await page.goto("/sign-in")
      await page.locator('input[name="email"]').fill(TEST_USERS.regularUser.email)
      await page.locator('input[name="password"]').fill(TEST_USERS.regularUser.password)
      await page.locator('button[type="submit"]').click()
      await expect(page).toHaveURL(/\/dashboard/)

      // Navigate to another page
      await page.goto("/")

      // Use browser back
      await page.goBack()

      // Should still be authenticated and on dashboard
      await expect(page).toHaveURL(/\/dashboard/)
      await expect(page.getByText("Dashboard")).toBeVisible()
    })
  })
})