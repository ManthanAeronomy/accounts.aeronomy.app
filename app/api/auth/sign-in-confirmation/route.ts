import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { sendSignInConfirmationEmail } from '@/lib/resend'

// POST /api/auth/sign-in-confirmation - Send sign-in confirmation email
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

    // Check if this is a new account or existing account
    const user = await User.findOne({ clerkUserId: clerkUser.id })
    const isNewAccount = !user

    // If new account, create it
    if (isNewAccount) {
      const newUser = new User({
        clerkUserId: clerkUser.id,
        email,
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        role: 'buyer',
        accountStatus: 'active',
        emailVerified: clerkUser.emailAddresses[0]?.verification?.status === 'verified',
      })
      await newUser.save()
    }

    // Send confirmation email
    const userName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || email
    await sendSignInConfirmationEmail(email, userName, isNewAccount)

    return NextResponse.json(
      { 
        message: 'Sign-in confirmation email sent',
        isNewAccount,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending sign-in confirmation:', error)
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    )
  }
}

