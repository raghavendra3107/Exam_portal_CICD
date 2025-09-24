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
import StudentLoginPage from './pages/StudentLoginPage.jsx'
import LoginOptions from './pages/LoginOptions.jsx'
import TeacherLoginPage from './pages/TeacherLoginPage.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import TeacherLayout from './components/TeacherLayout.jsx'
import CategoriesList from './pages/CategoriesList.jsx'
import CategoryForm from './pages/CategoryForm.jsx'
import QuizzesList from './pages/QuizzesList.jsx'
import QuizForm from './pages/QuizForm.jsx'
import QuestionsList from './pages/QuestionsList.jsx'
import QuestionForm from './pages/QuestionForm.jsx'
import TeacherReportPage from './pages/TeacherReportPage.jsx'
import StudentLayout from './components/StudentLayout.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ReportCardPage from './pages/ReportCardPage.jsx'
import AllQuizzesPage from './pages/AllQuizzesPage.jsx'

function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-white text-gray-900">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginOptions />} />
          <Route path="/login/student" element={<StudentLoginPage />} />
          <Route path="/login/teacher" element={<TeacherLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="report" element={<ReportCardPage />} />
            <Route path="quizzes" element={<AllQuizzesPage />} />
            <Route path="programming" element={<AllQuizzesPage />} />
            <Route path="aptitude" element={<AllQuizzesPage />} />
          </Route>
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
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="categories/new" element={<CategoryForm />} />
            <Route path="categories/edit/:id" element={<CategoryForm />} />
            <Route path="quizzes" element={<QuizzesList />} />
            <Route path="quizzes/new" element={<QuizForm />} />
            <Route path="quizzes/edit/:id" element={<QuizForm />} />
            <Route path="questions" element={<QuizzesList />} />
            <Route path="questions/:quizId" element={<QuestionsList />} />
            <Route path="questions/:quizId/new" element={<QuestionForm />} />
            <Route path="questions/:quizId/edit/:id" element={<QuestionForm />} />
            <Route path="report" element={<TeacherReportPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
