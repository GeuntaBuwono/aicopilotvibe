# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**AICopilotVibe** (aicopilotvibe.com) - Next.js 15 enterprise SaaS application with complete authentication, payments, and admin system

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
pnpm formatter       # Combined formatting command
pnpm analyze         # Build with bundle analyzer
pnpm check:types     # TypeScript type checking
```

### Database Management

```bash
pnpm db:push         # Push schema to database
pnpm db:generate     # Generate migrations
pnpm db:migrate      # Run migrations
pnpm db:seed         # Seed database
pnpm db:reset        # Reset database
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
- **Tailwind CSS 4.1.5** with PostCSS integration (using `@tailwindcss/postcss`)
- **Class Variance Authority (CVA)** for type-safe component variants

### Authentication & Database

- **better-auth 1.2.12** with Polar.sh integration (@polar-sh/better-auth)
- **Drizzle ORM 0.44.3** with PostgreSQL database
- **T3 Env + Zod** for type-safe environment validation
- **Role-based access control** (user, admin, super_admin)

### Payment System

- **Polar.sh SDK** (v0.34.5) for payment processing
- **Webhook handling** for payment status updates
- **Checkout sessions** with success/failure flows

### Component System

- **Radix UI primitives** (15+ components) for accessibility
- **Magic UI** components for enhanced animations (15+ components)
- **Shadcn/ui** components (18+ components)
- **CVA-based design system** with consistent variant patterns
- **tailwind-merge** for intelligent class conflict resolution

### Testing & Quality

- **Jest + React Testing Library** for unit tests
- **Playwright** for E2E tests with auto-starting dev server
- **Storybook 8.6.12** for component development and visual testing
- **ESLint 9** with TypeScript and import ordering rules

### Build & Deploy

- **Bundle analyzer** integrated for performance monitoring
- **OpenTelemetry** instrumentation for observability
- **Resend** for email services

## Current Project Structure

```
app/                 # Next.js App Router (✅ IMPLEMENTED)
├── (auth)/          # Authentication pages (sign-in, sign-up)
├── (legal)/         # Legal pages (privacy policy, terms of service)
├── admin/           # Admin dashboard with role-based access
├── api/             # API routes (auth, payments, orders, user management)
├── dashboard/       # User dashboard with profile and subscriptions
├── payment/         # Payment success/failure pages
├── verify-email/    # Email verification flow
├── layout.tsx       # Root layout with Tailwind
├── page.tsx         # Landing page
└── middleware.ts    # Route protection middleware

components/          # Design System (✅ IMPLEMENTED)
├── ui/              # Shadcn/ui components (18+ components)
├── magicui/         # Magic UI animations (15+ components)
├── marketing/       # Landing page sections (Hero, Features, Pricing, FAQ)
├── auth/            # Authentication forms and components
├── admin/           # Admin-specific components (user management, orders)
├── dashboard/       # User dashboard components
└── payment/         # Payment flow components

lib/                 # Utilities and Configuration
├── db/              # Database schema and connection
├── auth.ts          # Better-auth configuration
├── polar.ts         # Polar.sh SDK configuration
├── utils.ts         # Utility functions
└── verification-utils.ts  # Email verification utilities
```

## Component Development Pattern (✅ IMPLEMENTED)

### CVA Design System

All components follow the **Class Variance Authority** pattern for type-safe variants:

```typescript
// Standard CVA pattern used throughout the codebase
const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-colors",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-blue-400", "text-white", "hover:enabled:bg-blue-700"],
        secondary: ["bg-transparent", "text-blue-400", "hover:enabled:bg-blue-400"],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6"],
      },
    },
    defaultVariants: { intent: "primary", size: "lg" },
  }
)
```

### Component Creation Rules

1. **Use CVA for ALL variants** - never inline conditional classes
2. **Leverage Radix UI primitives** before creating custom components
3. **Export TypeScript interfaces** with `VariantProps<typeof cva>`
4. **Include Storybook stories** for visual testing
5. **Follow shadcn/ui patterns** for consistency

## Implementation Status

### ✅ COMPLETED (Phase 1)

- **Complete authentication system** with better-auth and Polar.sh integration
- **Role-based access control** with user, admin, and super_admin roles
- **Payment processing** with Polar.sh SDK and webhook handling
- **Admin dashboard** with user management and order tracking
- **User dashboard** with profile management and subscription status
- **Email verification** flow with Resend integration
- **Responsive design** with Tailwind CSS 4 and Magic UI animations
- **Database schema** with proper relations and indexing
- **Comprehensive testing** infrastructure (Jest, Playwright, Storybook)
- **Production-ready build pipeline** with bundle analysis and OpenTelemetry

### 🔄 IN PROGRESS

- **Email notification system** enhancements
- **Advanced order management** features
- **Performance optimizations**
- **Security hardening**

## Development Guidelines

### Code Architecture Principles

- **Server Components by default** - Use Client Components only when needed (`"use client"`)
- **Server Actions for mutations** - Follow Next.js 15 App Router patterns
- **CVA for all variants** - Never use conditional class logic
- **Type-safe everything** - Strict TypeScript with proper error boundaries
- **better-auth patterns** - Use provided hooks and session management

### Authentication Architecture

- **better-auth** with Polar.sh integration for user management
- **Middleware protection** for routes requiring authentication
- **Role-based access** using database-stored user roles
- **Session management** with secure cookies and CSRF protection

### Database Patterns

- **Drizzle ORM** with PostgreSQL for type-safe database operations
- **Proper indexing** on frequently queried columns
- **Foreign key constraints** to maintain data integrity
- **Migration system** for schema changes

### File Organization

- **API routes**: Use App Router format (`app/api/*/route.ts`)
- **Components**: Follow CVA pattern with Storybook stories
- **Pages**: Server Components in `/app/` directory with proper grouping
- **Styles**: Tailwind classes only, no custom CSS
- **Database**: Drizzle schema files in `/lib/db/`

### Performance Standards

- **Bundle analysis on every build** - Monitor performance impact
- **Server-side rendering** - Leverage Next.js optimization
- **Component lazy loading** - Use dynamic imports when appropriate
- **Database query optimization** - Use proper indexing and efficient queries

## Essential Instructions

### Development Workflow

1. **Always use App Router patterns** - No Pages Router
2. **Implement Server Actions** for form handling and mutations
3. **Use better-auth hooks** for authentication state management
4. **Follow database migration patterns** with Drizzle
5. **Test components with Storybook** before integration
6. **Run E2E tests** for critical user flows
7. **Validate TypeScript** with strict mode enabled

### Quality Assurance

- **Run `pnpm lint:fix`** before committing
- **Run `pnpm format`** to ensure consistent code style
- **Run `pnpm check:types`** to validate TypeScript
- **Run `pnpm test`** to ensure unit tests pass
- **Run `pnpm e2e:headless`** for critical flows

### Security Considerations

- **Never expose sensitive data** in client components
- **Use environment variables** for all secrets and configuration
- **Validate all user inputs** with Zod schemas
- **Follow OWASP guidelines** for web application security
- **Use HTTPS in production** with proper SSL/TLS configuration
