function ResultsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-semibold">Results</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Exam</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Score</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Sample Exam</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default ResultsPage







