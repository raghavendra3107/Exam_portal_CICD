import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                Every journey needs a navigator
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-prose">
                Transform your examination process with our comprehensive online platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/register" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-white font-medium shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                  Get Started
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-gray-700 font-medium hover:bg-gray-50">
                  Login
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-100 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-indigo-100 blur-2xl" />
              <div className="relative bg-white/70 backdrop-blur border rounded-2xl shadow-lg p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500" />
                  <div className="h-24 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
                  <div className="h-24 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500" />
                  <div className="h-24 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500" />
                  <div className="h-24 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500" />
                  <div className="h-24 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage


