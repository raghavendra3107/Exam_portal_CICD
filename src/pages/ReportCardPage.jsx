import { useEffect, useState } from 'react'
import { fetchResults } from '../services/api.js'

function ReportCardPage() {
  const [results, setResults] = useState([])
  useEffect(() => { fetchResults().then(setResults) }, [])
  return (
    <div>
      <h2 className="text-lg font-medium">Report Card</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-[480px] border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm">Exam</th>
              <th className="px-4 py-2 text-left text-sm">Score</th>
              <th className="px-4 py-2 text-left text-sm">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{r.title}</td>
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

export default ReportCardPage





