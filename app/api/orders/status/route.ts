import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/index"
import { emailOrders } from "@/db/schema"
import { auth } from "@/lib/auth"

export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get orders for current user
    const orders = await db
      .select()
      .from(emailOrders)
      .where(eq(emailOrders.userId, session.user.id))
      .orderBy(emailOrders.createdAt)

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching order status:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
