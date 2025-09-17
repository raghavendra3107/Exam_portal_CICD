import { createContext, useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState(null) // 'student' | 'admin' | 'teacher' | null
  const [user, setUser] = useState(null) // minimal identity info

  function login(nextRole, nextUser) {
    setRole(nextRole)
    setUser(nextUser || null)
    setIsAuthenticated(true)
  }

  function logout() {
    setIsAuthenticated(false)
    setRole(null)
    setUser(null)
    navigate('/')
  }

  const value = useMemo(() => ({ isAuthenticated, role, user, login, logout }), [isAuthenticated, role, user])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


