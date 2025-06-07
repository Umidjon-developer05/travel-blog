import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h2 className="mb-2 text-3xl font-bold">404</h2>
      <p className="mb-8 text-xl">Page not found</p>
      <Button asChild>
        <Link href="/en">Go Home</Link>
      </Button>
    </div>
  )
}
