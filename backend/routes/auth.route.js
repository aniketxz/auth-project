import express from 'express'
import User from '../models/user.model.js'
import { sendOtp } from '../utils/sendOtp.js'

const router = express.Router()

router.post('/register', async (req, res) => {
	const { email } = req.body
	if (!email) return res.status(400).json({ error: 'Email required!' })

	const existsUser = await User.findOne({ email })
	if (existsUser)
		return res.status(400).json({ error: 'User already exists, please login!' })

	await User.create({ email, isVerified: false })

	try {
		const otpSent = await sendOtp(email)
		if (otpSent) res.json({ message: 'OTP sent!' })
		else res.status(500).json({ message: 'Failed to send otp!' })
	} catch (error) {
		res.status(500).json({ error: 'Failed to send otp!' })
	}
})

router.post('/login', async (req, res) => {
	const { email } = req.body
	if (!email) return res.status(400).json({ error: 'Email required!' })

	const existsUser = await User.findOne({ email })
	if (!existsUser)
		return res.status(400).json({ error: 'User not found, please sign up!' })

	try {
		const otpSent = await sendOtp(email)
		if (otpSent) res.json({ message: 'OTP sent!' })
		else res.status(500).json({ message: 'Failed to send otp!' })
	} catch (error) {
		res.status(500).json({ error: 'Failed to send otp!' })
	}
})

router.post('/verify-otp', (req, res) => {})

export default router
