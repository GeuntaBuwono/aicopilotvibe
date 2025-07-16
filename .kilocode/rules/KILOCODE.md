# KILOCODE.md
this application is aicopilotvibe with domain aicopilotvibe.com

This file provides guidance to Kilo Code (kilo.ai/code) when working with code in this repository.

## instructions
keep me updated on @docs if phase has been completed
use app router patterns nextjs
use Server Action patterns nextjs

## MCP
- keep using context7 for latest documentation
- we should use browsermcp for browser testing instead of playwright if possible

## Development Commands

### Core Development
```bash
pnpm dev             # Start development server (Next.js 15 with App Router)
pnpm build           # Production build with bundle analysis
pnpm start           # Start production server
pnpm lint            # Run ESLint with custom import ordering rules
pnpm lint:fix        # Auto-fix linting issues
pnpm type-check      # TypeScript strict mode checking
```

### Testing
```bash
pnpm test            # Run Jest unit tests
pnpm test:watch      # Jest in watch mode
pnpm test:e2e        # Playwright end-to-end tests with multi-browser support
pnpm storybook       # Component development environment
pnpm storybook:build # Build Storybook for deployment
```

### Database Operations (Once Implemented)
```bash
pnpm db:generate     # Generate Drizzle migrations
pnpm db:migrate      # Apply database migrations
pnpm db:seed         # Seed database with initial data
pnpm db:studio       # Open Drizzle Studio (database browser)
```

## Architecture Overview

### Tech Stack Foundation
- **Next.js 15.3.1** with App Router (latest React 19 patterns)
- **TypeScript** with strict mode and `noUncheckedIndexedAccess`
- **Tailwind CSS v4.1.5** with comprehensive Radix UI component ecosystem
- **Class Variance Authority (CVA)** for type-safe component variants

### Project Structure Pattern
```
app/                 # Next.js App Router (server components by default)
├── layout.tsx       # Root layout with Tailwind and metadata
├── page.tsx         # Landing page (marketing content)
└── api/            # API routes using new App Router conventions

components/          # Design system with CVA patterns
├── Button/          # Example: CVA-based variants with Radix primitives
└── Tooltip/         # Accessible components with Radix UI

docs/               # Comprehensive project documentation
├── README.md        # Project navigation hub
├── technical-architecture.md  # Complete tech stack specification
├── implementation-roadmap.md  # 8-week development phases
└── development-setup.md       # Local environment setup
```

### Component Development Patterns

#### Design System Approach
- **CVA (Class Variance Authority)** for consistent component variants
- **Radix UI primitives** as foundation for accessibility and behavior
- **tailwind-merge** for intelligent class conflict resolution

Example component pattern:
```typescript
const button = cva([
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  "focus-visible:outline-none focus-visible:ring-2"
], {
  variants: {
    intent: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
    },
    size: {
      sm: "h-9 px-3",
      lg: "h-11 px-8"
    }
  }
})
```

### Testing Strategy
- **Jest + React Testing Library** for unit tests
- **Playwright** for E2E tests with auto-starting dev server
- **Storybook** for component development and visual testing
- **Parallel execution** enabled for performance

### Environment & Configuration
- **T3 Env + Zod** for type-safe environment validation
- **Bundle analyzer** integrated for performance monitoring
- **OpenTelemetry** instrumentation for observability
- **Strict TypeScript** with enhanced type checking

## Critical Implementation Status

### ✅ Fully Implemented Foundation
- Modern Next.js setup with enterprise-grade tooling
- Comprehensive Radix UI component ecosystem (15+ primitives)
- Production-ready build pipeline with optimization
- Complete testing infrastructure (unit, E2E, visual)

### ❌ Missing Core Business Logic (Ready for Implementation)
- **Authentication**: better-auth system (user + admin separation)
- **Database**: Drizzle ORM + PostgreSQL schema (6 tables planned)
- **Payments**: Polar.sh integration with webhook handling
- **Email**: Resend service with transactional templates
- **Analytics**: Umami + Sentry monitoring

## Development Workflow

### Code Quality Standards
- **ESLint 9** with TypeScript and custom import ordering
- **Prettier** with Tailwind CSS plugin integration
- **Conventional commits** for standardized git history
- **Type-safe everything** approach with strict TypeScript

### Performance Considerations
- **Server Components** by default in App Router
- **Bundle analysis** on every build
- **Image optimization** through Next.js built-ins
- **Static optimization** for marketing pages

### Documentation-Driven Development
All architectural decisions and implementation plans are documented in `/docs/`. Key documents:
- `technical-architecture.md` - Complete tech stack with implementation status
- `implementation-roadmap.md` - 8-week phased development plan
- `database-schema.md` - Complete PostgreSQL schema with Drizzle setup

## Key Development Principles

### Follow Established Patterns
- Use CVA for all component variants
- Leverage existing Radix UI primitives before creating custom components
- Maintain the design system approach with consistent prop interfaces

### Maintain Type Safety
- All environment variables must be validated through T3 Env
- Use TypeScript strict mode patterns throughout
- Implement proper error boundaries and type guards

### Architecture Consistency
- Server Components by default, Client Components only when needed
- API routes follow App Router conventions (`route.ts` files)
- Component props use CVA variant patterns for consistency

The codebase has excellent foundations but requires implementation of core business logic following the comprehensive plans documented in `/docs/`.