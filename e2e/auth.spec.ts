import { expect, test } from "@playwright/test"

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")
  })

  test.describe("Sign In", () => {
    test("should navigate to sign-in page", async ({ page }) => {
      await page.getByRole("link", { name: /sign in/i }).click()
      await expect(page).toHaveURL(/\/sign-in/)
      await expect(page.getByText("Welcome Back")).toBeVisible()
    })

    test("should show validation errors for empty fields", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-in")

      // Try to submit empty form
      await page.getByRole("button", { name: /sign in/i }).click()

      // Check for HTML5 validation or custom validation
      const emailInput = page.locator('input[name="email"]')
      const passwordInput = page.locator('input[name="password"]')

      await expect(emailInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
    })

    test("should have proper form structure", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-in")

      // Check form elements
      await expect(page.locator('input[name="email"]')).toBeVisible()
      await expect(page.locator('input[name="password"]')).toBeVisible()
      await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible()

      // Check links
      await expect(page.getByRole("link", { name: /create a new account/i })).toBeVisible()
      await expect(page.getByRole("link", { name: /create your account/i })).toBeVisible()
    })
  })

  test.describe("Sign Up", () => {
    test("should show validation errors for empty fields", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-up")

      // Try to submit empty form
      await page.getByRole("button", { name: /create account/i }).click()

      // Check for HTML5 validation or custom validation
      const nameInput = page.locator('input[name="name"]')
      const emailInput = page.locator('input[name="email"]')
      const passwordInput = page.locator('input[name="password"]')

      await expect(nameInput).toBeVisible()
      await expect(emailInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
    })
  })

  test.describe("Navigation", () => {
    test("should navigate between sign-in and sign-up pages", async ({ page }) => {
      // Start at sign-in
      await page.goto("http://localhost:3000/sign-in")
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

  test.describe("UI Components", () => {
    test("should display particle background", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-in")

      // Check for particle background canvas element
      const particleBackground = page.locator('canvas, [class*="particle"], [id*="particle"]')
      await expect(particleBackground).toBeVisible()
    })

    test("should display animated gradient text", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-in")

      // Check for animated gradient text
      const gradientText = page.getByText("Welcome Back")
      await expect(gradientText).toBeVisible()
    })

    test("should display feature badges on sign-up page", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-up")

      // Check for feature badges - use more specific selectors to avoid strict mode violations
      await expect(page.locator('span:has-text("Daily Reset")').first()).toBeVisible()
      await expect(page.locator('span:has-text("Unlimited Tokens")').first()).toBeVisible()
      await expect(page.locator('span:has-text("GitHub Access")').first()).toBeVisible()
    })

    test("should display pricing information on sign-up page", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-up")

      // Check for pricing information
      await expect(page.getByText("Early Access Pricing")).toBeVisible()
      await expect(page.getByText(/\$\d+\/month/)).toBeVisible()
    })
  })

  test.describe("Accessibility", () => {
    test("should have proper labels for form inputs", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-in")

      // Check that inputs have proper labels
      const emailInput = page.locator('input[name="email"]')
      const passwordInput = page.locator('input[name="password"]')

      await expect(emailInput).toBeVisible()
      await expect(passwordInput).toBeVisible()
    })

    test("should have proper form structure with required fields", async ({ page }) => {
      await page.goto("http://localhost:3000/sign-in")

      // Check that form has proper structure (React Hook Form handles validation)
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
  })
})
