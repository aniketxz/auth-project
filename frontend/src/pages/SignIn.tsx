import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import { loginWithOtp, verifyOtp } from "../services/authService"
import useAuthStore from "../store/authStore"

interface FormData {
  email: string
  otp: string
}

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    otp: "",
  })
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

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

    const response = await loginWithOtp(formData.email)

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
      alert("Login successful! Welcome back.")
      navigate("/")
    } else {
      alert(`Error: ${response.error}`)
    }

    setIsLoading(false)
  }

  const handleResendOtp = async () => {
    setIsResending(true)

    const response = await loginWithOtp(formData.email)

    if (response.success) {
      alert("OTP resent successfully! Check your email.")
    } else {
      alert(`Error: ${response.error}`)
    }

    setIsResending(false)
  }

  return (
    <AuthLayout>
      <div className='w-full flex items-center justify-center'>
        <div className='bg-white p-8 rounded-3xl w-full max-w-md'>
          {/* Sign in form */}
          <form
            onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
            className='space-y-4'
          >
            <div>
              <h1 className='text-3xl font-bold mb-2'>Sign in</h1>
              <p className='text-gray-600/70 mb-6'>
                Welcome back! Sign in to your account
              </p>
            </div>

            {/* Email Input */}
            <div>
              <label className='block text-sm text-gray-600 mb-2'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='jonas_kahnwald@gmail.com'
                required
                disabled={isOtpSent}
              />
            </div>

            {/* OTP Input - Only required after OTP is sent */}
            {isOtpSent && (
              <div>
                <label className='block text-sm text-gray-600 mb-2'>OTP</label>
                <input
                  type='text'
                  name='otp'
                  value={formData.otp}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  placeholder='Enter 6-digit OTP'
                  required
                  maxLength={6}
                  pattern='[0-9]{6}'
                />
                <div className='flex justify-between items-center mt-1'>
                  <p className='text-xs text-gray-500'>
                    Enter the 6-digit OTP sent to your email
                  </p>
                  <button
                    type='button'
                    onClick={handleResendOtp}
                    disabled={isResending}
                    className='text-xs text-primary cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isResending ? "Sending..." : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-primary text-white py-2 rounded-lg cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : isOtpSent ? "Sign In" : "Get OTP"}
            </button>

            {/* Sign Up Link */}
            <p className='text-center text-gray-600'>
              Don't have an account?{" "}
              <button
                type='button'
                onClick={() => navigate("/signup")}
                className='text-primary cursor-pointer hover:underline'
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignIn
