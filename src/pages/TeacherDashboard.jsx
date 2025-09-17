import { useEffect, useState } from 'react'
import { fetchAdminOverview, fetchResults } from '../services/api.js'

function TeacherDashboard() {
  const [overview, setOverview] = useState({ exams: [], students: 0 })
  const [results, setResults] = useState([])
  useEffect(() => {
    fetchAdminOverview().then(setOverview)
    fetchResults().then(setResults)
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 rounded-lg border p-6 bg-white shadow-sm">
          <h2 className="font-medium">Your Exams</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {overview.exams.map((e) => (
              <li key={e.id} className="flex items-center justify-between">
                <span>{e.title}</span>
                <span className="text-gray-600">{e.questions} questions</span>
              </li>
            ))}
          </ul>
        </section>
        <aside className="space-y-4">
          <div className="rounded-lg border p-6 bg-white shadow-sm">
            <h3 className="font-medium">Performance Analytics</h3>
            {results.length === 0 ? (
              <p className="mt-2 text-sm text-gray-600">No results yet.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {results.slice(-5).map((r, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{r.title}</span>
                    <span className="font-medium">{r.score}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}

export default TeacherDashboard


