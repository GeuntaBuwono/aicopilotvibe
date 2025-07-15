# Deployment & Infrastructure Guide

## **Production Infrastructure Overview**

### **Architecture Stack**
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

---

## **Development Environment Setup**

### **Prerequisites**
```bash
# Required Software
- Node.js 18+ 
- pnpm 8+
- PostgreSQL 14+ (local development)
- Git

# Required Accounts
- Vercel account
- Alibaba Cloud account
- Polar.sh account
- Resend account
- Umami account (optional)
- Sentry account
```

### **Local Development Setup**
```bash
# 1. Clone repository
git clone https://github.com/your-org/github-enterprise-email.git
cd github-enterprise-email

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Setup local database
createdb github_enterprise_email_dev

# 5. Run database migrations
pnpm run db:migrate

# 6. Seed initial data
pnpm run db:seed

# 7. Start development server
pnpm run dev
```

### **Environment Variables (.env.local)**
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/github_enterprise_email_dev"

# Authentication
BETTER_AUTH_SECRET="dev-secret-key-change-in-production"
BETTER_AUTH_URL="http://localhost:3000"

# Admin Authentication  
ADMIN_AUTH_SECRET="admin-dev-secret-key"
ADMIN_AUTH_URL="http://localhost:3000/admin"

# Payments (use test keys for development)
POLAR_SECRET_KEY="polar_sk_test_xxxxx"
POLAR_WEBHOOK_SECRET="whsec_test_xxxxx" 
POLAR_PUBLIC_KEY="polar_pk_test_xxxxx"

# Email (use test API key)
RESEND_API_KEY="re_test_xxxxx"
RESEND_WEBHOOK_SECRET="whsec_test_xxxxx"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="GitHub Enterprise Email"

# Security
ENCRYPTION_KEY="dev-encryption-key-32-chars-long"
JWT_SECRET="dev-jwt-secret-change-in-production"
```

---

## **Production Deployment**

### **1. Database Setup (Alibaba Cloud RDS)**

#### **RDS Instance Configuration**
```bash
# Instance Specifications
- Engine: PostgreSQL 14+
- Instance Class: pg.r6.large (2 vCPU, 16GB RAM)
- Storage: 100GB SSD with auto-scaling
- Multi-AZ deployment: Yes
- Backup retention: 7 days
- Maintenance window: Low-traffic hours

# Security Configuration
- VPC: Create dedicated VPC
- Security groups: Restrict to specific IPs
- SSL connection: Required
- Parameter groups: Optimize for performance
```

#### **Database Setup Commands**
```sql
-- Create database
CREATE DATABASE github_enterprise_email_prod;

-- Create application user
CREATE USER app_user WITH PASSWORD 'secure_random_password';
GRANT ALL PRIVILEGES ON DATABASE github_enterprise_email_prod TO app_user;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
```

### **2. Vercel Deployment Setup**

#### **Project Configuration**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm run build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install --frozen-lockfile",
  "functions": {
    "app/api/**": {
      "maxDuration": 30
    }
  },
  "regions": ["sin1", "hnd1", "sfo1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "BETTER_AUTH_SECRET": "@better-auth-secret",
    "POLAR_SECRET_KEY": "@polar-secret-key"
  }
}
```

#### **Environment Variables (Vercel)**
```bash
# Set via Vercel dashboard or CLI
vercel env add DATABASE_URL production
vercel env add BETTER_AUTH_SECRET production
vercel env add ADMIN_AUTH_SECRET production
vercel env add POLAR_SECRET_KEY production
vercel env add POLAR_WEBHOOK_SECRET production
vercel env add RESEND_API_KEY production
vercel env add ENCRYPTION_KEY production
vercel env add JWT_SECRET production
vercel env add SENTRY_DSN production
```

### **3. Domain Configuration**

#### **Custom Domain Setup**
```bash
# 1. Purchase domain (e.g., yourdomain.com)
# 2. Add domain to Vercel project
# 3. Configure DNS records

# DNS Configuration
Type: A
Name: @
Value: 76.76.19.61 (Vercel IP)

Type: CNAME  
Name: www
Value: cname.vercel-dns.com

# SSL Certificate
- Automatic via Vercel (Let's Encrypt)
- Custom certificate upload (optional)
```

---

## **Third-Party Service Configuration**

### **1. Polar.sh Payment Setup**

#### **Account Configuration**
```bash
# 1. Create Polar.sh account
# 2. Complete business verification
# 3. Setup products and pricing

# Product Configuration
Product Name: "GitHub Enterprise Email Access"
Price: $19.99 USD
Billing Cycle: Monthly
Description: "Monthly access to GitHub enterprise email with Copilot"

# Webhook Configuration
Endpoint: https://yourdomain.com/api/webhooks/polar
Events: subscription.created, subscription.updated, subscription.cancelled
```

