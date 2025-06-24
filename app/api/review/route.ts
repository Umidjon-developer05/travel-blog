import { type NextRequest, NextResponse } from 'next/server'
import review from '@/models/review'
import connectDB from '@/lib/mogodb'
import '@/models/users'

export async function POST(request: NextRequest) {
	try {
		const { userId, rating, comment, blogSlug } = await request.json()
		console.log(
			`Review POST: userId: ${userId}, rating: ${rating}, comment: ${comment}, blogSlug: ${blogSlug}`
		)
		await connectDB()
		if (!userId) {
			return NextResponse.json(
				{ message: 'User ID is required' },
				{ status: 400 }
			)
		}
		if (!rating) {
			return NextResponse.json(
				{ message: 'Rating is required' },
				{ status: 400 }
			)
		}
		if (!comment) {
			return NextResponse.json(
				{ message: 'Comment is required' },
				{ status: 400 }
			)
		}

		await review.create({
			userId,
			rating,
			comment,
			blogSlug,
		})

		return NextResponse.json({ message: 'Review saved!' }, { status: 201 })
	} catch (err) {
		console.error('Review POST error:', err)
		return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
	}
}

export async function GET(request: NextRequest) {
	try {
		await connectDB()

		const { searchParams } = new URL(request.url)
		const blogSlug = searchParams.get('blogSlug')

		if (!blogSlug) {
			return NextResponse.json(
				{ message: 'blogSlug talab qilinadi' },
				{ status: 400 }
			)
		}

		const reviews = await review
			.find({ blogSlug })
			.populate('userId', 'name email image')
		
		const formatted = reviews
			.filter(r => r.userId !== null)
			.map(r => ({
				_id: r._id,
				blogSlug: r.blogSlug,
				rating: r.rating,
				comment: r.comment,
				user: r.userId,
			}))

		return NextResponse.json(formatted)
	} catch (err) {
		console.error('Review GET error:', err)
		return NextResponse.json(
			{ message: 'Reviewlarni olishda xatolik' },
			{ status: 500 }
		)
	}
}
