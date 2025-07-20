# AI Copilot Vibe

**Enterprise SaaS Platform for GitHub Copilot Access**

A Next.js 15 enterprise SaaS application that provides developers with affordable access to GitHub Copilot through enterprise email accounts. Built with modern technologies and production-ready architecture.

## 🚀 Project Status

**Current Phase**: ✅ **MVP Complete** - Production-ready with full feature set

### ✅ Completed Features

- **Complete Authentication System** - better-auth with Polar.sh integration
- **Role-Based Access Control** - User, admin, and super_admin roles
- **Payment Processing** - Polar.sh SDK with webhook handling
- **Admin Dashboard** - User management and order tracking
- **User Dashboard** - Profile management and subscription status
- **Email System** - Resend integration with verification flow
- **Database Layer** - PostgreSQL with Drizzle ORM
- **Component Library** - 50+ components (Radix + Shadcn + Magic UI)
- **Production Infrastructure** - Bundle analysis and OpenTelemetry

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.3.1** with App Router + React 19
- **TypeScript 5.8.3** with strict mode
- **Tailwind CSS 4.1.5** with PostCSS integration
- **Class Variance Authority (CVA)** for type-safe components

### Authentication & Database
- **better-auth 1.2.12** with Polar.sh integration
- **Drizzle ORM 0.44.3** with PostgreSQL
- **Role-based access control** (user, admin, super_admin)

### Payment & Email
- **Polar.sh SDK** (v0.34.5) for payment processing
- **Resend** for email services
- **Webhook handling** for real-time updates

### UI Components
- **Radix UI primitives** (20+ components)
- **Magic UI** animations (15+ components)
- **Shadcn/ui** components (20+ components)

### Testing & Quality
- **Vitest + React Testing Library** for unit tests
- **Playwright** for E2E tests
- **Storybook 8.6.12** for component development
- **ESLint 9** with TypeScript rules

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ (recommend 20+)
- pnpm 8+
- PostgreSQL 14+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/aicopilotvibe.git
cd aicopilotvibe

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Setup database
pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed

# Start development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Available Scripts

### Development
```bash
pnpm dev             # Start development server (Turbo)
pnpm build           # Production build with analysis
pnpm start           # Start production server
pnpm lint            # Run ESLint with TypeScript
pnpm lint:fix        # Auto-fix linting issues
pnpm check:types     # TypeScript type checking
pnpm prettier        # Check code formatting
pnpm prettier:fix    # Auto-fix formatting
pnpm format          # Format TypeScript/TSX/MD files
pnpm formatter       # Combined formatting command
pnpm analyze         # Build with bundle analyzer
```

### Database Management
```bash
pnpm db:push         # Push schema to database
pnpm db:generate     # Generate migrations
pnpm db:migrate      # Run migrations
pnpm db:seed         # Seed database with test data
pnpm db:reset        # Reset and reseed database
```

### Testing & Quality
```bash
pnpm test            # Run Vitest unit tests
pnpm test:watch      # Run Vitest in watch mode
pnpm e2e:headless    # Run Playwright E2E tests
pnpm e2e:ui          # Run Playwright E2E with UI
pnpm storybook       # Start Storybook server
pnpm build-storybook # Build Storybook
pnpm test-storybook  # Run Storybook tests
```

### Utilities
```bash
pnpm coupling-graph  # Generate dependency graph
```

## 🏗️ Project Structure

```
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication pages
│   ├── (legal)/            # Legal pages
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── dashboard/          # User dashboard
│   ├── payment/            # Payment pages
│   └── middleware.ts       # Route protection
├── components/             # UI Components
│   ├── ui/                 # Shadcn/ui components
│   ├── magicui/           # Magic UI animations
│   ├── marketing/         # Landing page sections
│   ├── auth/              # Authentication forms
│   ├── admin/             # Admin components
│   └── dashboard/         # Dashboard components
├── lib/                   # Utilities & Config
│   ├── auth.ts            # Authentication config
│   ├── payments.ts        # Payment processing
│   ├── email.ts           # Email service
│   └── utils.ts           # Utility functions
├── db/                    # Database Layer
│   ├── schema/            # Drizzle schemas
│   ├── seed/              # Database seeding
│   └── index.ts           # DB connection
└── __tests__/             # Test files
```

## 🔐 Environment Variables

Required environment variables (copy from `.env.example`):

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Payments
POLAR_SECRET_KEY="polar_sk_..."
POLAR_WEBHOOK_SECRET="whsec_..."
POLAR_PUBLIC_KEY="polar_pk_..."

# Email
RESEND_API_KEY="re_..."

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test auth.test.ts
```

### E2E Tests
```bash
# Run E2E tests headless
pnpm e2e:headless

# Run E2E tests with UI
pnpm e2e:ui
```

### Component Testing
```bash
# Start Storybook
pnpm storybook

# Run Storybook tests
pnpm test-storybook
```

## 📈 Performance

This application achieves excellent performance metrics:

- **Lighthouse Score**: 95+ across all categories
- **Bundle Size**: Optimized with code splitting
- **Core Web Vitals**: All metrics in green zone
- **TypeScript**: Strict mode with comprehensive types

Performance monitoring includes:
- Bundle analysis on every build
- OpenTelemetry instrumentation
- Performance budgets and alerts

## 🔒 Security

Security features implemented:
- **Authentication**: Secure session management with better-auth
- **Authorization**: Role-based access control
- **Payment Security**: PCI DSS compliance via Polar.sh
- **Data Protection**: Encrypted sensitive data
- **Input Validation**: Comprehensive input sanitization
- **HTTPS**: SSL/TLS encryption in production

## 🚀 Deployment

The application is ready for production deployment with:

- **Vercel**: Optimized for Next.js deployment
- **Database**: PostgreSQL with connection pooling
- **CDN**: Global content delivery
- **Monitoring**: Error tracking and performance monitoring
- **CI/CD**: Automated testing and deployment

## 📚 Documentation

- **[Development Plans](./plans/README.md)** - Complete project roadmap
- **[Project Foundation](./plans/project-foundation.md)** - Business strategy and architecture
- **[Component Documentation](./components/README.md)** - UI component library
- **[API Documentation](./docs/api.md)** - API endpoints and usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the established code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Use conventional commits
- Ensure TypeScript type safety

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/aicopilotvibe/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/aicopilotvibe/discussions)
- **Email**: support@aicopilotvibe.com

## 🙏 Acknowledgments

Built with modern web technologies:
- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Headless components
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [better-auth](https://www.better-auth.com/) - Authentication
- [Polar.sh](https://polar.sh/) - Payment processing
- [Resend](https://resend.com/) - Email delivery
