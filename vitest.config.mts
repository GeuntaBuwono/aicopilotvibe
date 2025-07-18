/// <reference types="vitest" />
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/e2e/**",
      "**/.next/**",
      "**/.storybook/**",
    ],
    include: [
      "**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "**/components/**/*.{test,spec}.{js,jsx,ts,tsx}",
      "**/lib/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
})