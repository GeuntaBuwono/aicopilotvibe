import { NextRequest, NextResponse } from "next/server"
import { auth, canAssignOrders } from "@/lib/auth"
import { sendCredentialsEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })

    if (!session || !canAssignOrders(session.user)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, email, name, credentials } = (await request.json()) as {
      userId: string
      email: string
      name: string
      credentials: { email: string; password: string }
    }

    if (!userId || !email || !name || !credentials) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await sendCredentialsEmail(userId, email, name, credentials)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to send credentials email:", error)
    return NextResponse.json({ error: "Failed to send credentials email" }, { status: 500 })
  }
}
