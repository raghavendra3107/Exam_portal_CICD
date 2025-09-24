// Placeholder API functions to be swapped with real backend calls later

const DEMO_STUDENT = { email: 'student@example.com', password: 'student123' }
// Allow separate backend links per module
const STUDENT_API_BASE = import.meta?.env?.VITE_STUDENT_API || import.meta?.env?.VITE_API_BASE || 'http://localhost:8080'
const TEACHER_API_BASE = import.meta?.env?.VITE_TEACHER_API || import.meta?.env?.VITE_API_BASE || 'http://localhost:8080'
// In-memory demo datastore to simulate shared backend state
const store = {
  exams: [
    { id: 'exam-101', title: 'Mathematics Basics', durationMinutes: 30, status: 'Available' },
    { id: 'exam-202', title: 'Physics Fundamentals', durationMinutes: 45, status: 'Available' },
  ],
  questions: {}, // examId -> questions array
  results: [], // { examId, title, studentId, score, date }
  // Teacher authoring data
  categories: [
    { id: 'cat-programming', title: 'Programming', description: 'Programming related quizzes.' },
    { id: 'cat-aptitude', title: 'Aptitude', description: 'Aptitude related quizzes.' },
  ],
  quizzes: [
    { id: 'quiz-1', title: 'Data Structures - Basic', description: 'Arrays, Strings, LinkedList etc.', maxMarks: 100, numQuestions: 10, published: true, categoryId: 'cat-programming', durationMinutes: 20 },
    { id: 'quiz-2', title: 'Algebra', description: 'Algebra related.', maxMarks: 150, numQuestions: 15, published: true, categoryId: 'cat-aptitude', durationMinutes: 20 },
  ],
}
const DEMO_ADMIN = { username: 'admin', password: 'admin123' }
const DEMO_TEACHER = { username: 'teacher', password: 'teacher123' }

