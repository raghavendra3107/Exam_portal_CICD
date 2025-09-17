function QuestionCard({ question, answer, onChange }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="font-medium">{question.text}</h3>
      <div className="mt-4">
        {question.type === 'mcq' ? (
          <div className="space-y-2">
            {question.options.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={question.id}
                  value={opt}
                  checked={answer === opt}
                  onChange={(e) => onChange(e.target.value)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        ) : question.type === 'boolean' ? (
          <div className="flex gap-4">
            {['True', 'False'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={question.id}
                  value={opt}
                  checked={String(answer) === opt}
                  onChange={(e) => onChange(e.target.value)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        ) : (
          <textarea
            value={answer || ''}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-36"
            placeholder="Type your answer here..."
          />
        )}
      </div>
    </div>
  )
}

export default QuestionCard


