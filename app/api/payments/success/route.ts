import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { handlePaymentSuccess } from "@/lib/payments"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as { paymentId?: string }
    const { paymentId } = body

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    // Handle payment success via our payments library
    await handlePaymentSuccess(paymentId, session.user.id)

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
    })
  } catch (error) {
    console.error("Error processing payment success:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
