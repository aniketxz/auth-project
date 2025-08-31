import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
        return ret
      }
    }
  }
)

const Note = mongoose.model('Note', noteSchema)

export default Note
