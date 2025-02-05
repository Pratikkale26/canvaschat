import { Users, Zap, Lock } from "lucide-react"

const features = [
  {
    name: "Real-time Collaboration",
    description: "Work together with your team in real-time, seeing changes instantly as they happen.",
    icon: Users,
  },
  {
    name: "Lightning Fast",
    description: "Enjoy a smooth, responsive drawing experience with our optimized performance.",
    icon: Zap,
  },
  {
    name: "Secure by Design",
    description: "Your data is encrypted and protected, ensuring your ideas remain confidential.",
    icon: Lock,
  },
]

export default function Features() {
  return (
    <div id="features" className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            A better way to collaborate
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            ExcaliClone provides powerful features to enhance your collaborative drawing experience.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

