import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Icon({ children }) { return <span className="w-4 h-4">{children}</span> }

function TeacherLayout() {
  const { user, logout } = useAuth()

  const item = (to, label, icon) => (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-200 hover:bg-white/10'}`} end>
      <Icon>{icon}</Icon>
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
          {item('/teacher/profile', 'Profile', '👤')}
          {item('/teacher/categories', 'Categories', '🗂️')}
          {item('/teacher/quizzes', 'Quizzes', '🧪')}
          {item('/teacher/questions', 'Questions', '❓')}
          {item('/teacher/report', 'Report Card', '🧾')}
        </nav>
      </aside>
      <div className="bg-white">
        <header className="h-16 flex items-center justify-between border-b px-4 sm:px-6">
          <div />
          <div className="flex items-center gap-4 text-sm">
            {user?.id && <span className="text-gray-600 hidden sm:inline">{user.id}</span>}
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

export default TeacherLayout


