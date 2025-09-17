import { useEffect, useState } from 'react'
import ExamCard from '../components/ExamCard.jsx'
import { fetchAvailableExams, fetchResults } from '../services/api.js'

function Dashboard() {
  const [exams, setExams] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    fetchAvailableExams().then(setExams)
    fetchResults().then(setResults)
  }, [])

  const avgScore = results.length ? Math.round(results.reduce((s, r) => s + r.score, 0) / results.length) : null

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-medium">Available Exams</h2>
          {exams.length === 0 ? (
            <p className="text-sm text-gray-600">No exams available.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          )}
        </section>
        <aside className="space-y-4">
          <div className="rounded-lg border p-5 bg-white shadow-sm">
            <h3 className="font-medium">Your Analytics</h3>
            {avgScore === null ? (
              <p className="mt-2 text-sm text-gray-600">No results yet.</p>
            ) : (
              <p className="mt-2 text-sm">Average score: <span className="font-semibold">{avgScore}%</span></p>
            )}
          </div>
          <div className="rounded-lg border p-5 bg-white shadow-sm">
            <h3 className="font-medium">Past Results</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {results.map((r) => (
                <li key={r.examId} className="flex items-center justify-between">
                  <span className="text-gray-700">{r.title}</span>
                  <span className="font-medium">{r.score}%</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Dashboard


