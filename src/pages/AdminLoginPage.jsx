import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { loginAdmin } from '../services/api.js'

function AdminLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <main className="min-h-dvh -mt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-6 shadow-xl">
          <h1 className="text-2xl font-semibold text-center">Admin Login</h1>
          <p className="mt-2 text-sm text-gray-500 text-center">Demo: admin / admin123</p>
          {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
          <form
            className="mt-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setError('')
              setLoading(true)
              const res = await loginAdmin({ username, password })
              setLoading(false)
              if (res.success) {
                login('admin', { id: username })
                navigate(from, { replace: true })
              } else {
                setError(res.message || 'Login failed')
              }
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-md bg-gray-800 py-2 text-white font-medium hover:bg-gray-900 disabled:opacity-60">{loading ? 'Logging in...' : 'Login'}</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AdminLoginPage


