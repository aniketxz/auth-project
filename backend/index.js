import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.route.js'

connectDB()

const app = express()

app.use(express.json())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
	res.send('API is running...')
})

app.use((err, req, res, next) => {
	res.status(500).json({ success: false, message: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
