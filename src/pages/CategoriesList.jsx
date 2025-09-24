import { useEffect, useState } from 'react'
import { getCategories, deleteCategory } from '../services/api.js'
import { Link } from 'react-router-dom'

function CategoriesList() {
  const [categories, setCategories] = useState([])
  useEffect(() => { getCategories().then(setCategories) }, [])

  async function handleDelete(id) {
    await deleteCategory(id)
    setCategories((c) => c.filter(x => x.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Categories</h1>
      <div className="mt-4 space-y-3">
        {categories.map((c) => (
          <div key={c.id} className="rounded-md border p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{c.title}</p>
              <p className="text-sm text-gray-600">{c.description}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link to={`/teacher/categories/edit/${c.id}`} className="text-green-600 hover:underline">Update</Link>
              <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link to="/teacher/categories/new" className="rounded-md bg-green-600 px-4 py-2 text-white">Add Category</Link>
      </div>
    </div>
  )
}

export default CategoriesList





