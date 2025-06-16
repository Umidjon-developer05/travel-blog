import User from '@/models/users'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	const { providerAccountId } = await req.json()
	const users = await User.find({
		providerAccountId,
	})
	return NextResponse.json(users)
}
