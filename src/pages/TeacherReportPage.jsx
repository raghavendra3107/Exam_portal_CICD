import { useEffect, useState } from 'react'
import { fetchResults } from '../services/api.js'

function TeacherReportPage() {
  const [results, setResults] = useState([])
  useEffect(() => { fetchResults().then(setResults) }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold">Report Card</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[720px] border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Quiz</th>
              <th className="px-4 py-2 text-left text-sm">Student</th>
              <th className="px-4 py-2 text-left text-sm">Score</th>
              <th className="px-4 py-2 text-left text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{r.title}</td>
                <td className="px-4 py-2">{r.studentId}</td>
                <td className="px-4 py-2">{r.score}%</td>
                <td className="px-4 py-2">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeacherReportPage





