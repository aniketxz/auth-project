const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex min-h-screen'>
			<div className='w-2/5 flex items-center justify-center'>{children}</div>
			<div className='w-3/5 bg-blue-500'></div>
		</div>
	)
}

export default AuthLayout
