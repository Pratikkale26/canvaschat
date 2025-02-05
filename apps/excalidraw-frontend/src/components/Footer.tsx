"use client"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} canvasChat. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

