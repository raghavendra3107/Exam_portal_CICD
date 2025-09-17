// Placeholder API functions to be swapped with real backend calls later

const DEMO_STUDENT = { email: 'student@example.com', password: 'student123' }
// In-memory demo datastore to simulate shared backend state
const store = {
  exams: [
    { id: 'exam-101', title: 'Mathematics Basics', durationMinutes: 30, status: 'Available' },
    { id: 'exam-202', title: 'Physics Fundamentals', durationMinutes: 45, status: 'Available' },
  ],
  questions: {}, // examId -> questions array
  results: [], // { examId, title, studentId, score, date }
}
const DEMO_ADMIN = { username: 'admin', password: 'admin123' }
const DEMO_TEACHER = { username: 'teacher', password: 'teacher123' }

export async function loginStudent({ email, password }) {
  await new Promise(r => setTimeout(r, 300))
  if (email === DEMO_STUDENT.email && password === DEMO_STUDENT.password) {
    return { success: true, role: 'student', user: { email } }
  }
  return { success: false, message: 'Invalid student credentials' }
}

export async function loginAdmin({ username, password }) {
  await new Promise(r => setTimeout(r, 300))
  if (username === DEMO_ADMIN.username && password === DEMO_ADMIN.password) {
    return { success: true, role: 'admin', user: { username } }
  }
  return { success: false, message: 'Invalid admin credentials' }
}

export async function loginTeacher({ username, password }) {
  await new Promise(r => setTimeout(r, 300))
  if (username === DEMO_TEACHER.username && password === DEMO_TEACHER.password) {
    return { success: true, role: 'teacher', user: { username } }
  }
  return { success: false, message: 'Invalid teacher credentials' }
}

export async function fetchAvailableExams() {
  await new Promise(r => setTimeout(r, 200))
  return [...store.exams]
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

export async function addQuestion(examId, question) {
  await new Promise(r => setTimeout(r, 200))
  return { success: true, examId, questionId: 'q-new', ...question }
}


