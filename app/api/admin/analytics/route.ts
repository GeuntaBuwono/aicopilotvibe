import { count, desc, eq, gte, sql } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { db } from "@/db/index"
import { adminActivity, emailOrders, user } from "@/db/schema"
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
    const revenue = activeSubscriptions * 29

    // Get order stats
    const orderStatsResult = await db
      .select({
        status: emailOrders.status,
        count: count(),
      })
      .from(emailOrders)
      .groupBy(emailOrders.status)

    const orderStats = {
      pending: 0,
      processing: 0,
      delivered: 0,
      cancelled: 0,
    }

    orderStatsResult.forEach((stat) => {
      if (stat.status && stat.status in orderStats) {
        orderStats[stat.status as keyof typeof orderStats] = stat.count
      }
    })

    // Get recent activity from admin activity logs
    const recentActivityResult = await db
      .select({
        id: adminActivity.id,
        action: adminActivity.action,
        timestamp: adminActivity.createdAt,
        details: adminActivity.details,
      })
      .from(adminActivity)
      .orderBy(desc(adminActivity.createdAt))
      .limit(10)

    const recentActivity = recentActivityResult.map((activity) => ({
      id: activity.id,
      action: activity.action || "Unknown action",
      timestamp: activity.timestamp?.toISOString() || new Date().toISOString(),
      details: activity.details ? JSON.stringify(activity.details) : "",
    }))

    // Get user growth for the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const userGrowthResult = await db
      .select({
        date: sql<string>`DATE(${user.createdAt})`,
        users: count(),
      })
      .from(user)
      .where(gte(user.createdAt, sevenDaysAgo))
      .groupBy(sql`DATE(${user.createdAt})`)
      .orderBy(sql`DATE(${user.createdAt})`)

    // Fill in missing days with 0
    const userGrowth = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split("T")[0]
      const existingData = userGrowthResult.find((d) => d.date === dateStr)
      userGrowth.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        users: existingData?.users || 0,
      })
    }

    return NextResponse.json({
      totalUsers,
      activeSubscriptions,
      totalOrders,
      completedOrders,
      revenue,
      orderStats,
      recentActivity,
      userGrowth,
    })
  } catch (error) {
    console.error("Error fetching analytics data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
