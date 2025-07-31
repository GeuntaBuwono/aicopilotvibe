# Project Foundation

## **🚀 Business Strategy & Market Validation**

### **Product Overview**

#### **Business Model**

- **Product**: GitHub Enterprise Email SaaS providing GitHub Copilot access
- **Target Market**: Global VSCode developers seeking AI coding assistance
- **Pricing Strategy**: $19.99/month (competitive to GitHub Enterprise $39/month)
- **Fulfillment**: 24-hour manual email preparation and delivery
- **Market Scope**: Global reach with no geographic restrictions

#### **Value Proposition**

- **Immediate Access**: 24-hour delivery guarantee
- **Cost Effective**: 50% cheaper than GitHub Enterprise
- **Global Reach**: Works with any VSCode setup worldwide
- **No Commitment**: Monthly subscription, cancel anytime
- **No Enterprise Setup**: Individual developer access

### **Market Analysis**

#### **Target Market Research**

- **Primary**: VSCode developers seeking GitHub Copilot access
- **Secondary**: Enterprise developers needing AI-powered coding assistance
- **Market Size**: 26M+ VSCode users globally
- **Pain Point**: GitHub Copilot requires enterprise/paid subscriptions
- **Geographic Distribution**: Global developer community

#### **Competitive Landscape**

- **Direct Competition**: GitHub Copilot official subscriptions
- **Indirect Competition**: AI coding assistants (Tabnine, Codeium, CodeT5)
- **Competitive Advantage**: Lower price, immediate access, no enterprise requirements
- **Market Gap**: Affordable individual access to enterprise-grade AI tools

#### **Customer Segments**

1. **Individual Developers**: Personal projects, freelancers
2. **Small Teams**: Startups, small agencies
3. **Enterprise Developers**: Corporate developers without enterprise access
4. **Students/Educators**: Learning and teaching environments

### **Success Metrics**

#### **Business KPIs**

- **Revenue Growth**: Monthly recurring revenue targets
- **Customer Acquisition**: Conversion rate optimization
- **Customer Retention**: Monthly churn rate < 5%
- **Market Penetration**: Geographic expansion metrics
- **User Satisfaction**: Net Promoter Score > 8/10

#### **Operational Metrics**

- **Fulfillment SLA**: 24-hour delivery compliance > 98%
- **Support Quality**: Response time < 2 hours
- **System Reliability**: Uptime > 99.9%
- **Payment Processing**: Success rate > 95%
- **Email Delivery**: Delivery rate > 99%

### **Go-to-Market Strategy**

#### **Launch Strategy**

1. **MVP Launch**: Core functionality with manual processes
2. **Early Adopters**: Developer community engagement
3. **Iterative Improvement**: User feedback incorporation
4. **Scale Operations**: Automation and optimization
5. **Market Expansion**: Geographic and segment growth

#### **Customer Acquisition**

- **Organic Growth**: SEO-optimized content marketing
- **Developer Communities**: GitHub, Stack Overflow, Reddit engagement
- **Content Marketing**: Technical tutorials and guides
- **Referral Program**: Customer advocacy and rewards
- **Paid Advertising**: Targeted developer-focused campaigns

#### **Retention Strategy**

- **Onboarding Excellence**: Smooth user experience
- **Continuous Value**: Regular feature updates
- **Community Building**: Developer community engagement
- **Customer Support**: Responsive and helpful support
- **Loyalty Program**: Long-term customer rewards

### **Financial Projections**

#### **Revenue Model**

- **Monthly Subscription**: $19.99 per user
- **Target Users**: 1,000 users by Month 3
- **Revenue Target**: $20,000 MRR by Month 3
- **Growth Rate**: 25% month-over-month
- **Annual Revenue**: $240,000+ by Year 1

#### **Cost Structure**

- **Technology Costs**: Infrastructure, tools, services
- **Operational Costs**: Manual fulfillment, support
- **Marketing Costs**: Customer acquisition campaigns
- **Development Costs**: Feature development, maintenance
- **Administrative Costs**: Legal, accounting, business operations

---

## **🏗️ Technical Architecture & Implementation Strategy**

### **Architecture Overview**

#### **System Design Philosophy**

- **Ship-First Approach**: Prioritize MVP delivery with incremental improvements
- **Parallel Development**: UI and backend workstreams for faster delivery
- **Production Checkpoints**: Clear go/no-go decisions for releases
- **Scalable Foundation**: Built for growth from day one

