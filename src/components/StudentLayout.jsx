import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function StudentLayout() {
  const { user, logout } = useAuth()

  const navItem = (to, label, icon) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
          isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-200 hover:bg-white/10'
        }`}
      end
    >
      <span className="w-4 h-4">{icon}</span>
      <span>{label}</span>
    </NavLink>
  )

  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="bg-gray-900 text-white">
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          <Link to="/" className="font-semibold">Exam-Portal</Link>
        </div>
        <nav className="py-2">
          {navItem('/dashboard/profile', 'Profile', '👤')}
          {navItem('/dashboard/report', 'Report Card', '🧾')}
          {navItem('/dashboard/quizzes', 'All Quizzes', '🗂️')}
          {navItem('/dashboard/programming', 'Programming', '💻')}
          {navItem('/dashboard/aptitude', 'Aptitude', '🧠')}
        </nav>
      </aside>
      <div className="bg-white">
        <header className="h-16 flex items-center justify-between border-b px-4 sm:px-6">
          <div />
          <div className="flex items-center gap-4 text-sm">
            {user?.id && <span className="text-gray-600 hidden sm:inline">{user.id}</span>}
            <Link to="/exam" className="text-gray-700 hover:text-blue-600">Test</Link>
            <button onClick={logout} className="rounded-md border px-3 py-1.5 hover:bg-gray-50">Logout</button>
          </div>
        </header>
        <main className="p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout





