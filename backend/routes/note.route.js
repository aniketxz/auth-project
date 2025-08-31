import express from 'express'
import Note from '../models/note.model.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Apply authentication middleware to all note routes
router.use(authenticateToken)

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { content } = req.body
    const { userId } = req.user

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required!'
      })
    }

    const note = await Note.create({
      content,
      user: userId
    })

    res.status(201).json({
      success: true,
      message: 'Note created successfully!',
      note
    })
  } catch (error) {
    console.error('Create note error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create note!'
    })
  }
})

// Get all notes for the authenticated user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.user
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 })

    res.json({
      success: true,
      notes,
      count: notes.length
    })
  } catch (error) {
    console.error('Get notes error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notes!'
    })
  }
})

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body
    const { userId } = req.user

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required!'
      })
    }

    const note = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { content },
      { new: true, runValidators: true }
    )

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found!'
      })
    }

    res.json({
      success: true,
      message: 'Note updated successfully!',
      note
    })
  } catch (error) {
    console.error('Update note error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update note!'
    })
  }
})

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.user

    const note = await Note.findOneAndDelete({ _id: id, user: userId })

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found!'
      })
    }

    res.json({
      success: true,
      message: 'Note deleted successfully!'
    })
  } catch (error) {
    console.error('Delete note error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to delete note!'
    })
  }
})

export default router
