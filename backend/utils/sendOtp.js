import Otp from '../models/otp.model.js'
import nodemailer from 'nodemailer'

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

const generateOtp = () => {
	return Math.floor(100000 + Math.random() * 900000).toString()
}

const sendOtp = async (email) => {
	const otp = generateOtp()
	const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

	await Otp.deleteMany({ email })
	await Otp.create({ email, otp, expiresAt })

	try {
		// Send email
		const mailOptions = {
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Your OTP for Authentication',
			html: `
				<h1>Authentication OTP</h1>
				<p>Your OTP is: <strong>${otp}</strong></p>
				<p>This OTP will expire in 5 minutes.</p>
			`
		}

		await transporter.sendMail(mailOptions)
		return true
	} catch (error) {
		console.error('Error sending email:', error)
		throw new Error('Failed to send OTP email')
	}
}

export { sendOtp }
