import { desc } from "drizzle-orm"
import { db } from "@/db/index"
import { user } from "@/db/schema"

type UserData = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  role: "user" | "admin" | "super_admin"
  enterpriseEmail?: string
  countryCode?: string
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

// Direct user data fetching using database queries
async function getUsersData(): Promise<UserData[]> {
  // Direct database query - only existing fields from user table
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
      enterpriseEmail: user.enterpriseEmail,
      countryCode: user.countryCode,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt))

  return users.map((u) => ({
    id: u.id,
    name: u.name || "",
    email: u.email,
    emailVerified: u.emailVerified || false,
    role: u.role || "user",
    enterpriseEmail: u.enterpriseEmail || undefined,
    countryCode: u.countryCode || undefined,
    lastLogin: u.lastLogin?.toISOString() || undefined,
    createdAt: u.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: u.updatedAt?.toISOString() || new Date().toISOString(),
  }))
}

export default async function AdminUsersPage() {
  const users = await getUsersData()

  const getRoleColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-800"
      case "admin":
        return "bg-blue-100 text-blue-800"
      case "user":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl leading-6 font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all users in your account including their role and profile information.
          </p>
          <p className="mt-1 text-xs text-blue-600">
            Note: This is now a simplified read-only view. Subscription data comes from Polar.sh.
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="ring-opacity-5 overflow-hidden shadow ring-1 ring-black md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Email Verified
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Last Login
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((userData) => (
                    <tr key={userData.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        <div>
                          <div className="font-medium">{userData.name}</div>
                          <div className="text-gray-500">{userData.email}</div>
                          {userData.enterpriseEmail && (
                            <div className="text-xs text-blue-600">Enterprise: {userData.enterpriseEmail}</div>
                          )}
                          {userData.countryCode && (
                            <div className="text-xs text-gray-500">Country: {userData.countryCode}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${getRoleColor(
                            userData.role
                          )}`}
                        >
                          {userData.role.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        {userData.emailVerified ? (
                          <span className="text-green-600">✓ Verified</span>
                        ) : (
                          <span className="text-red-600">✗ Not Verified</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        {userData.lastLogin ? new Date(userData.lastLogin).toLocaleDateString() : "Never"}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        {new Date(userData.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{users.length}</dd>
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
                  <dt className="truncate text-sm font-medium text-gray-500">Verified Users</dt>
                  <dd className="text-lg font-medium text-gray-900">{users.filter((u) => u.emailVerified).length}</dd>
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Admins</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {users.filter((u) => u.role === "admin" || u.role === "super_admin").length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Migration Notice */}
      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
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
            <h3 className="text-sm font-medium text-blue-800">Direct Database Access Implementation</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                This page now uses direct database queries instead of the API endpoint. Subscription status is now
                managed via Polar.sh SDK integration. User management features will be enhanced in future updates with
                proper role-based access controls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
