import { desc, eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/index"
import { emailOrders, insertEmailOrderSchema, user } from "@/db/schema"
import { auth } from "@/lib/auth"

export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TEMPORARY FIX: Use email-based admin check until better-auth roles are implemented
    const adminEmails = ["admin@aicopilotvibe.com", "geun@aicopilotvibe.com"]
    const isAdmin = adminEmails.includes(session.user.email || "")

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const orders = await db
      .select({
        id: emailOrders.id,
        userId: emailOrders.userId,
        status: emailOrders.status,
        paymentId: emailOrders.paymentId,
        polarSubscriptionId: emailOrders.polarSubscriptionId,
        assignedAdminId: emailOrders.assignedAdminId,
        adminNotes: emailOrders.adminNotes,
        priority: emailOrders.priority,
        createdAt: emailOrders.createdAt,
        deliveredAt: emailOrders.deliveredAt,
        updatedAt: emailOrders.updatedAt,
        user: {
          name: user.name,
          email: user.email,
        },
      })
      .from(emailOrders)
      .leftJoin(user, eq(emailOrders.userId, user.id))
      .orderBy(desc(emailOrders.createdAt))

    // Fetch assigned admin details separately to avoid SQL alias conflicts
    const ordersWithAssignedAdmin = await Promise.all(
      orders.map(async (order) => {
        let assignedAdmin = null
        if (order.assignedAdminId) {
          const adminResult = await db
            .select({
              name: user.name,
              email: user.email,
            })
            .from(user)
            .where(eq(user.id, order.assignedAdminId))
            .limit(1)

          if (adminResult.length > 0) {
            assignedAdmin = adminResult[0]
          }
        }

        return {
          ...order,
          assignedAdmin,
        }
      })
    )

    return NextResponse.json({ orders: ordersWithAssignedAdmin })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // TEMPORARY FIX: Use email-based admin check until better-auth roles are implemented
    const adminEmails = ["admin@aicopilotvibe.com", "geun@aicopilotvibe.com"]
    const isAdmin = adminEmails.includes(session.user.email || "")

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    // Validate request body with Zod
    const validationResult = insertEmailOrderSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { userId, paymentId, polarSubscriptionId, priority = "normal" } = validationResult.data

    const newOrder = await db
      .insert(emailOrders)
      .values({
        userId,
        paymentId,
        polarSubscriptionId,
        priority,
        status: "pending",
        assignedAdminId: session.user.id,
      })
      .returning()

    return NextResponse.json({ order: newOrder[0] })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
