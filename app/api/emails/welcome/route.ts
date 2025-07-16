import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: userId, email, name } = session.user

    await sendWelcomeEmail(userId, email, name)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send welcome email:", error)
    return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 })
  }
}
