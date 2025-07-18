"use client"

import { AlertCircle, ExternalLink, Eye, EyeOff, Loader2, Mail, Package, Settings, Sparkles, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { customerPortal, enhancedCheckout, useSession } from "@/lib/auth-client"
import { PRODUCT_PRICE } from "@/mock/pricing"

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

interface EnhancedDashboardProps {
  className?: string
}

export function EnhancedDashboard({ className }: EnhancedDashboardProps) {
  // State management
  const { data: session, isPending } = useSession()
  const [customerState, setCustomerState] = useState<CustomerState | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100) // Convert from cents
  }

  // Fetch customer data using better-auth native methods
  const fetchCustomerData = async () => {
    if (!session?.user) return

    try {
      setLoading(true)
      setError(null)

      // Use native better-auth Polar methods
      const [customerStateData, ordersResponse] = await Promise.all([
        customerPortal.getState(),
        customerPortal.getOrders({ limit: 20 })
      ])

      setCustomerState(customerStateData)
      // Handle the actual API response structure with result.items
      setOrders(ordersResponse.result?.items || [])
    } catch (err) {
      console.error('Failed to fetch customer data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load customer data')
    } finally {
      setLoading(false)
    }
  }

  // Handle portal access using native better-auth method
  const handlePortalAccess = async () => {
    try {
      await customerPortal.openPortal()
    } catch (err) {
      console.error('Failed to open portal:', err)
      setError('Failed to open customer portal')
    }
  }

  // Handle checkout using native better-auth method
  const handleCheckout = async () => {
    try {
      await enhancedCheckout.withSlug('enterprise-email')
    } catch (err) {
      console.error('Checkout failed:', err)
      setError('Checkout failed. Please try again.')
    }
  }

  useEffect(() => {
    if (session?.user && !isPending) {
      fetchCustomerData()
    }
  }, [session, isPending])

  // Check if user has active subscription
  const hasActiveSubscription = customerState?.activeSubscriptions?.some(
    sub => sub.status === 'active'
  ) || false

  // Get enterprise email and password from paid orders
  const paidOrder = orders.find(order => order.paid && order.status === 'paid')
  const enterpriseEmail = paidOrder
    ? `${session?.user?.email?.split('@')[0]}@aicopilotvibe.com`
    : null
  const enterprisePassword = paidOrder
    ? `ACV${paidOrder.id.slice(-6)}!`
    : null

  // Loading state
  if (isPending || loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-6 w-6 text-blue-400" />
              AI Copilot Vibe Dashboard
            </CardTitle>
            <CardDescription className="text-gray-300">Loading your enterprise dashboard...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-6 w-6 text-blue-400" />
              AI Copilot Vibe Dashboard
            </CardTitle>
            <CardDescription className="text-gray-300">Enterprise dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-8 text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <p className="mb-4 text-red-300">{error}</p>
              <Button 
                onClick={fetchCustomerData} 
                variant="outline" 
                size="sm" 
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Welcome & Status Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="h-6 w-6 text-blue-400" />
            Welcome to AI Copilot Vibe
          </CardTitle>
          <CardDescription className="text-gray-300">
            Your premium AI assistant platform with enterprise email integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Subscription Status */}
            <div className="rounded-lg bg-gray-800 border border-gray-700 p-4">
              {hasActiveSubscription ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-900/50">
                      <Package className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-400">Active Subscription</p>
                      <p className="text-xs text-gray-400">Enterprise features enabled</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handlePortalAccess}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Subscription
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-900/50">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-yellow-400">Subscription Required</p>
                      <p className="text-xs text-gray-400">Get access to enterprise features</p>
                    </div>
                  </div>
                  <Button onClick={handleCheckout} className="px-4 py-2 bg-blue-600 hover:bg-blue-700">
                    Subscribe - ${PRODUCT_PRICE}/month
                  </Button>
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Account Status</label>
                  <div className="flex items-center gap-2">
                    <Badge className={hasActiveSubscription ? "bg-green-900/20 text-green-300" : "bg-gray-900/20 text-gray-300"}>
                      {hasActiveSubscription ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-900/20 text-blue-300">User</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Member Since</label>
                  <p className="text-sm text-gray-400">
                    {session?.user?.createdAt ? formatDate(
                      typeof session.user.createdAt === 'string'
                        ? session.user.createdAt
                        : session.user.createdAt.toISOString()
                    ) : "N/A"}
                  </p>
                </div>
              </div>

              {/* Subscription Details */}
              {hasActiveSubscription && customerState?.activeSubscriptions?.[0] && (
                <div className="rounded-lg bg-green-900/20 border border-green-700 p-3">
                  <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <span className="font-medium text-green-300">Started:</span>
                      <span className="ml-2 text-green-400">
                        {formatDate(customerState.activeSubscriptions[0].createdAt)}
                      </span>
                    </div>
                    {customerState.activeSubscriptions[0].currentPeriodEnd && (
                      <div>
                        <span className="font-medium text-green-300">Next Billing:</span>
                        <span className="ml-2 text-green-400">
                          {formatDate(customerState.activeSubscriptions[0].currentPeriodEnd)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Email Section */}
      {hasActiveSubscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Mail className="h-5 w-5 text-blue-400" />
              Your Enterprise Email Account
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your dedicated enterprise email for unlimited AI coding access
            </CardDescription>
          </CardHeader>
          <CardContent>
            {enterpriseEmail ? (
              <div className="rounded-lg border border-gray-600 bg-gray-700 p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                      ✅ Active
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                      Enterprise Email
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Email Address</label>
                      <div className="flex items-center gap-2">
                        <input
                          value={enterpriseEmail}
                          readOnly
                          className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600"
                          onClick={() => navigator.clipboard.writeText(enterpriseEmail)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Password</label>
                      <div className="flex items-center gap-2">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={enterprisePassword || ""}
                          readOnly
                          className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-gray-100 font-mono text-sm"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600"
                          onClick={() => navigator.clipboard.writeText(enterprisePassword || "")}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400">
                    Use these credentials to sign in for GitHub
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <Mail className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="text-gray-300 mb-2">Enterprise email not yet delivered</p>
                <p className="text-sm text-gray-400">
                  Your enterprise email credentials will appear here once your order is processed
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Orders Section - Using Native Polar Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Package className="h-5 w-5 text-blue-400" />
            Order History ({orders.length})
          </CardTitle>
          <CardDescription className="text-gray-300">
            Track your enterprise email orders and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-lg border border-gray-600 bg-gray-700 p-4 transition-colors hover:bg-gray-600">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={`${
                            order.paid && order.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
                          }`}>
                            {order.paid ? 'Paid' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                            Enterprise Email
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-300">
                          {order.product.name} • {formatCurrency(order.totalAmount, order.currency)}
                        </p>
                        <p className="text-xs text-gray-400">Order #{order.id.slice(-8)}</p>
                      </div>
                    </div>
                    <div className="shrink-0 text-left text-sm text-gray-400 sm:text-right">
                      <p>Created: {formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Package className="mx-auto mb-4 h-8 w-8 text-gray-400" />
              <p className="text-gray-300 mb-2">No orders found</p>
              <p className="text-sm text-gray-400">
                {hasActiveSubscription 
                  ? "Your enterprise email order will appear here once processed" 
                  : "Subscribe to get your enterprise email access"}
              </p>
              {!hasActiveSubscription && (
                <div className="mt-4">
                  <Button onClick={handleCheckout} className="px-6 py-2 bg-blue-600 hover:bg-blue-700">
                    Get Your Enterprise Email - ${PRODUCT_PRICE}/month
                  </Button>
                </div>
              )}
              <div className="mt-4">
                <p className="text-xs text-gray-500">
                  💡 Each subscription includes one enterprise email. Need more? Create additional accounts.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="h-5 w-5 text-blue-400" />
            Account Management
          </CardTitle>
          <CardDescription className="text-gray-300">
            Manage your subscription and account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Account Email</label>
                <input 
                  value={session?.user?.email || ""} 
                  disabled 
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-300" 
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Display Name</label>
                <input 
                  value={session?.user?.name || ""} 
                  disabled 
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-gray-300" 
                />
                <p className="text-xs text-gray-500">Managed through customer portal</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3">
                {hasActiveSubscription && (
                  <Button
                    onClick={handlePortalAccess}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Customer Portal
                  </Button>
                )}
                <Button
                  onClick={fetchCustomerData}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}