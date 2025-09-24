import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createQuiz, getCategories, getQuizzes, updateQuiz } from '../services/api.js'

function QuizForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editing = Boolean(id)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [maxMarks, setMaxMarks] = useState(100)
  const [numQuestions, setNumQuestions] = useState(10)
  const [published, setPublished] = useState(true)
  const [categoryId, setCategoryId] = useState('')
  const [durationMinutes, setDurationMinutes] = useState(20)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { getCategories().then(setCategories) }, [])
  useEffect(() => {
    if (editing) {
      getQuizzes().then((qs) => {
        const q = qs.find(x => x.id === id)
        if (q) {
          setTitle(q.title); setDescription(q.description); setMaxMarks(q.maxMarks)
          setNumQuestions(q.numQuestions); setPublished(q.published); setCategoryId(q.categoryId || ''); setDurationMinutes(q.durationMinutes || 20)
        }
      })
    }
  }, [editing, id])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (editing) {
      await updateQuiz({ id, title, description, maxMarks: Number(maxMarks), numQuestions: Number(numQuestions), published, categoryId: categoryId || undefined, durationMinutes: Number(durationMinutes) })
    } else {
      await createQuiz({ title, description, maxMarks: Number(maxMarks), numQuestions: Number(numQuestions), published, categoryId: categoryId || undefined, durationMinutes: Number(durationMinutes) })
    }
    setLoading(false)
    navigate('/teacher/quizzes')
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">{editing ? 'Update' : 'Add'} Quiz</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Quiz Title" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Quiz Description" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Maximum Marks</label>
          <input value={maxMarks} onChange={(e) => setMaxMarks(e.target.value)} type="number" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Number of Questions</label>
          <input value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} type="number" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm">Publish Quiz</label>
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Choose a Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2">
            <option value="">Choose Category</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (minutes)</label>
          <input value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} type="number" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <button disabled={loading} className="rounded-md bg-green-600 px-6 py-2 text-white">{loading ? 'Saving...' : 'Add'}</button>
      </form>
    </div>
  )
}

export default QuizForm





