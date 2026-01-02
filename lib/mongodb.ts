import mongoose from 'mongoose'

// Only check at runtime, not during build
const MONGODB_URI: string | undefined = process.env.MONGODB_URI

if (!MONGODB_URI) {
  // Only throw in runtime, not during build
  if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
    console.warn('MONGODB_URI is not set. Database connections will fail.')
  }
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local or Railway environment variables')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB

