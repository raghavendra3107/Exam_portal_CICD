import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ExamPage from './pages/ExamPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import StudentLoginPage from './pages/StudentLoginPage.jsx'
import AdminLoginPage from './pages/AdminLoginPage.jsx'
import LoginOptions from './pages/LoginOptions.jsx'
import TeacherLoginPage from './pages/TeacherLoginPage.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'

function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginOptions />} />
          <Route path="/login/student" element={<StudentLoginPage />} />
          <Route path="/login/admin" element={<AdminLoginPage />} />
          <Route path="/login/teacher" element={<TeacherLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <ExamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <ResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
