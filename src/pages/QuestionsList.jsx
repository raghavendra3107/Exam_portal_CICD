import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteQuestion, getQuestionsByQuiz } from '../services/api.js'

function QuestionsList() {
  const { quizId } = useParams()
  const [questions, setQuestions] = useState([])
  useEffect(() => { getQuestionsByQuiz(quizId).then(setQuestions) }, [quizId])

  async function handleDelete(id) {
    await deleteQuestion(quizId, id)
    setQuestions((qs) => qs.filter(q => q.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Questions</h1>
      <div className="mt-4">
        <Link to={`/teacher/questions/${quizId}/new`} className="rounded-md bg-green-600 px-4 py-2 text-white">Add Question</Link>
      </div>
      <div className="mt-4 space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-md border p-4">
            <p className="font-medium">{idx + 1}. {q.text}</p>
            {q.type !== 'essay' && (
              <ul className="mt-2 space-y-1 text-sm">
                {q.options?.map((opt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex items-center gap-3 text-sm">
              <Link to={`/teacher/questions/${quizId}/edit/${q.id}`} className="text-green-600 hover:underline">Update</Link>
              <button onClick={() => handleDelete(q.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionsList





