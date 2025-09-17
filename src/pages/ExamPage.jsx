import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard.jsx'
import { fetchExam, submitExam } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

function ExamPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [exam, setExam] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchExam(id).then((data) => {
      // Randomize question order and options
      const shuffledQuestions = [...data.questions]
        .sort(() => Math.random() - 0.5)
        .map((q) => q.type === 'mcq' ? { ...q, options: [...q.options].sort(() => Math.random() - 0.5) } : q)
      setExam({ ...data, questions: shuffledQuestions })
      setTimeLeft(data.durationMinutes * 60)
    })
  }, [id])

  useEffect(() => {
    if (timeLeft === null) return
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft])

  // Simple anti-cheating: auto-submit on tab visibility change
  useEffect(() => {
    function onVis() {
      if (document.hidden) {
        handleSubmit()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  })

  const formatted = useMemo(() => {
    if (timeLeft === null) return '—'
    const m = Math.floor(timeLeft / 60)
    const s = (timeLeft % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }, [timeLeft])

  if (!exam) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Loading exam...</p>
      </main>
    )
  }

  function updateAnswer(qid, val) {
    setAnswers((a) => ({ ...a, [qid]: val }))
  }

  async function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    await submitExam({ examId: exam.id, answers, studentId: user?.id })
    navigate('/results')
  }

  const question = exam.questions[currentIndex]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{exam.title}</h1>
        <div className="rounded-md border px-3 py-1 text-sm">Time left: <span className="font-semibold">{formatted}</span></div>
      </div>

      <div className="mt-6">
        <QuestionCard
          question={question}
          answer={answers[question.id]}
          onChange={(val) => updateAnswer(question.id, val)}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentIndex((i) => Math.min(exam.questions.length - 1, i + 1))}
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            disabled={currentIndex === exam.questions.length - 1}
          >
            Next
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default ExamPage