#### **Technology Stack**

**Frontend & Core Framework**

```typescript
// Primary Framework - ✅ IMPLEMENTED
- Next.js 15.3.1 (App Router, Server Components)
- React 19.1.0 (Latest features)
- TypeScript (Strict mode)

// UI Component Libraries - ❌ TO BE IMPLEMENTED
- shadcn/ui (Primary component system)
- magicui.design (Magic UI effects)
- Custom animation components

// Styling & Design - ✅ IMPLEMENTED
- Tailwind CSS v4.1.5
- Radix UI primitives
- class-variance-authority (CVA)
```

**Backend & Database**

```typescript
// Database - ❌ TO BE IMPLEMENTED
- PostgreSQL (Alibaba Cloud RDS)
- Drizzle ORM (Type-safe queries)
- Connection pooling and optimization

// Authentication - ❌ TO BE IMPLEMENTED
- better-auth (User authentication)
- Separate admin authentication
- Session management
```

**External Services**

```typescript
// Payment Processing - ❌ TO BE IMPLEMENTED
- Polar.sh (Primary payment system)
- Credit card and PayPal support
- Subscription management
- Webhook handling

// Email Services - ❌ TO BE IMPLEMENTED
- Resend (Email delivery)
- Transactional email templates
- Email logging and tracking
- Domain verification

// Analytics & Monitoring - ❌ TO BE IMPLEMENTED
- Umami (Privacy-compliant analytics)
- Sentry (Error tracking)
- Performance monitoring
- Custom event tracking
```

### **Application Architecture**

#### **Directory Structure**

```
project-root/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # User dashboard
│   ├── admin/                    # Admin interface
│   ├── api/                      # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── animations/              # Custom animation effects
│   ├── magic/                   # MagicUI components
│   ├── auth/                    # Authentication components
│   ├── dashboard/               # Dashboard components
│   ├── admin/                   # Admin components
│   └── marketing/               # Marketing components
├── lib/
│   ├── auth.ts                  # Authentication utilities
│   ├── db.ts                    # Database connection
│   ├── email.ts                 # Email utilities
│   ├── payments.ts              # Payment processing
│   └── utils.ts                 # Utility functions
├── db/
│   ├── schema.ts                # Database schema
│   ├── migrations/              # Database migrations
│   └── seed.ts                  # Database seeding
└── config/
    ├── database.ts              # Database configuration
    ├── auth.ts                  # Authentication config
    └── payments.ts              # Payment configuration
```

#### **API Design**

```typescript
// Authentication APIs
/api/auth/                       # User authentication
/api/admin/auth/                 # Admin authentication

// Core Business APIs
/api/user/status                 # User subscription status
/api/orders/                     # Order management
/api/payments/checkout           # Payment processing

// Webhook APIs
/api/webhooks/polar              # Polar.sh payment webhooks
/api/webhooks/resend             # Resend email webhooks

// Admin APIs
/api/admin/orders/               # Order management
/api/admin/users/                # User management
/api/admin/content/              # Content management
```

### **Database Design**

#### **Core Tables**

```sql
-- User Management
users (id, email, password_hash, subscription_status, enterprise_email, created_at)

-- Order Tracking
email_orders (id, user_id, status, payment_id, admin_notes, created_at, delivered_at)

-- Admin System
admin_users (id, email, password_hash, role, last_login, created_at)

-- Content Management
site_content (id, key, value, type, category, updated_at, updated_by)

-- Logging & Audit
email_logs (id, user_id, email_type, status, sent_at)
admin_activity (id, admin_id, action, target_type, target_id, created_at)
```

#### **Relationships**

- Users → Orders (1:many)
- Admin Users → Orders (1:many assignments)
- Admin Users → Content Updates (1:many)
- Users → Email Logs (1:many)
- Admin Users → Activity Logs (1:many)

### **Security Architecture**

#### **Authentication & Authorization**

```typescript
// User Authentication
- Email/password with bcrypt hashing
- Session-based authentication
- CSRF protection
- Rate limiting on auth endpoints

// Admin Authentication
- Separate admin authentication system
- Role-based access control
- IP restriction capabilities
- Session timeout management

// API Security
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Secure headers implementation
```

#### **Data Protection**

