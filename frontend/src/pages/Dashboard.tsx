import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Trash2, Plus } from "lucide-react"
import useAuthStore from "../store/authStore"
import {
  getNotes,
  createNote,
  deleteNote,
  type Note,
} from "../services/notesService"

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const { user, userName, token, logout } = useAuthStore()
  const navigate = useNavigate()

  // Fetch notes on component mount
  useEffect(() => {
    if (token) {
      fetchNotes()
    }
  }, [token])

  const fetchNotes = async () => {
    if (!token) return

    setIsLoading(true)
    const response = await getNotes(token)

    if (response.success && response.notes) {
      setNotes(response.notes)
    } else {
      alert(`Error: ${response.error}`)
    }

    setIsLoading(false)
  }

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !newNote.trim()) return

    setIsCreating(true)
    const response = await createNote(newNote.trim(), token)

    if (response.success && response.note) {
      setNotes([response.note, ...notes])
      setNewNote("")
      setShowCreateForm(false)
    } else {
      alert(`Error: ${response.error}`)
    }

    setIsCreating(false)
  }

  const handleDelete = async (id: string) => {
    if (!token) return

    const response = await deleteNote(id, token)

    if (response.success) {
      setNotes(notes.filter((note) => note._id !== id))
    } else {
      alert(`Error: ${response.error}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/signin")
  }

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      {/* Navbar */}
      <header className='flex justify-between items-center px-4 md:px-8 py-3 md:border-b bg-white md:shadow-sm'>
        <div className='flex items-center gap-2'>
          {/* Logo */}
          <img src='/logo.png' alt='logo' className='size-8' />
          <h1 className='font-semibold text-gray-800 text-xl'>Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className='text-blue-600 font-medium cursor-pointer hover:underline'
        >
          Sign Out
        </button>
      </header>

      {/* Main content */}
      <main className='flex-1 flex flex-col items-center px-4 md:px-0 py-6'>
        <div className='w-full max-w-md flex flex-col gap-6'>
          {/* Welcome card */}
          <div className='bg-white shadow rounded-xl p-4'>
            <h2 className='font-semibold text-gray-800'>
              Welcome, {userName || "User"}!
            </h2>
            <p className='text-gray-600 text-sm'>
              Email: {user?.email || "N/A"}
            </p>
          </div>

          {/* Create Note section */}
          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className='w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2'
            >
              <Plus size={20} />
              Create Note
            </button>
          ) : (
            <form
              onSubmit={handleCreateNote}
              className='bg-white shadow rounded-xl p-4'
            >
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder='Write your note here...'
                className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                rows={3}
                required
              />
              <div className='flex gap-2 mt-3'>
                <button
                  type='submit'
                  disabled={isCreating || !newNote.trim()}
                  className='flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700'
                >
                  {isCreating ? "Creating..." : "Save Note"}
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setShowCreateForm(false)
                    setNewNote("")
                  }}
                  className='px-4 py-2 border border-gray-300 rounded-lg font-medium transition cursor-pointer hover:bg-gray-50'
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Notes list */}
          <section>
            <h3 className='font-semibold text-gray-800 mb-3'>
              Notes ({notes.length})
            </h3>
            {isLoading ? (
              <div className='text-center text-gray-500 py-4'>
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div className='text-center text-gray-500 py-4'>
                No notes yet. Create your first note!
              </div>
            ) : (
              <div className='flex flex-col gap-3'>
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className='flex justify-between items-start bg-white shadow rounded-xl px-4 py-3'
                  >
                    <p className='flex-1 text-gray-800'>{note.content}</p>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className='text-gray-500 cursor-pointer hover:text-red-500 ml-3'
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
