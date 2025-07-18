import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

// Polyfill for matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver
Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
    root: null,
    rootMargin: "",
    thresholds: [],
    takeRecords: vi.fn(() => []),
  })),
})

// Mock ResizeObserver
Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  })),
})

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => "/",
}))

// Mock database
vi.mock("@/db", () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

// Mock environment variables
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/test"
