import { currentUser } from '@clerk/nextjs/server'
import connectDB from './mongodb'
import User from '@/models/User'

export async function getCurrentUserAccount() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    return null
  }

  await connectDB()
  
  const user = await User.findOne({ clerkUserId: clerkUser.id })
  return user
}

export async function createUserAccount(data: {
  role?: 'buyer' | 'seller' | 'admin'
  companyName?: string
  companyAddress?: string
}) {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    throw new Error('Unauthorized')
  }

  await connectDB()

  // Check if account already exists
  const existingUser = await User.findOne({ clerkUserId: clerkUser.id })
  if (existingUser) {
    return existingUser
  }

  const user = new User({
    clerkUserId: clerkUser.id,
    email: clerkUser.emailAddresses[0]?.emailAddress || '',
    firstName: clerkUser.firstName || '',
    lastName: clerkUser.lastName || '',
    role: data.role || 'buyer',
    companyName: data.companyName,
    companyAddress: data.companyAddress,
    accountStatus: 'active',
    emailVerified: false, // Will be set to true after email verification
  })

  await user.save()
  return user
}

