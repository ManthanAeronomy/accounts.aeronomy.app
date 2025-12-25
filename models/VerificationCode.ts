import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IVerificationCode extends Document {
  email: string
  code: string
  clerkUserId: string
  expiresAt: Date
  verified: boolean
  createdAt: Date
}

const VerificationCodeSchema: Schema = new Schema<IVerificationCode>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      length: 6,
    },
    clerkUserId: {
      type: String,
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // Auto-delete expired codes
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Prevent re-compilation during development
const VerificationCode: Model<IVerificationCode> = 
  mongoose.models.VerificationCode || 
  mongoose.model<IVerificationCode>('VerificationCode', VerificationCodeSchema)

export default VerificationCode

