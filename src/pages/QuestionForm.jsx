import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createQuestion, getQuestionsByQuiz, updateQuestion } from '../services/api.js'

function QuestionForm() {
  const navigate = useNavigate()
  const { quizId, id } = useParams()
  const editing = Boolean(id)
  const [type, setType] = useState('mcq')
  const [text, setText] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editing) {
      getQuestionsByQuiz(quizId).then(list => {
        const q = list.find(x => x.id === id)
        if (q) {
          setType(q.type); setText(q.text); setOptions(q.options || [''])
        }
      })
    }
  }, [editing, quizId, id])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const payload = { id, type, text, options: type === 'mcq' ? options.filter(Boolean) : undefined }
    if (editing) await updateQuestion(quizId, payload)
    else await createQuestion(quizId, payload)
    setLoading(false)
    navigate(`/teacher/questions/${quizId}`)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">{editing ? 'Update' : 'Add'} Question</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-4">
        <div>
          <label className="block text-sm font-medium">Question</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2 min-h-24" />
        </div>
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2">
            <option value="mcq">MCQ</option>
            <option value="boolean">True/False</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        {type === 'mcq' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt, i) => (
              <input key={i} value={opt} onChange={(e) => setOptions((arr) => arr.map((v, idx) => idx === i ? e.target.value : v))} placeholder={`Option ${i + 1}`} className="rounded-md border px-3 py-2" />
            ))}
          </div>
        )}
        <button disabled={loading} className="rounded-md bg-green-600 px-6 py-2 text-white">{loading ? 'Saving...' : 'Add'}</button>
      </form>
    </div>
  )
}

export default QuestionForm





