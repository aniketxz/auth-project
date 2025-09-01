const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Note {
  _id: string
  content: string
  user: string
}

export interface NotesResponse {
  success: boolean
  notes?: Note[]
  note?: Note
  count?: number
  message?: string
  error?: string
}

export const getNotes = async (token: string): Promise<NotesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching notes:', error)
    return {
      success: false,
      error: 'Failed to fetch notes. Please try again.',
    }
  }
}

export const createNote = async (content: string, token: string): Promise<NotesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating note:', error)
    return {
      success: false,
      error: 'Failed to create note. Please try again.',
    }
  }
}

export const updateNote = async (id: string, content: string, token: string): Promise<NotesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error updating note:', error)
    return {
      success: false,
      error: 'Failed to update note. Please try again.',
    }
  }
}

export const deleteNote = async (id: string, token: string): Promise<NotesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error deleting note:', error)
    return {
      success: false,
      error: 'Failed to delete note. Please try again.',
    }
  }
}
