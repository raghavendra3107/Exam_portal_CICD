import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createCategory, getCategories, updateCategory } from '../services/api.js'

function CategoryForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editing = Boolean(id)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editing) {
      getCategories().then((list) => {
        const c = list.find((x) => x.id === id)
        if (c) { setTitle(c.title); setDescription(c.description) }
      })
    }
  }, [editing, id])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (editing) {
      await updateCategory({ id, title, description })
    } else {
      await createCategory({ title, description })
    }
    setLoading(false)
    navigate('/teacher/categories')
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">{editing ? 'Update' : 'Add'} Category</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-3xl space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Category Title" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Category Description" className="mt-1 w-full rounded-md border px-3 py-2 min-h-32" />
        </div>
        <button disabled={loading} className="rounded-md bg-green-600 px-6 py-2 text-white">{loading ? 'Saving...' : 'Add'}</button>
      </form>
    </div>
  )
}

export default CategoryForm





