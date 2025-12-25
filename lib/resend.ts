import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Please add your Resend API key to .env.local')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationCode(email: string, code: string, name?: string) {
  try {
    await resend.emails.send({
      from: 'Aeronomy <onboarding@aeronomy.com>',
      to: email,
      subject: 'Verify your Aeronomy account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Aeronomy</h1>
          </div>
          <div style="background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin-top: 0;">Verify Your Email Address</h2>
            <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
              ${name ? `Hi ${name},` : 'Hi there,'}
            </p>
            <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
              Thank you for signing up for Aeronomy! Please use the verification code below to verify your email address:
            </p>
            <div style="background: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
              <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #0284c7; font-family: 'Courier New', monospace;">
                ${code}
              </div>
            </div>
            <p style="color: #64748b; font-size: 14px; line-height: 1.6;">
              This code will expire in 10 minutes. If you didn't create an account with Aeronomy, please ignore this email.
            </p>
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-top: 30px;">
              Best regards,<br>
              <strong>The Aeronomy Team</strong>
            </p>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending verification code email:', error)
    throw error
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'Aeronomy <onboarding@aeronomy.com>',
      to: email,
      subject: 'Welcome to Aeronomy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0284c7;">Welcome to Aeronomy!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for joining Aeronomy, the compliance-first procurement platform for Sustainable Aviation Fuel.</p>
          <p>Your account has been successfully created. You can now start connecting with buyers and sellers in the SAF marketplace.</p>
          <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
          <p>Best regards,<br>The Aeronomy Team</p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending welcome email:', error)
    // Don't throw - email failure shouldn't break account creation
  }
}

