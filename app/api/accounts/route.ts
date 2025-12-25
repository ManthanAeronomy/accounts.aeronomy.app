import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import connectDB from '@/lib/mongodb'
import User, { IUser } from '@/models/User'
import { sendWelcomeEmail } from '@/lib/resend'

// GET /api/accounts - Get current user's account
export async function GET() {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()
    
    const user = await User.findOne({ clerkUserId: clerkUser.id })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      companyName: user.companyName,
      companyAddress: user.companyAddress,
      accountStatus: user.accountStatus,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  } catch (error) {
    console.error('Error fetching account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/accounts - Create new account (called after Clerk sign-up)
export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    // Check if account already exists
    const existingUser = await User.findOne({ clerkUserId: clerkUser.id })
    if (existingUser) {
      return NextResponse.json(
        { error: 'Account already exists' },
        { status: 409 }
      )
    }

    const body = await request.json()
    const { role = 'buyer', companyName, companyAddress } = body

    // Create new user account
    const user = new User({
      clerkUserId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      firstName: clerkUser.firstName || '',
      lastName: clerkUser.lastName || '',
      role,
      companyName,
      companyAddress,
      accountStatus: 'pending', // Will be active after email verification
      emailVerified: false,
    })

    await user.save()

    // Send welcome email
    const userName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.emailAddresses[0]?.emailAddress || 'User'
    await sendWelcomeEmail(user.email, userName)

    return NextResponse.json(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        companyName: user.companyName,
        accountStatus: user.accountStatus,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error creating account:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Account already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/accounts - Update current user's account
export async function PATCH(request: NextRequest) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const body = await request.json()
    const allowedUpdates = ['firstName', 'lastName', 'companyName', 'companyAddress', 'role']
    const updates: Partial<IUser> = {}

    for (const field of allowedUpdates) {
      if (body[field] !== undefined) {
        updates[field as keyof IUser] = body[field]
      }
    }

    const user = await User.findOneAndUpdate(
      { clerkUserId: clerkUser.id },
      { $set: updates },
      { new: true, runValidators: true }
    )

    if (!user) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      companyName: user.companyName,
      companyAddress: user.companyAddress,
      accountStatus: user.accountStatus,
      emailVerified: user.emailVerified,
      updatedAt: user.updatedAt,
    })
  } catch (error) {
    console.error('Error updating account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

