'use client' // Error components must be Client Components
 
import { useEffect } from 'react';
import Link from "next/link";
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="flex items-center justify-center text-4xl  text-red-500 mb-4">404 - Page Not Found</h1>
      <h2 className="flex items-center justify-center text-xl text-gray-800 mb-4">Something went wrong!</h2>
      <div className="flex justify-center items-center ">

      <Link href="/" className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded">
        Back to Home
      </Link>
      </div>
    </div>
  )
}