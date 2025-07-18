import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { db } from "@/db/index"
import { adminActivity, emailLogs, emailOrders, user } from "@/db/schema"
import { auth } from "@/lib/auth"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    const body = (await request.json()) as {
      enterpriseEmail: string
      enterprisePassword: string
      deliveryNotes?: string
    }
    const { enterpriseEmail, enterprisePassword, deliveryNotes } = body

    if (!enterpriseEmail || !enterprisePassword) {
      return NextResponse.json({ error: "Enterprise email and password are required" }, { status: 400 })
    }

    // Get order details
    const orderDetails = await db
      .select({
        order: emailOrders,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      .from(emailOrders)
      .leftJoin(user, eq(emailOrders.userId, user.id))
      .where(eq(emailOrders.id, resolvedParams.id))
      .limit(1)

    if (!orderDetails.length) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const orderDetail = orderDetails[0]
    const orderUser = orderDetail?.user

    if (!orderUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user with enterprise credentials (fields moved to user table)
    await db
      .update(user)
      .set({
        enterpriseEmail,
        enterprisePassword,
        // Note: subscriptionStatus, paymentDate, subscriptionExpiresAt are now handled by Polar.sh
        lastLogin: new Date(), // Update lastLogin to track activity
        updatedAt: new Date(),
      })
      .where(eq(user.id, orderUser.id))

    // Update order status to delivered
    await db
      .update(emailOrders)
      .set({
        status: "delivered",
        deliveredAt: new Date(),
        adminNotes: deliveryNotes || "Credentials delivered successfully",
        updatedAt: new Date(),
      })
      .where(eq(emailOrders.id, resolvedParams.id))

    // Send email with credentials
    try {
      const { data, error } = await resend.emails.send({
        from: "AI Copilot Vibe <noreply@aicopilotvibe.com>",
        to: [orderUser.email],
        subject: "Your Enterprise AI Copilot Credentials Are Ready!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">AI Copilot Vibe</h1>
              <h2 style="color: #333; margin-bottom: 20px;">Your Enterprise Credentials Are Ready!</h2>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">Hello ${orderUser.name},</h3>
              <p style="color: #666; margin-bottom: 15px;">
                Thank you for your purchase! Your enterprise AI copilot credentials are now ready.
              </p>
            </div>

            <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #dc2626; margin-bottom: 15px;">🔒 Your Credentials (Keep Secure)</h3>
              <div style="background-color: #fff; padding: 15px; border-radius: 5px; font-family: monospace;">
                <p style="margin: 5px 0;"><strong>Email:</strong> ${enterpriseEmail}</p>
                <p style="margin: 5px 0;"><strong>Password:</strong> ${enterprisePassword}</p>
              </div>
            </div>

            ${
              deliveryNotes
                ? `
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #0369a1; margin-bottom: 15px;">📋 Additional Notes</h3>
                <p style="color: #666; white-space: pre-wrap;">${deliveryNotes}</p>
              </div>
            `
                : ""
            }

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #333; margin-bottom: 15px;">🚀 Getting Started</h3>
              <ol style="color: #666; padding-left: 20px;">
                <li>Log in to your AI Copilot dashboard</li>
                <li>Use the credentials provided above</li>
                <li>Start exploring your premium AI features</li>
                <li>Contact support if you need any assistance</li>
              </ol>
            </div>

            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #d97706; margin-bottom: 15px;">⚠️ Important Security Notes</h3>
              <ul style="color: #666; padding-left: 20px;">
                <li>Keep your credentials secure and do not share them</li>
                <li>Change your password after first login if needed</li>
                <li>Your subscription is active for 30 days</li>
                <li>You will receive renewal reminders before expiration</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #666; font-size: 14px;">
                Need help? Contact our support team at support@aicopilotvibe.com
              </p>
              <p style="color: #666; font-size: 14px;">
                Best regards,<br>
                The AI Copilot Vibe Team
              </p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error("Resend error:", error)
        throw new Error(error.message)
      }

      // Log email send
      await db.insert(emailLogs).values({
        userId: orderUser.id,
        emailType: "credential_delivery",
        recipientEmail: orderUser.email,
        subject: "Your Enterprise AI Copilot Credentials Are Ready!",
        status: "sent",
        resendId: data?.id,
        sentAt: new Date(),
      })

      // Log admin activity
      await db.insert(adminActivity).values({
        adminId: session.user.id,
        action: "deliver_credentials",
        targetType: "order",
        targetId: resolvedParams.id,
        details: {
          orderId: resolvedParams.id,
          userId: orderUser.id,
          enterpriseEmail,
          deliveryNotes,
          emailSent: true,
        },
      })

      return NextResponse.json({
        message: "Credentials delivered successfully",
        emailId: data?.id,
        enterpriseEmail,
      })
    } catch (emailError) {
      console.error("Failed to send credentials email:", emailError)

      // Log email failure
      await db.insert(emailLogs).values({
        userId: orderUser.id,
        emailType: "credential_delivery",
        recipientEmail: orderUser.email,
        subject: "Your Enterprise AI Copilot Credentials Are Ready!",
        status: "failed",
        errorMessage: emailError instanceof Error ? emailError.message : "Unknown error",
        sentAt: new Date(),
      })

      // Still log the admin activity even if email failed
      await db.insert(adminActivity).values({
        adminId: session.user.id,
        action: "deliver_credentials",
        targetType: "order",
        targetId: resolvedParams.id,
        details: {
          orderId: resolvedParams.id,
          userId: orderUser.id,
          enterpriseEmail,
          deliveryNotes,
          emailSent: false,
          emailError: emailError instanceof Error ? emailError.message : "Unknown error",
        },
      })

      return NextResponse.json(
        {
          message: "Credentials updated but email delivery failed",
          error: "Email delivery failed",
          enterpriseEmail,
        },
        { status: 207 }
      ) // 207 Multi-Status
    }
  } catch (error) {
    console.error("Error delivering credentials:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
