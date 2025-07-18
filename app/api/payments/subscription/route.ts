import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Note: Subscription status is now managed via Polar.sh SDK
    // This endpoint returns placeholder data

    return NextResponse.json({
      message: "Subscription data is now handled via Polar.sh SDK",
      status: "inactive",
      note: "Use Polar.sh customer.state() on the client side",
    })
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
