import Otp from '../models/otp.model.js'

const generateOtp = () => {
	return Math.floor(100000 + Math.random() * 900000).toString()
}

const sendOtp = async (email) => {
  const otp = generateOtp()
	const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

	await Otp.deleteMany({ email })
	await Otp.create({ email, otp, expiresAt })

	console.log(`Otp: ${otp}`)

	return true
}

export { sendOtp }
