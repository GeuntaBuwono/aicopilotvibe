import { count, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { db } from "@/db/index"
import { emailOrders, user } from "@/db/schema"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userRole = session.user.role as string
    if (userRole !== "admin" && userRole !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Get total users from database
    const totalUsersResult = await db.select({ count: count() }).from(user)
    const totalUsers = totalUsersResult[0]?.count || 0

    // Get total orders from email orders
    const totalOrdersResult = await db.select({ count: count() }).from(emailOrders)
    const totalOrders = totalOrdersResult[0]?.count || 0

    // Get completed orders
    const completedOrdersResult = await db
      .select({ count: count() })
      .from(emailOrders)
      .where(eq(emailOrders.status, "delivered"))
    const completedOrders = completedOrdersResult[0]?.count || 0

    // Calculate active subscriptions (simplified - based on delivered orders)
    const activeSubscriptions = Math.floor(completedOrders * 0.8)

    // Calculate revenue (simplified - $29 per active subscription)
    const totalRevenue = activeSubscriptions * 29

    // Calculate conversion rate
    const conversionRate = totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0

    return NextResponse.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      activeSubscriptions,
      conversionRate,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
