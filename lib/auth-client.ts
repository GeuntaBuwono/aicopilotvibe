import { polarClient } from "@polar-sh/better-auth"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  plugins: [polarClient()],
})

// Better-Auth Polar Plugin Types (Based on Actual API Response)
interface CustomerState {
  id: string
  createdAt: string
  modifiedAt?: string
  metadata: Record<string, unknown>
  externalId: string
  email: string
  emailVerified: boolean
  name: string
  billingAddress: {
    line1?: string | null
    line2?: string | null
    postalCode?: string | null
    city?: string | null
    state?: string | null
    country: string
  }
  taxId?: string | null
  organizationId: string
  deletedAt?: string | null
  avatarUrl?: string
  activeSubscriptions: Array<{
    id: string
    createdAt: string
    modifiedAt?: string | null
    customFieldData: Record<string, unknown>
    metadata: Record<string, unknown>
    status: string
    amount: number
    currency: string
    recurringInterval: string
    currentPeriodStart: string
    currentPeriodEnd: string
    cancelAtPeriodEnd: boolean
    canceledAt?: string | null
    startedAt: string
    endsAt?: string | null
    productId: string
    discountId?: string | null
    meters: unknown[]
  }>
  grantedBenefits: unknown[]
  activeMeters: unknown[]
}

interface OrderResponse {
  result: {
    items: Order[]
    pagination: {
      totalCount: number
      maxPage: number
    }
  }
}

interface Order {
  id: string
  createdAt: string
  modifiedAt?: string
  status: string
  paid: boolean
  subtotalAmount: number
  discountAmount: number
  netAmount: number
  amount: number
  taxAmount: number
  totalAmount: number
  refundedAmount: number
  refundedTaxAmount: number
  currency: string
  billingReason: string
  billingName: string
  billingAddress: {
    line1?: string | null
    line2?: string | null
    postalCode?: string | null
    city?: string | null
    state?: string | null
    country: string
  }
  isInvoiceGenerated: boolean
  customerId: string
  productId: string
  discountId?: string | null
  subscriptionId: string
  checkoutId: string
  userId: string
  product: {
    createdAt: string
    modifiedAt?: string
    id: string
    name: string
    description?: string | null
    recurringInterval: string
    isRecurring: boolean
    isArchived: boolean
    organizationId: string
    prices: Array<{
      createdAt: string
      modifiedAt?: string
      id: string
      amountType: string
      isArchived: boolean
      productId: string
      type: string
      recurringInterval: string
      priceCurrency: string
      priceAmount: number
    }>
    benefits: unknown[]
    medias: unknown[]
    organization: {
      createdAt: string
      modifiedAt?: string
      id: string
      name: string
      slug: string
      avatarUrl?: string | null
      email?: string | null
      website?: string | null
      socials: string[]
      detailsSubmittedAt?: string | null
      featureSettings: {
        issueFundingEnabled: boolean
      }
      subscriptionSettings: {
        allowMultipleSubscriptions: boolean
        allowCustomerUpdates: boolean
        prorationBehavior: string
      }
      notificationSettings: {
        newOrder: boolean
        newSubscription: boolean
      }
    }
  }
  subscription: {
    createdAt: string
    modifiedAt?: string | null
    id: string
    amount: number
    currency: string
    recurringInterval: string
    status: string
    currentPeriodStart: string
    currentPeriodEnd: string
    cancelAtPeriodEnd: boolean
    canceledAt?: string | null
    startedAt: string
    endsAt?: string | null
    endedAt?: string | null
    customerId: string
    productId: string
    discountId?: string | null
    checkoutId: string
    customerCancellationReason?: string | null
    customerCancellationComment?: string | null
  }
  items: Array<{
    createdAt: string
    modifiedAt?: string | null
    id: string
    label: string
    amount: number
    taxAmount: number
    proration: boolean
    productPriceId: string
  }>
}

interface Benefit {
  id: string
  type: string
  description: string
  isSelectable: boolean
  isTaxApplicable: boolean
  createdAt: string
  modifiedAt?: string
  organizationId: string
  properties: Record<string, unknown>
}

interface Subscription {
  id: string
  amount: number
  currency: string
  recurringInterval: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  canceledAt?: string | null
  startedAt: string
  endsAt?: string | null
  endedAt?: string | null
  customerId: string
  productId: string
  discountId?: string | null
  checkoutId: string
  customerCancellationReason?: string | null
  customerCancellationComment?: string | null
  createdAt: string
  modifiedAt?: string | null
}

interface OrderListOptions {
  page?: number
  limit?: number
  productBillingType?: "one_time" | "recurring"
  referenceId?: string
}

interface BenefitListOptions {
  page?: number
  limit?: number
}

interface SubscriptionListOptions {
  page?: number
  limit?: number
  active?: boolean
  referenceId?: string
}

interface CheckoutOptions {
  products?: string[]
  slug?: string
  referenceId?: string
}

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  // Polar Customer Portal Methods
  customer,
  checkout,
  usage
} = authClient

// Enhanced customer portal methods with proper typing
export const customerPortal = {
  // Open Polar customer portal in new tab
  openPortal: async (): Promise<void> => {
    try {
      await authClient.customer.portal();
    } catch (error) {
      console.error('Failed to open customer portal:', error)
      throw error
    }
  },

  // Get complete customer state
  getState: async (): Promise<CustomerState> => {
    try {
      const { data } = await authClient.customer.state()
      return data as CustomerState
    } catch (error) {
      console.error('Failed to fetch customer state:', error)
      throw error
    }
  },

  // List customer orders with pagination
  getOrders: async (options: OrderListOptions = {}): Promise<OrderResponse> => {
    try {
      const { data } = await authClient.customer.orders.list({
        query: {
          page: 1,
          limit: 10,
          ...options
        }
      })
      return data as OrderResponse
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      throw error
    }
  },

  // List customer benefits
  getBenefits: async (options: BenefitListOptions = {}): Promise<Benefit[]> => {
    try {
      const { data } = await authClient.customer.benefits.list({
        query: {
          page: 1,
          limit: 10,
          ...options
        }
      })
      return data as Benefit[]
    } catch (error) {
      console.error('Failed to fetch benefits:', error)
      throw error
    }
  },

  // List customer subscriptions
  getSubscriptions: async (options: SubscriptionListOptions = {}): Promise<Subscription[]> => {
    try {
      const { data } = await authClient.customer.subscriptions.list({
        query: {
          page: 1,
          limit: 10,
          active: true,
          ...options
        }
      })
      return data as Subscription[]
    } catch (error) {
      console.error('Failed to fetch subscriptions:', error)
      throw error
    }
  }
}

// Enhanced checkout with proper typing
export const enhancedCheckout = {
  // Checkout with product slug
  withSlug: async (slug: string, referenceId?: string): Promise<void> => {
    try {
      await authClient.checkout({
        slug,
        ...(referenceId && { referenceId })
      } as CheckoutOptions)
    } catch (error) {
      console.error('Checkout failed:', error)
      throw error
    }
  },

  // Checkout with product IDs
  withProducts: async (products: string[], referenceId?: string): Promise<void> => {
    try {
      await authClient.checkout({
        products,
        ...(referenceId && { referenceId })
      } as CheckoutOptions)
    } catch (error) {
      console.error('Checkout failed:', error)
      throw error
    }
  }
}
