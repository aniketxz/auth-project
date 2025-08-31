const API_BASE_URL = 'http://localhost:5000/api'

export interface AuthResponse {
  success: boolean
  message?: string
  error?: string
  user?: {
    id: string
    email: string
  }
  token?: string
}

export const sendOtp = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error sending OTP:', error)
    return {
      success: false,
      error: 'Failed to send OTP. Please try again.',
    }
  }
}

export const verifyOtp = async (email: string, otp: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return {
      success: false,
      error: 'Failed to verify OTP. Please try again.',
    }
  }
}

export const loginWithOtp = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error sending login OTP:', error)
    return {
      success: false,
      error: 'Failed to send OTP. Please try again.',
    }
  }
}
