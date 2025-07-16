import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createCheckoutSession } from "@/lib/payments"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: userId, email } = session.user

    const checkoutSession = await createCheckoutSession(userId, email)

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
    })
  } catch (error) {
    console.error("Checkout creation failed:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
