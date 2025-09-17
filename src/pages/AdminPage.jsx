import { useEffect, useState } from 'react'
import { addQuestion, createExam, fetchAdminOverview, createExamWithQuestions } from '../services/api.js'
import { generateExamWithAI } from '../services/ai.js'

function AdminPage() {
  const [overview, setOverview] = useState({ exams: [], students: 0 })
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState(30)
  const [creating, setCreating] = useState(false)
  const [aiTopic, setAiTopic] = useState('General Knowledge')
  const [aiDifficulty, setAiDifficulty] = useState('medium')
  const [aiCount, setAiCount] = useState(5)
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    fetchAdminOverview().then(setOverview)
  }, [])

  async function handleCreateExam(e) {
    e.preventDefault()
    setCreating(true)
    const res = await createExam({ title, durationMinutes: Number(duration) })
    setCreating(false)
    if (res.success) {
      setOverview((o) => ({ ...o, exams: [...o.exams, { id: res.id, title: res.title, questions: 0 }] }))
      setTitle('')
      setDuration(30)
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <h2 className="font-medium">Create Exam</h2>
            <form className="mt-4 grid sm:grid-cols-3 gap-3" onSubmit={handleCreateExam}>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Exam title" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input value={duration} onChange={(e) => setDuration(e.target.value)} type="number" min="5" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button disabled={creating} className="rounded-md bg-blue-600 px-3 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-60">{creating ? 'Creating...' : 'Create'}</button>
            </form>
          </div>
          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <h2 className="font-medium">Generate with AI</h2>
            <div className="mt-4 grid sm:grid-cols-4 gap-3">
              <input value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} placeholder="Topic (e.g., Algebra)" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2" />
              <select value={aiDifficulty} onChange={(e) => setAiDifficulty(e.target.value)} className="rounded-md border px-3 py-2">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <input value={aiCount} onChange={(e) => setAiCount(e.target.value)} type="number" min="3" max="20" className="rounded-md border px-3 py-2" />
            </div>
            <div className="mt-3">
              <button
                onClick={async () => {
                  setAiLoading(true)
                  const generated = await generateExamWithAI({ topic: aiTopic, difficulty: aiDifficulty, numQuestions: Number(aiCount), durationMinutes: Number(duration) })
                  const res = await createExamWithQuestions({ title: generated.title, durationMinutes: generated.durationMinutes, questions: generated.questions })
                  setAiLoading(false)
                  if (res.success) {
                    setOverview((o) => ({ ...o, exams: [...o.exams, { id: res.id, title: res.title, questions: generated.questions.length }] }))
                  }
                }}
                disabled={aiLoading}
                className="rounded-md bg-purple-600 px-4 py-2 text-white font-medium hover:bg-purple-700 disabled:opacity-60"
              >
                {aiLoading ? 'Generating…' : 'Generate with AI'}
              </button>
              <p className="mt-2 text-xs text-gray-500">Set VITE_OPENAI_API_KEY to use OpenAI; otherwise a smart mock is used.</p>
            </div>
          </div>
          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <h2 className="font-medium">Existing Exams</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {overview.exams.map((e) => (
                <li key={e.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-gray-600">Questions: {e.questions}</p>
                  </div>
                  <button onClick={() => addQuestion(e.id, { type: 'mcq', text: 'New question', options: ['A','B','C'] })} className="rounded-md border px-3 py-1.5 hover:bg-gray-50">Add Question</button>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <h3 className="font-medium">Students</h3>
            <p className="mt-2 text-sm text-gray-600">Total registered: {overview.students}</p>
          </div>
          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <h3 className="font-medium">Courses</h3>
            <p className="mt-2 text-sm text-gray-600">All courses listing placeholder.</p>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default AdminPage