```typescript
// Encryption
- Enterprise email/password encryption at rest
- Secure webhook signature verification
- Environment variable encryption
- Database connection encryption

// Compliance
- GDPR compliance for EU users
- PCI DSS compliance through Polar.sh
- SOC 2 Type II via hosting providers
- Privacy policy and terms of service
```

### **Deployment Architecture**

#### **Production Infrastructure**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vercel        │    │  Alibaba Cloud   │    │  Third-party    │
│   (Frontend)    │◄──►│  RDS PostgreSQL  │    │  Services       │
│                 │    │  (Database)      │    │                 │
│ • Next.js App   │    │                  │    │ • Polar.sh      │
│ • Edge Functions│    │ • Primary DB     │    │ • Resend        │
│ • CDN           │    │ • Auto Backups   │    │ • Umami         │
│ • SSL           │    │ • Read Replicas  │    │ • Sentry        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

#### **CI/CD Pipeline**

```yaml
# GitHub Actions Workflow
- Code Quality: Linting, type checking, testing
- Security: Dependency scanning, security audits
- Performance: Bundle analysis, lighthouse scores
- Deployment: Automated staging and production deployment
- Monitoring: Post-deployment health checks
```

---

## **💻 Development Setup Guide**

### **Prerequisites**

#### **Required Software**

```bash
# Core Development Tools
✓ Node.js 18+ (recommend 20+)
✓ pnpm 8+ (package manager)
✓ PostgreSQL 14+ (database)
✓ Git 2.30+ (version control)
✓ VS Code (recommended IDE)

# Check versions
node --version    # Should be 18+
pnpm --version    # Should be 8+
psql --version    # Should be 14+
git --version     # Should be 2.30+
```

#### **Development Accounts**

```bash
# Required Service Accounts
□ GitHub account (code repository)
□ Vercel account (deployment)
□ Alibaba Cloud account (database)
□ Polar.sh account (payments)
□ Resend account (email)
□ Umami account (analytics - optional)
□ Sentry account (error tracking)
```

### **Initial Setup**

#### **1. Repository Setup**

```bash
# Clone the repository
git clone https://github.com/your-org/aicopilotvibe.git
cd aicopilotvibe

# Install dependencies
pnpm install

# Verify installation
pnpm run dev --dry-run
```

#### **2. Environment Configuration**

```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables (see configuration section below)
```

#### **3. Database Setup**

**macOS (using Homebrew):**

```bash
# Install PostgreSQL
brew install postgresql@14
brew services start postgresql@14

# Create user and database
createuser postgres -s
createdb aicopilotvibe_dev

# Test connection
psql -U postgres -d aicopilotvibe_dev -c "SELECT version();"
```

**Windows (using chocolatey):**

```bash
# Install PostgreSQL
choco install postgresql

# Start service
net start postgresql-x64-14

# Create database
"C:\Program Files\PostgreSQL\14\bin\createdb" aicopilotvibe_dev
```

**Ubuntu/Debian:**

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create user and database
sudo -u postgres createuser --interactive
sudo -u postgres createdb aicopilotvibe_dev
```

#### **4. Environment Variables**

**Development Environment (.env.local)**

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/aicopilotvibe_dev"

# Authentication
BETTER_AUTH_SECRET="dev-secret-key-min-32-chars-long"

# Admin Authentication
ADMIN_AUTH_SECRET="admin-dev-secret-key-min-32-chars"
ADMIN_AUTH_URL="http://localhost:3000/admin"

# Payment Processing - USE TEST KEYS ONLY
POLAR_SECRET_KEY="polar_sk_test_your_test_key_here"
POLAR_WEBHOOK_SECRET="whsec_test_your_webhook_secret"
POLAR_PUBLIC_KEY="polar_pk_test_your_public_key"

# Email Services - USE TEST API KEY
RESEND_API_KEY="re_test_your_api_key_here"
RESEND_WEBHOOK_SECRET="whsec_test_your_webhook_secret"

# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="AI Copilot Vibe"
NODE_ENV="development"

# Security (generate random strings)
ENCRYPTION_KEY="dev-encryption-key-must-be-32-chars"
JWT_SECRET="dev-jwt-secret-for-sessions-min-32"

# Analytics (optional for development)
UMAMI_WEBSITE_ID=""
SENTRY_DSN=""
```

#### **Generate Secure Keys**

```bash
# Generate random keys for development
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 32
```

### **Development Workflow**

#### **Daily Development Commands**

