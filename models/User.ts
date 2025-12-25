import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  clerkUserId: string
  email: string
  firstName?: string
  lastName?: string
  role: 'buyer' | 'seller' | 'admin'
  companyName?: string
  companyAddress?: string
  accountStatus: 'active' | 'pending' | 'suspended'
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema<IUser>(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
      default: 'buyer',
      required: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    companyAddress: {
      type: String,
      trim: true,
    },
    accountStatus: {
      type: String,
      enum: ['active', 'pending', 'suspended'],
      default: 'active',
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Prevent re-compilation during development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User

