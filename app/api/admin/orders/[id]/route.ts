import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/index"
import { adminActivity, emailOrders, updateEmailOrderSchema } from "@/db/schema"
import { auth } from "@/lib/auth"
import { OrderPriority, OrderStatus } from "@/types/order"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
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

    const order = await db.select().from(emailOrders).where(eq(emailOrders.id, resolvedParams.id)).limit(1)

    if (!order.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order: order[0] })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
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
    const validationResult = updateEmailOrderSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { status, adminNotes, assignedAdminId, priority } = validationResult.data

    const updateData: {
      updatedAt: Date
      status?: OrderStatus
      adminNotes?: string
      assignedAdminId?: string
      priority?: OrderPriority
      deliveredAt?: Date
    } = {
      updatedAt: new Date(),
    }

    if (status) updateData.status = status as OrderStatus
    if (adminNotes !== undefined) updateData.adminNotes = typeof adminNotes === "string" ? adminNotes : undefined
    if (assignedAdminId !== undefined)
      updateData.assignedAdminId = typeof assignedAdminId === "string" ? assignedAdminId : undefined
    if (priority) updateData.priority = priority as OrderPriority

    if (status === "delivered") {
      updateData.deliveredAt = new Date()
    }

    const updatedOrder = await db
      .update(emailOrders)
      .set(updateData)
      .where(eq(emailOrders.id, resolvedParams.id))
      .returning()

    if (!updatedOrder.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Log admin activity
    await db.insert(adminActivity).values({
      adminId: session.user.id,
      action: "update_order",
      targetType: "order",
      targetId: resolvedParams.id,
      details: {
        changes: updateData,
        orderId: resolvedParams.id,
      },
    })

    return NextResponse.json({ order: updatedOrder[0] })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params
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

    const deletedOrder = await db.delete(emailOrders).where(eq(emailOrders.id, resolvedParams.id)).returning()

    if (!deletedOrder.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Log admin activity
    await db.insert(adminActivity).values({
      adminId: session.user.id,
      action: "delete_order",
      targetType: "order",
      targetId: resolvedParams.id,
      details: {
        deletedOrder: deletedOrder[0],
      },
    })

    return NextResponse.json({ message: "Order deleted successfully" })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
