# Technical Architecture

## **Implementation Status Legend**
- ✅ **IMPLEMENTED**: Already configured and working in current codebase
- ❌ **TO BE IMPLEMENTED**: Missing and needs to be added
- 🔄 **PARTIAL**: Partially implemented, needs completion

## **Complete Tech Stack**

### **Frontend & Core Framework**
```javascript
// Primary Framework ✅ IMPLEMENTED
- Next.js 15.3.1 (App Router) - EXCEEDS REQUIREMENTS
- TypeScript (strict mode) - CONFIGURED
- React 19.1.0 - EXCEEDS REQUIREMENTS

// Authentication ❌ TO BE IMPLEMENTED
- better-auth (v1.0+)
  - Email/password authentication
  - Session management
  - Admin authentication separation

// Server Actions & Type Safety ❌ TO BE IMPLEMENTED
- next-safe-action
  - Type-safe server actions
  - Input validation
  - Error handling

// Schema Validation ✅ IMPLEMENTED
- Zod (for schema validation)
- @t3-oss/env-nextjs (environment validation)
```

### **Database & ORM**
```javascript
// Database ❌ TO BE IMPLEMENTED
- PostgreSQL (Alibaba Cloud RDS)
  - Primary database for all data
  - Backup and scaling capabilities

// ORM & Database Access ❌ TO BE IMPLEMENTED
- Drizzle ORM
  - Type-safe database queries
  - Migration management
  - Schema validation
```

### **UI & Styling**
```javascript
// Core UI Framework ✅ IMPLEMENTED
- Tailwind CSS v4.1.5 - LATEST VERSION
- Radix UI primitives - EXTENSIVE COVERAGE
- class-variance-authority - CONFIGURED

// Component Libraries ❌ TO BE IMPLEMENTED
- shadcn/ui components - NEEDS SETUP
- reactbits.dev (UI components)
- hover.dev (animation components)
- magicui.design (magic UI components)

// Utilities ✅ IMPLEMENTED
- clsx (conditional classes)
- tailwind-merge (class optimization)
```

### **Payment Processing**
```javascript
// Primary Payment System ❌ TO BE IMPLEMENTED
- Polar.sh
  - Credit card processing
  - PayPal integration
  - Subscription management
  - Webhook handling
  - Global payment support

// Future Payment Options (Post-MVP)
- Solana Pay (crypto payments)
- Helius (Solana transaction tracking)
```

### **Email & Communications**
```javascript
// Email Service ❌ TO BE IMPLEMENTED
- Resend
  - Transactional emails
  - Email delivery tracking
  - Template management
  - Webhook integration
```

### **Analytics & Monitoring**
```javascript
// Analytics ❌ TO BE IMPLEMENTED
- Umami
  - Privacy-compliant analytics
  - Geographic tracking
  - Conversion tracking
  - Custom event tracking

// Error Monitoring ❌ TO BE IMPLEMENTED
- Sentry
  - Error tracking
  - Performance monitoring
  - Real-time alerts
```

### **Development Tools**
```javascript
// Code Quality ✅ IMPLEMENTED
- ESLint + Prettier - CONFIGURED
- TypeScript strict mode - ENABLED

// Testing ✅ IMPLEMENTED
- Jest (unit testing) - CONFIGURED
- Playwright (e2e testing) - CONFIGURED
- Storybook (component testing) - CONFIGURED

// Development Environment ❌ TO BE IMPLEMENTED
- Husky (git hooks) - NOT CONFIGURED
- Vercel (deployment) - READY FOR SETUP
- Alibaba Cloud (database hosting) - TO BE CONFIGURED

// Build Tools ✅ IMPLEMENTED
- Bundle analyzer - CONFIGURED
- Environment validation - CONFIGURED
```

## **Application File Structure**

```
project-root/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx         # User login
│   │   └── register/
│   │       └── page.tsx         # User registration
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       └── page.tsx         # User dashboard
│   ├── admin/
│   │   ├── layout.tsx           # Admin layout with auth
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── login/
│   │   │   └── page.tsx         # Admin login
│   │   ├── orders/
│   │   │   ├── page.tsx         # Orders management
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Individual order
│   │   ├── content/
│   │   │   ├── page.tsx         # Content management
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx     # Pricing settings
│   │   │   └── marketing/
│   │   │       └── page.tsx     # Marketing content
│   │   └── users/
│   │       └── page.tsx         # User management
│   ├── api/
│   │   ├── auth/                # User authentication APIs
│   │   ├── admin/
│   │   │   ├── auth/            # Admin authentication
│   │   │   ├── orders/          # Order management APIs
│   │   │   ├── content/         # Content management APIs
│   │   │   └── users/           # User management APIs
│   │   ├── webhooks/
│   │   │   ├── polar.ts         # Polar.sh payment webhooks
│   │   │   └── resend.ts        # Resend email webhooks
│   │   └── user/
│   │       └── status.ts        # User status API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── OrdersTable.tsx
│   │   ├── ContentEditor.tsx
│   │   └── UserManagement.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── dashboard/
│   │   ├── StatusCard.tsx
│   │   └── PaymentButton.tsx
│   └── marketing/
│       ├── Hero.tsx
│       ├── Benefits.tsx
│       ├── Pricing.tsx
│       └── FAQ.tsx
├── lib/
│   ├── auth.ts                  # User authentication setup
│   ├── admin-auth.ts            # Admin authentication setup
│   ├── db.ts                    # Database connection
│   ├── email.ts                 # Email utilities
│   ├── payments.ts              # Payment processing
│   ├── content.ts               # Content management
│   └── utils.ts                 # Utility functions
├── db/
│   ├── schema.ts                # Drizzle schema definitions
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Database seeding
├── types/
│   ├── auth.ts
│   ├── admin.ts
│   ├── payments.ts
│   └── content.ts
└── config/
    ├── database.ts
    ├── auth.ts
    └── payments.ts
```

## **Security Architecture**

### **Authentication Security**
- Password hashing with bcrypt (min 12 rounds)
- Secure session management
- CSRF protection on all forms
- Rate limiting on auth endpoints
- Admin routes IP restriction (optional)

### **Data Protection**
- Enterprise email/password encryption at rest
- PII data handling compliance
- Secure webhook signature verification
- SQL injection prevention (parameterized queries)
- XSS protection with proper sanitization

### **Payment Security**
- PCI DSS compliance through Polar.sh
- Webhook signature verification
- Secure API key management
- Payment fraud detection

## **Required Environment Variables**

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# Authentication
BETTER_AUTH_SECRET="your-super-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Admin Authentication
ADMIN_AUTH_SECRET="admin-super-secret-key"
ADMIN_AUTH_URL="http://localhost:3000/admin"

# Payments
POLAR_SECRET_KEY="polar_sk_live_xxxxx"
POLAR_WEBHOOK_SECRET="whsec_xxxxx"
POLAR_PUBLIC_KEY="polar_pk_live_xxxxx"

# Email
RESEND_API_KEY="re_xxxxx"
RESEND_WEBHOOK_SECRET="whsec_xxxxx"

# Analytics
UMAMI_WEBSITE_ID="your-umami-website-id"
SENTRY_DSN="https://xxxxx.ingest.sentry.io/xxxxx"

# Application
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_NAME="GitHub Enterprise Email"

# Security
ENCRYPTION_KEY="your-encryption-key-for-passwords"
JWT_SECRET="jwt-secret-for-sessions"
```