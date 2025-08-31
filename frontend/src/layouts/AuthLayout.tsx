import authBg from '../assets/image.png'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex min-h-screen relative'>
			<div className='absolute top-6 left-6 hidden md:flex items-center gap-2'>
				<img src={'/logo.png'} alt='logo' className='size-10' />
				<span className='text-3xl font-semibold'>HD</span>
			</div>

			<div className='w-full md:w-2/5 flex max-md:flex-col max-md:justify-center items-center'>
					<div className='flex md:absolute md:top-6 md:left-6 items-center gap-2'>
						<img src={'/logo.png'} alt='logo' className='size-10' />
						<span className='text-3xl font-semibold'>HD</span>
					</div>
					{children}
			</div>

			<div className='hidden md:block md:w-3/5 p-2'>
				{/* <div className='bg-blue-500 rounded-3xl w-full h-full'></div> */}
				<img
					src={authBg}
					alt='auth-bg'
					className='w-full h-full rounded-3xl object-cover'
				/>
			</div>
		</div>
	)
}

export default AuthLayout
