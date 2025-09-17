import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { loginStudent } from '../services/api.js'

function StudentLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-dvh -mt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-semibold text-center">Student Login</h1>
          <p className="mt-2 text-sm text-gray-500 text-center">Demo: student@example.com / student123</p>
          {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
          <form
            className="mt-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setError('')
              setLoading(true)
              const res = await loginStudent({ email, password })
              setLoading(false)
              if (res.success) {
                login('student', { id: email })
                navigate(from, { replace: true })
              } else {
                setError(res.message || 'Login failed')
              }
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-md bg-green-600 py-2 text-white font-medium hover:bg-green-700 disabled:opacity-60">{loading ? 'Logging in...' : 'Login'}</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default StudentLoginPage