export async function loginStudent({ email, password }) {
  try {
    const res = await fetch(`${STUDENT_API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    })
    const data = await res.json()
    if (!res.ok) return { success: false, message: data?.message || 'Login failed' }
    return data
  } catch (e) {
    // Fallback to demo credentials if backend not running
    if (email === DEMO_STUDENT.email && password === DEMO_STUDENT.password) {
      return { success: true, role: 'student', user: { email } }
    }
    return { success: false, message: 'Unable to reach server' }
  }
}

export async function loginAdmin({ username, password }) {
  await new Promise(r => setTimeout(r, 300))
  if (username === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
    return { success: true, role: 'admin', user: { username } }
  }
  return { success: false, message: 'Invalid admin credentials' }
}

export async function loginTeacher({ username, password }) {
  try {
    const res = await fetch(`${TEACHER_API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (!res.ok) return { success: false, message: data?.message || 'Login failed' }
    return data
  } catch (e) {
    if (username === DEMO_TEACHER.username && password === DEMO_TEACHER.password) {
      return { success: true, role: 'teacher', user: { username } }
    }
    return { success: false, message: 'Unable to reach server' }
  }
}

export async function registerUser({ username, password, role }) {
  try {
    // Send to student or teacher base by role; fallback to student base
    const base = role?.toUpperCase() === 'TEACHER' ? TEACHER_API_BASE : STUDENT_API_BASE
    const res = await fetch(`${base}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role: role?.toUpperCase() }),
    })
    const data = await res.json()
    if (!res.ok) return { success: false, message: data?.message || 'Registration failed' }
    return data
  } catch (e) {
    return { success: false, message: 'Unable to reach server' }
  }
}

export async function fetchAvailableExams() {
  await new Promise(r => setTimeout(r, 200))
  // reflect teacher quizzes as exams for students
  const quizzesAsExams = store.quizzes.filter(q => q.published).map(q => ({ id: q.id, title: q.title, durationMinutes: q.durationMinutes || 30, status: 'Available' }))
  const unique = [...new Map([...store.exams, ...quizzesAsExams].map(e => [e.id, e])).values()]
  return unique
}

export async function fetchExam(examId) {
  await new Promise(r => setTimeout(r, 200))
  const base = store.exams.find(e => e.id === examId) || { id: examId, title: 'Sample Exam', durationMinutes: 30 }
  const qs = store.questions[examId]
  if (qs && qs.length) return { ...base, questions: qs }
  return { ...base, questions: [
    { id: 'q1', type: 'mcq', text: 'What is 2 + 2?', options: ['3', '4', '5'], answer: null },
    { id: 'q2', type: 'boolean', text: 'The Earth orbits the Sun.', answer: null },
    { id: 'q3', type: 'essay', text: 'Explain gravity in your own words.', answer: '' },
  ]}
}

export async function submitExam({ examId, answers, studentId }) {
  await new Promise(r => setTimeout(r, 300))
  const exam = store.exams.find(e => e.id === examId)
  const score = 80 + Math.round(Math.random() * 20) - 10
  const title = exam?.title || 'Exam'
  store.results.push({ examId, title, studentId: studentId || 'demo-student', score, date: new Date().toISOString().slice(0,10) })
  return { success: true, examId, score }
}

export async function fetchResults() {
  await new Promise(r => setTimeout(r, 200))
  return [...store.results]
}

// Admin
export async function fetchAdminOverview() {
  await new Promise(r => setTimeout(r, 200))
  return {
    exams: store.exams.map(e => ({ id: e.id, title: e.title, questions: 20 })),
    students: 120,
  }
}

export async function createExam(payload) {
  await new Promise(r => setTimeout(r, 200))
  const id = `exam-${Math.floor(Math.random()*10000)}`
  store.exams.push({ id, status: 'Available', ...payload })
  return { success: true, id, ...payload }
}

export async function createExamWithQuestions({ title, durationMinutes, questions }) {
  const res = await createExam({ title, durationMinutes })
  if (res.success) {
    store.questions[res.id] = questions
  }
  return res
}

// Categories CRUD
export async function getCategories() { await new Promise(r => setTimeout(r, 150)); return [...store.categories] }
export async function createCategory({ title, description }) {
  await new Promise(r => setTimeout(r, 150))
  const id = `cat-${Math.floor(Math.random()*10000)}`
  store.categories.push({ id, title, description })
  return { success: true, id }
}
export async function updateCategory({ id, title, description }) {
  await new Promise(r => setTimeout(r, 150))
  const idx = store.categories.findIndex(c => c.id === id)
  if (idx !== -1) store.categories[idx] = { id, title, description }
  return { success: idx !== -1 }
}
export async function deleteCategory(id) {
  await new Promise(r => setTimeout(r, 150))
  store.categories = store.categories.filter(c => c.id !== id)
  // also unassign from quizzes
  store.quizzes = store.quizzes.map(q => q.categoryId === id ? { ...q, categoryId: undefined } : q)
  return { success: true }
}

// Quizzes CRUD (teacher)
export async function getQuizzes() { await new Promise(r => setTimeout(r, 150)); return [...store.quizzes] }
export async function createQuiz({ title, description, maxMarks, numQuestions, published, categoryId, durationMinutes }) {
  await new Promise(r => setTimeout(r, 150))
  const id = `quiz-${Math.floor(Math.random()*10000)}`
  const quiz = { id, title, description, maxMarks, numQuestions, published: !!published, categoryId, durationMinutes: durationMinutes || 20 }
  store.quizzes.push(quiz)
  // reflect to student exams list
  if (quiz.published) store.exams.push({ id, title, durationMinutes: quiz.durationMinutes, status: 'Available' })
  return { success: true, id }
}
export async function updateQuiz({ id, title, description, maxMarks, numQuestions, published, categoryId, durationMinutes }) {
  await new Promise(r => setTimeout(r, 150))
  const idx = store.quizzes.findIndex(q => q.id === id)
  if (idx !== -1) store.quizzes[idx] = { id, title, description, maxMarks, numQuestions, published: !!published, categoryId, durationMinutes: durationMinutes || 20 }
  // sync exams
  const eidx = store.exams.findIndex(e => e.id === id)
  if (published) {
    const examObj = { id, title, durationMinutes: durationMinutes || 20, status: 'Available' }
    if (eidx === -1) store.exams.push(examObj); else store.exams[eidx] = examObj
  } else {
    if (eidx !== -1) store.exams.splice(eidx, 1)
  }
  return { success: idx !== -1 }
}
export async function deleteQuiz(id) {
  await new Promise(r => setTimeout(r, 150))
  store.quizzes = store.quizzes.filter(q => q.id !== id)
  store.exams = store.exams.filter(e => e.id !== id)
  delete store.questions[id]
  return { success: true }
}

// Questions CRUD (by quiz/exam id)
export async function getQuestionsByQuiz(quizId) { await new Promise(r => setTimeout(r, 120)); return [...(store.questions[quizId] || [])] }
export async function createQuestion(quizId, question) { await new Promise(r => setTimeout(r, 120)); if (!store.questions[quizId]) store.questions[quizId] = []; const q = { id: `q-${Math.floor(Math.random()*10000)}`, ...question }; store.questions[quizId].push(q); return { success: true, id: q.id } }
export async function updateQuestion(quizId, question) { await new Promise(r => setTimeout(r, 120)); const arr = store.questions[quizId] || []; const idx = arr.findIndex(q => q.id === question.id); if (idx !== -1) arr[idx] = question; return { success: idx !== -1 } }
export async function deleteQuestion(quizId, questionId) { await new Promise(r => setTimeout(r, 120)); const arr = store.questions[quizId] || []; store.questions[quizId] = arr.filter(q => q.id !== questionId); return { success: true } }

export async function addQuestion(examId, question) {
  await new Promise(r => setTimeout(r, 200))
  return { success: true, examId, questionId: 'q-new', ...question }
}


