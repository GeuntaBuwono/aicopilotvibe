"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EnhancedDashboard } from "@/components/dashboard/EnhancedDashboard"
import { signOut, useSession } from "@/lib/auth-client"

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/sign-in")
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
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-400"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, {session.user.name || session.user.email}</span>
              <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Enhanced Dashboard with Native Polar Integration */}
          <EnhancedDashboard />
        </div>
      </div>
    </div>
  )
}
