import { Link } from 'react-router-dom'

function LoginOptions() {
  return (
    <main className="min-h-dvh -mt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-6 shadow-xl text-center">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">Choose how you want to sign in</p>
          <div className="mt-6 grid grid-cols-1 gap-3">
            <Link to="/login/student" className="w-full rounded-md bg-green-600 py-2 text-white font-medium hover:bg-green-700">Student Login</Link>
            <Link to="/login/teacher" className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700">Teacher Login</Link>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            New here? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default LoginOptions


