**AICopilotVibe** (aicopilotvibe.com) - Next.js 15 enterprise application with App Router

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Available Commands (Current)

### Development
```bash
pnpm dev             # Start development server (Next.js 15 with App Router + Turbo)
pnpm build           # Production build with bundle analysis
pnpm start           # Start production server
pnpm lint            # Run ESLint with TypeScript + import ordering
pnpm lint:fix        # Auto-fix linting issues
pnpm prettier        # Check code formatting
pnpm prettier:fix    # Auto-fix formatting issues
pnpm format          # Format all TypeScript/TSX/MD files
pnpm analyze         # Build with bundle analyzer
```

### Testing & Quality
```bash
pnpm test            # Run Jest unit tests
pnpm e2e:headless    # Run Playwright E2E tests (headless)
pnpm e2e:ui          # Run Playwright E2E tests (with UI)
pnpm storybook       # Start Storybook development server
pnpm build-storybook # Build Storybook for deployment
pnpm test-storybook  # Run Storybook tests
```

### Utilities
```bash
pnpm coupling-graph  # Generate dependency coupling graph (graph.svg)
```

## Tech Stack (Current Implementation)

### Core Framework
- **Next.js 15.3.1** with App Router + React 19
- **TypeScript** with strict mode + `noUncheckedIndexedAccess`
- **Tailwind CSS 4.1.5** with PostCSS integration
- **Class Variance Authority (CVA)** for type-safe component variants

### Component System
- **Radix UI primitives** (15+ components) for accessibility
- **tailwind-merge** for intelligent class conflict resolution
- **CVA-based design system** with consistent variant patterns

### Testing & Quality
- **Jest + React Testing Library** for unit tests
- **Playwright** for E2E tests with auto-starting dev server
- **Storybook** for component development and visual testing
- **ESLint 9 + Prettier** with TypeScript and import ordering

### Build & Deploy
- **Bundle analyzer** integrated for performance monitoring
- **OpenTelemetry** instrumentation for observability
- **T3 Env + Zod** for type-safe environment validation

## Current Project Structure
```
app/                 # Next.js App Router (✅ ACTIVE)
├── layout.tsx       # Root layout with Tailwind
├── page.tsx         # Landing page
└── api/             # API routes (App Router format)
    └── health/
        └── route.ts

components/          # Design System (✅ ACTIVE)
├── Button/          # CVA-based button with variants
│   ├── Button.tsx
│   └── Button.stories.tsx
└── Tooltip/         # Radix UI tooltip wrapper
    └── Tooltip.tsx
```

## Component Development Pattern (✅ IMPLEMENTED)

### CVA Design System
All components follow the **Class Variance Authority** pattern for type-safe variants:

```typescript
// components/Button/Button.tsx - Current implementation
const button = cva([
  "justify-center", "inline-flex", "items-center", "rounded-xl",
  "text-center", "border", "border-blue-400", "transition-colors"
], {
  variants: {
    intent: {
      primary: ["bg-blue-400", "text-white", "hover:enabled:bg-blue-700"],
      secondary: ["bg-transparent", "text-blue-400", "hover:enabled:bg-blue-400"]
    },
    size: {
      sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
      lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"]
    }
  },
  defaultVariants: { intent: "primary", size: "lg" }
})
```

### Component Creation Rules
1. **Use CVA for ALL variants** - never inline conditional classes
2. **Leverage Radix UI primitives** before creating custom components
3. **Export TypeScript interfaces** with `VariantProps<typeof cva>`
4. **Include Storybook stories** for visual testing

## Implementation Status

### ✅ COMPLETED Foundation
- **Next.js 15 App Router** with React 19 + TypeScript strict mode
- **CVA-based component system** with Radix UI primitives (15+ components)
- **Complete testing infrastructure** (Jest, Playwright, Storybook)
- **Production-ready build pipeline** with bundle analysis + OpenTelemetry
- **Code quality tooling** (ESLint 9, Prettier, conventional commits)

### ⏳ PLANNED (Not Yet Implemented)
- **Authentication**: better-auth system (user + admin roles)
- **Database**: Drizzle ORM + PostgreSQL (schema designed, not connected)
- **Payments**: Polar.sh integration with webhook handling
- **Email**: Resend service with transactional templates
- **Analytics**: Umami + Sentry monitoring

**Important**: Database commands (`db:generate`, `db:migrate`, etc.) do not exist yet.

## Development Guidelines

### Code Architecture Principles
- **Server Components by default** - Use Client Components only when needed
- **Server Actions for mutations** - Follow Next.js 15 App Router patterns
- **CVA for all variants** - Never use conditional class logic
- **Type-safe everything** - Strict TypeScript with proper error boundaries

### File Organization
- **API routes**: Use App Router format (`app/api/*/route.ts`)
- **Components**: Follow CVA pattern with Storybook stories
- **Pages**: Server Components in `/app/` directory
- **Styles**: Tailwind classes only, no custom CSS

### Performance Standards
- **Bundle analysis on every build** - Monitor performance impact
- **Server-side rendering** - Leverage Next.js optimization
- **Component lazy loading** - Use dynamic imports when appropriate

## Essential Instructions

### Development Workflow
1. **Always use App Router patterns** - No Pages Router
2. **Implement Server Actions** for form handling and mutations
3. **Use context7 MCP** for latest library documentation
4. **Use browsermcp** for browser testing instead of Playwright when possible
5. **After each phase**, fix issues lint and format
6. **Update `/plans/` when phases are completed**

### MCP Integration
- **Context7**: For retrieving up-to-date library documentation
- **BrowserMCP**: For browser automation and testing
- **Sequential Thinking**: For complex problem-solving workflows

### Quality Assurance
- **Test components with Storybook** before integration
- **Run E2E tests** for critical user flows
- **Validate TypeScript** with strict mode enabled
- **Follow conventional commits** for git history