```bash
# Start development server
pnpm run dev

# Database operations
pnpm run db:generate     # Generate migrations
pnpm run db:migrate      # Apply migrations
pnpm run db:seed         # Seed database
pnpm run db:studio       # Open database browser
pnpm run db:reset        # Reset and reseed

# Testing
pnpm run test            # Unit tests
pnpm run test:watch      # Watch mode
pnpm run test:e2e        # End-to-end tests

# Code quality
pnpm run lint            # Check linting
pnpm run lint:fix        # Fix linting issues
pnpm run type-check      # TypeScript checking
```

#### **Package.json Scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",

    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "drizzle-kit push:pg",
    "db:seed": "tsx db/seed.ts",
    "db:studio": "drizzle-kit studio",
    "db:reset": "pnpm run db:migrate && pnpm run db:seed",

    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test",

    "prepare": "husky install"
  }
}
```

### **IDE Configuration**

#### **VS Code Setup**

**Required Extensions**

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-typescript.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "ms-playwright.playwright",
    "ms-vscode.vscode-json"
  ]
}
```

**Settings Configuration**

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### **Required Dependencies**

#### **Core Libraries Installation**

```bash
# Install missing dependencies for Phase 0
pnpm install \
  better-auth \
  next-safe-action \
  drizzle-orm \
  drizzle-kit \
  postgres \
  resend \
  bcryptjs \
  @types/bcryptjs \
  husky \
  tsx

# UI Component Libraries (Phase 0 setup)
# shadcn/ui - Primary component system
# magicui.design - Magic UI effects
# Custom animation components

# Verify installation
pnpm list better-auth drizzle-orm postgres resend
```

#### **Database Migration & Seeding**

```bash
# Initialize database
pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed

# Verify database setup
pnpm run db:studio
```

### **Testing Setup**

#### **Jest Configuration**

```javascript
// jest.config.js
const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/$1",
  },
}

module.exports = createJestConfig(customJestConfig)
```

#### **Playwright Configuration**

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
})
```

### **Troubleshooting**

#### **Common Issues**

**Database Connection Issues**

```bash
# Error: connection refused
# Fix: Ensure PostgreSQL is running
brew services restart postgresql@14  # macOS
sudo systemctl restart postgresql    # Linux

# Error: database does not exist
# Fix: Create the database
createdb aicopilotvibe_dev

# Error: permission denied
# Fix: Check user permissions
sudo -u postgres psql -c "ALTER USER postgres CREATEDB;"
```

**Port Issues**

```bash
# Error: Port 3000 already in use
# Fix: Kill the process or use different port
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
pnpm run dev -- -p 3001       # Use different port
```

**Module Not Found Errors**

```bash
# Error: Cannot find module 'better-auth'
# Fix: Install missing dependencies
pnpm install better-auth

# Error: Cannot resolve '@/lib/...'
# Fix: Check tsconfig.json paths are correct
```

### **Next Steps**

After completing the development setup:

1. **✅ Verify all systems are working**
2. **✅ Run the development server successfully**
3. **✅ Connect to the database**
4. **📝 Proceed to [Phase 0: Parallel Foundation Setup](./phase-0-core.md)**
5. **🚀 Begin UI libraries and backend foundation setup**

---

## **🔗 Strategic Roadmap**

### **Phase 1: MVP Launch (Weeks 1-4)**

- **Core Product**: Basic subscription and fulfillment
- **Market Entry**: Initial customer acquisition
- **Validation**: Problem-solution fit confirmation
- **Operations**: Manual processes establishment

### **Phase 2: Optimization (Weeks 5-8)**

- **Process Improvement**: Efficiency optimization
- **Customer Experience**: UX enhancement
- **Market Expansion**: Growth acceleration
- **Automation**: Process automation beginning

### **Phase 3: Scale (Months 3-6)**

- **Market Leadership**: Competitive positioning
- **Operational Excellence**: Scalable processes
- **Product Innovation**: Advanced features
- **Geographic Expansion**: International markets

### **Phase 4: Evolution (Months 7-12)**

- **Platform Expansion**: Additional services
- **Enterprise Sales**: B2B market entry
- **Strategic Partnerships**: Industry collaborations
- **Technology Innovation**: AI and automation advancement

This project foundation provides the comprehensive base for all technical and operational decisions, ensuring alignment between product development, market needs, and business objectives.
