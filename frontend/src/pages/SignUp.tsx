import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendOtp, verifyOtp } from "../services/authService"
import useAuthStore from "../store/authStore"
import AuthLayout from "../layouts/AuthLayout"

interface FormData {
  name: string
  dob: string
  email: string
  otp: string
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    email: "",
    otp: "",
  })
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const response = await sendOtp(formData.email)

    if (response.success) {
      setIsOtpSent(true)
      alert("OTP sent successfully! Check your email.")
    } else {
      alert(`Error: ${response.error}`)
    }

    setIsLoading(false)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const response = await verifyOtp(formData.email, formData.otp)

    if (response.success && response.user && response.token) {
      // Save JWT token and log user in
      login(response.user, response.token)
      alert("Registration successful! You are now logged in.")
      navigate("/")
    } else {
      alert(`Error: ${response.error}`)
    }

    setIsLoading(false)
  }

  return (
    <AuthLayout>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white p-8 rounded-3xl w-full max-w-md'>
          {/* Sign up form */}
          <form
            onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
            className='space-y-4'
          >
            <div>
              <h1 className='text-3xl font-bold mb-2'>Sign up</h1>
              <p className='text-gray-600/70 mb-6'>
                Sign up to enjoy the feature of HD
              </p>
            </div>

            {/* Name Input */}
            <div>
              <label className='block text-sm text-gray-600 mb-2'>
                Your Name
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Jonas Khanwald'
                required
              />
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className='block text-sm text-gray-600 mb-2'>
                Date of Birth
              </label>
              <input
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className='block text-sm text-gray-600 mb-2'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='jonas_kahnwald@gmail.com'
                required
                disabled={isOtpSent}
              />
            </div>

            {/* OTP Input - Show only after OTP is sent */}
            {isOtpSent && (
              <div>
                <label className='block text-sm text-gray-600 mb-2'>OTP</label>
                <input
                  type='text'
                  name='otp'
                  value={formData.otp}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Enter 6-digit OTP'
                  required
                  maxLength={6}
                  pattern='[0-9]{6}'
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Enter the 6-digit OTP sent to your email
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-primary text-white py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : isOtpSent
                ? "Verify OTP"
                : "Get OTP"}
            </button>

            {/* Sign In Link */}
            <p className='text-center text-gray-600'>
              Already have an account?{" "}
              <button
                type='button'
                onClick={() => navigate("/signin")}
                className='text-primary cursor-pointer hover:underline'
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
