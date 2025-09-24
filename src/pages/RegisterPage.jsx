import { useState } from 'react'
import { registerUser } from '../services/api.js'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <form
        className="mt-6 space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          setError('')
          setLoading(true)
          const res = await registerUser({ username, password, role })
          setLoading(false)
          if (res.success) {
            navigate('/login')
          } else {
            setError(res.message || 'Registration failed')
          }
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-60">{loading ? 'Creating...' : 'Create account'}</button>
      </form>
    </main>
  )
}

export default RegisterPage







