"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useSession } from "@/lib/auth-client"

type QuickStat = {
  name: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: React.ReactNode
}

type AdminStats = {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  activeSubscriptions: number
  conversionRate: number
}

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data as AdminStats)
        }
      } catch (error) {
        console.error("Failed to fetch admin stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Dynamic quick stats using real data
  const quickStats: QuickStat[] = [
    {
      name: "Total Revenue",
      value: stats ? `$${stats.totalRevenue}` : "$0",
      change: "+12%",
      changeType: "increase",
      icon: (
        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Orders",
      value: stats ? stats.totalOrders.toString() : "0",
      change: "+5%",
      changeType: "increase",
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H6.75c.621 0 1.125.504 1.125 1.125v.375m-3.75 0h.375c.621 0 1.125.504 1.125 1.125v.75h-.375A1.125 1.125 0 013 4.5v-.75zM2.25 15h12A2.25 2.25 0 0016.5 12.75v-7.5A2.25 2.25 0 0014.25 3H2.25A2.25 2.25 0 000 5.25v7.5A2.25 2.25 0 002.25 15z"
          />
        </svg>
      ),
    },
    {
      name: "Active Users",
      value: stats ? stats.totalUsers.toString() : "0",
      change: "+18%",
      changeType: "increase",
      icon: (
        <svg
          className="h-6 w-6 text-purple-600"
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
      ),
    },
    {
      name: "Conversion Rate",
      value: stats ? `${stats.conversionRate.toFixed(1)}%` : "3.2%",
      change: "-2%",
      changeType: "decrease",
      icon: (
        <svg
          className="h-6 w-6 text-orange-600"
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
      ),
    },
  ]

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-300">
            Welcome back, {session?.user.name}. Here's what's happening with your business today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => (
            <Card key={stat.name} className="border-gray-700 bg-gray-800">
              <CardContent className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">{stat.icon}</div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-400">{stat.name}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-white">{stat.value}</div>
                        <Badge
                          variant={stat.changeType === "increase" ? "secondary" : "destructive"}
                          className={`ml-2 ${
                            stat.changeType === "increase"
                              ? "border-green-800 bg-green-900/20 text-green-400"
                              : "border-red-800 bg-red-900/20 text-red-400"
                          }`}
                        >
                          {stat.changeType === "increase" ? (
                            <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg className="h-3 w-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {stat.change}
                        </Badge>
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Migration Notice */}
        <div className="mb-8 rounded-lg border border-blue-700 bg-blue-900/50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-200">Dashboard Migration Complete</h3>
              <div className="mt-2 text-sm text-blue-300">
                <p>
                  This dashboard now uses direct database access and Polar.sh SDK integration. Visit the Analytics page
                  for detailed metrics and reporting.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="relative flex items-center space-x-3 rounded-lg border border-gray-600 bg-gray-700 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 hover:border-gray-500">
                <div className="flex-shrink-0">
                  <svg
                    className="h-10 w-10 text-blue-600"
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
                <div className="min-w-0 flex-1">
                  <a href="/admin/orders" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-white">Manage Orders</p>
                    <p className="text-sm text-gray-300">View and process customer orders</p>
                  </a>
                </div>
              </div>

              <div className="relative flex items-center space-x-3 rounded-lg border border-gray-600 bg-gray-700 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 hover:border-gray-500">
                <div className="flex-shrink-0">
                  <svg
                    className="h-10 w-10 text-green-600"
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
                <div className="min-w-0 flex-1">
                  <a href="/admin/users" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-white">Manage Users</p>
                    <p className="text-sm text-gray-300">View and manage user accounts</p>
                  </a>
                </div>
              </div>

              <div className="relative flex items-center space-x-3 rounded-lg border border-gray-600 bg-gray-700 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 hover:border-gray-500">
                <div className="flex-shrink-0">
                  <svg
                    className="h-10 w-10 text-purple-600"
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
                <div className="min-w-0 flex-1">
                  <a href="/admin/analytics" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-white">View Analytics</p>
                    <p className="text-sm text-gray-300">Detailed analytics and reports</p>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-8 border-gray-700 bg-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" aria-hidden="true" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-gray-800">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-300">
                            New order completed by <span className="font-medium text-white">John Doe</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-400">
                          <time dateTime="2023-01-23">2h ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" aria-hidden="true" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-gray-800">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                          </svg>
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-300">
                            New user registered: <span className="font-medium text-white">Jane Smith</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-400">
                          <time dateTime="2023-01-23">4h ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="relative">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 ring-8 ring-gray-800">
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-300">
                            System alert: <span className="font-medium text-white">Low inventory warning</span>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-400">
                          <time dateTime="2023-01-23">6h ago</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
