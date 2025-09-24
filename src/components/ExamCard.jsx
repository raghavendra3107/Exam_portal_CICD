import { Link } from 'react-router-dom'

function ExamCard({ exam }) {
  return (
    <div className="rounded-lg border p-5 shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{exam.title}</h3>
          <p className="mt-1 text-sm text-gray-600">Duration: {exam.durationMinutes} mins</p>
          <span className="mt-2 inline-block text-xs rounded-full border px-2 py-0.5 text-gray-700">{exam.status}</span>
        </div>
        <Link to={`/exam/${exam.id}`} className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-white text-sm font-medium hover:bg-blue-700">Start</Link>
      </div>
    </div>
  )
}

export default ExamCard





