import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteQuiz, getQuizzes } from '../services/api.js'

function QuizzesList() {
  const [quizzes, setQuizzes] = useState([])
  useEffect(() => { getQuizzes().then(setQuizzes) }, [])

  async function handleDelete(id) {
    await deleteQuiz(id)
    setQuizzes((q) => q.filter(x => x.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Quizzes</h1>
      <div className="mt-4 space-y-3">
        {quizzes.map((q) => (
          <div key={q.id} className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{q.title}</p>
                <p className="text-sm text-gray-600">{q.description}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Link to={`/teacher/questions/${q.id}`} className="rounded-md border px-3 py-1.5 hover:bg-gray-50">Questions</Link>
                <span className="rounded-md border px-2 py-1 text-xs">Marks : {q.maxMarks}</span>
                <span className="rounded-md border px-2 py-1 text-xs">{q.numQuestions} Questions</span>
                <Link to={`/teacher/quizzes/edit/${q.id}`} className="rounded-md bg-green-600 px-3 py-1.5 text-white">Update</Link>
                <button onClick={() => handleDelete(q.id)} className="rounded-md bg-red-600 px-3 py-1.5 text-white">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/teacher/quizzes/new" className="rounded-md bg-green-600 px-4 py-2 text-white">Add Quiz</Link>
      </div>
    </div>
  )
}

export default QuizzesList





