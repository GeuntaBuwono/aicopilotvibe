import /* eq */ "drizzle-orm"
import { Resend } from "resend"
import { db } from "@/db/index"
import { businessSchema } from "@/db/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(userId: string, email: string, name: string) {
  try {
    const emailResult = await resend.emails.send({
      from: "AI Copilot Vibe <noreply@aicopilotvibe.com>",
      to: email,
      subject: "Welcome to AI Copilot Vibe! 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0;">Welcome to AI Copilot Vibe!</h1>
            <p style="color: #e2e8f0; font-size: 18px; margin: 0;">Your GitHub Copilot journey starts here</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 16px;">Hello ${name}!</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Thank you for joining AI Copilot Vibe! Your account has been created successfully.
            </p>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <p style="color: #334155; font-size: 16px; margin: 0;">
                <strong>📧 Next Steps:</strong> We'll notify you as soon as your enterprise email is ready (within 24 hours).
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                Visit Dashboard
              </a>
            </div>
            
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>The AI Copilot Vibe Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #94a3b8; font-size: 12px;">
              If you have any questions, contact us at support@aicopilotvibe.com
            </p>
          </div>
        </div>
      `,
    })

    // Log email
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "welcome",
      recipientEmail: email,
      subject: "Welcome to AI Copilot Vibe! 🚀",
      status: "sent",
      resendId: emailResult.data?.id,
    })

    return emailResult
  } catch (error) {
    console.error("Failed to send welcome email:", error)

    // Log error
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "welcome",
      recipientEmail: email,
      subject: "Welcome to AI Copilot Vibe! 🚀",
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    })

    throw error
  }
}

export async function sendCredentialsEmail(
  userId: string,
  email: string,
  name: string,
  credentials: {
    email: string
    password: string
  }
) {
  try {
    const emailResult = await resend.emails.send({
      from: "AI Copilot Vibe <noreply@aicopilotvibe.com>",
      to: email,
      subject: "Your GitHub Enterprise Email is Ready! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 40px 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0;">🎉 Your Enterprise Email is Ready!</h1>
            <p style="color: #e2e8f0; font-size: 18px; margin: 0;">Time to unlock GitHub Copilot</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 16px;">Hello ${name}!</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Great news! Your GitHub enterprise email credentials are ready. You can now access GitHub Copilot with these credentials:
            </p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0; margin: 20px 0;">
              <h3 style="color: #166534; font-size: 18px; margin-bottom: 16px;">📧 Your Enterprise Credentials</h3>
              <div style="background: #1e293b; padding: 15px; border-radius: 6px; font-family: monospace;">
                <p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Email:</strong> ${credentials.email}</p>
                <p style="color: #e2e8f0; margin: 0;"><strong>Password:</strong> ${credentials.password}</p>
              </div>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="color: #92400e; font-size: 14px; margin: 0;">
                <strong>🔒 Security Notice:</strong> Please store these credentials securely and do not share them with anyone.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://github.com/settings/copilot" 
                 style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; margin-right: 10px;">
                Activate Copilot
              </a>
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: transparent; color: #3b82f6; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; border: 2px solid #3b82f6;">
                View Dashboard
              </a>
            </div>
            
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-top: 20px;">
              Need help? Contact our support team at support@aicopilotvibe.com
            </p>
            
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>The AI Copilot Vibe Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #94a3b8; font-size: 12px;">
              This email contains sensitive information. Please handle with care.
            </p>
          </div>
        </div>
      `,
    })

    // Log email
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "credentials",
      recipientEmail: email,
      subject: "Your GitHub Enterprise Email is Ready! 🎉",
      status: "sent",
      resendId: emailResult.data?.id,
    })

    return emailResult
  } catch (error) {
    console.error("Failed to send credentials email:", error)

    // Log error
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "credentials",
      recipientEmail: email,
      subject: "Your GitHub Enterprise Email is Ready! 🎉",
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    })

    throw error
  }
}

