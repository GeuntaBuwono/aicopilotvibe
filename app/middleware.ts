import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { auth, canAccessAdmin } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }
  // Check admin access for admin routes using role-based access control
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!canAccessAdmin(session.user)) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard", "/admin/:path*"], // Apply middleware to specific routes
}
