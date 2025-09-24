import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // If not authenticated, send to appropriate login based on desired role
    // If multiple allowed roles, default to student login
    const wantsAdmin = allowedRoles?.includes('admin') && !allowedRoles?.includes('student')
    const loginPath = wantsAdmin ? '/login/admin' : '/login/student'
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Auth but role not permitted; send home
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute







