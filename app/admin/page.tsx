"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { signOut, useSession } from "@/lib/auth-client"

type UserWithRole = {
  role?: "user" | "admin" | "super_admin"
}
import { Button } from "components/Button/Button"

export default function AdminDashboard() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/sign-in")
      } else if (
        !((session.user as UserWithRole).role === "admin" || (session.user as UserWithRole).role === "super_admin")
      ) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    }
  }, [session, isPending, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  if (isLoading || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {session.user.name} ({(session.user as UserWithRole).role || "user"})
              </span>
              <Button href="/dashboard" intent="secondary" size="sm">
                User Dashboard
              </Button>
              <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-gray-700">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Total Users</dt>
                      <dd className="text-lg font-medium text-gray-900">-</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
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
                      <dt className="truncate text-sm font-medium text-gray-500">Pending Orders</dt>
                      <dd className="text-lg font-medium text-gray-900">-</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
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
                      <dt className="truncate text-sm font-medium text-gray-500">Revenue</dt>
                      <dd className="text-lg font-medium text-gray-900">$-</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="p-5">
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
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-500">Delivered Orders</dt>
                      <dd className="text-lg font-medium text-gray-900">-</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
                <div className="mt-5">
                  <div className="flow-root">
                    <div className="py-4 text-center">
                      <p className="text-sm text-gray-500">No recent orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">System Status</h3>
                <div className="mt-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Payment Processing</p>
                      <p className="text-sm text-gray-500">Operational</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Email Delivery</p>
                      <p className="text-sm text-gray-500">Operational</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Database</p>
                      <p className="text-sm text-gray-500">Operational</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
                <div className="mt-5 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Button href="/admin/orders" className="flex-1">
                    Manage Orders
                  </Button>
                  <Button href="/admin/users" intent="secondary" className="flex-1">
                    Manage Users
                  </Button>
                  <Button href="/admin/settings" intent="secondary" className="flex-1">
                    System Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
