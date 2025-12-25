import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import VerificationCode from '@/models/VerificationCode'
import User from '@/models/User'
import { sendWelcomeEmail } from '@/lib/resend'

// POST /api/auth/verify-code - Verify the code
export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { code } = await request.json()
    
    if (!code || code.length !== 6) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    await connectDB()

    const email = clerkUser.emailAddresses[0]?.emailAddress
    if (!email) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 400 }
      )
    }

    // Find the verification code
    const verificationCode = await VerificationCode.findOne({
      email,
      clerkUserId: clerkUser.id,
      code,
      verified: false,
      expiresAt: { $gt: new Date() },
    })

    if (!verificationCode) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      )
    }

    // Mark code as verified
    verificationCode.verified = true
    await verificationCode.save()

    // Create or update user account
    let user = await User.findOne({ clerkUserId: clerkUser.id })
    
    if (!user) {
      user = new User({
        clerkUserId: clerkUser.id,
        email,
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        role: 'buyer',
        accountStatus: 'active',
        emailVerified: true,
      })
      await user.save()

      // Send welcome email
      const userName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || email
      await sendWelcomeEmail(email, userName)
    } else {
      // Update email verification status
      user.emailVerified = true
      if (user.accountStatus === 'pending') {
        user.accountStatus = 'active'
      }
      await user.save()
    }

    return NextResponse.json(
      { 
        message: 'Email verified successfully',
        verified: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error verifying code:', error)
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    )
  }
}

