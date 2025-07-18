import { expect, test } from "@playwright/test"

test.describe("Authentication E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for auth operations
    test.setTimeout(30000)
  })

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

    // Check feature badges - use more specific selectors to avoid strict mode violations
    await expect(page.locator('span:has-text("Daily Reset")').first()).toBeVisible()
    await expect(page.locator('span:has-text("Unlimited Tokens")').first()).toBeVisible()
    await expect(page.locator('span:has-text("GitHub Access")').first()).toBeVisible()

    // Check navigation links - use more specific selector to avoid strict mode violation
    await expect(page.locator('a[href="/sign-in"]:has-text("Sign in instead")').first()).toBeVisible()

    // Check pricing info
    await expect(page.getByText("$150/month")).toBeVisible()
  })

  test("should show loading state during form submission", async ({ page }) => {
    await page.goto("/sign-in")

    // Fill form
    await page.locator('input[name="email"]').fill("test@example.com")
    await page.locator('input[name="password"]').fill("password123")

    // Click submit and check for loading state
    await page.locator('button[type="submit"]').click()

    // Check if button is disabled during submission
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeDisabled()
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

    // Check that form has labels (React Hook Form handles validation, not HTML5 required)
    await expect(page.locator('label[for="email"]')).toBeVisible()
    await expect(page.locator('label[for="password"]')).toBeVisible()
  })

  test("should display UI components correctly", async ({ page }) => {
    await page.goto("/sign-in")

    // Check for gradient text
    await expect(page.getByText("Welcome Back")).toBeVisible()

    // Check for auth features info
    await expect(page.getByText("Secure authentication")).toBeVisible()
    await expect(page.getByText("24h Setup")).toBeVisible()
    await expect(page.getByText("Unlimited Access")).toBeVisible()
    await expect(page.locator('span:has-text("Daily Reset")').first()).toBeVisible()
  })
})
