import { useEffect, useState } from 'react'
import { fetchAvailableExams } from '../services/api.js'
import ExamCard from '../components/ExamCard.jsx'

function AllQuizzesPage() {
  const [exams, setExams] = useState([])
  useEffect(() => { fetchAvailableExams().then(setExams) }, [])
  return (
    <div>
      <h2 className="text-lg font-medium">All Quizzes</h2>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map(e => <ExamCard key={e.id} exam={e} />)}
      </div>
    </div>
  )
}

export default AllQuizzesPage





