import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { isAuthenticated, role, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="font-semibold text-lg tracking-tight">
            ExamPortal
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {isAuthenticated && role === 'student' && (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Dashboard</NavLink>
                <NavLink to="/exam" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Exams</NavLink>
                <NavLink to="/results" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Results</NavLink>
              </>
            )}
            {isAuthenticated && role === 'teacher' && (
              <NavLink to="/teacher" className={({ isActive }) => `hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-700'}`}>Teacher</NavLink>
            )}
          </nav>
          <div className="flex items-center gap-3">
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-sm inline-flex items-center rounded-md border px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">Login</Link>
                <Link to="/register" className="text-sm inline-flex items-center rounded-md bg-blue-600 px-3 py-2 font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Register</Link>
              </>
            )}
            {isAuthenticated && (
              <button onClick={() => { logout(); navigate('/'); }} className="text-sm inline-flex items-center rounded-md border px-3 py-2 font-medium text-gray-700 hover:bg-gray-50">Logout</button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar


