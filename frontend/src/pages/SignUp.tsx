import { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'

interface FormData {
	name: string
	dob: string
	email: string
}

const SignUp = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		dob: '',
		email: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		// TODO: Implement OTP sending logic
		console.log('Form submitted:', formData)
	}

	return (
		<AuthLayout>
			<div className='min-h-screen flex items-center justify-center bg-navy'>
				<div className='bg-white p-8 rounded-3xl w-full max-w-md'>
					{/* HD Logo */}
					<div className='flex items-center mb-8'>
						<span className='text-primary text-2xl font-bold'>HD</span>
					</div>

					{/* Sign up form */}
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<h1 className='text-2xl font-semibold mb-2'>Sign up</h1>
							<p className='text-gray-600 mb-6'>
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
								className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
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
								className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
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
								className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
								placeholder='jonas_kahnwald@gmail.com'
								required
							/>
						</div>

						{/* Submit Button */}
						<button
							type='submit'
							className='w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors'
						>
							Get OTP
						</button>

						{/* Sign In Link */}
						<p className='text-center text-gray-600'>
							Already have an account?{' '}
							<a href='/signin' className='text-primary hover:underline'>
								Sign in
							</a>
						</p>
					</form>
				</div>
			</div>
		</AuthLayout>
	)
}

export default SignUp
