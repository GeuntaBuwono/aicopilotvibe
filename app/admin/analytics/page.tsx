"use client"

import { useEffect, useState } from "react"
import InteractiveChart from "@/components/admin/InteractiveChart"
import OrderStatusChart from "@/components/admin/OrderStatusChart"
import { Card, CardContent } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

type AnalyticsData = {
  totalUsers: number
  activeSubscriptions: number
  totalOrders: number
  completedOrders: number
  revenue: number
  recentActivity: Array<{
    id: string
    action: string
    timestamp: string
    details: string
  }>
  userGrowth: Array<{
    date: string
    users: number
  }>
  orderStats: {
    pending: number
    processing: number
    delivered: number
    cancelled: number
  }
}

export default function AdminAnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        const response = await fetch("/api/admin/analytics")
        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data as AnalyticsData)
        }
      } catch (error) {
        console.error("Failed to fetch analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!analyticsData) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400">Failed to load analytics data</p>
          </div>
        </div>
      </div>
    )
  }

  const conversionRate =
    analyticsData.totalOrders > 0 ? ((analyticsData.completedOrders / analyticsData.totalOrders) * 100).toFixed(1) : "0"

  return (
    <ErrorBoundary>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl leading-7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-300">
              Comprehensive analytics and insights for your business performance
            </p>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-400">Total Users</dt>
                      <dd className="text-lg font-medium text-white">{analyticsData.totalUsers}</dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-400">Total Revenue</dt>
                      <dd className="text-lg font-medium text-white">${analyticsData.revenue}</dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H6.75c.621 0 1.125.504 1.125 1.125v.375m-3.75 0h.375c.621 0 1.125.504 1.125 1.125v.75h-.375A1.125 1.125 0 013 4.5v-.75zM2.25 15h12A2.25 2.25 0 0016.5 12.75v-7.5A2.25 2.25 0 0014.25 3H2.25A2.25 2.25 0 000 5.25v7.5A2.25 2.25 0 002.25 15z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-400">Total Orders</dt>
                      <dd className="text-lg font-medium text-white">{analyticsData.totalOrders}</dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-700 bg-gray-800">
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-400">Conversion Rate</dt>
                      <dd className="text-lg font-medium text-white">{conversionRate}%</dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
            <div className="p-6">
              <OrderStatusChart orderStats={analyticsData.orderStats} />
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-white">Recent Activity</h3>
              <div className="mt-4 space-y-3">
                {analyticsData.recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="mt-2 h-2 w-2 rounded-full bg-blue-400"></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.details}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Growth Chart */}
        <Card className="mt-8 border-gray-700 bg-gray-800">
          <CardContent className="p-6">
            <InteractiveChart data={analyticsData.userGrowth} title="User Growth (Last 7 Days)" />
          </CardContent>
        </Card>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
          {/* Key Insights */}
          <Card className="border-gray-700 bg-gray-800">
            <CardContent className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-white">Key Insights</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-green-800 bg-green-900/20 p-3">
                  <div>
                    <p className="text-sm font-medium text-green-300">Active Subscriptions</p>
                    <p className="text-xs text-green-400">Growing monthly recurring revenue</p>
                  </div>
                  <div className="text-lg font-semibold text-green-200">{analyticsData.activeSubscriptions}</div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-blue-800 bg-blue-900/20 p-3">
                  <div>
                    <p className="text-sm font-medium text-blue-300">Completed Orders</p>
                    <p className="text-xs text-blue-400">Successfully delivered services</p>
                  </div>
                  <div className="text-lg font-semibold text-blue-200">{analyticsData.completedOrders}</div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-yellow-800 bg-yellow-900/20 p-3">
                  <div>
                    <p className="text-sm font-medium text-yellow-300">Pending Orders</p>
                    <p className="text-xs text-yellow-400">Awaiting processing</p>
                  </div>
                  <div className="text-lg font-semibold text-yellow-200">{analyticsData.orderStats.pending}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card className="border-gray-700 bg-gray-800">
            <CardContent className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-white">Performance Trends</h3>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">User Growth</span>
                  <span className="text-sm text-green-400">↗ +12.5%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-green-600" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Revenue Growth</span>
                  <span className="text-sm text-green-400">↗ +8.3%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Order Completion</span>
                  <span className="text-sm text-green-400">↗ +15.7%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div className="h-2 rounded-full bg-purple-600" style={{ width: "85%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}
