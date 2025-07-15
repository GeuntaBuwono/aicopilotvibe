# Development Setup Guide

## **Quick Start**

### **Prerequisites**
```bash
# Required Software
✓ Node.js 18+ (recommend 20+)
✓ pnpm 8+
✓ PostgreSQL 14+ (local development)
✓ Git 2.30+
✓ VS Code (recommended)

# Check versions
node --version    # Should be 18+
pnpm --version     # Should be 8+
psql --version    # Should be 14+
```

### **First-Time Setup**
```bash
# 1. Clone the repository
git clone https://github.com/your-org/aicopilotvibe.git
cd aicopilotvibe

# 2. Install dependencies
pnpm install

# 3. Copy environment template
cp .env.example .env.local

# 4. Setup local database
createdb aicopilotvibe_dev

# 5. Configure environment variables (see below)
# Edit .env.local with your settings

# 6. Install missing dependencies (see Package Installation section)
pnpm install better-auth drizzle-orm drizzle-kit postgres

# 7. Run database setup
pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed

# 8. Start development server
pnpm run dev
```

---

## **Environment Configuration**

### **Local Environment (.env.local)**
```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/aicopilotvibe_dev"

# Authentication
BETTER_AUTH_SECRET="dev-secret-key-min-32-chars-long"
BETTER_AUTH_URL="http://localhost:3000"

# Admin Authentication
ADMIN_AUTH_SECRET="admin-dev-secret-key-min-32-chars"
ADMIN_AUTH_URL="http://localhost:3000/admin"

# Payments - USE TEST KEYS ONLY
POLAR_SECRET_KEY="polar_sk_test_your_test_key_here"
POLAR_WEBHOOK_SECRET="whsec_test_your_webhook_secret"
POLAR_PUBLIC_KEY="polar_pk_test_your_public_key"

# Email - USE TEST API KEY
RESEND_API_KEY="re_test_your_api_key_here"
RESEND_WEBHOOK_SECRET="whsec_test_your_webhook_secret"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="AI Copilot Vibe"
NODE_ENV="development"

# Security (generate random strings for development)
ENCRYPTION_KEY="dev-encryption-key-must-be-32-chars"
JWT_SECRET="dev-jwt-secret-for-sessions-min-32"

# Analytics (optional for development)
UMAMI_WEBSITE_ID=""
SENTRY_DSN=""
```

### **Generating Secure Keys**
```bash
# Generate random keys for development
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 32
```

---

## **Package Installation**

### **Required Dependencies**
```bash
# Install all missing dependencies
pnpm install \
  better-auth \
  next-safe-action \
  drizzle-orm \
  drizzle-kit \
  postgres \
  resend \
  bcryptjs \
  @types/bcryptjs \
  husky

# Verify installation
pnpm list better-auth drizzle-orm postgres
```

### **Package.json Scripts Setup**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
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

---

## **Database Setup**

### **PostgreSQL Local Setup**

#### **macOS (using Homebrew)**
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

#### **Windows (using chocolatey)**
```bash
# Install PostgreSQL
choco install postgresql

# Start service
net start postgresql-x64-14

# Create database
"C:\Program Files\PostgreSQL\14\bin\createdb" aicopilotvibe_dev
```

#### **Ubuntu/Debian**
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

### **Database Migration & Seeding**
```bash
# 1. Generate migration files
pnpm run db:generate

# 2. Apply migrations to database
pnpm run db:migrate

# 3. Seed with initial data
pnpm run db:seed

# 4. Open database browser (optional)
pnpm run db:studio
```

---

## **VS Code Setup**

### **Recommended Extensions**
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-typescript.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "ms-vscode.vscode-json"
  ]
}
```

### **VS Code Settings**
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

### **Debug Configuration**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side", 
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

---

## **Development Workflow**

### **Daily Development Commands**
```bash
# Start development server
pnpm run dev

# Run tests
pnpm run test

# Type checking
pnpm run type-check

# Database operations
pnpm run db:studio     # Open database browser
pnpm run db:reset      # Reset and reseed database

# Code quality
pnpm run lint          # Check linting
pnpm run lint:fix      # Fix linting issues
```

### **Git Workflow**
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Stage and commit changes  
git add .
git commit -m "feat: add user authentication"

# Push to origin
git push origin feature/your-feature-name

# Create pull request (use GitHub CLI or web interface)
gh pr create --title "Add user authentication" --body "Description of changes"
```

### **Git Hooks Setup**
```bash
# Install husky for git hooks
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "pnpm run lint && pnpm run type-check"

# Add commit message hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

---

## **Testing Setup**

### **Jest Configuration (jest.config.js)**
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

### **Playwright Configuration**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## **Debugging & Troubleshooting**

### **Common Issues**

#### **Database Connection Issues**
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

#### **Port Issues**
```bash
# Error: Port 3000 already in use
# Fix: Kill the process or use different port
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
pnpm run dev -- -p 3001         # Use different port
```

#### **Module Not Found Errors**
```bash
# Error: Cannot find module 'better-auth'
# Fix: Install missing dependencies
pnpm install better-auth

# Error: Cannot resolve '@/lib/...'
# Fix: Check tsconfig.json paths are correct
```

### **Debug Logging**
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },
};
```

---

## **Useful Development Tools**

### **Database Management**
```bash
# Drizzle Studio (visual database browser)
pnpm run db:studio

# psql command line
psql postgresql://postgres:password@localhost:5432/aicopilotvibe_dev

# pgAdmin (GUI tool)
# Download from https://www.pgadmin.org/
```

### **API Testing**
```bash
# Using curl
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Using HTTPie (more user-friendly)
brew install httpie
http POST localhost:3000/api/auth/login email=test@example.com password=password
```

### **Email Testing (Local)**
```bash
# Use Resend test mode or local email catcher
# Install MailHog for local email testing
brew install mailhog
mailhog

# Configure Resend to use MailHog in development
RESEND_API_KEY="test"  # Use test key
```

---

## **Next Steps**

1. **✅ Complete environment setup**
2. **✅ Verify database connection**  
3. **✅ Run development server**
4. **📝 Review [Technical Architecture](./technical-architecture.md)**
5. **📝 Check [Implementation Roadmap](./implementation-roadmap.md)**
6. **🚀 Start with Phase 1 development**

For questions or issues, check the troubleshooting section above or create an issue in the repository.