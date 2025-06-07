import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// This route is used to revalidate paths when content changes in Hygraph
export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json()

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    if (!path) {
      return NextResponse.json({ message: "Path is required" }, { status: 400 })
    }

    // Revalidate the path
    revalidatePath(path)

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
  }
}
