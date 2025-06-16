import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://127.0.0.1:27017/travel-blog'

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI is missing in environment variables.')
}

interface MongooseCache {
	conn: mongoose.Connection | null
	promise: Promise<mongoose.Connection> | null
}

const globalWithMongoose = globalThis as unknown as { mongoose: MongooseCache }

const cached: MongooseCache = globalWithMongoose.mongoose ?? {
	conn: null,
	promise: null,
}

async function connectDB(): Promise<mongoose.Connection> {
	if (cached.conn) return cached.conn

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI)
			.then(mongoose => mongoose.connection)
	}

	cached.conn = await cached.promise
	globalWithMongoose.mongoose = cached // Global cache'ni yangilash

	return cached.conn
}

export default connectDB