export async function sendPaymentConfirmationEmail(
  userId: string,
  email: string,
  name: string,
  paymentDetails: {
    amount: string
    paymentId: string
    subscriptionId?: string
  }
) {
  try {
    const emailResult = await resend.emails.send({
      from: "AI Copilot Vibe <noreply@aicopilotvibe.com>",
      to: email,
      subject: "Payment Confirmation - AI Copilot Vibe 💳",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0;">💳 Payment Confirmed!</h1>
            <p style="color: #e2e8f0; font-size: 18px; margin: 0;">Thank you for your purchase</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 16px;">Hello ${name}!</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Your payment has been successfully processed. Here are your payment details:
            </p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0; margin: 20px 0;">
              <h3 style="color: #166534; font-size: 18px; margin-bottom: 16px;">💰 Payment Details</h3>
              <p style="color: #374151; margin: 0 0 8px 0;"><strong>Amount:</strong> ${paymentDetails.amount}</p>
              <p style="color: #374151; margin: 0 0 8px 0;"><strong>Payment ID:</strong> ${paymentDetails.paymentId}</p>
              ${
                paymentDetails.subscriptionId
                  ? `<p style="color: #374151; margin: 0;"><strong>Subscription ID:</strong> ${paymentDetails.subscriptionId}</p>`
                  : ""
              }
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <p style="color: #1e40af; font-size: 14px; margin: 0;">
                <strong>📧 Next Steps:</strong> Your enterprise email will be delivered within 24 hours. We'll notify you once it's ready!
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                 style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                View Dashboard
              </a>
            </div>
            
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>The AI Copilot Vibe Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #94a3b8; font-size: 12px;">
              Questions? Contact us at support@aicopilotvibe.com
            </p>
          </div>
        </div>
      `,
    })

    // Log email
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "payment_confirmation",
      recipientEmail: email,
      subject: "Payment Confirmation - AI Copilot Vibe 💳",
      status: "sent",
      resendId: emailResult.data?.id,
    })

    return emailResult
  } catch (error) {
    console.error("Failed to send payment confirmation email:", error)

    // Log error
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "payment_confirmation",
      recipientEmail: email,
      subject: "Payment Confirmation - AI Copilot Vibe 💳",
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    })

    throw error
  }
}

export async function sendPasswordResetEmail(userId: string, email: string, name: string, resetToken: string) {
  try {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    const emailResult = await resend.emails.send({
      from: "AI Copilot Vibe <noreply@aicopilotvibe.com>",
      to: email,
      subject: "Reset Your Password - AI Copilot Vibe 🔐",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 32px; margin: 0 0 10px 0;">🔐 Reset Your Password</h1>
            <p style="color: #fef3c7; font-size: 18px; margin: 0;">Secure your account</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 16px;">Hello ${name}!</h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              We received a request to reset your password. Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <p style="color: #92400e; font-size: 14px; margin: 0;">
                <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request this reset, please ignore this email.
              </p>
            </div>
            
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-top: 20px;">
              Or copy and paste this URL into your browser:<br>
              <a href="${resetUrl}" style="color: #3b82f6; text-decoration: none; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              <strong>The AI Copilot Vibe Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #94a3b8; font-size: 12px;">
              Questions? Contact us at support@aicopilotvibe.com
            </p>
          </div>
        </div>
      `,
    })

    // Log email
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "password_reset",
      recipientEmail: email,
      subject: "Reset Your Password - AI Copilot Vibe 🔐",
      status: "sent",
      resendId: emailResult.data?.id,
    })

    return emailResult
  } catch (error) {
    console.error("Failed to send password reset email:", error)

    // Log error
    await db.insert(businessSchema.emailLogs).values({
      userId,
      emailType: "password_reset",
      recipientEmail: email,
      subject: "Reset Your Password - AI Copilot Vibe 🔐",
      status: "failed",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    })

    throw error
  }
}
