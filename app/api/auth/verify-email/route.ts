import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import VerificationCode from '@/models/VerificationCode'
import { sendVerificationCode } from '@/lib/resend'

// POST /api/auth/verify-email - Send verification code
export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress
    if (!email) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 400 }
      )
    }

    await connectDB()

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiration to 10 minutes from now
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)

    // Invalidate any existing codes for this email
    await VerificationCode.updateMany(
      { email, clerkUserId: clerkUser.id, verified: false },
      { verified: true }
    )

    // Create new verification code
    const verificationCode = new VerificationCode({
      email,
      code,
      clerkUserId: clerkUser.id,
      expiresAt,
      verified: false,
    })

    await verificationCode.save()

    // Send verification email
    const userName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || email
    await sendVerificationCode(email, code, userName)

    return NextResponse.json(
      { message: 'Verification code sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending verification code:', error)
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    )
  }
}

