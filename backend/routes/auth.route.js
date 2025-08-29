import express from 'express'
import User from '../models/user.model.js'
import Otp from '../models/otp.model.js'
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

router.post('/verify-otp', async (req, res) => {
	const { email, otp } = req.body
	if (!email || !otp)
		return res.status(400).json({ error: 'All fields are required!' })

	try {
		const otpRecord = await Otp.findOne({ email })
		if (!otpRecord)
			// if otp does not exist
			return res.status(400).json({ error: 'No OTP found, request again!' })

		if (otpRecord.expiresAt < new Date()) {
			// if otp is expired
			await Otp.deleteMany({ email })
			return res.status(400).json({ error: 'OTP expired, request again!' })
		}

		if (otpRecord.otp !== otp) {
			// check if otp is valid
			return res.status(400).json({ error: 'Invalid OTP!' })
		}

		// delete valid otp
		await Otp.deleteMany({ email })

		const user = await User.findOneAndUpdate(
			{ email },
			{ isVerified: true },
			{ new: true }
		)

		res.json({
			message: 'OTP verified!',
			user: { id: user._id, email: user.email },
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Could not verify otp!' })
	}
})

export default router
