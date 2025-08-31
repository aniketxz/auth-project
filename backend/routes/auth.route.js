import express from 'express'
import User from '../models/user.model.js'
import Otp from '../models/otp.model.js'
import { sendOtp } from '../utils/sendOtp.js'
import { generateToken } from '../utils/jwt.js'

const router = express.Router()

// Email validation helper
const isValidEmail = (email) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// OTP validation helper
const isValidOtp = (otp) => {
	return /^\d{6}$/.test(otp)
}

router.post('/register', async (req, res) => {
	const { email } = req.body
	if (!email)
		return res.status(400).json({ success: false, error: 'Email required!' })

	if (!isValidEmail(email))
		return res.status(400).json({ success: false, error: 'Invalid email format!' })

	try {
		const existsUser = await User.findOne({ email })
		if (existsUser && existsUser.isVerified)
			return res
				.status(400)
				.json({ success: false, error: 'User already exists, please login!' })

		// Only create new user if they do not exist
		if (!existsUser) await User.create({ email, isVerified: false })

		const otpSent = await sendOtp(email)
		if (otpSent) {
			res.json({ success: true, message: 'OTP sent!' })
		} else {
			res.status(500).json({ success: false, message: 'Failed to send otp!' })
		}
	} catch (error) {
		console.error('Registration error:', error)
		res.status(500).json({ success: false, error: 'Failed to register user!' })
	}
})

router.post('/login', async (req, res) => {
	const { email } = req.body
	if (!email)
		return res.status(400).json({ success: false, error: 'Email required!' })

	if (!isValidEmail(email))
		return res.status(400).json({ success: false, error: 'Invalid email format!' })

	try {
		const existsUser = await User.findOne({ email })
		if (!existsUser)
			return res
				.status(400)
				.json({ success: false, error: 'User not found, please sign up!' })

		if (!existsUser.isVerified)
			return res
				.status(400)
				.json({ success: false, error: 'Please verify your email first (go to Sign Up) !' })

		const otpSent = await sendOtp(email)
		if (otpSent) res.json({ success: true, message: 'OTP sent!' })
		else
			res.status(500).json({ success: false, message: 'Failed to send otp!' })
	} catch (error) {
		console.error('Login error:', error)
		res.status(500).json({ success: false, error: 'Failed to process login!' })
	}
})

router.post('/verify-otp', async (req, res) => {
	const { email, otp } = req.body
	if (!email || !otp)
		return res
			.status(400)
			.json({ success: false, error: 'All fields are required!' })

	if (!isValidEmail(email))
		return res.status(400).json({ success: false, error: 'Invalid email format!' })

	if (!isValidOtp(otp))
		return res.status(400).json({ success: false, error: 'Invalid OTP format! OTP must be 6 digits.' })

	try {
		const otpRecord = await Otp.findOne({ email })
		if (!otpRecord)
			// if otp does not exist
			return res
				.status(400)
				.json({ success: false, error: 'No OTP found, request again!' })

		if (otpRecord.expiresAt < new Date()) {
			// if otp is expired
			await Otp.deleteMany({ email })
			return res
				.status(400)
				.json({ success: false, error: 'OTP expired, request again!' })
		}

		if (otpRecord.otp !== otp) {
			// check if otp is valid
			return res.status(400).json({ success: false, error: 'Invalid OTP!' })
		}

		// delete valid otp
		await Otp.deleteMany({ email })

		const user = await User.findOneAndUpdate(
			{ email },
			{ isVerified: true },
			{ new: true }
		)

		// Generate JWT token
		const token = generateToken(user._id, user.email)

		res.json({
			success: true,
			message: 'OTP verified!',
			user: { id: user._id, email: user.email },
			token: token
		})
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, error: 'Could not verify otp!' })
	}
})

export default router
