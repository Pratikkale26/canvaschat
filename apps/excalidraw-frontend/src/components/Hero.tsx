import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative bg-white dark:bg-gray-900">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Collaborative drawing <span className="text-indigo-600">made simple</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Create, collaborate, and share your ideas in real-time with our intuitive drawing tool.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start space-x-4">
            <Link
              href="#"
              className="px-6 py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Get started
            </Link>
            <Link
              href="#"
              className="px-6 py-3 text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200"
            >
              Live demo
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 p-4">
          <Image
            className="w-full"
            src="/collaberativecanvasimage.avif"
            alt="Collaborative drawing example"
            width={800}
            height={600}
          />
        </div>
      </div>
    </section>
  )
}