#### **API Integration**
```typescript
// lib/payments.ts
import { Polar } from '@polar-sh/sdk';

export const polar = new Polar({
  accessToken: process.env.POLAR_SECRET_KEY!,
  server: 'production', // or 'sandbox' for testing
});
```

### **2. Resend Email Setup**

#### **Domain Configuration**
```bash
# 1. Add domain to Resend
# 2. Configure DNS records for email authentication

# DNS Records for email@yourdomain.com
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com

Type: TXT  
Name: resend._domainkey
Value: [Provided by Resend]

Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

#### **Email Templates**
```typescript
// lib/email-templates.ts
export const emailTemplates = {
  welcome: {
    subject: 'Welcome to GitHub Enterprise Email',
    html: `<h1>Welcome!</h1><p>Your account has been created.</p>`,
  },
  credentials: {
    subject: 'Your GitHub Enterprise Email is Ready',
    html: `<h1>Your Enterprise Email</h1><p>Email: {{email}}</p><p>Password: {{password}}</p>`,
  },
  renewal: {
    subject: 'Subscription Renewal Confirmation', 
    html: `<h1>Renewal Confirmed</h1><p>Your subscription has been renewed.</p>`,
  },
};
```

### **3. Analytics Setup**

#### **Umami Analytics**
```bash
# 1. Create Umami account or self-host
# 2. Add website to Umami dashboard
# 3. Get tracking code

# Add to layout.tsx
<script
  async
  defer
  data-website-id="your-umami-website-id"
  src="https://umami.yourdomain.com/umami.js"
></script>
```

#### **Sentry Error Tracking**
```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
});
```

---

## **CI/CD Pipeline**

### **GitHub Actions Workflow**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install --frozen-lockfile
      - run: pnpm run test
      - run: pnpm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### **Database Migration Strategy**
```bash
# Production migration workflow
# 1. Create migration
pnpm run db:generate

# 2. Test migration on staging
pnpm run db:migrate:staging

# 3. Deploy application (migrations run automatically)
vercel --prod

# 4. Verify migration success
pnpm run db:studio
```

---

## **Monitoring & Maintenance**

### **Health Checks**
```typescript
// app/api/health/route.ts
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Check database connection
    await db.execute('SELECT 1');
    
    // Check external services
    const services = {
      database: 'healthy',
      polar: await checkPolarHealth(),
      resend: await checkResendHealth(),
    };

    return Response.json({ status: 'healthy', services });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    );
  }
}
```

### **Backup Strategy**
```bash
# Automated Database Backups
# 1. RDS automated backups (7-day retention)
# 2. Manual snapshots before major deployments
# 3. Cross-region backup replication

# Application Backup
# 1. Code versioning via Git
# 2. Environment variable backup
# 3. Configuration backup
```

### **Monitoring Alerts**
```typescript
// Sentry Alert Configuration
- Error rate > 1% in 5 minutes
- Response time > 2 seconds
- Database connection failures
- Payment processing errors
- Email delivery failures

// Vercel Monitoring
- Function timeout errors
- Build failures
- High memory usage
- Unusual traffic patterns
```

---

## **Security Checklist**

### **Production Security**
```bash
✓ HTTPS enforced on all endpoints
✓ Security headers configured
✓ CSRF protection enabled
✓ Rate limiting implemented
✓ Input validation on all forms
✓ SQL injection prevention
✓ XSS protection
✓ Environment variables secured
✓ API keys rotated regularly
✓ Admin access IP-restricted
✓ Database access restricted
✓ Webhook signature verification
✓ Password hashing (bcrypt 12+ rounds)
✓ Session security configured
```

### **Compliance Requirements**
```bash
✓ GDPR compliance (EU users)
✓ CCPA compliance (California users)  
✓ PCI DSS (via Polar.sh)
✓ SOC 2 Type II (via hosting providers)
✓ Data retention policies
✓ Privacy policy updated
✓ Terms of service current
✓ Cookie consent implemented
```

---

## **Performance Optimization**

### **Frontend Performance**
```typescript
// next.config.js optimizations
module.exports = {
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['postgres'],
  },
};
```

### **Database Performance**
```sql
-- Key performance indexes
CREATE INDEX CONCURRENTLY idx_users_subscription_status ON users(subscription_status);
CREATE INDEX CONCURRENTLY idx_email_orders_status_created ON email_orders(status, created_at);
CREATE INDEX CONCURRENTLY idx_email_logs_user_sent ON email_logs(user_id, sent_at);

-- Connection pooling
-- Configure via RDS parameter groups
max_connections = 100
shared_preload_libraries = 'pg_stat_statements'
```

### **Caching Strategy**
```typescript
// API route caching
export const revalidate = 3600; // 1 hour

// Database query caching
const cachedUsers = unstable_cache(
  async () => db.select().from(users),
  ['users'],
  { revalidate: 300 }
);
```