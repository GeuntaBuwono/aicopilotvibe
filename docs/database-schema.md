# Database Schema Specification

## **Complete Schema Design**

### **User Management**
```sql
-- User Management
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  subscription_status VARCHAR(50) DEFAULT 'inactive', -- inactive, paid, active, cancelled
  enterprise_email VARCHAR(255),
  enterprise_password VARCHAR(255), -- Encrypted
  country_code VARCHAR(2), -- For analytics
  payment_date TIMESTAMP,
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Order Tracking**
```sql
-- Email Order Tracking
CREATE TABLE email_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, preparing, delivered, failed
  payment_id VARCHAR(255), -- Polar.sh payment ID
  polar_subscription_id VARCHAR(255), -- Polar.sh subscription ID
  assigned_admin_id UUID REFERENCES admin_users(id),
  admin_notes TEXT,
  priority VARCHAR(20) DEFAULT 'normal', -- normal, high, urgent
  created_at TIMESTAMP DEFAULT NOW(),
  delivered_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Admin System**
```sql
-- Admin System
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin', -- admin, super_admin, support
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **Content Management**
```sql
-- Content Management System
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL, -- hero_headline, pricing_amount, etc.
  value TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'text', -- text, number, boolean, json, html
  category VARCHAR(100), -- pricing, marketing, faq, benefits
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id)
);
```

### **Email Logging**
```sql
-- Email Delivery Tracking
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  email_type VARCHAR(50), -- welcome, credentials, renewal, support
  recipient_email VARCHAR(255),
  subject VARCHAR(500),
  status VARCHAR(50), -- sent, delivered, failed, bounced
  resend_id VARCHAR(255),
  error_message TEXT,
  sent_at TIMESTAMP DEFAULT NOW()
);
```

### **Activity Logging**
```sql
-- Admin Activity Logging
CREATE TABLE admin_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES admin_users(id),
  action VARCHAR(100), -- order_updated, content_changed, user_modified
  target_type VARCHAR(50), -- order, user, content
  target_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## **Performance Indexes**

```sql
-- Performance Indexes
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_country_code ON users(country_code);
CREATE INDEX idx_email_orders_status ON email_orders(status);
CREATE INDEX idx_email_orders_created_at ON email_orders(created_at);
CREATE INDEX idx_email_orders_user_id ON email_orders(user_id);
CREATE INDEX idx_site_content_key ON site_content(key);
CREATE INDEX idx_site_content_category ON site_content(category);
CREATE INDEX idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);
```

## **Drizzle Schema Implementation**

### **Schema Definition (db/schema.ts)**
```typescript
import { pgTable, uuid, varchar, text, timestamp, jsonb, inet } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  subscriptionStatus: varchar('subscription_status', { length: 50 }).default('inactive'),
  enterpriseEmail: varchar('enterprise_email', { length: 255 }),
  enterprisePassword: varchar('enterprise_password', { length: 255 }),
  countryCode: varchar('country_code', { length: 2 }),
  paymentDate: timestamp('payment_date'),
  subscriptionExpiresAt: timestamp('subscription_expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Email orders table
export const emailOrders = pgTable('email_orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  status: varchar('status', { length: 50 }).default('pending'),
  paymentId: varchar('payment_id', { length: 255 }),
  polarSubscriptionId: varchar('polar_subscription_id', { length: 255 }),
  assignedAdminId: uuid('assigned_admin_id').references(() => adminUsers.id),
  adminNotes: text('admin_notes'),
  priority: varchar('priority', { length: 20 }).default('normal'),
  createdAt: timestamp('created_at').defaultNow(),
  deliveredAt: timestamp('delivered_at'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Admin users table
export const adminUsers = pgTable('admin_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).default('admin'),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Site content table
export const siteContent = pgTable('site_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  value: text('value').notNull(),
  type: varchar('type', { length: 50 }).default('text'),
  category: varchar('category', { length: 100 }),
  updatedAt: timestamp('updated_at').defaultNow(),
  updatedBy: uuid('updated_by').references(() => adminUsers.id),
});

// Email logs table
export const emailLogs = pgTable('email_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  emailType: varchar('email_type', { length: 50 }),
  recipientEmail: varchar('recipient_email', { length: 255 }),
  subject: varchar('subject', { length: 500 }),
  status: varchar('status', { length: 50 }),
  resendId: varchar('resend_id', { length: 255 }),
  errorMessage: text('error_message'),
  sentAt: timestamp('sent_at').defaultNow(),
});

// Admin activity table
export const adminActivity = pgTable('admin_activity', {
  id: uuid('id').defaultRandom().primaryKey(),
  adminId: uuid('admin_id').references(() => adminUsers.id),
  action: varchar('action', { length: 100 }),
  targetType: varchar('target_type', { length: 50 }),
  targetId: uuid('target_id'),
  details: jsonb('details'),
  ipAddress: inet('ip_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(emailOrders),
  emailLogs: many(emailLogs),
}));

export const emailOrdersRelations = relations(emailOrders, ({ one }) => ({
  user: one(users, {
    fields: [emailOrders.userId],
    references: [users.id],
  }),
  assignedAdmin: one(adminUsers, {
    fields: [emailOrders.assignedAdminId],
    references: [adminUsers.id],
  }),
}));

export const adminUsersRelations = relations(adminUsers, ({ many }) => ({
  assignedOrders: many(emailOrders),
  activities: many(adminActivity),
  contentUpdates: many(siteContent),
}));
```

## **Database Connection Configuration**

### **Database Config (lib/db.ts)**
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
```

## **Seed Data Structure**

### **Initial Admin User (db/seed.ts)**
```typescript
import { db } from '@/lib/db';
import { adminUsers, siteContent } from './schema';
import bcrypt from 'bcryptjs';

export async function seed() {
  // Create initial admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  await db.insert(adminUsers).values({
    email: 'admin@example.com',
    passwordHash: hashedPassword,
    role: 'super_admin',
  });

  // Create initial site content
  await db.insert(siteContent).values([
    {
      key: 'hero_headline',
      value: 'Get GitHub Copilot Access in 24 Hours',
      type: 'text',
      category: 'marketing',
    },
    {
      key: 'pricing_amount',
      value: '19.99',
      type: 'number',
      category: 'pricing',
    },
    {
      key: 'delivery_guarantee',
      value: '24',
      type: 'number',
      category: 'marketing',
    },
  ]);
}
```

## **Migration Strategy**

### **Migration Commands**
```bash
# Generate migration
npx drizzle-kit generate:pg

# Run migrations
npx drizzle-kit push:pg

# Seed database
pnpm run db:seed
```

### **Package.json Scripts**
```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "drizzle-kit push:pg",
    "db:seed": "tsx db/seed.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```