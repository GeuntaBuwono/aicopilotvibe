import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db/index"
import { user } from "@/db/schema"
import { auth } from "@/lib/auth"

export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile data
    const userProfile = await db.select().from(user).where(eq(user.id, session.user.id)).limit(1)

    if (!userProfile.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ profile: userProfile[0] })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = (await request.json()) as {
      name?: string
      enterpriseEmail?: string
      countryCode?: string
    }

    // Update user profile
    const updatedUser = await db
      .update(user)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id))
      .returning()

    if (!updatedUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      profile: updatedUser[0],
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
